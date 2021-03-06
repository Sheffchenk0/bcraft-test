import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Burger from '../Burger/Burger';
import './Header.css';

const Header = () => {
  let { pages, isAuth } = useSelector((state) => ({
    pages: state.pages,
    isAuth: state.auth.isAuth,
  }));
  pages = pages.map((el) => {
    return el;
  });
  return (
    <div className="header">
      <div className="logo">BCraft test</div>
      <Burger items={pages} />
    </div>
  );
};

export default memo(Header);
