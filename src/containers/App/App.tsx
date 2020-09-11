import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'antd';
import { setUser } from '../../redux/slices/authSlice';
import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();

  return (
    <main className={styles.app}>
      <Button type="primary" onClick={() => dispatch(setUser('vova'))}>
        Hello, Ant Design!
      </Button>
      <a href="foo.bar">I'm a link. Click me, please!</a>
      <h1>Hello</h1>
    </main>
  );
};

export default App;
