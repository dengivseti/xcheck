import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  fetchTask,
  setUrl,
  sendReviewRequest,
} from '../../redux/slices/formCreateRequestSlice';
import { RootState } from '../../redux/rootReducer';
import { Loader } from '../../components/Loader';
import { Button, Form, Input, Select, Typography } from 'antd';
import { listStateRequest } from '../../utils/values';
import { Grade } from '../Grade';
import { useHistory } from 'react-router-dom';

interface RouteParams {
  id: string;
}

export const FormCreateRequest: React.FC = () => {
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

  const {
    titleTask,
    isLoading,
    url,
    state,
    items,
    crossCheckSessionId,
    typeRequest,
    selfGrade,
    idRequest,
  } = useSelector((store: RootState) => {
    return {
      crossCheckSessionId: store.formCreateRequest.crossCheckSessionId,
      titleTask: store.formCreateRequest.titleTask,
      isLoading: store.formCreateRequest.isLoading,
      url: store.formCreateRequest.url,
      state: store.formCreateRequest.state,
      items: store.formCreateRequest.items,
      typeRequest: store.formCreateRequest.type,
      selfGrade: store.formCreateRequest.selfGrade,
      idRequest: store.formCreateRequest.id,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchTask(params.id, author));
  }, []);

  const onFinish = async (value) => {
    await dispatch(
      sendReviewRequest(
        {
          author,
          state: value.state,
          score,
          idTask: params.id,
          url: value.url,
          selfGrade: finalGrade,
          crossCheckSessionId,
        },
        typeRequest,
        idRequest
      )
    );
    history.push('/reviews');
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Form layout="horizontal" onFinish={onFinish} autoComplete="off">
      <Typography.Title>
        {typeRequest === 'EDIT'
          ? 'Редактировать запрос на проверку'
          : 'Запрос на проверку'}{' '}
        {titleTask}
      </Typography.Title>
      <h2>Статус</h2>
      <Form.Item
        initialValue={state}
        name="state"
        rules={[{ required: true, message: 'Missing state' }]}
      >
        <Select
          placeholder="Выберите статус"
          defaultValue={state}
          value={state}
        >
          {listStateRequest.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <h2>Ссылка на решение</h2>
      <Form.Item
        initialValue={url}
        name="url"
        rules={[{ required: true, message: 'Missing url', type: 'url' }]}
      >
        <Input
          placeholder="Ссылка на решение"
          defaultValue={url}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </Form.Item>
      <Grade type={typeRequest} items={items} grade={selfGrade} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {typeRequest === 'EDIT' ? 'Редактировать' : 'Отправить'}
        </Button>
      </Form.Item>
    </Form>
  );
};
