import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'antd';
import { setUser } from '../../redux/slices/authSlice';
import styles from './App.module.scss';
import { Auth } from '../../pages/Auth';

const App = () => {
  const dispatch = useDispatch();

  return <Auth />;
};
export default App;
