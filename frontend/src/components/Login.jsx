import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2000/api/auth/login", {
        username:inputs.username,
        password: inputs.password,
      });
      const data = await response.data;
      localStorage.setItem("isLoggedIn", true);

    //   localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true)
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-80 gap-9 mx-auto mt-52 border-8 p-8">
      <h1 className="text-center font-extrabold text-lg">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            value={inputs.username}
            onChange={(e) =>
              setInputs({ ...inputs, username: e.target.value })
            }
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={inputs.password}
            onChange={(e) =>
              setInputs({ ...inputs, password: e.target.value })
            }
            required
          />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Link
          to={"/signup"}
          className="text-sm py-2 hover:underline hover:text-blue-600 mt-2 inline-block"
        >
          {"Don't"} have an account?
        </Link>

        <button type="submit" className="btn btn-info">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
