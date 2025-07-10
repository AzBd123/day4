import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ThemeContext } from '../../Contexts/ThemeContext';

const Signup = () => {
  const { theme ,isdark } = useContext(ThemeContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [checklist, setChecklist] = useState([false, false, false, false]);
  const [allValid, setAllValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const requirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "At least one uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "At least one lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "At least one number", test: (pw) => /[0-9]/.test(pw) },
  ];

  useEffect(() => {
    const results = requirements.map((req) => req.test(form.password));
    setChecklist(results);
    setAllValid(results.every(Boolean));
  }, [form.password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[A-Za-z ]+$/.test(form.name)) {
      setErrorMsg("Name must only contain letters and spaces.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!allValid) {
      setErrorMsg("Password does not meet all requirements.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    setErrorMsg("Signup successful!");
    setTimeout(() => {
      navigate("/day3/login", { replace: true });
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${theme.background}`}>
      <form
        onSubmit={handleSubmit}
        className={`backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border ${theme.card}`}
      >
        <h2 className={`text-3xl font-bold text-center mb-6 ${theme.text}`}>
          Signup
        </h2>

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
          className={`w-full mb-4 px-4 py-2 rounded-lg border ${theme.border} ${theme.placeholder} ${theme.ring} focus:outline-none`}
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
          className={`w-full mb-4 px-4 py-2 rounded-lg border ${theme.border} ${theme.placeholder} ${theme.ring} focus:outline-none`}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            required
            className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.placeholder} ${theme.ring} focus:outline-none`}
          />
          <span
            className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <ul className="mb-4 text-sm">
          {requirements.map((req, idx) => (
            <li key={idx} className={checklist[idx] ? "text-green-500" : "text-red-500"}>
              {req.label}
            </li>
          ))}
        </ul>

        {errorMsg && (
          <p className={`mb-4 text-center font-medium ${errorMsg.startsWith("Signup") ? "text-green-500" : "text-red-500"}`}>
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className={`w-full py-2 rounded-lg font-semibold transition-all ${theme.button}${  isdark ? 'hover:bg-purple-500' : 'hover:brightness-80'}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
