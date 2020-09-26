import React from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { IDispute, IModalValue } from '../../interfaces/interfaces';

interface IModalDisputeProps {
  visible: boolean;
  value: IModalValue | null;
  onClose(): void;
  onSave(value: IDispute): void;
}

export const ModalDispute: React.FC<IModalDisputeProps> = (props) => {
  const { value, visible, onClose, onSave } = props;
  const [form] = Form.useForm();

  const okHandler = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onClose();
        onSave({
          idReview: props.value.idReview,
          idRequest: props.value.idRequest,
          idTask: props.value.idTask,
          state: 'ONGOING',
          idem: props.value.idem,
          comment: values.comment,
          suggestedScore: values.score,
        });
      })
      .catch((info) => {
        return;
      });
  };

  return (
    <Modal visible={visible} onCancel={onClose} onOk={() => okHandler()}>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Желаемая оценка"
          name="score"
          rules={[
            {
              type: 'number',
              required: true,
              min: +value.min,
              max: +value.max,
              message: `Error score min ${value.min} max ${value.max}`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Комментарий"
          name="comment"
          rules={[
            {
              required: true,
              type: 'string',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
