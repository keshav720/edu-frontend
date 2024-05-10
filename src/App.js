import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Home from "../src/pages/Home";
import CourseList from "./pages/courses/CourseList";
import CourseDetails from "./pages/courses/CourseDetails";
import CourseCreate from "./pages/courses/CourseCreate";
import CourseUpdate from "./pages/courses/CourseUpdate";
import Navbar from "./components/Navbar";
import CourseContentCreate from "./pages/courses/courseContent/CourseContentCreate";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
// import CourseContentDetails from "./pages/courses/courseContent/courseContentDetails";

function App() {
  const urlPath = window.location.pathname;
  const isAdminRoute = urlPath.startsWith('/admin');
  const isLoggedIn = useSelector((state) => state?.auth?.isAuthenticated);
  const isAdmin = useSelector((state) => state?.auth?.user?.role === 'admin');

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Navigate to={isAdminRoute ? "/admin" : "/user"} />} />
      {/*<Route path="/" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Navigate to="/user" />} />  */}
      <Route path="/user/*" element={<UserRoutes />} />
    <Route path="/admin/*" element={<AdminRoutes />} />
         </Routes> 
   
  </Router>
  );
}

export default App;
