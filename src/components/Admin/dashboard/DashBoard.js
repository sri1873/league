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
  Metric,
  Text,
  Title,
  SelectBox,
  SelectBoxItem,
  Col,
  ColGrid,
} from "@tremor/react";
import "@tremor/react/dist/esm/tremor.css";
import TheBarChart from "./TheBarChart";

import TheDonutChart from "./TheDonutChart";
import TheLineChart from "./TheLineChart";
import { useEffect, useState } from "react";
import "../adminPage.css";

const revenueDecorationColor = "blue";
const chartsDecorationColor = "purple";

const Dashboard = () => {
  const sampleData = [
    {
      id: 1,
      amount: 14000,
      bookingDate: new Date("2022-05-02"),
      arena: "cricket ground",
      timeslot: "09:00:00 - 11:00:00",
      user_id: 5,
    },
    {
      id: 2,
      amount: 600,
      bookingDate: new Date("2022-12-21"),
      arena: "tennis court",
      timeslot: "10:00:00 - 12:00:00",
      user_id: 2,
    },
    {
      id: 3,
      amount: 1200,
      bookingDate: new Date("2023-02-27"),
      arena: "tennis court",
      timeslot: "13:00:00 - 14:30:00",
      user_id: 3,
    },
    {
      id: 4,
      amount: 14000,
      bookingDate: new Date("2023-01-21"),
      arena: "cricket ground",
      timeslot: "16:00:00 - 18:00:00",
      user_id: 2,
    },
    {
      id: 5,
      amount: 100,
      bookingDate: new Date("2023-02-21"),
      arena: "basketball court",
      timeslot: "12:00:00 - 18:00:00",
      user_id: 3,
    },
  ];

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
    entriesInRangeAndArena();
    // eslint-disable-next-line
  }, [dateValue, activeArena]);
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
          entry.bookingDate === fromDate &&
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

  //To show revenue on screen
  function amountSum() {
    var data = activeData;
    var amount = 0;
    data.forEach((entry) => {
      amount += entry.amount;
    });
    return amount;
  }

  return (
    <div>
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

      <Card
        maxWidth="max-w-sm"
        decoration="top"
        marginTop="mt-4"
        decorationColor={revenueDecorationColor}
      >
        <Text>Revenue</Text>
        <Metric>INR {amountSum()}</Metric>
      </Card>
      <ColGrid numColsMd={2}>
        <Col>
          <Card
            maxWidth="max-w-lg"
            marginTop="mt-16"
            decoration="top"
            decorationColor={chartsDecorationColor}
          >
            <Title>Revenue Generated per Facility</Title>
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
            <TheLineChart data={activeData}></TheLineChart>
          </Card>
        </Col>
      </ColGrid>
      <ColGrid numColsLg={1}>
        <Col>
          <Card
            maxWidth="max-w-lg"
            marginTop="mt-16"
            decoration="top"
            decorationColor={chartsDecorationColor}
          >
            <Title>Number of Times the Facility was Booked</Title>
            <TheDonutChart data={activeData}></TheDonutChart>
          </Card>
        </Col>
      </ColGrid>
    </div>
  );
};
export default Dashboard;
