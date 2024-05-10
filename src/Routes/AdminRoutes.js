// AdminRoutes.js

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";                     
import Login from "../pages/Login";
import CourseList from "../pages/courses/CourseList";
import CourseDetails from "../pages/courses/CourseDetails";
import CourseCreate from "../pages/courses/CourseCreate";
import CourseUpdate from "../pages/courses/CourseUpdate";
import Navbar from "../components/Navbar";
import CourseContentCreate from "../pages/courses/courseContent/CourseContentCreate";

const AdminRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state?.auth);
  const isAdmin = user?.role === "admin";

  return (
    <div>
      {isAuthenticated && <Navbar/>}
    <Routes>
      {!isAuthenticated && (
        <>
          <Route path="/" element={<Navigate to="/admin/login" />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
      {/* Protected routes accessible only if the user is authenticated and is an admin */}
      {isAuthenticated && isAdmin && (
        <>
                <Route path="/" element={<Navigate to="/admin/courses" />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/create-course" element={<CourseCreate />} />
          <Route path="/courses/:courseId/update" element={<CourseUpdate />} />
          <Route path="/courses/:courseId/course-content" element={<CourseContentCreate />} />

        </>
      )}
    </Routes>
    </div>
  );
};

export default AdminRoutes;
