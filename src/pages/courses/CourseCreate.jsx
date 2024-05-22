import React, { useState } from "react";
import { createCourse } from "../../services/courseServices.js";
import { useNavigate } from "react-router-dom";
import {
  setLoading,
} from "../../redux/slices/userSlice.js";
import { ClipLoader } from "react-spinners";
import { useSelector,useDispatch } from "react-redux";
const CourseCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user,loading } = useSelector((state) => state?.auth);
  const Role = user?.role;
  const handleChange = (event) => {
    const { value, name } = event?.target;
    setFormData({ ...formData, [name]: value });
  };
const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    try {
      await createCourse(formData);
      navigate(`/${Role}/courses`);
    } catch (error) {
      console.error("Error creating course:", error.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto mt-8 flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl text-orange-500 font-bold mb-4">
          Create New Course
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-orange-500 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-500 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-orange-500 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-500 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-orange-500 font-bold mb-2"
            >
              Image Upload
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              required
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
            >
              Choose Image
            </label>
            {formData.image && (
              <span className="ml-2">{formData.image.name}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
                {loading ? (
          <ClipLoader size={20} color={"#ffffff"} />
        ) : (
          `Create Course`
        )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseCreate;
