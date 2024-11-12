/** @format */

import React, { useEffect, useState } from 'react';
import { api } from '../axios/index.js';
import {Input , Button} from "@material-tailwind/react"
const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [data, setData] = useState();

    const handleChange = (e) => {
        setData((pre) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    console.log(data);

    // Fetch comments from API
    const getComments = () => {
        api.get(`/comments/${blogId}`).then((res) => {
            console.log(res.data);
            setComments(res.data);
        });
    };


    const postComment =  (e) => {
        e.preventDefault();
        api.post(`/comments`, {...data , blog :blogId }).then((res) => {
            console.log(res.data);
            getComments();
            setData({ text: '' });
        });
    }
    useEffect(() => {
        getComments();
    }, []);

    return (
        <div>
            <hr />
            {comments.map((comment) => (
                <div title={comment.sended} key={comment._id}>
                    <h6 className='opacity-35 text-sm' >{comment.user?.fullname}</h6>
                    <p>{comment.text}</p>
                </div>
            ))}


            <form onSubmit={(e) => postComment(e)}>
                <Input value={data?.text} onChange={handleChange} type="text" name='text' placeholder='Comment yoz' />
                <Button  type="submit" >Yozish</Button>
            </form>
        </div>
    );
};

export default Comments;
