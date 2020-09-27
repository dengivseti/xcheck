import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchRequest, saveRequest } from '../../redux/slices/requestsSlice';
import { RootState } from '../../redux/rootReducer';
import { Loader } from '../../components/Loader';
import { Button, Form, Input, Select, Typography } from 'antd';
import { listStateRequest } from '../../utils/values';
import { Grade } from '../Grade';
import { useHistory } from 'react-router-dom';
import { fetchTask } from '../../redux/slices/tasksSlice';
import { IReviewRequest } from '../../interfaces/interfaces';

interface RouteParams {
  id: string;
}

interface IFormRequestProps {
  isEdit: boolean;
}

export const FormRequest: React.FC<IFormRequestProps> = (props) => {
  const { isEdit } = props;
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();
  const history = useHistory();

  const author = useSelector((store: RootState) => store.auth.user);

  const { finalGrade, score } = useSelector((store: RootState) => {
    return {
      finalGrade: store.grade.finalGrade,
      score: store.grade.score,
    };
  }, shallowEqual);

  const { request, isLoading } = useSelector((store: RootState) => {
    return {
      request: store.requests.request,
      isLoading: store.requests.isLoading,
    };
  }, shallowEqual);

  const { task, isLoadingTask } = useSelector((store: RootState) => {
    return {
      task: store.tasks.task,
      isLoadingTask: store.tasks.isLoading,
    };
  }, shallowEqual);

  useEffect(() => {
    if (!task && !request) {
      if (isEdit) {
        dispatch(fetchRequest(params.id));
      } else {
        dispatch(fetchTask(params.id));
      }
    }
  }, []);

  const onFinish = async (itemsForm) => {
    const value: IReviewRequest = {
      author,
      state: itemsForm.state,
      score,
      idTask: task.id,
      url: itemsForm.url,
      selfGrade: finalGrade,
      crossCheckSessionId: '',
    };
    if (request && isEdit) {
      value.id = params.id;
    }
    await dispatch(saveRequest(value));
    history.push('/requests');
  };

  if (isLoading || isLoadingTask || !task) {
    return <Loader />;
  }
  return (
    <Form layout="horizontal" onFinish={onFinish} autoComplete="off">
      <Typography.Title>
        {' '}
        {isEdit
          ? 'Редактировать запрос на проверку'
          : 'Запрос на проверку'}{' '}
        {task.title}
      </Typography.Title>
      <h2>Статус</h2>
      <Form.Item
        initialValue={isEdit ? request.state : listStateRequest[0].value}
        name="state"
        rules={[{ required: true, message: 'Missing state' }]}
      >
        <Select placeholder="Выберите статус">
          {listStateRequest.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <h2>Ссылка на решение</h2>
      <Form.Item
        initialValue={isEdit ? request.url : null}
        name="url"
        rules={[{ required: true, message: 'Missing url', type: 'url' }]}
      >
        <Input placeholder="Ссылка на решение" />
      </Form.Item>
      <Grade
        type={isEdit ? 'EDIT' : 'SELFGRADE'}
        items={task.items}
        grade={isEdit ? request.selfGrade : {}}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Редактировать' : 'Отправить'}
        </Button>
      </Form.Item>
    </Form>
  );
};
