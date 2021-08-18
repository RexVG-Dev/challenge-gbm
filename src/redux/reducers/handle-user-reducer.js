import {
  ADD_ID_USER,
  ADD_ROLE_USER,
  DELETE_ID_USER,
} from '../types';

const initialState = {
  idUser: null,
  roleUser: null
}

export default function HandleUserReducer( state = initialState, action) {
  switch(action.type) {
    case ADD_ID_USER:
      return {
        ...state,
        idUser: action.payload
      }
    case ADD_ROLE_USER:
      return {
        ...state,
        roleUser: action.payload
      }
    case DELETE_ID_USER:
      return {
        ...state,
        idUser: null,
        roleUser: null
      }
    default:
      return state;
  }
}