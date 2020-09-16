import React, { useEffect } from 'react';
import { fetchTasks, setTask } from '../../redux/slices/tasksSlice';
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
  const user = useSelector((state: RootState) => state.auth.user);
  const { isLoading, tasks } = useSelector((state: RootState) => {
    return {
      isLoading: state.tasks.isLoading,
      tasks: state.tasks.tasks,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const taskHandler = async (id) => {
    // TODO В зависимости от роли открывается либо страница с редактированием задачи либо создание запроса на проверку
    const selectTask = tasks.find((task) => task.id === id);
    dispatch(setTask(selectTask));
    switch (role) {
      case 'student':
        history.push(`/task/${id}`);
        return;
      case 'author':
        if (selectTask.author === user) {
          history.push(`/task/${id}/edit`);
          return;
        }
      default:
        break;
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
