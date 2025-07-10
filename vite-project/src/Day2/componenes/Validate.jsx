import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';

const Validations = () => {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!/^[A-Za-z ]+$/.test(name)) return setErrorMsg("Name must contain only valid characters");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErrorMsg("Email must be valid");
    if (!/^[A-Za-z ]+$/.test(country)) return setErrorMsg("Country must contain only letters");
    if (!/^[A-Za-z ]+$/.test(city)) return setErrorMsg("City must contain only letters");
    if (!/^[A-Za-z0-9 ,.]+$/.test(address)) return setErrorMsg("Address contains invalid characters");
    if (!/^\d{7,15}$/.test(phone)) return setErrorMsg("Phone must be 7–15 digits");

    setErrorMsg("All inputs are valid!");
  };

  const inputStyle = `${theme.background} ${theme.text} ${theme.border} ${theme.placeholder} ${theme.ring} px-4 py-2 rounded-lg border transition duration-300 flex-1`;

  return (
    <form onSubmit={handleSubmit} className={`p-4 rounded-lg shadow-lg ml-4 w-1/2 ${theme.card}`}>
      <h2 className={`text-3xl font-bold mb-4 ${theme.text}`}>Input Validation</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={inputStyle} />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className={inputStyle} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputStyle} />
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className={inputStyle} />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className={inputStyle} />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className={inputStyle} />
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className={inputStyle} />
      </div>

      <button type="submit" className={`${theme.button} px-4 py-2 rounded shadow-md`}>
        Submit
      </button>

      {submitted && (
        <p className={`mt-4 font-semibold ${errorMsg === "All inputs are valid!" ? "text-green-400" : "text-red-400"}`}>
          {errorMsg}
        </p>
      )}
    </form>
  );
};

export default Validations;
