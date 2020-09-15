import React, { useEffect } from 'react';
import { TagCategoriesOrder } from '../../components/TagCategoriesOrder';
import { FormCheckEdit } from '../../components/FormCheckEdit';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useHistory } from 'react-router-dom';
import {
  sendTask,
  setCategoriesOrder,
  setAuthor,
  setItems,
  setState,
  setTitle,
} from '../../redux/slices/formCreateTaskSlice';
import { Button, Form, Input, Select } from 'antd';
import { listStateTask } from '../../utils/values';
import classes from '../../components/FormCheckEdit/FormCheckEdit.module.scss';
import { ITask } from '../../interfaces/interfaces';

export const FormCreateTask: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const author = useSelector((state: RootState) => state.auth.user);
  const { isLoading, title, state, categoriesOrder, items } = useSelector(
    (state: RootState) => {
      return {
        isLoading: state.formCreateTask.isLoading,
        title: state.formCreateTask.title,
        state: state.formCreateTask.state,
        categoriesOrder: state.formCreateTask.categoriesOrder,
        items: state.formCreateTask.items,
      };
    },
    shallowEqual
  );

  const onFinish = async (itemsForm) => {
    console.log(itemsForm);
    if (!itemsForm.items) {
      // TODO
      console.log('нет значений');
      return;
    }
    dispatch(setTitle(itemsForm.title));
    dispatch(setState(itemsForm.state));
    dispatch(setItems([...itemsForm.items]));
    const value: ITask = {
      title: itemsForm.title,
      author,
      categoriesOrder,
      state: itemsForm.state,
      items: [...itemsForm.items],
    };
    await dispatch(sendTask(value));
    history.push('/tasks');
  };

  return (
    <Form layout="horizontal" onFinish={onFinish} autoComplete="off">
      <h2>Название задачи</h2>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Missing name task' }]}
      >
        <Input
          placeholder="Введите название"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Item>
      <h2>Статус</h2>
      <Form.Item
        name="state"
        rules={[{ required: true, message: 'Missing state' }]}
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
        onTag={(categories) => dispatch(setCategoriesOrder(categories))}
      />
      <FormCheckEdit categories={categoriesOrder} items={items} />
      <Form.Item>
        <Button className={classes.button} type="primary" htmlType="submit">
          Оформить
        </Button>
      </Form.Item>
    </Form>
  );
};
