import React from 'react';
import { Table } from 'antd';
import { data } from './mockData';

export const TableRequests: React.FC = () => {
  const rowHandler = (event, record) => {
    event.preventDefault();
    console.log(record);
  };

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
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
      dataIndex: 'task',
      sorter: (a: any, b: any) => a.task.length - b.task.length,
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
      sorter: (a: any, b: any) => a.state.length - b.state.length,
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => record.state.indexOf(value) === 0,
    },
    {
      title: 'SelfGrade',
      dataIndex: 'selfGradeScore',
      sorter: (a: any, b: any) => a.selfGradeScore - b.selfGradeScore,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
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
