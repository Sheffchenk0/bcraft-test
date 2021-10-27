import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../Components/Form/Form';
import { setDefaultValue, signUp } from '../../redux/reducers';

const SignUpPage = () => {
  const { inputs, isAuth } = useSelector((state) => {
    return {
      inputs: state.signupPageForm,
      isAuth: state.auth.isAuth,
    };
  });

  const dispatch = useDispatch();
  const onUnmount = (watchAllFields) => {
    dispatch(setDefaultValue('signupPageForm', watchAllFields, 'Sing Up succes', false));
  };
  if (isAuth) {
    return <Redirect to="/bcraft-test/change" />;
  }
  const onSubmit = ({ email, password }) => {
    dispatch(signUp(email, password, 'Sign Up succes', false));
  };
  return (
    <>
      <h2 className="title">Sign up</h2>
      <Form onSubmit={onSubmit} onUnmount={onUnmount} inputs={inputs} />
    </>
  );
};

export default memo(SignUpPage);
