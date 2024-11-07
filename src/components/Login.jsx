/** @format */

import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { api } from '../axios/index.js';
const Login = () => {
    const [data, setData] = useState();

    const handleChange = (e) => {
        setData((pre) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post('/users/login', data);
        console.log(response.data);
        localStorage.setItem('token', response.data?.token);
        window.location.pathname = '/';
    };

    return (
        <section>
            <form onSubmit={(e) => handleSubmit(e)} className="w-[20%] flex flex-col  gap-5  mx-auto  my-56">
                <h2>Login </h2>
                <Input onChange={(e) => handleChange(e)} label="Phonenumber" name="phonenumber" />
                <Input onChange={(e) => handleChange(e)} label="Password" name="password" />
                <Button type={'submit'}>Send</Button>;
            </form>
        </section>
    );
};

export default Login;
