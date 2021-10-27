import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Header from './Components/Header/Header';
import Notification from './Components/Notification/Notification';
import './pages/InputPages.css';
import { setWrong } from './redux/reducers';

const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUp/SignUpPage'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePassword/ChangePasswordPage'));
const Logoutpage = lazy(() => import('./pages/LogOut/LogOutPage'));
const App = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    window.onerror = () => {
      dispatch(setWrong());
    };
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <Header />
        <div className="page">
          <Suspense fallback="loading">
            <Switch>
              <Route path="/bcraft-test/login" render={() => <LoginPage />} />
              <Route path="/bcraft-test/signup" render={() => <SignUpPage />} />
              <Route path="/bcraft-test/change" render={() => <ChangePasswordPage />} />
              <Route path="/bcraft-test/logout" render={() => <Logoutpage />} />
              <Route path="/bcraft-test/" render={() => <Redirect to="/bcraft-test/login" />} />
            </Switch>
          </Suspense>
          <Notification show={notification?.message && true} isError={notification?.isError}>
            {notification?.message}
          </Notification>
        </div>
      </div>
    </>
  );
};

export default App;
