/** @format */

import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Blogs from './components/Blogs.jsx';
import Blog from './components/Blog.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Users from './components/Users.jsx';
import AddBlog from "./components/AddPost.jsx"
import { api } from './axios/index.js';
export default function App() {
    const navigate = useNavigate();
    const [route, setRoute] = useState(window.location.pathname);
    
    useEffect(() => {
        api.get('/users/verify' , {withCredentials : true})
        .then((res) => {
            console.log(res.data);
        })
        
    }, [])
    
    useEffect(() => {
        setRoute(window.location.pathname);
    }, [navigate]);

    return (
        <>
            {route !== '/login' && <Header />}
            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/add" element={<AddBlog />} />
                <Route path="/blogs/:slug" element={<Blog />} />

                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>

            {/* <Hero/>  */}
        </>
    );
}
