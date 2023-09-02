import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import Highlighter from "react-highlight-words";
import base from "../../apis/base";
import { useSelector } from "react-redux";
import { AuthState, BookingDetails } from "../../types";
import type { ColumnsType, TableProps } from "antd/es/table";

interface BookingRecord {
  title: string;
  dataIndex: string;
  key: string;
  width: string;
}
const Booking = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<BookingDetails[]>([]);
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [html, setHTML] = useState({ __html: "" });
  const [bookingId, setBookingId] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [extend, setExtend] = useState<boolean>(false);
  const searchInput = useRef(null);
  const userId = useSelector((state: AuthState) => state.user.userId);
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
  const columns: ColumnsType<BookingRecord> = [
    {
      title: "Booking Id",
      dataIndex: "bookingId",
      key: "bookingId",
      width: "30%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: "20%",
      ...getColumnSearchProps("bookingDate"),
      sorter: {
        compare: (a: number, b: number) => a.age - b.age,
        multiple: 1,
      },
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
      ...getColumnSearchProps("arena.name"),
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
  const handleClick = (record: BookingRecord) => {
    setBookingId(record?.bookingId);
    record.extendable && record.extended == null
      ? setExtend(true)
      : setExtend(false);
  };
  return (
    <>
      {modal ? extendSlot : ""}
      <div className="home">
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          onRow={(record: BookingRecord) => ({
            onClick: (event) => {
              handleClick(event, record);
            },
          })}
        />
      </div>
      ;
    </>
  );
};
export default Booking;
