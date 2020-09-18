import React from 'react';
import {
  ITaskItem,
  ITaskOrderItems,
  typeGrade,
} from '../../interfaces/interfaces';
import { Divider, Form, Input, InputNumber, Typography } from 'antd';
import classes from './Order.module.scss';

interface IOrderProps {
  type: typeGrade;
  items: ITaskItem[];
  taskSelfGrade: ITaskOrderItems;
  name: string;
  onScore(IScoreObj): void;
  onComment(ICommentObj): void;
}

export const Order: React.FC<IOrderProps> = ({
  items,
  taskSelfGrade,
  name,
  type,
  onScore,
  onComment,
}) => {
  let maxScore = 0;
  items.forEach((item) => (maxScore += item.maxScore));

  return (
    <div className={classes.root}>
      <Divider orientation="left">
        <Typography.Title level={4}>
          {name}: {maxScore} баллов.
        </Typography.Title>
      </Divider>
      {items.map((item) => (
        <div key={item.id} className={classes.container}>
          <div className={classes.taskMaxScore}>
            <span>Максиальное число баллов</span>
            <p>{item.maxScore}</p>
          </div>
          <div className={classes.taskDescription}>
            <p className={classes.bold}>{item.title}</p>
            <p>{item.description}</p>
            <Form.Item
              initialValue={
                taskSelfGrade[item.id] ? taskSelfGrade[item.id].comment : null
              }
              name={[item.id, 'comment']}
              rules={[
                {
                  type: 'string',
                },
              ]}
            >
              <Input.TextArea
                onChange={(event) =>
                  onComment({ id: item.id, comment: event.target.value })
                }
                className={classes.textarea}
                placeholder={
                  taskSelfGrade[item.id]
                    ? taskSelfGrade[item.id].comment
                    : 'Комментарий'
                }
              />
            </Form.Item>
          </div>
          <div className={classes.inputScope}>
            <Form.Item
              className={classes.label}
              name={[item.id, 'score']}
              label="Ваша оценка"
              initialValue={
                taskSelfGrade[item.id] ? taskSelfGrade[item.id].score : 0
              }
              rules={[
                {
                  type: 'number',
                  required: true,
                  min: item.minScore,
                  max: item.maxScore,
                  message: 'Error score',
                },
              ]}
            >
              <InputNumber
                size="large"
                min={item.minScore}
                max={item.maxScore}
                className={classes.inputNumber}
                placeholder={
                  taskSelfGrade[item.id]
                    ? taskSelfGrade[item.id].score.toString()
                    : '0'
                }
                onChange={(event: number) =>
                  onScore({ id: item.id, score: event })
                }
              />
            </Form.Item>
          </div>
        </div>
      ))}
    </div>
  );
};
