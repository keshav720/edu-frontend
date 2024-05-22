import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authServices";
import {
  setUser,
  setLoading,
  setError,
  setToken,
} from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Import spinner from react-spinners (optional)
import { ClipLoader } from "react-spinners";

const Login = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state?.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();
  const urlPath = window.location.pathname;
  const isAdminRoute = urlPath.startsWith("/admin");

  const handleLogin = () => {
    // Reset previous errors
    setLoginError(null);
    setEmailError(null);
    setPasswordError(null);

    const user = { email, password };
    dispatch(setLoading(true));
    login(user)
      .then((response) => {
        dispatch(setToken(response?.token));
        dispatch(setUser(response?.user));
        dispatch(setLoading(false));
        const isAdminAccessAllowed = isAdminRoute
          ? response?.user?.role === "admin"
          : true;
        isAdminAccessAllowed
          ? navigate(`/${response?.user?.role}/home`)
          : setLoginError("Only admins can access this page.");
      })
      .catch((err) => {
        console.log("error--", err);
        setLoginError(
          err?.message || "Login failed. Please check your credentials."
        );
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="bg-white-800 min-h-screen flex flex-col items-center justify-center">
      <div className="text-orange-500 font-bold mb-8">Login to EduApp</div>
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
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
      </button>
      {loginError && <p className="text-red-500">{loginError}</p>}
      {!isAdminRoute && (
        <p className="mt-4 text-orange-500">
          Don't have an account?{" "}
          <Link to="/user/signup" className="text-orange-400">
            Sign up
          </Link>
        </p>
      )}
    </div>
  );
};

export default Login;
