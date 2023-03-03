import { Button, Form, Input, Card, Select, DatePicker } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import base from "../../../apis/base";

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

  const onSubmit = (values) => {
    console.log(values);
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };

  const [theDate, setTheDate] = useState("second");

  const [arenas, setArenas] = useState([{ id: 1, name: "hi" }]);

  function getDayFromRelativeString(relativeString) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const now = new Date();
    let dayOffset;

    if (relativeString === "today") {
      dayOffset = 0;
    } else if (relativeString === "tomorrow") {
      dayOffset = 1;
    } else if (relativeString === "dayAfterTomorrow") {
      dayOffset = 2;
    } else {
      throw new Error("Invalid relative string parameter");
    }

    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + dayOffset);

    return daysOfWeek[targetDate.getDay()];
  }

  useEffect(() => {
    base.get("api/v1/arenas").then((res) => {
      setArenas(res.data?.data);
      console.log(res.data?.data);
    });
  }, []);

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
        onFinish={onSubmit}
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
          name="arenaId"
          label="Facility"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a facility" allowClear>
            {arenas.map((entry, index) => (
              <Option value={entry.id}>{entry.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="day" label="Date" rules={[{ required: true }]}>
          <Select placeholder="When?">
            <Option value="today">
              Today, {getDayFromRelativeString("today")}
            </Option>
            <Option value="tomorrow">
              Tomorrow, {getDayFromRelativeString("tomorrow")}
            </Option>
            <Option value="dayAfterTomorrow">
              Day after tomorrow, {getDayFromRelativeString("dayAfterTomorrow")}
            </Option>
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
