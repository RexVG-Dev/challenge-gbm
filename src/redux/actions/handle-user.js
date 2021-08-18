import {
  ADD_ID_USER,
  ADD_ROLE_USER,
  DELETE_ID_USER,
  ROLE_ADMIN,
  ROLE_USER,
  ROLE_OTHER
} from '../types';

const roleAdmin = process.env.REACT_APP_ROLE_ID_ADMIN;
const roleUser = process.env.REACT_APP_ROLE_ID_USER;
const roleOther = process.env.REACT_APP_ROLE_ID_OTHER;

export function addIdUserAction(idUser) {
  return(dispatch) => {
    dispatch( addIdUser(idUser))
  }
}

const addIdUser = idUser => ({
  type: ADD_ID_USER,
  payload: idUser
});

export function addRoleUserAction(idUser){
  let typeRole = '';
  switch (idUser) {
    case roleAdmin:
      typeRole = ROLE_ADMIN;
      break;
    case roleUser:
      typeRole = ROLE_USER;
      break;

    case roleOther:
    default:
      typeRole = ROLE_OTHER;
      break;
  }
  return(dispatch) => {
    dispatch(addRoleUser(typeRole))
  }
}

const addRoleUser = idUser => ({
  type: ADD_ROLE_USER,
  payload: idUser
});

export function deleteCredentialsUserAction(){
  return(dispatch) => {
    dispatch(deleteCredentialsUser())
  }
}

const deleteCredentialsUser = () =>({
  type: DELETE_ID_USER
});