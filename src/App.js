import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Home from "../src/pages/Home";
import CourseList from "./pages/courses/CourseList";
import CourseDetails from "./pages/courses/CourseDetails";
import CourseCreate from "./pages/courses/CourseCreate";
import CourseUpdate from "./pages/courses/CourseUpdate";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = useSelector((state) => state?.auth?.isAuthenticated);

  return (
    <div>
      {isLoggedIn?<Navbar/>:<></>}
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/courses"
          element={isLoggedIn ? <CourseList /> : <Navigate to="/login" />}
        />
        <Route
          path="/courses/:courseId"
          element={isLoggedIn ? <CourseDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-course"
          element={isLoggedIn ? <CourseCreate /> : <Navigate to="/login" />}
        />
        <Route
          path="/courses/:courseId/update"
          element={isLoggedIn ? <CourseUpdate /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
