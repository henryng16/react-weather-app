import React, { useEffect, useState } from "react";
const api = {
  key: "51f1a56d56a5b28d57a7a2b08fd74cc1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.main.temp);
        if (response.ok) {
          setErrorMessage("");
          setWeatherInfo(
            [
              data.name,
              data.sys.country,
              data.weather[0].description,
              data.main.temp,
            ].join(", ")
          );
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setWeatherInfo("");
    // setErrorMessage("");
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
      {loading ? (
        <div>Loading data...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
