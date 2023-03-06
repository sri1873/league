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

const chartsDecorationColor = "purple";

const Dashboard = () => {
  const [sampleData, setSampleData] = useState([]);

  function formatDataFromDB(dataFromDB) {
    const data = [];
    var entryMap;
    dataFromDB.forEach(function (entry, index) {
      entryMap = {
        arena: entry.arena,
        bookingDate: new Date(entry.bookingDate),
        timeslot: formatTimeSlot(entry.slot),
        userBranch: entry.userBranch,
      };
      console.log(entryMap);
      data.push(entryMap);
    });
    return data;
  }

  function formatTimeSlot(slot) {
    const times = slot.split(" - ");
    const startTime = times[0];
    const endTime = times[1];

    const startParts = startTime.split(/[T:]/);
    const endParts = endTime.split(/[T:]/);

    let startHour = parseInt(startParts[0], 10);
    const startMin = "00";
    const startSec = "00";

    let endHour = parseInt(endParts[0], 10);
    const endMin = "00";
    const endSec = "00";

    if (startTime.includes("PM") && startHour !== 12) {
      startHour += 12;
    }

    if (endTime.includes("PM") && endHour !== 12) {
      endHour += 12;
    }

    const formattedStartTime = `${startHour
      .toString()
      .padStart(2, "0")}:${startMin}:${startSec}`;
    const formattedEndTime = `${endHour
      .toString()
      .padStart(2, "0")}:${endMin}:${endSec}`;

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  const [activeData, setActiveData] = useState(sampleData);
  const [activeArena, setActiveArena] = useState(null);
  const [dateValue, setDateValue] = useState([
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

      console.log(arenaList.data);

      await arenaList.data.map(async (arenaInfo, index) => {
        const bookings = await getBookingsOnArena(arenaInfo);
        if (bookings.length !== 0 && !!bookings.length) {
          bookingList.push(...bookings);
          console.log("Booking List ====>>>");
          console.log(bookingList);
          setSampleData(formatDataFromDB(bookingList));
          console.log(sampleData);
        }
      });
    };

    const getBookingsOnArena = async (arenaInfo) => {
      const response = await base.get(
        `api/v1/arenas/${arenaInfo.id}/bookings?arenaId=${arenaInfo.id}`
      );
      return await response.data.data;
    };

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
      <ColGrid numColsMd={2}>
        <Col>
          <Card maxWidth="max-w-sm" min marginTop="mt-7">
            <DateRangePicker
              value={dateValue}
              onValueChange={dateUpdate}
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
            <Title>Booking Count by Arena</Title>
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
            <Title>Booking Frequency by Branch</Title>
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
            <Title>Frequency of Timeslot getting Booked</Title>
            <Divider />
            <TheLineChart data={activeData}></TheLineChart>
          </Card>
        </Col>
      </ColGrid>
    </div>
  );
};

export default Dashboard;
