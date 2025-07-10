import { Link } from 'react-router-dom';
import { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

const Modal = ({ show, onClose, setShowModal }) => {
  const { theme } = useContext(ThemeContext);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowModal]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`rounded-lg p-6 w-[300px] space-y-4 text-center shadow-xl ${theme.card}`}
      >
        <h2 className={`text-xl font-bold ${theme.text}`}>Navigate To</h2>

        <div className="flex flex-col gap-3">
          <Link to="/" onClick={onClose} className={`${theme.text} hover:underline`}>
            Home
          </Link>
          <Link to="/day1" onClick={onClose} className={`${theme.text} hover:underline`}>
            Day 1
          </Link>
          <Link to="/day2" onClick={onClose} className={`${theme.text} hover:underline`}>
            Day 2
          </Link>
          <Link to="/day3" onClick={onClose} className={`${theme.text} hover:underline`}>
            Day 3
          </Link>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-red-500 hover:text-red-700 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
