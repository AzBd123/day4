import { ThemeContext } from "../../Contexts/ThemeContext";

import { useContext } from 'react';


const Counter = ({ count, IncreaseCount  ,fade}) => {
  const{theme} = useContext(ThemeContext);
  return (
    <div className={`  flex justify-center items-center h-1/2 w-1/2  p-4 m-4`}>
      <div className={`${theme.card }  text-center  px-10 py-8 transition-opacity-1000 ${fade ? "opacity-0":"opacity-100"}`}>
        <h2 className={`font-bold text-2xl text-gray-800 mb-6 ${theme.text}`}>
          Count: {count}
        </h2>
        <button
          onClick={IncreaseCount}
          className={`${theme.button} font-semibold text-lg  hover:bg-black hover:text-white  py-2 px-5 `}
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;
