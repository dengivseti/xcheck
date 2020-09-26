import React from 'react';
import classes from './Loader.module.scss';
import { Spin } from 'antd';
export const Loader: React.FC = () => {
  return (
    <div className={classes.loader}>
      <Spin size="large" />
    </div>
  );
};
