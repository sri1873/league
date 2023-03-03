import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import base from '../../apis/base'
import { useSelector } from "react-redux";

const Booking = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        base.get(`api/v1/users/${userId}/bookings`).then(res => {
            setData(res.data?.data)
        })
    }, [])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
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
            dataIndex: 'bookingId',
            key: 'bookingId',
            width: '30%',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Date',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            width: '20%',
            ...getColumnSearchProps('bookingDate'),
            sorter: {
                compare: (a, b) => a.age - b.age,
                multiple: 1,
            },
        },
        {
            title: 'Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            ...getColumnSearchProps('paymentStatus'),
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