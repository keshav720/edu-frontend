import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateCourseById } from "../../services/courseServices";
const CourseUpdate = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCourseById(courseId)
      .then((response) => {
        setCourse(response.course);
        setTitle(response.course.title);
        setDescription(response.course.description);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error.message);
      });
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourseById(courseId, { title, description });
      navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error.message);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Update Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default CourseUpdate;