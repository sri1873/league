import { Button, Form, Card, Select, notification, Alert } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
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
  const userId = useSelector((state) => state.user.userId);

  const formRef = React.useRef(null);

  const onSubmit = (values) => {
    console.log(values);
    setFormValues(values);
    base({
      method: "POST",
      url: `api/v1/users/${userId}/bookings?day=${values.day}`,
      data: { arenaId: values.arenaId, slotId: values.slotId },
    }).then((res) => {
      console.log(res);
      openNotification(res.data.data.id);
    });
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };

  const [theDate, setTheDate] = useState(null);
  const [arena, setArena] = useState(null);
  const [availableTimeslotList, setAvailableTimeslotList] = useState([]);
  const [formValues, setFormValues] = useState(null);

  const [arenas, setArenas] = useState([{ bookingId: 1, name: "Loading" }]);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (bookingId = null) => {
    if (!!bookingId) {
      notification.success({
        message: "Booking Successful",
        description: "Booking was successful. Booking Id: " + bookingId,
      });
    } else {
      notification.error({
        message: "Something Went Wrong",
        description:
          "An error occurred. Please try refreshing the page and trying again",
      });
    }
  };

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

  useEffect(() => {
    if (theDate == null || arena == null) return;

    base
      .get(`api/v1/arenas/${arena}/slots?arenaId=${arena}&day=${theDate}`)
      .then((res) => {
        console.log(res);
        setAvailableTimeslotList(res.data?.data);
      });
  }, [arena, theDate]);

  return (
    <Card
      bodyStyle={{
        backgroundColor: "var(--primary-bg)",
        marginTop: "5px",
      }}
    >
      {contextHolder}
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
          name="arenaId"
          label="Facility"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a facility"
            allowClear
            onSelect={setArena}
          >
            {arenas.map((entry, index) => (
              <Option value={entry.id}>{entry.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="day" label="Date" rules={[{ required: true }]}>
          <Select placeholder="When?" onSelect={setTheDate}>
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
          name="slotId"
          hidden={theDate == null || arena == null}
          label="Timeslot"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a Timeslot" allowClear>
            {availableTimeslotList.map(
              (entry, index) =>
                entry.available && (
                  <Option value={entry.id}>{entry.slot}</Option>
                )
            )}
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
      <Alert
        message="Currently, slots already booked by any user CANNOT be re-booked from this page"
        type="info"
      ></Alert>
    </Card>
  );
};
export default AddBooking;
