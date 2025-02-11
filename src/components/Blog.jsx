/** @format */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { api } from '../axios/index.js';
import { Carousel } from '@material-tailwind/react';
import Comments from './Comments.jsx';
const Blog = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const getBlog = function (req, res) {
        api.get(`/blogs/${slug}`)
            .then((res) => {
                console.log(res.data);
                setBlog(res.data);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getBlog();
    }, [slug]);

    if (loading) return <Loader />;

    return (
        <div>
            <div className="w-[80%] mx-auto">
                <Carousel className="rounded-xl h-[70vh]">
                    {blog?.images.map((image, index) => (
                        <img alt="image 1" src={`http://localhost:4000/${image}`} className="h-[70vh]  w-full object-cover" />
                    ))}
                </Carousel>
            </div>

            <div className="mx-auto w-[90%]">
                <h1 className="text-2xl font-bold">{blog?.title}</h1>
                <p
                    dangerouslySetInnerHTML={{
                        __html: blog?.blog,
                    }}
                    className="text-gray-600"
                ></p>
                <p className="text-gray-500">Created at: {new Date(blog?.created_at).toLocaleString()}</p>
                <p className="text-gray-500">Author: {blog?.author?.fullname}</p>
                <Comments blogId={blog?._id} />
            </div>
        </div>
    );
};

export default Blog;
