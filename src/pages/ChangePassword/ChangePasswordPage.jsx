import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../Components/Form/Form';
import { setDefaultValue } from '../../redux/reducers';

const Changepasswordpage = () => {
  console.log(1);
  const { inputs, isAuth } = useSelector((state) => {
    return {
      inputs: state.changePasswordForm,
      isAuth: state.auth.isAuth,
    };
  });
  const dispatch = useDispatch();
  const onUnmount = (watchAllFields) => {
    dispatch(setDefaultValue('changePasswordForm', watchAllFields));
  };
  if (!isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div className="title">Change Password</div>
      <Form onUnmount={onUnmount} inputs={inputs} />
    </>
  );
};
export default Changepasswordpage;
