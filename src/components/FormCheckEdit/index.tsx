import React from 'react';
import { Form, Input, Button, Space, Select, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import classes from './FormCheckEdit.module.scss';

interface IFormCheckProps {
  categories: string[];
  onItems(items): void;
}

export const FormCheckEdit: React.FC<IFormCheckProps> = ({
  categories,
  onItems,
}) => {
  const onFinish = (values) => {
    onItems(values);
  };

  return (
    <>
      <h2 className={classes.h2}>Требования</h2>
      <Form name="dynamic_form_check" onFinish={onFinish} autoComplete="off">
        <Form.List name="items">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <Space
                    // direction="vertical"
                    key={field.key}
                    className={classes.space}
                    align="start"
                  >
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                    <Form.Item
                      {...field}
                      name={[field.name, 'id']}
                      fieldKey={[field.fieldKey, 'id']}
                      rules={[{ required: true, message: 'Missing id' }]}
                    >
                      <Input className={classes.id} placeholder="Id" />
                    </Form.Item>
                    <Form.Item
                      className={classes.title}
                      {...field}
                      name={[field.name, 'title']}
                      fieldKey={[field.fieldKey, 'title']}
                      rules={[{ required: true, message: 'Missing title' }]}
                    >
                      <Input placeholder="Заголовок" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'order']}
                      fieldKey={[field.fieldKey, 'order']}
                      rules={[{ required: true, message: 'Missing Order' }]}
                    >
                      <Select placeholder="Категория">
                        {categories.map((item) => (
                          <Select.Option value={item} key={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'minScore']}
                      fieldKey={[field.fieldKey, 'minScore']}
                      rules={[
                        {
                          type: 'number',
                          required: true,
                          message: 'Missing min score',
                        },
                      ]}
                    >
                      <InputNumber placeholder="Min" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'maxScore']}
                      fieldKey={[field.fieldKey, 'maxScore']}
                      rules={[
                        {
                          type: 'number',
                          required: true,
                          message: 'Missing max score',
                        },
                      ]}
                    >
                      <InputNumber placeholder="Max" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'description']}
                      fieldKey={[field.fieldKey, 'description']}
                      rules={[
                        { required: true, message: 'Missing description' },
                      ]}
                    >
                      <Input.TextArea
                        className={classes.description}
                        autoSize={true}
                        placeholder="Описание"
                      />
                    </Form.Item>
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Добавить требование
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button className={classes.button} type="primary" htmlType="submit">
            Оформить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
