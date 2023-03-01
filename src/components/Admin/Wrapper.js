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
import { useEffect, useState } from "react";
import TempNav from "./TempNav";
import TheBarChart from "./TheBarChat";
import TheDonutChart from "./TheDonutChart";
const AdminWrapper = () => {
  // replace arena with arena id?
  const sampleData = [
    {
      id: 1,
      amount: 14000,
      bookingDate: new Date("2022-05-02"),
      arena: "cricket ground",
    },
    {
      id: 2,
      amount: 600,
      bookingDate: new Date("2022-12-21"),
      arena: "tennis court",
    },
    {
      id: 3,
      amount: 1200,
      bookingDate: new Date("2023-02-27"),
      arena: "tennis court",
    },
    {
      id: 4,
      amount: 14000,
      bookingDate: new Date("2023-01-21"),
      arena: "cricket ground",
    },
    {
      id: 4,
      amount: 100,
      bookingDate: new Date("2023-02-21"),
      arena: "basketball court",
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
    <div className="admin-wrapper">
      <TempNav></TempNav>
      <Card maxWidth="max-w-7xl" marginTop="mt-3">
        <Card maxWidth="max-w-sm" marginTop="mt-7">
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
            {getUniqueArenas().map((arena) => (
              <SelectBoxItem
                key={arena}
                value={arena}
                text={arena}
              ></SelectBoxItem>
            ))}
            <SelectBoxItem value={null} text={"All"}></SelectBoxItem>
          </SelectBox>
        </Card>
        <Card maxWidth="max-w-sm" decoration="top" marginTop="mt-4">
          <Text>Revenue</Text>
          <Metric>INR {amountSum()}</Metric>
        </Card>
        <ColGrid numColsMd={2}>
          <Col>
            {!activeArena && (
              <Card
                maxWidth="max-w-lg"
                marginTop="mt-16"
                decoration="top"
                decorationColor="purple"
              >
                <TheBarChart data={activeData}></TheBarChart>
              </Card>
            )}
          </Col>
          <Col>
            <Card
              maxWidth="max-w-lg"
              marginTop="mt-16"
              decoration="top"
              decorationColor="purple"
            >
              <Title>Number of Times the Facility was Booked</Title>
              <TheDonutChart data={activeData}></TheDonutChart>
            </Card>
          </Col>
        </ColGrid>
      </Card>
    </div>
  );
};

export default AdminWrapper;
