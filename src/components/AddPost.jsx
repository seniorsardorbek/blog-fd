/** @format */

import React, { useEffect, useState } from 'react';
import { Input, Select, Option, Button } from '@material-tailwind/react';
import { api } from '../axios/index.js';
const AddPost = () => {
    const [data, setData] = useState();
    const [users, setUsers] = useState([]);
    const [image, setImage] = useState([]);

    console.log(users);
    useEffect(() => {
        api.get('/users?limit=5').then((res) => {
            setUsers(res.data?.data);
        });
    }, []);

    const handleImages = (e) => {
        setImage(Array.from(e.target.files)); // Convert FileList to array
    };
    const handleChange = (e) => {
        setData((pre) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        image.forEach((image, index) => {
            formData.append(`images`, image);
        });
        console.log(image);
        // image.forEach((image, index) => {
        //     console.log(image);
        // });
        formData.append('title', data?.title || '');
        formData.append('blog', data?.blog || '');
        formData.append('author', data?.author || '');
        const response = await api.post('/blogs', formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(response.data);
    };
    console.log(image);
    console.log(data);

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className="w-1/2 mx-auto flex  flex-col gap-5">
                <h1>Create blog</h1>
                <Input className="mb-2" required onChange={handleChange} name="title" placeholder="Enter title" label="Enter title" />
                <Input className="mb-2" required onChange={handleChange} name="blog" placeholder="Enter blog text" label="Enter blog text" />
                <select required name="author" onChange={handleChange} label="Select Version">
                    <option>Select author</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.fullname}
                        </option>
                    ))}
                </select>
                <Input onChange={handleImages} name="image" type="file" placeholder="Select images" label="Select images" multiple />
                <Button type="submit">Post </Button>
            </form>
        </div>
    );
};

export default AddPost;
