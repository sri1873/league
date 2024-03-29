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
import base from "../../../apis/base";
import TheBarChart from "./TheBarChart";

import TheDonutChart from "./TheDonutChart";
import TheLineChart from "./TheLineChart";
import { useEffect, useState } from "react";
import "../adminPage.css";
import TodayTomAndDayAfterPreview from "./TodayTomAndDayAfterPreview";
import { Collapse } from "antd";
import { RightCircleFilled } from "@ant-design/icons";
import { BookingByUser } from "../../../types";
const { Panel } = Collapse;

const threedayspan = new Date();
threedayspan.setDate(threedayspan.getDate() + 3);

const Dashboard: React.FC = () => {
  const [allBookings, setAllBookings] = useState<BookingByUser[]>([]);


  function formatTimeSlot(slot: string): string {
    const times: string[] = slot.split(" - ");
    const startTime: string = times[0];
    const endTime: string = times[1];

    const startParts: string[] = startTime.split(/[T:]/);
    const endParts: string[] = endTime.split(/[T:]/);

    let startHour: number = parseInt(startParts[0], 10);
    const startMin: string = "00";
    const startSec: string = "00";

    let endHour: number = parseInt(endParts[0], 10);
    const endMin: string = "00";
    const endSec: string = "00";

    if (startTime.includes("PM") && startHour !== 12) {
      startHour += 12;
    }

    if (endTime.includes("PM") && endHour !== 12) {
      endHour += 12;
    }

    const formattedStartTime: string = `${startHour
      .toString()
      .padStart(2, "0")}:${startMin}:${startSec}`;
    const formattedEndTime: string = `${endHour
      .toString()
      .padStart(2, "0")}:${endMin}:${endSec}`;

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  const [activeData, setActiveData] = useState<BookingByUser[]>(allBookings);
  const [activeArena, setActiveArena] = useState<string>("");
  const [dateValue, setDateValue] = useState<DateRangePickerValue>([new Date(), threedayspan]);

  function dateUpdate(newDate: DateRangePickerValue): void {
    setDateValue(newDate);
    entriesInRangeAndArena();
  }

  function arenaUpdate(newArena: string): void {
    setActiveArena(newArena);
    entriesInRangeAndArena();
  }
  useEffect(() => {
    base.get("api/v1/bookings").then(res => {
      setAllBookings(res.data.data);
    });

    // function formatDataFromDB(dataFromDB) {
    //   const data = [];
    //   var entryMap;
    //   dataFromDB.forEach(function (entry, index) {
    //     entryMap = {
    //       arena: entry.arena,
    //       bookingDate: new Date(entry.bookingDate),
    //       timeslot: formatTimeSlot(entry.slot),
    //       userSchool: entry.userSchool,
    //       bookingId: entry.bookingId,
    //       userPhone: entry.userPhone,
    //       paymentStatus: entry.paymentStatus,
    //     };
    //     data.push(entryMap);
    //   });
    //   return data;
    // }
  }, []);

  useEffect(() => {
    entriesInRangeAndArena();
    // eslint-disable-next-line
  }, [dateValue, activeArena, allBookings]);
  //Extracts all the entries within the time range
  function entriesInRangeAndArena(): BookingByUser[] {
    var entries: BookingByUser[] = [];
    const fromDate = dateValue[0];
    const toDate = dateValue[1];
    const arena = activeArena;
    var data = allBookings;
    if (!!toDate) {
      data.forEach((entry) => {
        if (fromDate) if (
          entry.bookingDate > fromDate &&
          entry.bookingDate <= toDate &&
          (entry.arena === arena || !arena)
        )
          entries.push(entry);

      });
    } else {
      data.forEach((entry) => {
        if (fromDate) if (
          entry.bookingDate.getDate() === fromDate.getDate() &&
          entry.bookingDate.getMonth() === fromDate.getMonth() &&
          entry.bookingDate.getFullYear() === fromDate.getFullYear() &&
          (entry.arena === arena || !arena)
        ) {
          entries.push(entry);
        }
      });
    }
    setActiveData(entries);
    return entries;
  }

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
    <div>
      <TodayTomAndDayAfterPreview
        allBookings={allBookings}
      ></TodayTomAndDayAfterPreview>
      <Collapse
        size="large"
        expandIcon={({ isActive }) => (
          <RightCircleFilled rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel key={1} header="More Statistics">
          <ColGrid numColsMd={2}>
            <Col>
              <Card maxWidth="max-w-sm" marginTop="mt-7">
                <DateRangePicker
                  onValueChange={dateUpdate}
                  defaultValue={[
                    new Date(),
                    threedayspan,
                  ]}
                ></DateRangePicker>
                <SelectBox
                  value={activeArena}
                  placeholder="Select Arena"
                  onValueChange={arenaUpdate}
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
                maxWidth="max-w-lg"
              >
                <Title>Booking Usage by Arena</Title>
                <Divider />
                <TheDonutChart allBookings={activeData}></TheDonutChart>
              </Card>
            </Col>
          </ColGrid>

          <ColGrid numColsMd={2}>
            <Col>
              <Card
                maxWidth="max-w-lg"
                marginTop="mt-16"
                decoration="top"
                decorationColor="purple"
              >
                <Title>Booking Frequency by Student Course</Title>
                <Divider />
                <TheBarChart allBookings={activeData}></TheBarChart>
              </Card>
            </Col>
            <Col>
              <Card
                maxWidth="max-w-lg"
                marginTop="mt-16"
                decoration="top"
                decorationColor="purple"
              >
                <Title>Usage by Hour</Title>
                <Divider />
                <TheLineChart allBookings={activeData}></TheLineChart>
              </Card>
            </Col>
          </ColGrid>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Dashboard;
