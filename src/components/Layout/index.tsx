import React from 'react';
import { Layout, Menu } from 'antd';
import classes from './Layout.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export const Layouts: React.FC = (props) => {
  const dispatch = useDispatch();
  const { Content, Sider } = Layout;
  const location = useLocation();

  return (
    <Layout className={classes.layout}>
      <Sider theme="light">
        <Menu theme="light" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/tasks">
            <span>Задачи</span>
            <Link to="/tasks" />
          </Menu.Item>
          <Menu.Item key="/tasks/create">
            <span>Создать задачу</span>
            <Link to="/tasks/create" />
          </Menu.Item>
          <Menu.Item key="/requests">
            <span>Запросы на проверку</span>
            <Link to="/requests" />
          </Menu.Item>
          <Menu.Item key="/reviews">
            <span>Оценки</span>
            <Link to="/reviews" />
          </Menu.Item>
          <Menu.Item key="/disputes">
            <span>Споры</span>
            <Link to="/disputes" />
          </Menu.Item>
          <Menu.Item key="/logout" onClick={() => dispatch(logout())}>
            <span>Выход</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className={classes.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};
