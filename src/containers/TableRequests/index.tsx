import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import {
  fetchRequests,
  setRequest,
  clearRequest,
} from '../../redux/slices/requestsSlice';
import { fetchTasks, setTask } from '../../redux/slices/tasksSlice';
import { setReview, fetchReviews } from '../../redux/slices/reviewsSlice';
import { setClear } from '../../redux/slices/GradeSlice';
import { Loader } from '../../components/Loader';
import { listStateRequest } from '../../utils/values';
import { IReviewRequest } from '../../interfaces/interfaces';

export const TableRequests: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) => state.auth.user);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const { isLoading, requests } = useSelector((state: RootState) => {
    return {
      isLoading: state.requests.isLoading,
      requests: state.requests.requests,
    };
  });

  useEffect(() => {
    dispatch(setClear());
    dispatch(clearRequest());
    dispatch(fetchRequests());
    dispatch(fetchReviews());
    dispatch(fetchTasks());
  }, [dispatch]);

  const rowHandler = async (event, record: IReviewRequest) => {
    event.preventDefault();
    const selectTask = tasks.find((task) => task.id === +record.idTask);
    const findReview = reviews.find(
      (review) => review.author === user && review.idRequest === record.id
    );
    dispatch(setTask(selectTask));
    dispatch(setRequest(record));
    if (findReview && findReview.author) {
      await dispatch(setReview(findReview));
      history.push(`/review/${findReview.id}/edit`);
      return;
    }
    if (record.author === user) {
      history.push(`/request/${record.id}/edit`);
    } else {
      history.push(`/request/${record.id}`);
    }
  };

  const filter = (tasks) => {
    const filter = [];
    tasks.forEach((task) => {
      filter.push({ text: task.title, value: task.id });
    });
    return filter;
  };

  const IdTaskFilter = filter(tasks);

  const columns: any = [
    {
      title: 'CrossCheck',
      dataIndex: 'crossCheckSessionId',
      sorter: (a: any, b: any) =>
        a.crossCheckSessionId.length - b.crossCheckSessionId.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a: any, b: any) => a.author.length - b.author.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Task',
      dataIndex: 'idTask',
      filters: IdTaskFilter,
      onFilter: (value, record) => record.idTask.indexOf(value) === 0,
      sorter: (a: any, b: any) => a.idTask - b.idTask,
      sortDirections: ['descend', 'ascend'],
      render: (idTask) => (
        <>
          {tasks.forEach((task, int) => {
            if (+task.id === +idTask) {
              return <div key={int}>{task.title}</div>;
            }
          })}
        </>
      ),
    },
    {
      title: 'SelfGrade',
      dataIndex: 'score',
      sorter: (a: any, b: any) => a.score - b.score,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'State',
      dataIndex: 'state',
      filters: [
        { text: 'DRAFT', value: 'DRAFT' },
        { text: 'PUBLISHED', value: 'PUBLISHED' },
        { text: 'COMPLETED', value: 'COMPLETED' },
      ],
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      sorter: (a: any, b: any) => a.state.length - b.state.length,
      sortDirections: ['descend', 'ascend'],
      render: (state) => (
        <>
          {listStateRequest.forEach((item, int) => {
            if (item.value === state) {
              return (
                <Tag key={int} color={item.color}>
                  {item.name}
                </Tag>
              );
            }
          })}
        </>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={requests}
        rowKey={(request) => request.id}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              rowHandler(event, record);
            },
          };
        }}
      />
    </>
  );
};
