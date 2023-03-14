import { BarChart } from "@tremor/react";
// import { useEffect } from "react";
// import base from "../../../apis/base";

const TheBarChart = (props) => {
  const activeData = props.data;

  function countBookingsByBranch() {
    const schools = {};
    const bookingsList = activeData;
    bookingsList.forEach((booking) => {
      const school = booking.userSchool;

      if (school in schools) {
        schools[school] += 1;
      } else {
        schools[school] = 1;
      }
    });

    return Object.keys(schools).map((school) => {
      return {
        "User School": school,
        "Number of Bookings": schools[school],
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
      dataKey="User School"
      categories={["Number of Bookings"]}
      marginTop="mt-6"
      yAxisWidth="w-12"
    ></BarChart>
  );
};

export default TheBarChart;
