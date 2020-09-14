import React, { useEffect } from 'react';
import { fetchListTasks } from '../../redux/slices/listTasksSlice';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { Loader } from '../../components/Loader';
import { ITask } from '../../interfaces/interfaces';
import { List } from 'antd';
import { RightSquareOutlined } from '@ant-design/icons';
import { TagStateTask } from '../../components/TagStateTask';
import classes from './ListTask.module.scss';
import { Link, useHistory } from 'react-router-dom';

export const ListTask: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useSelector((state: RootState) => state.auth.role);
  const { isLoading, tasks } = useSelector((state: RootState) => {
    return {
      isLoading: state.listTasks.isLoading,
      tasks: state.listTasks.tasks,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchListTasks());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const taskHandler = (id) => {
    // TODO В зависимости от роли открывается либо страница с редактированием задачи либо создание запроса на проверку
    switch (role) {
      case 'student':
        console.log('На страницу создания задачи на проверку');
        history.push(`/request/create/${id}`);
        return;
      case 'author':
        console.log('На страницу редактирования задачи');
        return <Link to="/task/create" />;
      default:
        console.log('Ничего не происходит');
        return <Link to="/task/create" />;
    }
  };

  if (!tasks) {
    // TODO Добавить стили
    return <h2>Нет задач</h2>;
  }
  return (
    <div>
      <List
        dataSource={tasks}
        renderItem={({ title, state, id }: ITask) => (
          <List.Item onClick={() => taskHandler(id)} className={classes.item}>
            <List.Item.Meta avatar={<RightSquareOutlined />} title={title} />
            <TagStateTask value={state} />
          </List.Item>
        )}
      />
    </div>
  );
};
