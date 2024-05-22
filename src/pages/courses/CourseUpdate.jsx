import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateCourseById } from "../../services/courseServices";
import { useSelector,useDispatch } from "react-redux";
import {
  setLoading,
} from "../../redux/slices/userSlice.js";
import { ClipLoader } from "react-spinners";
const CourseUpdate = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {  user,loading } = useSelector((state) => state?.auth);
  const isAdmin = user?.role === 'admin';
  const Role = user?.role ;
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
    dispatch(setLoading(true));
    e.preventDefault();
    try {
      await updateCourseById(courseId, { title, description });
      navigate(`/${Role}/courses/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8 flex justify-center">
      <h1 className="text-3xl text-orange-500 font-bold mb-4">Update Course</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
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
          className="bg-orange-500 hover:bg-orange-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
             {loading ? (
          <ClipLoader size={20} color={"#ffffff"} />
        ) : (
          `Update Course`
        )}
        </button>
      </form>
    </div>
  );
};

export default CourseUpdate;
