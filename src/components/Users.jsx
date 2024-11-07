
import React, { useEffect, useState } from 'react';
import { api } from '../axios/index.js';

import { Card, CardBody } from '@material-tailwind/react';


function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.get('users?limit=5', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((res) => {
            console.log(res.data);
            setUsers(res.data?.data);
        });
    }, []);
    return (
        <section className="m-10">
            <Card className="h-full w-full">
                <CardBody className="overflow-scroll !px-0 py-2">
                    <table className="w-full min-w-max table-auto">
                        <thead>
                            <tr>
                                <th>Fullname</th>
                                <th>Phonenumber</th>
                                <th>Role</th>
                                <th>Created at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr>
                                        <td> {user.fullname} </td>
                                        <td> {user.phonenumber} </td>
                                        <td> {user.role} </td>
                                        <td> {user.created_at} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </section>
    );
}

export default Users;
