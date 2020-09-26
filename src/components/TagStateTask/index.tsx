import React from 'react';
import { typeTaskState } from '../../interfaces/interfaces';
import { Tag } from 'antd';
import { listStateTask } from '../../utils/values';

interface ITagStateTask {
  value: typeTaskState;
}

export const TagStateTask: React.FC<ITagStateTask> = ({ value }) => {
  const item = listStateTask.find((task) => value === task.value);
  if (item) {
    return <Tag color={item.color}>{item.name}</Tag>;
  } else {
    return <Tag>{value}</Tag>;
  }
};
