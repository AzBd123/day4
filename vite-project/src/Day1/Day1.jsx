import React, { useEffect,useState ,useContext} from 'react';
import Counter from './components/Counter';
import Counter1 from './components/Counter1';
import Counter2 from './components/Counter2';
import { ThemeContext } from '../Contexts/ThemeContext';


const Day1 = () => {
  const [count, setCount] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (count === 3) {
      setFade(true);
    } else {
      setFade(false);
    }
  }, [count]);

  const IncreaseCount = () => setCount(count + 1);
  const {theme} = useContext(ThemeContext);
  return (
    <div className={`  flex justify-center items-center h-screen w-screen ${theme.background}`}>
      <Counter count={count} IncreaseCount={IncreaseCount}  fade={fade} />
      <Counter1 count={count} IncreaseCount={IncreaseCount} fade={fade} />
      <Counter2 count={count} IncreaseCount={IncreaseCount} fade={fade} />
    </div>
    
  );
};

export default Day1;