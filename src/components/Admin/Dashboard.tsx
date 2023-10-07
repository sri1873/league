/* TODO

On load, for convenience, update the format of the data's fields as follows - 
  store the timeslot field in "HH:MM:SS - HH:MM:SS" format
  store the bookingDate as a Date()

tremor (package used for charts) doesn't use css values for colors and takes a string of a color
See https://www.tremor.so/docs/layout/color-palette for more info
In this file, there are only two entries where this is used (the cards)
One
*/

import {
  Card,
  DateRangePicker,
  Title,
  SelectBox,
  SelectBoxItem,
  Col,
  ColGrid,
  Divider,
  DateRangePickerValue,
} from "@tremor/react";
import "@tremor/react/dist/esm/tremor.css";
import base from "../../apis/base";
// import TheBarChart from "./TheBarChart";

import TheDonutChart from "./TheDonutChart";
import TheLineChart from "./TheLineChart";
import { useEffect, useState } from "react";
import "./adminPage.css";
import { Collapse } from "antd";
import { RightCircleFilled } from "@ant-design/icons";
import { BookingByUser, BookingDetails } from "../../types";
import DashBoardTable from "./BookingsToday";
const { Panel } = Collapse;


const Dashboard: React.FC = () => {
  const [allBookings, setAllBookings] = useState<BookingDetails[]>([
    {
      "bookingId": "WOUBK0002120",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 6",
      "slot": "7PM - 8PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002121",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 5",
      "slot": "7PM - 8PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002122",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 6",
      "slot": "9PM - 10PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002123",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 2",
      "slot": "9PM - 10PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002124",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 4",
      "slot": "7PM - 8PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002125",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 4",
      "slot": "6PM - 7PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002126",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 4",
      "slot": "6PM - 7PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002127",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 2",
      "slot": "10PM - 11PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002128",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 5",
      "slot": "8PM - 9PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    },
    {
      "bookingId": "WOUBK0002129",
      "bookingDate": "2023-10-06",
      "arena": "Badminton court 5",
      "slot": "9PM - 10PM",
      "paymentStatus": null,
      "extended": null,
      "extendable": false
    }
  ]);

  const [activeArena, setActiveArena] = useState<string>("");
  const [dateValue, setDateValue] = useState<DateRangePickerValue>([new Date()]);
  console.log(dateValue);


  useEffect(() => {
    base.get("api/v1/bookings/today").then(res => {
      setAllBookings(res.data.data);
    });
  }, [dateValue, activeArena]);

  //Used in SelectBox
  function getUniqueArenas(): string[] {
    const uniqueArenas: Set<string> = new Set();
    allBookings.forEach((booking) => {
      const arena = booking.arena;
      uniqueArenas.add(arena);
    });
    return Array.from(uniqueArenas);
  }

  return (
    <div style={{ padding:'3%'}}>
      <ColGrid numColsMd={2} gapX="gap-x-1" gapY="gap-y-5" >
        <Col>
              <Card maxWidth="max-w-sm" marginTop="mt-7">
                <DateRangePicker
                  onValueChange={e => setDateValue(e)}
                  defaultValue={[
                    new Date()
                  ]}
                ></DateRangePicker>
                <SelectBox
                  value={activeArena}
                  placeholder="Select Arena"
                  onValueChange={e => setActiveArena(e)}
                  marginTop="mt-5"
                >
                  <>
                    <SelectBoxItem value={null} text={"All"}></SelectBoxItem>
                    {getUniqueArenas().map((arena: string) => (
                      <SelectBoxItem key={arena} value={arena} text={arena}></SelectBoxItem>
                    ))}
                  </>
                </SelectBox>
              </Card>
            </Col>
        <Col>
          <Card
            shadow={true}
            decoration="top"
            decorationColor="purple"
            maxWidth="max-w-md"
          >
            <Title>Booking Usage by Arena</Title>
            <Divider />
            <TheDonutChart allBookings={allBookings}></TheDonutChart>
          </Card>
        </Col>
        <Col>
          <Card
            maxWidth="max-w-md"
            decoration="top"
            decorationColor="purple"
          >
            <Title>Booking Frequency by Student Course</Title>
            <Divider />
            {/* <TheBarChart allBookings={allBookings}></TheBarChart> */}
          </Card>
        </Col>
        <Col>
          <Card
            maxWidth="max-w-md"
            decoration="top"
            decorationColor="purple"
          >
            <Title>Usage by Hour</Title>
            <Divider />
            <TheLineChart allBookings={allBookings}></TheLineChart>
          </Card>
        </Col>
      </ColGrid>

    </div>
  );
};

export default Dashboard;
