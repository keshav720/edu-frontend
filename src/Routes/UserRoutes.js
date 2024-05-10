// UserRoutes.js

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import CourseList from '../pages/courses/CourseList';
import CourseDetails from '../pages/courses/CourseDetails';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import MyCourses from '../pages/courses/MyCourses';
const UserRoutes = () => {
    const isLoggedIn = useSelector((state) => state?.auth?.isAuthenticated);
console.log("isLoggedIn",isLoggedIn);
  return (
    <div>
      {isLoggedIn && <Navbar/>}
    <Routes>
    {!isLoggedIn && (
      <>
        <Route path="/" element={<Navigate to="/user/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </>
    )}
    {isLoggedIn && (
      <>
        <Route path="/" element={<Navigate to="/user/courses" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/my-courses" element={<CourseList />} />

      </>
    )}
  </Routes>
</div>
  );
};

export default UserRoutes;
