import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from '../../Components/Form/Form';
import { addNotification, changePassword, setDefaultValue } from '../../redux/reducers';

const Changepasswordpage = () => {
  const { inputs, isAuth, email, password } = useSelector((state) => {
    return {
      inputs: state.changePasswordForm,
      isAuth: state.auth.isAuth,
      email: state.auth.email,
      password: state.auth.password,
    };
  });
  const dispatch = useDispatch();
  const onUnmount = (watchAllFields) => {
    dispatch(setDefaultValue('changePasswordForm', watchAllFields));
  };
  const onSubmit = ({ newPassword, oldPassword }) => {
    if (password === oldPassword) {
      dispatch(changePassword(email, newPassword, 'Password has changed', false));
    } else {
      dispatch(addNotification('Passwords not same', true));
    }
  };
  if (!isAuth) {
    return <Redirect to="/bcraft-test/login" />;
  }
  return (
    <>
      <div className="title">Change Password</div>
      <Form onSubmit={onSubmit} onUnmount={onUnmount} inputs={inputs} />
    </>
  );
};
export default Changepasswordpage;
