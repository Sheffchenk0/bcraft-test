import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../Components/Form/Form';
import { setDefaultValue } from '../../redux/reducers';

const SignInPage = () => {
  const { inputs, isAuth } = useSelector((state) => {
    return {
      inputs: state.signinPageForm,
      isAuth: state.auth.isAuth,
    };
  });

  const dispatch = useDispatch();
  const onUnmount = (watchAllFields) => {
    dispatch(setDefaultValue('signinPageForm', watchAllFields));
  };
  if (isAuth) {
    return <Redirect to="/change" />;
  }
  return (
    <>
      <h2 className="title">Sign in</h2>
      <Form onUnmount={onUnmount} inputs={inputs} />
    </>
  );
};

export default memo(SignInPage);
