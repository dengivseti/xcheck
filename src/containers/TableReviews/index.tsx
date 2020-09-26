import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { Loader } from '../../components/Loader';
import { fetchTasks, setTask } from '../../redux/slices/tasksSlice';
import { fetchRequests, setRequest } from '../../redux/slices/requestsSlice';
import { fetchReviews, setReview } from '../../redux/slices/reviewsSlice';
import { IReview } from '../../interfaces/interfaces';
import { listStateReviews } from '../../utils/values';

export const TableReviews: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const requests = useSelector((state: RootState) => state.requests.requests);
  const user = useSelector((state: RootState) => state.auth.user);
  const { isLoading, reviews } = useSelector((state: RootState) => {
    return {
      isLoading: state.reviews.isLoading,
      reviews: state.reviews.reviews,
    };
  });

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchRequests());
    dispatch(fetchReviews());
  }, [dispatch]);

  const rowHandler = (event, record: IReview) => {
    event.preventDefault();
    const selectTask = tasks.find((task) => task.id === +record.idTask);
    const selectRequest = requests.find(
      (request) => request.id === +record.idRequest
    );
    dispatch(setReview(record));
    dispatch(setTask(selectTask));
    dispatch(setRequest(selectRequest));
    if (record.state === 'ACCEPTED') {
      return;
    }
    if (record.author === user) {
      history.push(`/review/${record.id}/edit`);
    } else if (user === selectRequest.author) {
      history.push(`/review/${record.id}`);
    }
  };

  const filter = (items, text, value) => {
    const filter = [];
    items.forEach((item) => {
      filter.push({ text: item[text], value: item[value] });
    });
    return filter;
  };

  const IdTaskFilter = filter(tasks, 'title', 'id');
  const IdAuthorFilter = filter(reviews, 'author', 'author');

  const columns: any = [
    {
      title: 'CrossCheck',
      dataIndex: 'crossCheckSessionId',
      sorter: (a: any, b: any) =>
        a.crossCheckSessionId.length - b.crossCheckSessionId.length,
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
      title: 'Author',
      dataIndex: 'author',
      filters: IdAuthorFilter,
      onFilter: (value, record) => record.author.indexOf(value) === 0,
      sorter: (a: any, b: any) => a.author.length - b.author.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Grade',
      dataIndex: 'score',
      sorter: (a: any, b: any) => a.score - b.score,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Author Request',
      dataIndex: 'idRequest',
      sorter: (a: any, b: any) => a.idRequest - b.idRequest,
      sortDirections: ['descend', 'ascend'],
      render: (idRequest) => (
        <>
          {requests.forEach((request) => {
            if (request.id === idRequest) {
              return <div key={request.id}>{request.author}</div>;
            }
          })}
        </>
      ),
    },
    {
      title: 'SelfGrade',
      dataIndex: 'idRequest',
      sorter: (a: any, b: any) => a.score - b.score,
      sortDirections: ['descend', 'ascend'],
      render: (idRequest) => (
        <>
          {requests.forEach((request) => {
            if (request.id === idRequest) {
              return <div key={request.id}>{request.score}</div>;
            }
          })}
        </>
      ),
    },
    {
      title: 'State',
      dataIndex: 'state',
      filters: [
        { text: 'DRAFT', value: 'DRAFT' },
        { text: 'PUBLISHED', value: 'PUBLISHED' },
        { text: 'DISPUTED', value: 'DISPUTED' },
        { text: 'ACCEPTED', value: 'ACCEPTED' },
        { text: 'REJECTED', value: 'REJECTED' },
      ],
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      sorter: (a: any, b: any) => a.state.length - b.state.length,
      sortDirections: ['descend', 'ascend'],
      render: (state) => (
        <>
          {listStateReviews.forEach((item, int) => {
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
        dataSource={reviews}
        rowKey={(review) => review.id}
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
