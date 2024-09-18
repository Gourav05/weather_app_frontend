
import { useState } from 'react'

import ToggleBar from "./components/ToggleBar";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     <div className="flex items-center flex-col">

       <ToggleBar></ToggleBar>

       
    
      </div>
    </>
   )
}

export default App
