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
        <Menu
          theme="light"
          mode="inline"
          // TODO проработать selectedKeys
          // selectedKeys={[props.location.pathname]}
        >
          <Menu.Item key="/tasks">
            <span>Задачи</span>
            <Link to="/tasks" />
          </Menu.Item>
          <Menu.Item key="/task/create">
            <span>Создать задачу</span>
            <Link to="/task/create" />
          </Menu.Item>
          <Menu.Item key="/requests">
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
