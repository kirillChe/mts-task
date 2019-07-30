import React, { useEffect, useState }  from 'react';
import { Table, Divider } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        birthDate: '14.01.1983',
        phone: '+79175376087',
        email: 'mts_test1@mts.com',
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        birthDate: '11.03.1970',
        phone: '+79161257785',
        email: 'mts_test2@mts.com',
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        birthDate: '02.02.1902',
        phone: '+79101112536',
        email: 'mts_test3@mts.com',
    },
];



const TableComponent = () => {
    //@todo remove data
    const [users, setUsers] = useState(/*[]*/data);

    async function getUsers () {
        try {
            const response = await axios.get(`/api/users`);
            if (response.status === 200) {
                setUsers(response.data);
            } else {
                console.log('Cannot get users');
            }
        } catch (e) {
            console.log('Cannot get users: ', e);
        }
    }

    async function handleClickEdit (e) {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/users`);
            if (response.status === 200) {
                setUsers(response.data);
            } else {
                console.log('Cannot get users');
            }
        } catch (e) {
            console.log('Cannot get users: ', e);
        }
    }

    async function handleClickDelete (e) {
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/users`);
            if (response.status === 204) {
                setUsers(response.data);
            } else {
                console.log('Cannot get users');
            }
        } catch (e) {
            console.log('Cannot get users: ', e);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthDate',
            key: 'birth',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                <a href="" onClick={handleClickEdit}>Edit</a>
                <Divider type="vertical" />
                <a href="" onClick={handleClickDelete}>Delete</a>
            </span>
            )
        },
    ];

    return (
        <Table dataSource={users} columns={columns} pagination={false} />
        );
};

export default TableComponent;
