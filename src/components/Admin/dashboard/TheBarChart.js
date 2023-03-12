import { BarChart } from "@tremor/react";
// import { useEffect } from "react";
// import base from "../../../apis/base";

const TheBarChart = (props) => {
  const activeData = props.data;

  function countBookingsByBranch() {
    const branches = {};
    const bookingsList = activeData;

    bookingsList.forEach((booking) => {
      const branch = booking.userBranch;

      if (branch in branches) {
        branches[branch] += 1;
      } else {
        branches[branch] = 1;
      }
    });

    return Object.keys(branches).map((branch) => {
      return {
        "User Branch": branch,
        "Number of Bookings": branches[branch],
      };
    });
  }

  // useEffect(() => {
  //   async function getArenaList() {
  //     const response = await base.get("api/v1/Schools");
  //     const resJSON = await response.data;
  //   }
  // }, []);

  return (
    <BarChart
      data={countBookingsByBranch()}
      dataKey="User Branch"
      categories={["Number of Bookings"]}
      marginTop="mt-6"
      yAxisWidth="w-12"
    ></BarChart>
  );
};

export default TheBarChart;
