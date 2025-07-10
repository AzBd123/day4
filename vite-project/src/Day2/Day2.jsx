import React, { useEffect, useState, useContext } from 'react';
import Validation from './componenes/Validate';
import { Sun, Moon } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { ThemeContext } from '../Contexts/ThemeContext';

const Day2 = () => {
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const { theme } = useContext(ThemeContext);

  const requirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "At least one uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "At least one lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "At least one number", test: (pw) => /[0-9]/.test(pw) },
  ];

  const [checklist, setChecklist] = useState([false, false, false, false]);
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    const results = requirements.map((req) => req.test(password));
    setChecklist(results);
    setAllValid(results.every(Boolean));
  }, [password]);

  return (
    <div className={`${theme.background} relative h-screen w-screen flex justify-center items-center transition-colors duration-500`}>
      <div className={`${theme.card} h-[450px] w-1/4 mr-5 p-4 border-2 rounded-lg shadow-lg`}>
        <h2 className={`text-3xl font-bold text-center ${theme.text}`}>
          Password Validation
        </h2>

        <div className='mt-10 flex flex-col items-center'>
          <div className="relative w-full">
            <input
              className={`px-10 py-3 rounded-lg border transition-all duration-300 w-full ${theme.background} ${theme.text} ${theme.placeholder} ${theme.border} ${theme.ring}`}
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!touched) setTouched(true);
              }}
              placeholder='Enter your password'
            />

            {show ? (
              <EyeOff 
                strokeWidth={1.25} 
                className={`absolute right-4 top-3.5 cursor-pointer ${theme.text}`}
                onClick={() => setShow(false)}
              />
            ) : (
              <Eye 
                strokeWidth={1.25} 
                className={`absolute right-4 top-3.5 cursor-pointer ${theme.text}`}
                onClick={() => setShow(true)}
              />
            )}
          </div> 

          <button 
            className={`${theme.button} px-3 py-3 mt-10 cursor-pointer border-2 border-gray-500 rounded-lg shadow-lg `}
            onClick={() => setSubmit(true)}
          >
            Submit
          </button>

          {touched && (
            <ul className='mt-6 text-lg text-left'>
              {requirements.map((req, idx) => (
                <li 
                  key={idx} 
                  className={`mb-1 font-semibold ${checklist[idx] ? "text-green-300" : 'text-red-400'}`}
                >
                  {req.label}
                </li>
              ))}
            </ul>
          )}

          {submit && allValid && (
            <p className={`mt-4 font-semibold ${theme.text}`}>
              Password is valid!
            </p>
          )}
          {submit && !allValid && (
            <p className='mt-4 font-semibold text-red-500'>Password is invalid!</p>
          )}
        </div>
      </div>

      <Validation />
    </div>
  );
};

export default Day2;
