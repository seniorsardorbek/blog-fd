/** @format */

import React, { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { api } from '../axios/index.js';
import Loader from './Loader.jsx';
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBlogs = function (req, res) {
        api.get('/blogs', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') || '' } })
            .then((res) => {
                console.log(res.data);
                setBlogs(res.data);
            })
            .finally(() => setLoading(false));
    };

    const deleteBlog = (id) => {
        api.delete(`/blogs/${id}`).then((res) => {
            console.log(res.data);
            getBlogs(); // Refresh the blogs after deleting one.
        });
    };

    useEffect(() => {
        getBlogs();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className=" flex  gap-5 px-40 flex-wrap">
            {blogs.map((blog) => (
                
                <Card deleteBlog={deleteBlog}  blog={blog} />
            ))}
        </div>
    );
};

export default Blogs;
