import React, { useState } from 'react';
import SearchBar from "./SearchBar";

function ToggleBar() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <>
      <div 
        className="bg-gray-100 bg-opacity-5 shadow-sm text-slate-400 text-sm items-center flex flex-row justify-between p-4 w-full"
      >
        <span 
          className="text-xs font-medium mr-2 px-2.5 py-1.5 rounded"
          style={{
            backgroundColor: isChecked ? 'rgb(201, 104, 104)' : 'rgb(126, 172, 181)',
            color: 'white'
          }}
        >
          {isChecked ? 'OFFLINE MODE' : 'ONLINE MODE'}
        </span>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div 
            className="relative w-8 h-4 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-focus:ring-0 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
          >
          </div>
        </label>
      </div>
      <div className={`transition-opacity duration-200 ${isChecked ? 'opacity-0' : 'opacity-100'}`}>
      <SearchBar />
      </div>
      
    </>
  );
}

export default ToggleBar;
