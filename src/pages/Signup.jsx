// SignUpForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../services/authServices";
import { Link } from "react-router-dom";
import {
  setError,
  setLoading,
  setToken,
  setUser,
} from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    signUp(formData)
      .then((response) => {
        dispatch(setToken(response.token));
        dispatch(setUser(response.user));
        dispatch(setLoading(false));
        navigate("/");
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 max-w-md mx-auto p-8 rounded-lg shadow-lg"
      >
        <div className="text-white font-bold mb-8">SignUp to EduApp</div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            placeholder="Enter your password"
          />
        </div>
        {/* other form fields */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
        <p className="mt-4 text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
