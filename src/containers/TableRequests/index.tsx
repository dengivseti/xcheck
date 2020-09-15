import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { fetchRequests } from '../../redux/slices/listRequestsSlice';
import { fetchTasks } from '../../redux/slices/listTasksSlice';
import { Loader } from '../../components/Loader';
import { listStateRequest } from '../../utils/values';
import { IReviewRequest } from '../../interfaces/interfaces';

export const TableRequests: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state: RootState) => state.listTasks.tasks);
  const user = useSelector((state: RootState) => state.auth.user);
  const { isLoading, requests } = useSelector((state: RootState) => {
    return {
      isLoading: state.listRequests.isLoading,
      requests: state.listRequests.requests,
    };
  });

  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchTasks());
  }, []);

  const rowHandler = (event, record: IReviewRequest) => {
    event.preventDefault();
    console.log(record);
    if (record.author === user) {
      history.push(`/task/${record.idTask}`);
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
          {tasks.map((task, int) => {
            if (task.id == idTask) {
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
          {listStateRequest.map((item, int) => {
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
