import React from 'react';
import { ITaskItem, ITaskOrderItems } from '../../interfaces/interfaces';
import { Card, List } from 'antd';

interface IListGradeProps {
  items: ITaskItem[];
  grade: ITaskOrderItems;
}

export const ListGrade: React.FC<IListGradeProps> = ({ items, grade }) => {
  const generateArray = () => {
    const data = [];
    Object.keys(grade).forEach((key) => {
      const value = items.find((item) => item.id === key);
      data.push({
        id: key,
        title: value.title,
        description: value.description,
        score: grade[key].score,
        comment: grade[key].comment,
      });
    });
    return data;
  };

  const data = generateArray();

  return (
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
          </List.Item>
        )}
      />
    </Card>
  );
};
