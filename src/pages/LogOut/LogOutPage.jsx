import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { setAuth } from '../../redux/reducers';
const Logoutpage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuth(false));
  }, []);
  return <Redirect to="/" />;
};

export default Logoutpage;
