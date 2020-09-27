import React, { useEffect, useState } from 'react';
import { TagCategoriesOrder } from '../../components/TagCategoriesOrder';
import { FormCheckEdit } from '../../components/FormCheckEdit';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useHistory, useParams } from 'react-router-dom';
import { saveTask, fetchTask, clearTask } from '../../redux/slices/tasksSlice';
import { Button, Form, Input, Select } from 'antd';
import { listStateTask } from '../../utils/values';
import classes from '../../components/FormCheckEdit/FormCheckEdit.module.scss';
import { ITask } from '../../interfaces/interfaces';
import { Loader } from '../../components/Loader';

interface RouteParams {
  id: string;
}

export const FormTask: React.FC = () => {
  const params = useParams<RouteParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { author, role } = useSelector((state: RootState) => {
    return {
      author: state.auth.user,
      role: state.auth.role,
    };
  });
  const { isLoading, task } = useSelector((state: RootState) => {
    return {
      isLoading: state.tasks.isLoading,
      task: state.tasks.task,
    };
  }, shallowEqual);

  const [categoriesOrder, setCategoriesOrder] = useState<string[]>(
    task ? task.categoriesOrder : ['Basic Scope', 'Extra Scope', 'Fines']
  );

  useEffect(() => {
    if (!params.id) {
      dispatch(clearTask());
    }
    if (!task && params.id) {
      dispatch(fetchTask(params.id));
    }
  }, [params.id, dispatch, task]);

  const onFinish = async (itemsForm) => {
    const value: ITask = {
      title: itemsForm.title,
      author,
      categoriesOrder,
      state: itemsForm.state,
      items: [...itemsForm.items],
    };
    if (task && params.id) {
      value.id = params.id;
    }
    await dispatch(saveTask(value));
    history.push('/tasks');
  };

  if (role !== 'author') {
    history.push('/tasks');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      layout="horizontal"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={task ? { items: task.items } : []}
    >
      <h2>Название задачи</h2>
      <Form.Item
        initialValue={task ? task.title : ''}
        name="title"
        rules={[{ required: true, message: 'Missing name task' }]}
      >
        <Input placeholder="Введите название" value={task ? task.title : ''} />
      </Form.Item>
      <h2>Статус</h2>
      <Form.Item
        name="state"
        rules={[{ required: true, message: 'Missing state' }]}
        initialValue={task ? task.state : []}
      >
        <Select placeholder="Выберите статус">
          {listStateTask.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <TagCategoriesOrder
        categories={categoriesOrder}
        onTag={(categories) => setCategoriesOrder(categories)}
      />
      <FormCheckEdit
        categories={categoriesOrder}
        items={task ? task.items : []}
      />
      <Form.Item>
        <Button className={classes.button} type="primary" htmlType="submit">
          Оформить
        </Button>
      </Form.Item>
    </Form>
  );
};
