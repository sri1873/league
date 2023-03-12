/*

tremor (package used for charts) doesn't use css values for colors and takes a string of a color
See https://www.tremor.so/docs/layout/color-palette for more info
In this file, there are only one entry where this is used (the tab)
One
*/

import { TabList, Tab } from "@tremor/react";
import { useState } from "react";
import AddFacility from "./AddFacility";
import ViewBooking from "./ViewBooking";
import { useEffect } from "react";
import base from "../../../apis/base";
import { Link } from "react-router-dom";

const tabSelectColor = "purple";

const AdminControls = () => {
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
        bookingId: entry.bookingId,
        userPhone: entry.userPhone,
        paymentStatus: entry.paymentStatus,
      };
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
      const response = await base.get(
        `api/v1/arenas/${arenaInfo.id}/bookings?arenaId=${arenaInfo.id}`
      );
      return await response.data.data;
    };

    getDataFromDB();
  }, []);

  const [activeTab, setActiveTab] = useState("view booking");

  // useEffect(() => {
  //   if (activeTab === "add booking") {
  //   }
  // }, [third]);

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
        <Link to="/" style={{ textDecoration: "none" }}>
          <Tab text="Add A New Booking" value={"add booking"}></Tab>
        </Link>
      </TabList>
      {activeTab === "view booking" && (
        <ViewBooking data={sampleData}></ViewBooking>
      )}
      {activeTab === "add facility" && <AddFacility data={sampleData} />}
    </main>
  );
};

export default AdminControls;
