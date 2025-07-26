import React, { useContext, useState } from 'react';
import { ProfileContext } from '../Context/Profilecontext';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { theme ,isdark } = useContext(ThemeContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setuser, setisAuthentication } = useContext(ProfileContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storeuser = JSON.parse(localStorage.getItem('user'));

    if (!storeuser) {
      setErrorMsg("No user found. Redirecting to signup...");
      setSuccessMsg("");
      setTimeout(() => {
        navigate("/day3/signup");
      }, 2500);
      return;
    }

    if (storeuser.email === email && storeuser.password === password) {
      setuser(storeuser);
      setisAuthentication(true);
      setErrorMsg("");
      setSuccessMsg("Login successful!");
      setTimeout(() => {
        navigate("/day3/shop");
      }, 1200);
    } else {
      setErrorMsg("Wrong email or password.");
      setSuccessMsg("");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${theme.background}`}>
      <form
        onSubmit={handleLogin}
        className={`backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border ${theme.card}`}
      >
        <h2 className={`text-3xl font-bold text-center mb-6 ${theme.text}`}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className={`w-full mb-4 px-4 py-2 rounded-lg border ${theme.border} ${theme.placeholder} ${theme.ring} focus:outline-none`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.placeholder} ${theme.ring} focus:outline-none`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errorMsg && (
          <p className="text-center text-red-500 font-semibold mb-4">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-center text-green-500 font-semibold mb-4">{successMsg}</p>
        )}

        <button
          type="submit"
          className={`${theme.button} w-full py-2 rounded-lg font-semibold  transition-all duration-200 ${ isdark ? 'hover:bg-purple-500' : 'hover:brightness-80'}`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
