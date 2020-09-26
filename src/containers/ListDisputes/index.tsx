import React, { useEffect } from 'react';
import { Button, List, Typography } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { fetchDisputes, editDispute } from '../../redux/slices/disputeSlice';
import { Loader } from '../../components/Loader';
import { fetchReviewsUser, saveReview } from '../../redux/slices/reviewsSlice';
import { IDispute, typeDispute } from '../../interfaces/interfaces';
import classes from './ListDisputes.module.scss';

export const ListDisputes: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const { disputes, isLoading } = useSelector((state: RootState) => {
    return {
      disputes: state.disputes.disputes,
      isLoading: state.disputes.isLoading,
    };
  }, shallowEqual);

  const clickHandler = async (state: typeDispute, dispute: IDispute) => {
    await dispatch(editDispute(state, dispute.id));
    if (state === 'ACCEPTED') {
      const review = reviews.find((review) => review.id === dispute.idReview);
      if (review) {
        const newReview = {
          ...review,
          grade: {
            ...review.grade,
            [dispute.idem]: {
              ...review.grade[dispute.idem],
              score: dispute.suggestedScore,
            },
          },
        };
        await dispatch(saveReview(newReview));
      }
    }
  };

  const Item = (props: { dispute: IDispute }) => {
    const { dispute } = props;
    const task = tasks.find((task) => task.id === dispute.idTask);
    if (!task) {
      return <></>;
    }
    const item = task.items.find((item) => item.id === dispute.idem);
    if (!item) {
      return <></>;
    }
    return (
      <>
        <List.Item.Meta
          title={`Оценка: ${dispute.suggestedScore}. ${item.title}: ${item.description}.`}
          description={`Комментарий: ${dispute.comment}`}
        />
        {dispute.state === 'ONGOING' ? (
          <>
            <Button
              className={classes.button}
              type="primary"
              onClick={() => clickHandler('ACCEPTED', dispute)}
            >
              Принять
            </Button>
            <Button
              className={classes.button}
              type="primary"
              danger
              onClick={() => clickHandler('REJECTED', dispute)}
            >
              Отказать
            </Button>
          </>
        ) : (
          <Button disabled>Спор закрыт</Button>
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchDisputes());
  }, []);

  useEffect(() => {
    if (disputes) {
      dispatch(fetchReviewsUser(user));
    }
  }, [disputes]);

  if (isLoading) {
    return <Loader />;
  }

  const filterDisputes = [];

  reviews.forEach((review) => {
    disputes.forEach((dispute) => {
      if (review.id === dispute.idReview) {
        filterDisputes.push(dispute);
      }
    });
  });

  return (
    <>
      <Typography.Title>Cпоры</Typography.Title>
      <List
        dataSource={filterDisputes}
        renderItem={(dispute: IDispute) => {
          return (
            <List.Item>
              <Item dispute={dispute} />
            </List.Item>
          );
        }}
      />
    </>
  );
};
