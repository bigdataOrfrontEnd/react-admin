import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input } from 'antd';

const FormChild = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
    resetFields: () => form.resetFields(),
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      name="userForm"
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});

export default FormChild;
