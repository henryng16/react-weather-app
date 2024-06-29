import React, { useEffect, useState } from "react";
const api = {
  key: "51f1a56d56a5b28d57a7a2b08fd74cc1",
  base: "https://openweathermap.org/data/2.5/weather",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessgae, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherInfo(JSON.stringify(data));
      } catch (error) {
        setErrorMessage(error.message);
      }

      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="city"
          value={searchInput}
        />
        <button>Search</button>
      </form>
      <div>{weatherInfo}</div>
    </>
  );
}

export default App;
