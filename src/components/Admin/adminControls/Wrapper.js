/*

tremor (package used for charts) doesn't use css values for colors and takes a string of a color
See https://www.tremor.so/docs/layout/color-palette for more info
In this file, there are only one entry where this is used (the tab)
One
*/

import { TabList, Tab } from "@tremor/react";
import { useState } from "react";
import AddBooking from "./AddBooking";
import AddFacility from "./AddFacility";
import ViewBooking from "./ViewBooking";

const tabSelectColor = "purple";

const AdminControls = () => {
  const sampleData = [
    {
      id: 1,
      amount: 14000,
      bookingDate: new Date("2022-05-02"),
      arena: "cricket ground",
      timeslot: "09:00:00 - 11:00:00",
      name: "Harsh Morayya",
      userId: 5,
    },
    {
      id: 2,
      amount: 600,
      bookingDate: new Date("2022-12-21"),
      arena: "tennis court",
      timeslot: "10:00:00 - 12:00:00",
      name: "Placeholder name",
      userId: 2,
    },
    {
      id: 3,
      amount: 1200,
      bookingDate: new Date("2023-02-27"),
      arena: "tennis court",
      timeslot: "13:00:00 - 14:30:00",
      name: "Some name",
      userId: 3,
    },
    {
      id: 4,
      amount: 14000,
      bookingDate: new Date("2023-12-21"),
      arena: "cricket ground",
      timeslot: "16:00:00 - 18:00:00",
      name: "Hi there",
      userId: 2,
    },
    {
      id: 5,
      amount: 100,
      bookingDate: new Date("2023-02-21"),
      arena: "basketball court",
      timeslot: "12:00:00 - 18:00:00",
      name: "A name",
      userId: 3,
    },
  ];

  const [activeTab, setActiveTab] = useState("view booking");

  return (
    <main>
      <TabList
        defaultValue={"view booking"}
        value={activeTab}
        onValueChange={setActiveTab}
        color={tabSelectColor}
      >
        <Tab text="View All Bookings" value={"view booking"}></Tab>
        <Tab text="Add A New Facility" value={"add facility"}></Tab>
        <Tab text="Add A New Booking" value={"add booking"}></Tab>
      </TabList>
      {activeTab === "view booking" && (
        <ViewBooking data={sampleData}></ViewBooking>
      )}
      {activeTab === "add facility" && <AddFacility data={sampleData} />}
      {activeTab === "add booking" && (
        <AddBooking data={sampleData}></AddBooking>
      )}
    </main>
  );
};

export default AdminControls;
