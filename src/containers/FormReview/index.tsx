import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { Loader } from '../../components/Loader';
import { Button, Divider, Form, Select, Typography } from 'antd';
import { Grade } from '../Grade';
import { IReview } from '../../interfaces/interfaces';
import { listStateCreateReviews } from '../../utils/values';
import { fetchRequest } from '../../redux/slices/requestsSlice';
import { fetchReview, saveReview } from '../../redux/slices/reviewsSlice';
import { ListGrade } from '../../components/ListGrade';

interface RouteParams {
  id: string;
}

interface IFormReviewProps {
  isEdit: boolean;
}

export const FormReview: React.FC<IFormReviewProps> = (props) => {
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

  const { review, isLoading } = useSelector((store: RootState) => {
    return {
      review: store.reviews.review,
      isLoading: store.reviews.isLoading,
    };
  }, shallowEqual);

  const task = useSelector((store: RootState) => store.tasks.task);
  const request = useSelector((store: RootState) => store.requests.request);

  const onFinish = async (value) => {
    const result: IReview = {
      author,
      idRequest: request.id,
      idTask: request.idTask,
      score,
      state: value.state,
      grade: finalGrade,
    };
    if (review && isEdit) {
      result.id = review.id;
    }
    await dispatch(saveReview(result));
    history.push('/reviews');
  };

  useEffect(() => {
    if (!task && !request && !review) {
      dispatch(fetchReview(params.id));
      if (isEdit) {
        dispatch(fetchRequest(params.id));
      }
    }
    if (review && review.id !== params.id) {
      if (isEdit) {
        dispatch(fetchRequest(params.id));
      }
    }
  }, [dispatch, isEdit, params.id, request, review, task]);

  if (isEdit && !review) {
    return <Loader />;
  }

  if (isLoading || !task || !request) {
    return <Loader />;
  }

  return (
    <Form layout="horizontal" onFinish={onFinish} autoComplete="off">
      <Typography.Title>
        {isEdit ? 'Редактирование проверки' : 'Проверка'} {task.title} от{' '}
        {request.author}
      </Typography.Title>
      <Typography.Title level={4}>
        Ссылка на решение:{' '}
        <Typography.Link href={request.url} target="_blank">
          {request.url}
        </Typography.Link>
      </Typography.Title>
      <h2>Статус</h2>
      <Form.Item
        initialValue={isEdit && review ? review.state : 'DRAFT'}
        name="state"
        rules={[{ required: true, message: 'Missing state' }]}
      >
        <Select placeholder="Выберите статус">
          {listStateCreateReviews.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Divider orientation={'left'}>
        <Typography.Title level={4}>
          {request.auth} самопроверка
        </Typography.Title>
      </Divider>
      <ListGrade grade={request.selfGrade} items={task.items} />
      {isEdit ? (
        <>
          <Grade type="EDIT" items={task.items} grade={review.grade} />
        </>
      ) : (
        <Grade type="REVIEW" items={task.items} grade={request.selfGrade} />
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Редактировать' : 'Отправить'}
        </Button>
      </Form.Item>
    </Form>
  );
};
