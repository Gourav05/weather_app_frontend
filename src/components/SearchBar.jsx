import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import axios from 'axios';

function SearchBar() {
  const [cityName, setCityName] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSearch = async () => {
    if (!cityName) {
      setError('City name cannot be empty');
      setForecastData(null);
      return;
    }

    try {
      const response = await axios.get(`https://weather-app-production-d571.up.railway.app/weather-app/${cityName}`);
      if (response.data.status === 'Success') {
        setForecastData(response.data.forecast);
        setError('');
        setActiveSlide(0);
      } else if (response.data.status === 'Failed') {
        setError(response.data.message);
        setForecastData(null);
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
      setForecastData(null);
    }
  };

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? forecastData.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === forecastData.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="p-6 shadow-lg mt-10 bg-gray-50 rounded-lg max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <input
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder='Search City'
          className='w-full bg-white border border-gray-300 rounded-lg shadow-inner p-4 focus:outline-none capitalize'
          type='text'
        />
        <BiSearchAlt2
          size={30}
          className="text-blue-500 transition ease-out hover:scale-125 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      {forecastData && (
        <div id="default-carousel" className="relative w-full mt-8">
          <div className="relative h-auto md:h-96 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {forecastData.map((day, index) => (
                <div key={index} className="min-w-full flex justify-center items-center p-6">
                  <div className="bg-blue-100 p-8 rounded-xl shadow-lg flex flex-col items-center space-y-4 w-80">
                    <h2 className="text-2xl font-bold text-blue-950">{day.date.split(' ')[0]}</h2>
                    <div className="text-4xl text-cyan-950 font-semibold">
                      {Math.round(day.highTemp)}<sup>&deg;C</sup>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} // Replace with actual weather icon from API
                        alt={day.condition}
                        className="w-20"
                      />
                      <p className="text-lg font-medium capitalize">{day.condition}</p>
                    </div>
                    {day.warnings && <p className="text-red-600">{day.warnings}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {forecastData.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handlePrevSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg className="w-4 h-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handleNextSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg className="w-4 h-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4L1 1" />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
