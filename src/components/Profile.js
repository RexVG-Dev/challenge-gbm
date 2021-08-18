import React, {useEffect} from 'react';
import {  useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { addIdUserAction, addRoleUserAction } from '../redux/actions/handle-user';

const Profile = () => {

  const dispatch = useDispatch();
  const addId = (idUser) => dispatch(addIdUserAction(idUser));
  const addRole = (idUser) => dispatch(addRoleUserAction(idUser));

  const {user} = useAuth0();

  const idUserState = useSelector( state => state.handleUsers.idUser);

  useEffect(() => {
    if(user) {
      const userID = user.sub.split("|")[1];
      addId(userID);
    }
  }, [user]);

  useEffect(() => {
    if(idUserState){
      addRole(idUserState);
    }
  }, [idUserState])
  return (
    <div className="m-1">
      <img className="user-icon" src={ user ? user.picture : "./img/user-icon.png"} alt="icon user"/>
    </div>
  )
}

export default Profile;
