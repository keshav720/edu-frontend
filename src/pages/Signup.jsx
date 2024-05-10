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

const Signup= () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState(null);

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
        setSignupError(error.message);
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="bg-white-800 min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white-400 max-w-md mx-auto p-8 rounded-lg shadow-lg"
      >
        <div className="text-orange-500 font-bold mb-8">SignUp to EduApp</div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-orange-500 font-bold mb-2">
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
          <label htmlFor="email" className="block text-orange-500 font-bold mb-2">
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
          <label htmlFor="password" className="block text-orange-500 font-bold mb-2">
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
                {signupError && <p className="text-red-500 mb-4">{signupError}</p>} {/* Display error message */}

        {/* other form fields */}
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-800 text-white-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
        <p className="mt-4 text-orange-500">
          Already have an account?{" "}
          <Link to="/user/login" className="text-orange-800">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
