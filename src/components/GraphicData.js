import React, { useEffect, useState } from 'react';
import {Line } from 'react-chartjs-2';
import axiosClient from '../config/axios';
import DatePicker from "react-datepicker";

const GraphicData = () => {

  const initialState = {
    labels: [],
    datasets: [{
      label: 'IPC',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',

        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  }

  const [listIPC, setListIPC] = useState(initialState);
  const [filterByDate, setFilterByDate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    getIpc();
  }, []);


  useEffect(() => {
    if(filterByDate) {
      getIpc();
    }
  }, [filterByDate])

  useEffect(() => {
    if (startDate || endDate) {
      setFilterByDate(true);
    } else {
      setFilterByDate(false);
    }

    getIpc();
  }, [startDate, endDate]);

  const getIpc = async () => {
    let auxList = [];
    let auxData = [];
    let auxLabels = [];
    try {
      await axiosClient.get('/ipc').then(async resp => {
        auxList = resp.data;
        await auxList.sort((a, b) => { return a.date - b.date });

        if (filterByDate) {
          const start = startDate ? startDate : new Date("1900/01/01");
          const end = endDate ? endDate: new Date();
          auxList = await auxList.filter(element =>{
            if(new Date(element.date) > start && new Date(element.date) < end) {
              return element;
            }
          });
        }
        auxList.map(async (element) => {

          let currentDate = new Date(element.date);
          let fd = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
          auxLabels.push(fd);
          auxData.push(element.price);
        });

        setListIPC(initState => ({
          ...initialState,
          labels: auxLabels,
          datasets: [{
            ...initialState.datasets[0],
            data: auxData
          }]
        }));

      })
    } catch (error) {
      console.log('error');
    }
    setFilterByDate(false);
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Índice de Precios y Cotizaciones',
        fontSize: 35
      },
      legend: {
        display: true,
        position: 'top'
      }
    },

  }


  return (
    <>
      {/* <div className="d-flex flex-column justify-content-center align-items-center">
        <Button className="btn-cl my-2" onClick={postIpc}>Add new object</Button>
        <Button className="btn-cl my-2" onClick={updateIpc}>Update object 326</Button>
      </div> */}
      <div className="my-3 px-5 container">
        <div className="d-flex flex-column align-items-start">
          <span className="mb-1">Filtrar por rango de fechas</span>
          <div className="d-flex">
            <DatePicker
              placeholderText="Fecha de inicio"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd hh:mm:ss"
              isClearable={true}
            />
            <DatePicker
              placeholderText="Última fecha"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd hh:mm:ss"
              isClearable={true}
            />
          </div>
        </div>
        <Line data={listIPC} options={options} />
      </div>
    </>
  )
}

export default GraphicData;