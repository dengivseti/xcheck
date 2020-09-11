import React, { ChangeEvent, useEffect, useState } from 'react';
import { ICrossCheckItem } from '../../interfaces/interfaces';
import { Divider, Form, Input, InputNumber, Space, Typography } from 'antd';
import classes from './OrderCrossCheck.module.scss';

interface IOrderProps {
  items: ICrossCheckItem[];
  name: string;
  onScore(IScoreObj): void;
  onComment(ICommentObj): void;
}

export const OrderCrossCheck: React.FC<IOrderProps> = ({
  items,
  name,
  onScore,
  onComment,
}) => {
  let maxScore = 0;
  items.forEach((item) => (maxScore += item.maxScore));
  return (
    <div className={classes.root}>
      <Typography.Title level={2} mark={true}>
        {name}: {maxScore} баллов.
      </Typography.Title>
      <Divider />
      {items.map((item) => (
        <div key={item.id} className={classes.container}>
          <div className={classes.taskMaxScore}>
            <span>Максиальное число баллов</span>
            <p>{item.maxScore}</p>
          </div>
          <div className={classes.taskDescription}>
            <p>{item.description}</p>
            <Form.Item
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
                placeholder="Комментарий"
              />
            </Form.Item>
          </div>
          <div className={classes.inputScope}>
            <Form.Item
              className={classes.label}
              name={[item.id, 'score']}
              label="Ваша оценка"
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
                placeholder="Оценка"
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
