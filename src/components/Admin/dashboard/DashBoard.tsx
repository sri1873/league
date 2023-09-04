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

const chartsDecorationColor: string = "purple";

const Dashboard = () => {
  const [sampleData, setSampleData] = useState<BookingByUser>([]);

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

  const [activeData, setActiveData] = useState<BookingByUser>(sampleData);
  const [activeArena, setActiveArena] = useState<string>("");
  const [dateValue, setDateValue] = useState<Date[]>([
    new Date(2022, 1, 1),
    new Date(),
  ]);

  function dateUpdate(newDate) {
    newDate = setDateValue(newDate);
    entriesInRangeAndArena();
  }

  function arenaUpdate(newArena) {
    setActiveArena(newArena);
    entriesInRangeAndArena();
  }

  useEffect(() => {
    let bookingList = [];

    const getDataFromDB = async () => {
      const data = await base.get("api/v1/arenas");
      const arenaList = await data.data;
      await arenaList.data.map(async (arenaInfo, index) => {
        const bookings = await getBookingsOnArena(arenaInfo);
        if (bookings.length !== 0 && !!bookings.length) {
          bookingList.push(...bookings);
          setSampleData(formatDataFromDB(bookingList));
        }
      });
    };

    const getBookingsOnArena = async (arenaInfo) => {
      const response = await base.get(`api/v1/arenas/${arenaInfo.id}/bookings`);
      return await response.data.data;
    };

    function formatDataFromDB(dataFromDB) {
      const data = [];
      var entryMap;
      dataFromDB.forEach(function (entry, index) {
        entryMap = {
          arena: entry.arena,
          bookingDate: new Date(entry.bookingDate),
          timeslot: formatTimeSlot(entry.slot),
          bookingId: entry.bookingId,
          userPhone: entry.userPhone,
          userSchool: entry.userSchool,
        };
        data.push(entryMap);
      });
      return data;
    }

    getDataFromDB();
  }, []);

  useEffect(() => {
    entriesInRangeAndArena();
    // eslint-disable-next-line
  }, [dateValue, activeArena, sampleData]);
  //Extracts all the entries within the time range
  function entriesInRangeAndArena() {
    var entries = [];
    const fromDate = dateValue[0];
    const toDate = dateValue[1];
    const arena = activeArena;
    var data = sampleData;
    if (!!toDate) {
      data.forEach((entry) => {
        if (
          entry.bookingDate > fromDate &&
          entry.bookingDate <= toDate &&
          (entry.arena === arena || !arena)
        ) {
          entries.push(entry);
        }
      });
    } else {
      data.forEach((entry) => {
        if (
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
  function getUniqueArenas() {
    const bookings = sampleData;
    const uniqueArenas = new Set();
    bookings.forEach((booking) => {
      const arena = booking.arena;
      uniqueArenas.add(arena);
    });
    const result = Array.from(uniqueArenas);
    return result;
  }

  return (
    <div>
      <TodayTomAndDayAfterPreview
        data={sampleData}
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
              <Card maxWidth="max-w-sm" min marginTop="mt-7">
                <DateRangePicker
                  onValueChange={dateUpdate}
                  defaultValue={[
                    new Date(),
                    new Date().setDate(new Date().getDate() + 3),
                  ]}
                ></DateRangePicker>
                <SelectBox
                  value={activeArena}
                  placeholder="Select Arena"
                  onValueChange={arenaUpdate}
                  marginTop="mt-5"
                >
                  <SelectBoxItem value={null} text={"All"}></SelectBoxItem>
                  {getUniqueArenas().map((arena) => (
                    <SelectBoxItem
                      key={arena}
                      value={arena}
                      text={arena}
                    ></SelectBoxItem>
                  ))}
                </SelectBox>
              </Card>
            </Col>
            <Col>
              <Card
                shadow={true}
                decoration="top"
                decorationColor={chartsDecorationColor}
                maxWidth="max-w-lg"
              >
                <Title>Booking Usage by Arena</Title>
                <Divider />
                <TheDonutChart data={activeData}></TheDonutChart>
              </Card>
            </Col>
          </ColGrid>

          <ColGrid numColsMd={2}>
            <Col>
              <Card
                maxWidth="max-w-lg"
                marginTop="mt-16"
                decoration="top"
                decorationColor={chartsDecorationColor}
              >
                <Title>Booking Frequency by Student Course</Title>
                <Divider />
                <TheBarChart data={activeData}></TheBarChart>
              </Card>
            </Col>
            <Col>
              <Card
                maxWidth="max-w-lg"
                marginTop="mt-16"
                decoration="top"
                decorationColor={chartsDecorationColor}
              >
                <Title>Usage by Hour</Title>
                <Divider />
                <TheLineChart data={activeData}></TheLineChart>
              </Card>
            </Col>
          </ColGrid>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Dashboard;
