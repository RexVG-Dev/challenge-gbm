import { combineReducers } from "redux";

import HandleUserReducer from "./handle-user-reducer";

export default combineReducers({
  handleUsers: HandleUserReducer
})