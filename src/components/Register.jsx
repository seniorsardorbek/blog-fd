/** @format */

import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { api } from '../axios/index.js';

const Register = () => {
    const [data, setData] = useState({
        fullname: '',
        phonenumber: '',
        password: '',
        role: 'user',
    });

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/register', data);
            console.log(response.data);
            window.location.pathname = '/login';
        } catch (error) {
            console.error('Registration failed', error);
        }
    };
    return (
        <section className='absolute top-0 left-0  w-full'>
            <form onSubmit={handleSubmit} className="w-[20%]  flex flex-col gap-5 mx-auto my-56">
                <h2>Register</h2>
                <Input onChange={handleChange} label="Full Name" name="fullname" required />
                <Input onChange={handleChange} label="Phone Number" name="phonenumber" required />
                <Input onChange={handleChange} label="Password" name="password" type="password" required />
                <Button type="submit">Register</Button>
            </form>
        </section>
    );
};

export default Register;
