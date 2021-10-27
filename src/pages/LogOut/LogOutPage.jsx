import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { addNotification, setAuth } from '../../redux/reducers';
const Logoutpage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuth(false));
    dispatch(addNotification('Log out done', false));
  }, [dispatch]);
  return <Redirect to="/" />;
};

export default Logoutpage;
