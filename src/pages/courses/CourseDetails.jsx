import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById,deleteCourseById } from "../../services/courseServices";
import { useNavigate } from "react-router-dom";
function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    getCourseById(courseId)
      .then(response => {
        setCourse(response.course);
      })
      .catch(error => {
        console.error("Error fetching course details:", error.message);
      });
  }, [courseId]);
  const handleDelete = async () => {
    try {
      await deleteCourseById(courseId);
      navigate("/courses");
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };
  if (!course) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 p-4 min-h-screen relative">
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold text-white mb-4">{course.title}</h2>
        <p className="text-white">{course.description}</p>
      </div>
      <Link
        to={`/courses/${courseId}/update`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-32 m-2"
      >
        Update Course
      </Link>
      
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4 m-2"
      >
        Delete Course
      </button>
    </div>
  );
}

export default CourseDetails;
