import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from 'antd';
import { Input, Table } from "antd";
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import base from "../../apis/base";
import { State } from "../../store";
import { BookingDetails } from "../../types";
import { Tab, TabList } from "@tremor/react";
import BookingsToday from "../Admin/BookingsToday";


type DataIndex = keyof BookingDetails;
const Booking = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<BookingDetails[]>([]);
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [html, setHTML] = useState({ __html: "" });
  const [bookingId, setBookingId] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [extend, setExtend] = useState<boolean>(false);
  const searchInput = useRef<InputRef>(null);
  const userId = useSelector((state: State) => state.auth.user.userId);
  useEffect(() => {
    base.get(`api/v1/users/${userId}/bookings`).then((res) => {
      setData(res.data?.data);
    });
  }, [userId]);

  useEffect(() => {
    if (extend)
      base
        .get(`/api/v1/payu/bookings/${bookingId}/extension/get-payu-button`)
        .then((res) => setHTML({ __html: res.data }));
  }, [extend, bookingId]);

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex,) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<BookingDetails> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]!.toString().toLowerCase().includes((value as string).toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<BookingDetails> = [
    {
      title: "Booking Id",
      dataIndex: "bookingId",
      key: "bookingId",
      width: "30%",
      ...getColumnSearchProps("bookingId"),
    },
    {
      title: "Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: "20%",
      ...getColumnSearchProps("bookingDate"),
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      ...getColumnSearchProps("paymentStatus"),
    },
    {
      title: "Arena",
      dataIndex: "arena",
      key: "arena",
      ...getColumnSearchProps("arena"),
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      ...getColumnSearchProps("slot"),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <button className="extend-btn" onClick={(e) => setModal(true)}>
          Extend
        </button>
      ),
    },
  ];

  const extendSlot = (
    <div className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Extend Slot</h1>
            <button
              type="button"
              className="btn-close"
              onClick={(e) => setModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {extend ? (
              <p>You will be redirected to payment page. Please Confirm</p>
            ) : (
              <p>This slot cannot be extended</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => setModal(false)}
            >
              Close
            </button>
            {extend ? <div dangerouslySetInnerHTML={html} /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
  const handleClick = (record: BookingDetails) => {
    console.log("object")
    setBookingId(record?.bookingId);
    record.extendable && record.extended == null
      ? setExtend(true)
      : setExtend(false);
  };
  const [activeTab, setActiveTab] = useState("bookings");
  return (
    <>
      
      {modal ? extendSlot : ""}
      <div className="home">
        {activeTab==='myBookings'&&<Table
          columns={columns}
          dataSource={data}
          size="middle"
          onRow={(record: BookingDetails) => ({

            onClick: () => {
              handleClick(record);
            },
          })}
        />}
        {activeTab==='bookings'&&<BookingsToday data={data}/>}
      </div>
    </>
  );
};
export default Booking;
