import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { getAllCourses } from "../../services/courseServices.js";

function CourseList() {
  const [courses, setCourses] = useState([]);
const navigate=useNavigate();
  useEffect(() => {
    getAllCourses()
      .then(response => {
        setCourses(response.courses);
      })
      .catch(error => {
        console.error("Error fetching financial Snapshot Histories:", error.message);
      });
  }, []);
  const handleCreateCourse = () => {
    navigate("/create-course");
  };
  return (
    <div className="bg-gray-800 p-4 min-h-screen">
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-white mb-8">All Courses</h1>
        <ul>
        {courses?.map((course) => (
            <li key={course?.id} className="mb-4">
              <Link 
                to={`/courses/${course.id}`} 
                className="text-blue-500 hover:text-blue-700 transition duration-300"
              >
                {course?.title}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCreateCourse}
        >
          Create Course
        </button>
      </div>
    </div>
  );
}

export default CourseList;
