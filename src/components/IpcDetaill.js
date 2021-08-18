import React, { useState, useEffect } from 'react';
import axiosClient from '../config/axios';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Modal, Form } from 'react-bootstrap';
import { ROLE_ADMIN } from '../redux/types';
import { useSelector } from 'react-redux';

const roleUserBase = ROLE_ADMIN;

const MyExportCSV = (props) => {

  
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div className="d-flex justify-content-end">
      <Button variant="success" onClick={handleClick}>Exportar a un archivo svc</Button>
    </div>
  );
};

const IpcDetaill = () => {

  const roleUserState = useSelector(state => state.handleUsers.roleUser);
  const initialItem = {
    date: null,
    price: null,
    percentageChange: null,
    volume: null,
    change: null
  }
  const [listIpc, setListIpc] = useState([]);
  const [itemSelect, setitemSelect] = useState(initialItem)

  const handleSelectRow = (element) => {
    setitemSelect(element);
    handleShow();

  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    { dataField: "date", text: "Fecha", sort: true },
    { dataField: "price", text: "Precio", sort: true },
    { dataField: "percentageChange", text: "Cambio Porcentual" },
    { dataField: "volume", text: "Volumen" },
    { dataField: "change", text: "Cambio" }
  ];

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => { handleSelectRow(row) }
  }

  const rowClasses = (row, rowIndex) => {
    return 'custom-row-class';
  };

  const getIpc = async () => {
    let listAux = [];
    try {
      await axiosClient.get('/ipc').then(async resp => {
        listAux = await resp.data.map(element => ({
          ...element,
          date: new Date(element.date).toISOString().slice(0, 10)
        }));
        setListIpc(listAux);
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    getIpc();
  }, []);

  const handleItemIPC = async (e) => {

    setitemSelect({
      ...itemSelect,
      [e.target.name]: e.target.value
    });
  }

  const updateItem = async () => {
    if( roleUserBase !== roleUserState ) return;
    await axiosClient.put(`/ipc/${itemSelect.id}`, itemSelect).then(resp => console.log(resp));
    handleClose();
    await getIpc();
  }

  return (
    <>
      <div className="container tab-styles">
        <ToolkitProvider
          keyField="ipc"
          data={listIpc}
          columns={columns}
          exportCSV={{fileName:'IPC-Mexico.csv'}}
        >
          {
            props => (
              <div>
                <MyExportCSV {...props.csvProps} />
                <hr/>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  rowEvents={tableRowEvents}
                  rowClasses={rowClasses}
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar valores de IPC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupDate">
                <Form.Label>Fecha</Form.Label>
                <Form.Control name='date' type="date" onChange={(e) => handleItemIPC(e)} defaultValue={itemSelect.date} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control name='price' type="number" onChange={(e) => handleItemIPC(e)} defaultValue={itemSelect.percentageChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPercentageChange">
                <Form.Label>Cambio Percentual</Form.Label>
                <Form.Control name="percentageChange" type="number" onChange={(e) => handleItemIPC(e)} defaultValue={itemSelect.percentageChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupVolume">
                <Form.Label>Volumen</Form.Label>
                <Form.Control name="volume" type="number" onChange={(e) => handleItemIPC(e)} defaultValue={itemSelect.volume} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupChange">
                <Form.Label>Cambio</Form.Label>
                <Form.Control name="change" type="number" onChange={(e) => handleItemIPC(e)} defaultValue={itemSelect.change} />
              </Form.Group>
            </Form>
          </div>
          <Button variant="primary" onClick={updateItem}>
            Guardar cambios
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default IpcDetaill;
