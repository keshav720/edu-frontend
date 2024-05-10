import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  deleteCourseContentById,
  getCourseContentById,
} from "../../../services/courseContentServices";
const CourseContentDetails = () => {
  const { contentId } = useParams();
  const [course, setCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCourseContentById(contentId)
      .then((response) => {
        setCourse(response?.course);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error?.message);
      });
  }, [contentId]);

  const handleDelete = async () => {
    try {
      await deleteCourseContentById(contentId);
      navigate("/courses");
    } catch (error) {
      console.error("Error deleting course:", error?.message);
    }
  };
  const handleUpdate = async () => {
    try {
      navigate(`/courses/${courseId}/update`);
    } catch (error) {
      console.error("Error deleting course:", error?.message);
    }
  };
  const handleCreateCourseContent = async () => {
    try {
      navigate(`/courses/${courseId}/course-content`);
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };
  const handleContentToggle = async () => {
    try {
      if (!showContent) {
        const response = await getCourseContentByCourseId(courseId);
        setCourseContent(response.courseContent);
      }
      setShowContent(!showContent);
    } catch (error) {
      console.error("Error fetching course content:", error.message);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 p-4 min-h-screen relative">
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-white mb-4">{course?.title}</h2>
        {course?.image && (
          <img
            src={course?.image}
            alt="Course"
            className="mb-4 rounded-lg shadow-lg"
            style={{ width: "500px", height: "300px" }}
          />
        )}
        <p className="text-white">{course?.description}</p>
        <button
          onClick={handleContentToggle}
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          {showContent ? "Hide Course Content" : "Show Course Content"}
        </button>
        {showContent && (
          <div>
            <h3 className="text-white mt-4">Course Content:</h3>
            <ul className="text-white">
              {courseContent ? (
                courseContent.map((content, index) => (
                  <li key={index}>{content?.title}</li>
                ))
              ) : (
                <div>Loading course content...</div>
              )}
            </ul>
          </div>
        )}
      </div>
      {showContent && (
        <button
          className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCreateCourseContent}
        >
          Add New Course content
        </button>
      )}
      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-32 m-2"
      >
        Update Course
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4 m-2"
      >
        Delete Course
      </button>
    </div>
  );
}

export default CourseContentDetails;
