import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../services/authServices";
import {
  setUser,
  setLoading,
  setError,
  setToken,
} from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Reset previous errors
    setLoginError(null);
    setEmailError(null);
    setPasswordError(null);

    const user = { email, password };
    dispatch(setLoading(true));
    login(user)
      .then((response) => {
        dispatch(setToken(response.token));
        dispatch(setUser(response.user));
        dispatch(setLoading(false));
        navigate("/");
      })
      .catch((err) => {
        console.log("error--",err);
        setLoginError(
          err?.message ||
            "Login failed. Please check your credentials."
        );
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="text-white font-bold mb-8">Login to EduApp</div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 w-64 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 w-64 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      {loginError && <p className="text-red-500">{loginError}</p>}
      <p className="mt-4 text-white">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
