import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCourseById,
  deleteCourseById,
  getCourseContent,
  updateCourseById,
  purchaseCourseById,
} from "../../services/courseServices";
import { useNavigate } from "react-router-dom";
import {
  createCourseContent,
  getCourseContentByCourseId,
} from "../../services/courseContentServices";
import { useSelector } from "react-redux";
import CourseContentPopup from "./courseContent/CourseContentPopup";
function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const { user } = useSelector((state) => state?.auth);
  const isAdmin = user?.role === "admin";
  const Role = user?.role;
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    getCourseById(courseId)
      .then((response) => {
        setCourse(response.course);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error.message);
      });
  }, [courseId]);

  const handleDelete = async () => {
    try {
      await deleteCourseById(courseId);
      navigate(`/${Role}/courses`);
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      navigate(`/${Role}/courses/${courseId}/update`);
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };
  const handlePurchase = async () => {
    try {
      await purchaseCourseById(userId, courseId );
      navigate(`/${Role}/courses`);
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };
  const handleCreateCourseContent = async () => {
    try {
      navigate(`/${Role}/courses/${courseId}/course-content`);
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

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="bg-white-800 p-4 min-h-screen relative">
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          {course?.title}
        </h2>
        <p className="text-orange-500">{course?.description}</p>
        <button
          onClick={handleContentToggle}
          className="text-orange-900 hover:text-ornage-700 transition duration-300"
        >
          {showContent ? "Hide Course Content" : "Show Course Content"}
        </button>
        {showContent && (
          <div>
            <h3 className="text-orange mt-4">Course Content:</h3>
            <ul className="text-orange">
              {courseContent ? (
                courseContent.map((content, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleContentClick(content)}
                      className="text-orange-500 hover:text-orange-700 transition duration-300"
                    >
                      {content?.title}
                    </button>
                  </li>
                ))
              ) : (
                <div>Loading course content...</div>
              )}
            </ul>
          </div>
        )}
      </div>
      {selectedContent && (
        <CourseContentPopup
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
      {showContent && isAdmin && (
        <button
          className="fixed bottom-4 left-4 bg-orange-500 hover:bg-orange-600
          text-white font-bold py-2 px-4 rounded-full 
          focus:outline-none focus:shadow-outline"
          onClick={handleCreateCourseContent}
        >
          Add New Course content
        </button>
      )}
      {isAdmin && (
        <>
          <button
            onClick={handleUpdate}
            className=" fixed bg-orange-500 hover:bg-orange-600
            text-white font-bold py-2 px-4 rounded-full 
            focus:outline-none focus:shadow-outline absolute bottom-4 right-40 m-2"
          >
            Update Course
          </button>
          <button
            onClick={handleDelete}
            className="fixed bg-orange-500 hover:bg-orange-600
            text-white font-bold py-2 px-4 rounded-full 
            focus:outline-none focus:shadow-outline absolute bottom-4 right-4 m-2"
          >
            Delete Course
          </button>
        </>
      )}
      {!isAdmin && (
        <>
          <button
            onClick={handlePurchase}
            className=" fixed bg-orange-500 hover:bg-orange-600
            text-white font-bold py-2 px-4 rounded-full 
            focus:outline-none focus:shadow-outline absolute top-4 right-4 m-2"
          >
            Buy Course
          </button>
        </>
      )}
    </div>
  );
}

export default CourseDetails;
