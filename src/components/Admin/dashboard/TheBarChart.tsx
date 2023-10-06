// import { BarChart } from "@tremor/react";
// import { BookingByUser, BookingDetails } from "../../../types";

// const TheBarChart: React.FC<{ allBookings: BookingDetails[] }> = ({allBookings}) => {
//   function countBookingsByBranch(): { "User School": string, "Number of Bookings": number }[] {
//     const schools: { [key: string]: number } = {};
//     allBookings.forEach((booking) => {
//       const school: string = booking.userSchool;
      
//       if (school in schools) {
//         schools[school] += 1;
//       } else {
//         schools[school] = 1;
//       }
//     });

//     return Object.keys(schools).map((school) => {
//       return {
//         "User School": school,
//         "Number of Bookings": schools[school],
//       };
//     });
//   }

//   return (
//     <BarChart
//       data={countBookingsByBranch()}
//       dataKey="User School"
//       categories={["Number of Bookings"]}
//       marginTop="mt-6"
//       yAxisWidth="w-12"
//     ></BarChart>
//   );
// };

// export default TheBarChart;
