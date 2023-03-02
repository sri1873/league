import { Button, Form, Input, Card, Select } from "antd";
import React from "react";

/* TODO
Bind input values to Variables
Provide a list of available Facilities
Provide a list of available timeslot for the selected facility
Make a confirmation toast notification?
*/

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;

const AddBooking = () => {
  const formRef = React.useRef(null);

  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Card
      bodyStyle={{
        backgroundColor: "var(--primary-bg)",
        marginTop: "5px",
      }}
    >
      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="name"
          label="Name of user"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="facility"
          label="Facility"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a facility" allowClear>
            <Option value="cricket ground">Cricket Ground</Option>
            <Option value="basketball court">Basketball Court</Option>
            <Option value="tennis court">Tennis Court</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="timeslot"
          label="Timeslot"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a Timeslot" allowClear>
            <Option value="21:00:00 - 22:00:00">21:00:00 - 22:00:00</Option>
            <Option value="20:00:00 - 21:00:00">20:00:00 - 21:00:00</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default AddBooking;
