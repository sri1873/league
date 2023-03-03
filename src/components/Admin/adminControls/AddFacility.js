import {
  Radio,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Tag,
  Select,
} from "antd";

import { useEffect, useState } from "react";
import React from "react";

/*TODO
Bind inputs to variables
'Add Timeslot' button should be push the range to an array rather than submitting the entire form
Make a confirmation toast notification?
*/

const AddFacility = () => {
  const [timeRange, setTimeRange] = useState(true);
  const [amount, setAmount] = useState(0);
  const [isFemaleOnly, setIsFemaleOnly] = useState(false);

  const [timeslotList, setTimeslotList] = useState([]);

  const formRef = React.useRef(null);

  const submitForm = (values) => {
    console.log(values);
  };

  function checkTimeRange(_, e1) {
    setTimeRange(formatTime(e1));
  }

  const newItem = {};

  useEffect(() => {
    console.log("timeslotList updated: ", timeslotList);
  }, [timeslotList]);

  function submitTimeSlot() {
    newItem.timeslot = timeRange;

    if (newItem.timeslot === true || newItem.timeslot === "12AM-12AM") return;

    newItem.amount = amount;
    try {
      newItem.isFemaleOnly = isFemaleOnly.target.value;
    } catch (e) {
      newItem.isFemaleOnly = false;
    }

    setTimeslotList((timeslotList) => [...timeslotList, newItem]);
  }

  function formatTime(times) {
    const formattedTimes = times.map((time) => {
      let [hours] = time.split(":");
      let suffix = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // convert to 12-hour format
      return `${hours}${suffix}`;
    });

    return `${formattedTimes[0]}-${formattedTimes[1]}`;
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <main>
      <div className="main-container">
        <Card
          bodyStyle={{
            backgroundColor: "var(--primary-bg)",
            marginTop: "5px",
          }}
        >
          <Card
            bodyStyle={{
              backgroundColor: "var(--primary-bg)",
              border: "1px solid",
            }}
          >
            <Form
              name="timeslot"
              initialValues={{
                amount: 0,
                isFemaleOnly: false,
              }}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please add the timeslot",
                  },
                ]}
                {...layout}
                label="Add timeslots"
                name="timeslot"
              >
                <TimePicker.RangePicker
                  onChange={checkTimeRange}
                  minuteStep={60}
                  secondStep={60}
                ></TimePicker.RangePicker>
              </Form.Item>
              <Form.Item
                label="Cost to book, INR"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please input the amount",
                  },
                ]}
                {...layout}
              >
                <InputNumber
                  onChange={setAmount}
                  min={0}
                  controls={false}
                ></InputNumber>
              </Form.Item>
              <Form.Item
                name="isFemaleOnly"
                label="Only for Females"
                {...layout}
              >
                <Radio.Group onChange={setIsFemaleOnly}>
                  <Radio value={true}> Yes </Radio>
                  <Radio value={false}> No </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Button
                  type="dashed"
                  htmlType="submit"
                  onClick={submitTimeSlot}
                >
                  Add Timeslot
                </Button>
              </Form.Item>
            </Form>
            {timeslotList.map((entry, index) => (
              <Tag color="geekblue">
                {" "}
                {entry.timeslot}, INR {entry.amount}
              </Tag>
            ))}
          </Card>
          <Card bodyStyle={{ backgroundColor: "var(--primary-bg" }}>
            <Form
              onFinish={submitForm}
              ref={formRef}
              name="getFacility"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                label="Name of Facility"
                name="facilityName"
                rules={[
                  {
                    required: true,
                    message: "Please proivde name of the facility",
                  },
                ]}
                {...layout}
              >
                <Input placeholder="Enter name of facility" autoFocus />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please proivde description of the facility",
                  },
                ]}
                {...layout}
              >
                <Input.TextArea placeholder="Enter description of facility" />
              </Form.Item>
              <Form.Item
                label="Facility Type"
                name={"facilityType"}
                rules={[
                  {
                    required: true,
                    message: "Please proivde type of facility",
                  },
                ]}
                {...layout}
              >
                <Select
                  defaultValue={"OUTDOOR"}
                  options={[
                    { value: "OUTDOOR", label: "Outdoors" },
                    { value: "INDOOR", label: "Indoors" },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={timeslotList.length === 0}
                >
                  Add Facility
                </Button>
                {timeslotList.length === 0 && <p>Add at least one timeslot</p>}
              </Form.Item>
            </Form>
          </Card>
        </Card>
      </div>
    </main>
  );
};

export default AddFacility;
