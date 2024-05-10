import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import {
  getAllCourses,
  getMyCourseById,
} from "../../services/courseServices.js";
import { useSelector } from "react-redux";

const CourseList = () =>  {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  const isAdmin = user?.role === "admin";
  const userId=user?.id;
  const Role = user?.role;
  const mycourse=location.pathname.endsWith("my-courses")?true:false;
  useEffect(() => {
    console.log("mycourse--",mycourse);
    if (mycourse) {
        getMyCourseById(userId)
        .then((response) => {
          setCourses(response.myCourses);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error.message);
        });
    } else {
      getAllCourses()
      .then((response) => {
        setCourses(response.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error.message);
      });
    }
  }, []);
  const handleCreateCourse = () => {
    navigate(`/${Role}/create-course`);
  };

  return (
    <div className="bg-white-900 p-4 min-h-screen">
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl text-white font-bold mb-8">All Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-orange-500 rounded-lg border-2 border-orange-200 shadow-md overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white font-bold mb-2">
                  {course.title}
                </h2>
                <p className="text-white font-bold">{course.description}</p>
                <Link
                  to={`/${Role}/courses/${course.id}`}
                  className="block mt-2 text-blue-900 hover:text-orange-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
        {isAdmin && (
          <button
            className="fixed bottom-4 right-4 bg-orange-500 hover:bg-orange-600
             text-white font-bold py-2 px-4 rounded-full 
             focus:outline-none focus:shadow-outline"
            onClick={handleCreateCourse}
          >
            Create Course
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseList;
