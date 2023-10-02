import React from 'react';
import { Form, Input, DatePicker } from 'antd';

const Step4Form = () => {
  return (
    <Form>
      <Form.Item label="Account Number">
        <Input placeholder="Enter Account Number" />
      </Form.Item>
      <Form.Item label="Issued Date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Reference Number">
        <Input placeholder="Enter Reference Number" />
      </Form.Item>
    </Form>
  );
};

export default Step4Form;