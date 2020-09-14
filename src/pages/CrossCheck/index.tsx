import React, { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Order } from '../../components/Order';
import { Button, Form, Typography } from 'antd';
import { RootState } from '../../redux/rootReducer';
import {
  fetchTask,
  editItemsSolution,
} from '../../redux/slices/crossCheckTaskSlice';

export const CrossCheck: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    objOrder,
    objCheck,
    score,
    totalScore,
    taskItemsSelfGrade,
  } = useSelector((state: RootState) => {
    return {
      isLoading: state.crossCheckTask.isLoading,
      objOrder: state.crossCheckTask.items,
      objCheck: state.crossCheckTask.task_items,
      score: state.crossCheckTask.score,
      totalScore: state.crossCheckTask.total_score,
      withSelfGrade: state.crossCheckTask.withSelfGrade,
      taskItemsSelfGrade: state.crossCheckTask.taskItemsSelfGrade,
    };
  }, shallowEqual);

  useEffect(() => {
    if (Object.keys(objOrder).length === 0) {
      dispatch(fetchTask());
    }
  }, [dispatch]);

  const onFinish = () => {
    const values = objCheck;
    console.log('Values items', values);
  };

  const solutionHandler = (obj) => {
    dispatch(editItemsSolution(obj));
  };

  const debounceSolutionHandler = useCallback(
    debounce(solutionHandler, 200),
    []
  );

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Typography.Title level={2} mark={true}>
        Total point {score}/{totalScore}
      </Typography.Title>
      <Form name="form_cross_check" onFinish={onFinish} autoComplete="off">
        {Object.keys(objOrder).map((item) => (
          <Order
            items={objOrder[item]}
            taskSelfGrade={taskItemsSelfGrade}
            name={item}
            type="EDIT"
            onComment={debounceSolutionHandler}
            onScore={debounceSolutionHandler}
          />
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Оформить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
