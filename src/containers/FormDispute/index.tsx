import React, { useEffect, useState } from 'react';
import { IModalValue } from '../../interfaces/interfaces';
import { Button, Card, List, Typography } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { fetchReview, saveReview } from '../../redux/slices/reviewsSlice';
import { Loader } from '../../components/Loader';
import { ModalDispute } from '../../components/ModalDispute';
import {
  fetchDisputes,
  addDispute,
  saveDispute,
} from '../../redux/slices/disputeSlice';
import classes from './FormDispute.module.scss';

interface RouteParams {
  id: string;
}

export const FormDispute: React.FC = () => {
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();
  const history = useHistory();

  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<IModalValue | null>(null);

  const user = useSelector((store: RootState) => store.auth.user);
  const task = useSelector((store: RootState) => store.tasks.task);
  const review = useSelector((store: RootState) => store.reviews.review);
  const request = useSelector((store: RootState) => store.requests.request);
  const { disputes, isLoading } = useSelector((store: RootState) => {
    return {
      disputes: store.disputes.disputes,
      isLoading: store.disputes.isLoading,
    };
  });

  const generateArray = () => {
    const data = [];
    Object.keys(review.grade).forEach((key) => {
      const value = task.items.find((item) => item.id === key);
      data.push({
        id: key,
        title: value.title,
        description: value.description,
        score: review.grade[key].score,
        comment: review.grade[key].comment,
        min: value.minScore,
        max: value.maxScore,
      });
    });
    return data;
  };

  const clickHandler = async () => {
    const newReview = { ...review, state: 'ACCEPTED' };
    await dispatch(saveReview(newReview));
    history.push('/reviews');
  };

  useEffect(() => {
    dispatch(fetchDisputes());
    if (!task && !request && !review) {
      dispatch(fetchReview(params.id));
    }
  }, [dispatch, params.id, request, review, task]);

  const closeModal = () => {
    setVisible(false);
  };

  const ModalHandler = (value) => {
    setVisible(!visible);
    setValue(value);
  };

  const saveDisputeHandler = async (value) => {
    await dispatch(addDispute(value));
    await dispatch(saveDispute(value));
    await dispatch(saveReview({ ...review, state: 'DISPUTED' }));
  };

  const ButtonDispute = ({ item }) => {
    const dispute = disputes.find(
      (dispute) => dispute.idem === item.id && dispute.idReview === review.id
    );
    if (!dispute) {
      return (
        <Button
          type="primary"
          onClick={() =>
            ModalHandler({
              idReview: review.id,
              idRequest: review.idRequest,
              idTask: review.idTask,
              idem: item.id,
              min: item.min,
              max: item.max,
            })
          }
        >
          Обжаловать
        </Button>
      );
    }

    if (dispute.state === 'ACCEPTED') {
      return <Button disabled={true}>Одобрен</Button>;
    } else if (dispute.state === 'REJECTED') {
      return <Button disabled={true}>Отклонен</Button>;
    } else {
      return <Button disabled={true}>На обжаловании</Button>;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!task || !request || !review || !disputes) {
    return <Loader />;
  }

  if (user !== request.author) {
    history.push('/reviews');
  }

  const data = generateArray();

  return (
    <>
      <Typography.Title level={4}>Оценка от {review.author}</Typography.Title>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.title}: ${item.score} баллов`}
                description={item.comment}
              />
              <ButtonDispute item={item} />
            </List.Item>
          )}
        />
      </Card>
      <Button
        className={classes.button}
        type="primary"
        disabled={disputes.find(
          (dispute) =>
            dispute.idReview === review.id && dispute.state === 'ONGOING'
        )}
        onClick={clickHandler}
      >
        Принять проверку
      </Button>
      {visible ? (
        <ModalDispute
          visible={visible}
          value={value}
          onClose={closeModal}
          onSave={saveDisputeHandler}
        />
      ) : (
        <></>
      )}
    </>
  );
};
