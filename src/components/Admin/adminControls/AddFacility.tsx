import {
  Button,
  Card,
  Form,
  Input,
  TimePicker,
  Tag,
  Select,
  notification,
} from "antd";

import { useEffect, useState } from "react";
import React from "react";
import base from "../../../apis/base";
import { BookingByUser } from "../../../types";

/*TODO
Bind inputs to variables
'Add Timeslot' button should be push the range to an array rather than submitting the entire form
Make a confirmation toast notification?
*/

const AddFacility: React.FC<{bookings: BookingByUser[]}> = ({bookings}) => {
  const [timeRange, setTimeRange] = useState<boolean>(true);

  const [timeslotList, setTimeslotList] = useState([]);

  const formRef = React.useRef(null);

  /*
    The function below adds the arena first
    Then, retrieves every slot in the database
    Then, compares to the input timeslot list
    If the slot is not there, it creates it and then adds the slot to the arena
    If it is there, it uses the existing id to link the arena and slot
    */
  const submitForm = async (values) => {
    console.log(values);
    console.log(timeslotList);
    const response = await base({
      method: "POST",
      url: "api/v1/arenas",
      data: {
        name: values.facilityName,
        arenaType: values.facilityType,
        description: values.description,
      },
    });
    const resJSON = await response.data.data;

    notification.success({
      message: "Arena Successfully Added",
      description: "Arena created with ID = " + resJSON.id,
      placement: "bottom",
    });

    console.log(resJSON);

    const existingTimesSlotsResponse = await base.get("api/v1/slots");
    var existingTimesSlotsData = await existingTimesSlotsResponse.data.data;
    console.log(existingTimesSlotsData);

    const matchingSlots = timeslotList.map((obj) => obj.timeslot);
    console.log(matchingSlots);
    const existingTimesSlotsDataFiltered = await existingTimesSlotsData.filter(
      (obj) => matchingSlots.includes(obj.slot)
    );
    var uniqueTimeSlots = existingTimesSlotsDataFiltered.map((obj) => obj.slot);
    uniqueTimeSlots = matchingSlots.filter(
      (obj) => !uniqueTimeSlots.includes(obj)
    );
    console.log(uniqueTimeSlots);
    console.log(await existingTimesSlotsDataFiltered);

    for (const timeSlot of existingTimesSlotsDataFiltered) {
      base({
        method: "POST",
        url: `api/v1/arenas/${resJSON.id}/slots/${timeSlot.id}`,
        data: { daysForWomen: 0 }, //TODO temporary data
      });
    }
    for (const timeSlot of uniqueTimeSlots) {
      base({
        method: "POST",
        url: `api/v1/slots`,
        data: {
          slotName: timeSlot,
          slotStartTime: convertTimeToDBFormat(timeSlot),
        },
      }).then((res) => {
        base({
          method: "POST",
          url: `api/v1/arenas/${resJSON.id}/slots/${res.data.data.id}`,
        });
      });
    }
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

    setTimeslotList((timeslotList) => [...timeslotList, newItem]);
  }

  function formatTime(times) {
    const formattedTimes = times.map((time) => {
      let [hours] = time.split(":");
      let suffix = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // convert to 12-hour format
      return `${hours}${suffix}`;
    });

    return `${formattedTimes[0]} - ${formattedTimes[1]}`;
  }
  function convertTimeToDBFormat(timeslot) {
    const parts = timeslot.split(" - ");
    const startTime = parts[0];
    let [hour, period] = startTime.split(/[T ]/);
    if (hour.length === 3) {
      console.log("here");
      hour = "0" + hour;
    }
    console.log(hour);
    period = hour.substring(2, 4);
    console.log(period);
    if (period === "PM" && hour !== "12") {
      hour = parseInt(hour, 10) + 12;
    } else if (period === "AM" && hour === "12") {
      hour = "00";
    }
    if (hour === "24") {
      hour = "00";
    }
    return `${hour}:00:00`.replace(/\s*(AM|PM)\s*/i, "");
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
              maxWidth: "500px",
            }}
          >
            <Form
              name="timeslot"
              initialValues={{
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
              <Tag color="blue"> {entry.timeslot}</Tag>
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
              initialValues={{ facilityType: "OUTDOOR" }}
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
                {timeslotList.length === 0 && (
                  <p style={{ color: "var(--error-text)" }}>
                    Add at least one timeslot
                  </p>
                )}
              </Form.Item>
            </Form>
          </Card>
        </Card>
      </div>
    </main>
  );
};

export default AddFacility;
