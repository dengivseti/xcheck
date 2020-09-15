import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { Loader } from '../../components/Loader';
import { Button, Divider, Form, Select, Typography } from 'antd';
import { Grade } from '../Grade';
import { IReview } from '../../interfaces/interfaces';
import { listStateReviews } from '../../utils/values';
import { fetchRequest, sendReview } from '../../redux/slices/formReviewSlice';
import { ListGrade } from '../../components/ListGrade';

interface RouteParams {
  id: string;
}

export const FormReview: React.FC = () => {
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();
  const history = useHistory();

  const author = useSelector((store: RootState) => store.auth.user);

  const { finalGrade, score, totalScore } = useSelector((store: RootState) => {
    return {
      finalGrade: store.grade.finalGrade,
      score: store.grade.score,
      totalScore: store.grade.totalScore,
    };
  }, shallowEqual);

  const {
    typeReview,
    stateReview,
    idReview,
    isLoadingReview,
    idTask,
    gradeReview,
  } = useSelector((store: RootState) => {
    return {
      typeReview: store.formCreateReview.type,
      stateReview: store.formCreateReview.state,
      idReview: store.formCreateReview.id,
      isLoadingReview: store.formCreateReview.isLoading,
      idTask: store.formCreateRequest.idTask,
      gradeReview: store.formCreateReview.grade,
    };
  }, shallowEqual);

  const {
    titleTask,
    isLoading,
    url,
    items,
    crossCheckSessionId,
    selfGrade,
    idRequest,
    authorRequest,
    scoreRequest,
  } = useSelector((store: RootState) => {
    return {
      crossCheckSessionId: store.formCreateRequest.crossCheckSessionId,
      titleTask: store.formCreateRequest.titleTask,
      isLoading: store.formCreateRequest.isLoading,
      url: store.formCreateRequest.url,
      items: store.formCreateRequest.items,
      selfGrade: store.formCreateRequest.selfGrade,
      idRequest: store.formCreateRequest.id,
      authorRequest: store.formCreateRequest.author,
      scoreRequest: store.formCreateRequest.score,
    };
  }, shallowEqual);

  const onFinish = async (value) => {
    const result: IReview = {
      author,
      crossCheckSessionId,
      idRequest,
      idTask,
      score,
      state: value.state,
      grade: finalGrade,
    };
    await dispatch(sendReview(result, typeReview, idReview));
    history.push('/requests');
  };

  useEffect(() => {
    dispatch(fetchRequest(params.id, author));
  }, []);
  if (isLoading || isLoadingReview) {
    return <Loader />;
  }

  return (
    <Form layout="horizontal" onFinish={onFinish} autoComplete="off">
      <Typography.Title>
        {typeReview === 'EDIT' ? 'Редактирование проверки' : 'Проверка'}{' '}
        {titleTask} от {authorRequest}
      </Typography.Title>
      <Typography.Title level={4}>
        Ссылка на решение:{' '}
        <Typography.Link href={url} target="_blank">
          {url}
        </Typography.Link>
      </Typography.Title>
      <h2>Статус</h2>
      <Form.Item
        initialValue={stateReview}
        name="state"
        rules={[{ required: true, message: 'Missing state' }]}
      >
        <Select
          placeholder="Выберите статус"
          defaultValue={stateReview}
          value={stateReview}
        >
          {listStateReviews.map((item) => (
            <Select.Option value={item.value} key={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Divider orientation={'left'}>
        <Typography.Title level={4}>
          {authorRequest} самопроверка
        </Typography.Title>
      </Divider>
      <ListGrade grade={selfGrade} items={items} />
      {typeReview === 'EDIT' ? (
        <>
          <Grade type={typeReview} items={items} grade={gradeReview} />
        </>
      ) : (
        <Grade type={typeReview} items={items} grade={selfGrade} />
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {typeReview === 'EDIT' ? 'Редактировать' : 'Отправить'}
        </Button>
      </Form.Item>
    </Form>
  );
};
