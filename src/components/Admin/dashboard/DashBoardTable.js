import {
  Title,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Divider,
} from "@tremor/react";

const DashBoardTable = (props) => {
  return (
    <div>
      <Title>{props.title}</Title>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell textAlignment="text-center">Arena</TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Timeslot
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Booking ID
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Phone No.
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((item) => (
            <TableRow key={item.bookingId}>
              <TableCell>{item.arena}</TableCell>
              <TableCell>{item.timeslot}</TableCell>
              <TableCell>{item.bookingId}</TableCell>
              <TableCell>{item.userPhone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashBoardTable;
