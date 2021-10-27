import React, { lazy, Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Header from './Components/Header/Header';
import './pages/InputPages.css';
import Logoutpage from './pages/LogOut/LogOutPage';

const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const SignInPage = lazy(() => import('./pages/SignIn/SignInPage'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePassword/ChangePasswordPage'));

const App = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      <div className="container">
        <Header />
        <div className="page">
          <Suspense fallback="loading">
            <Switch>
              <Route path="/login" render={() => <LoginPage />} />
              <Route path="/signin" render={() => <SignInPage />} />
              <Route path="/change" render={() => <ChangePasswordPage />} />
              <Route path="/logout" render={() => <Logoutpage />} />
              <Route path="/" render={() => <Redirect to="/login" />} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
