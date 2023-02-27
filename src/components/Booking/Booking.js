import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import base from '../../apis/base'
// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '2',
//         name: 'Joe Black',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '3',
//         name: 'Jim Green',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//     },
//     {
//         key: '4',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//     },
// ];

const Booking = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId")
        base.get(`api/v1/users/${userId}/bookings`).then(res =>{
            const tempData=[]
            res.data.data.map(booking=>{
                tempData.push({
                    "id":booking.id,
                    "bookingStatus":booking.bookingStatus,
                    "date":booking.date,
                    "arena":booking.arena.name,
                    "slot":booking.slot.slot
                })
            })
            setData(tempData)
        })
    }, [])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,

        }) => (
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
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
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
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Booking Id',
            dataIndex: 'id',
            key: 'id',
            width: '30%',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '20%',
            ...getColumnSearchProps('date'),
            sorter: {
                compare: (a, b) => a.age - b.age,
                multiple: 1,
            },
        },
        {
            title: 'Status',
            dataIndex: 'bookingStatus',
            key: 'bookingStatus',
            ...getColumnSearchProps('bookingStatus'),
        },
        {
            title: 'Arena',
            dataIndex: 'arena',
            key: 'arena',
            ...getColumnSearchProps('arena.name'),
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
            ...getColumnSearchProps('slot'),
        },
    ];
    return <div className="home"><Table columns={columns} dataSource={data} size="middle" /></div>;

}
export default Booking;