import React, { PropsWithChildren, useState } from 'react';
import { Layout, Menu } from 'antd';
import classes from './Layout.module.scss';
import { Link } from 'react-router-dom';

export const Layouts: React.FC = (props) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <Layout className={classes.layout}>
      <Sider theme="light">
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <span>Задачи</span>
            <Link to="/tasks" />
          </Menu.Item>
          <Menu.Item key="2">
            <span>Создать задачу</span>
            <Link to="/task/create" />
          </Menu.Item>
          <Menu.Item key="3">
            <span>Запросы на проверку</span>
            <Link to="/requests" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className={classes.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};
