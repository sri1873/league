/*

tremor (package used for charts) doesn't use css values for colors and takes a string of a color
See https://www.tremor.so/docs/layout/color-palette for more info
In this file, there are only one entry where this is used (the tab)
One
*/

import { TabList, Tab } from "@tremor/react";
import { useState } from "react";
import AddFacility from "./AddFacility";
import { useEffect } from "react";
import base from "../../apis/base";
import { Link } from "react-router-dom";
import { BookingDetails } from "../../types";
import DashBoardTable from "./BookingsToday";
import Dashboard from "./Dashboard";

const tabSelectColor = "purple";

const AdminControls = () => {
  const [allBookings, setAllBookings] = useState<BookingDetails[]>([]);

  // function formatTimeSlot(slot: string): string {
  //   const times: string[] = slot.split(" - ");
  //   const startTime: string = times[0];
  //   const endTime: string = times[1];

  //   const startParts: string[] = startTime.split(/[T:]/);
  //   const endParts: string[] = endTime.split(/[T:]/);

  //   let startHour: number = parseInt(startParts[0], 10);
  //   const startMin = "00";
  //   const startSec = "00";

  //   let endHour: number = parseInt(endParts[0], 10);
  //   const endMin = "00";
  //   const endSec = "00";

  //   if (startTime.includes("PM") && startHour !== 12) {
  //     startHour += 12;
  //   }

  //   if (endTime.includes("PM") && endHour !== 12) {
  //     endHour += 12;
  //   }

  //   const formattedStartTime: string = `${startHour
  //     .toString()
  //     .padStart(2, "0")}:${startMin}:${startSec}`;
  //   const formattedEndTime: string = `${endHour
  //     .toString()
  //     .padStart(2, "0")}:${endMin}:${endSec}`;

  //   return `${formattedStartTime} - ${formattedEndTime}`;
  // }

  useEffect(() => {
    base.get("api/v1/bookings/today").then(res => {
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

  const [activeTab, setActiveTab] = useState("todayBookings");


  return (
    <main>
      <TabList
        defaultValue={"todayBookings"}
        value={activeTab}
        onValueChange={setActiveTab}
        color={tabSelectColor}
      >
        <Tab text="Today's Bookings" value={"todayBookings"}></Tab>
        <Tab text="Add A New Facility" value={"add facility"}></Tab>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Tab text="Add A New Booking" value={"add booking"}></Tab>
        </Link>
        <Tab text="Statistics" value={"statistics"}></Tab>
      </TabList>

      {activeTab === "todayBookings" && <DashBoardTable data={allBookings} />}
      {activeTab === "add facility" && <AddFacility bookings={allBookings} />}
      {activeTab === "statistics" && <Dashboard />}
    </main>
  );
};

export default AdminControls;
