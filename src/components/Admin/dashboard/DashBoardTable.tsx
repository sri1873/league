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
import { BookingByUser } from "../../../types";
interface DashTableProps {
  data: BookingByUser[],
  title: string
}

const DashBoardTable: React.FC<DashTableProps> = ({ data, title }) => {
  return (
    <div>
      <Title>{title}</Title>
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
          {data.map((item) => (
            <TableRow key={item.bookingId}>
              <TableCell>{item.arena}</TableCell>
              <TableCell>{item.slot}</TableCell>
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
