import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Input, Table, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import base from '../../apis/base'
import { useSelector } from "react-redux";

const Booking = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const [html, setHTML] = useState({ __html: "" });
    const [bookingId, setBookingId] = useState("")

    const [modal, setModal] = useState(false);
    const [extend, setExtend] = useState(false);
    const searchInput = useRef(null);
    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        base.get(`api/v1/users/${userId}/bookings`).then(res => {
            setData(res.data?.data)

        })
    }, [])
    useEffect(() => {
        if (extend)
            base.get(`/api/v1/payu/bookings/${bookingId}/extension/get-payu-button`).then(res => setHTML({ "__html": res.data }))
    }, [extend])

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

        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <a style={{ color: "blue" }} onClick={e => setModal(true)}>Extend</a>
        },
    ];

    const extendSlot = (
        <form class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Extend Slot</h1>
                        <button type="button" class="btn-close" onClick={e => setModal(false)} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {extend ? <p>You will be redirected to payment page. Please Confirm</p> : <p>This slot cannot be extended</p>}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={e => setModal(false)}>Close</button>
                        {extend ? <div dangerouslySetInnerHTML={html} />
                            : <></>}
                    </div>
                </div>
            </div>
        </form>
    )
    const handleClick = (record) => {
        setBookingId(record?.bookingId);
        record.extendable ? setExtend(true) : setExtend(false)
    }
    return (<>
        {modal ? extendSlot : ""}
        <div className="home"><Table columns={columns} dataSource={data} size="middle"
            onRow={(record) => ({
                onClick: event => { handleClick(record) }
            })} /></div>;

    </>);

}
export default Booking;