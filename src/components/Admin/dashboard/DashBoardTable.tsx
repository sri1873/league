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
import { BookingDetails } from "../../../types";
interface DashTableProps {
  data: BookingDetails[],
  title: string
}

const DashBoardTable: React.FC<DashTableProps> = ({ data, title }) => {
  return (
    <div style={{
      border: "1px solid black",
      marginBottom: "30px",
      backgroundColor: "var(--primary-bg)",
    }}>
      <Title>{title}</Title>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell textAlignment="text-center">
              Booking ID
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">Arena</TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Timeslot
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-center">
              Phone No.
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.bookingId}>
              <TableCell>{item.bookingId}</TableCell>
              <TableCell>{item.arena}</TableCell>
              <TableCell>{item.slot}</TableCell>
              {/* <TableCell>{item.userPhone}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashBoardTable;
