import React, { useEffect, useState }  from 'react';
import { Table, Divider, message } from 'antd';
import axios from 'axios';
import { Dialog } from 'components';

require('antd/lib/table/style/css');
require('antd/lib/divider/style/css');
require('antd/lib/button/style/css');
require('antd/lib/message/style/css');

const TableComponent = () => {
    const [users, setUsers] = useState([]);

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

    async function handleClickAdd ({data}) {
        try {
            await axios.post(`/api/users`, data);
            getUsers();
        } catch (e) {
            console.log('Cannot add user: ', e);
            message.error('Что-то пошло не так');
        }
    }

    async function handleClickEdit ({data, userId}) {
        try {
            await axios.put(`/api/users/${userId}`, data);
            getUsers();
        } catch (e) {
            console.log('Cannot update user: ', e);
            message.error('Что-то пошло не так');
        }
    }

    const handleClickDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/users/${e.target.id}`);
            getUsers();
        } catch (err) {
            console.log('Cannot get users: ', err);
            message.error('Что-то пошло не так');
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '15%',
            render: (text, record) => {
                return (<img src={record.avatar} alt={"user avatar"} />);
            }
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: '15%'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: '15%'
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthDate',
            key: 'birth',
            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '15%'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            width: '15%'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Dialog user={record} modalText={'Edit user'} buttonName={'Edit'} handleSubmit={handleClickEdit}/>
                        <Divider type="vertical" />
                        <a href="" id={record.id} onClick={handleClickDelete}>
                            Delete
                        </a>
                    </span>
                )
            }
        },
    ];

    return (
        <div>
            <Dialog modalText={'Add user'} buttonName={'Add user'} isButton={true} handleSubmit={handleClickAdd}/>
            <Table dataSource={users} columns={columns} pagination={false} />
        </div>
        );
};

export default TableComponent;
