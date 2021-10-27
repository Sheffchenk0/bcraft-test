import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../Components/Form/Form';
import { login, setDefaultValue } from '../../redux/reducers';

const Loginpage = () => {
  const { inputs, isAuth } = useSelector((state) => {
    return {
      inputs: state.loginPageForm,
      isAuth: state.auth.isAuth,
    };
  });
  const dispatch = useDispatch();
  const onUnmount = (watchAllFields) => {
    dispatch(setDefaultValue('loginPageForm', watchAllFields));
  };
  const onSubmit = ({ email, password }) => {
    dispatch(login(email, password, 'Login succes', false));
  };
  return (
    <>
      {(isAuth && <Redirect to="/change" />) || (
        <div>
          <div className="title">Log in</div>
          <Form onSubmit={onSubmit} onUnmount={onUnmount} inputs={inputs} />
        </div>
      )}
    </>
  );
};

export default Loginpage;
