import './App.css';
import React from "react";
import MineMap from "./map_front_end/MineMap";


function App() {
  return (
    <div className="App">
      <h1>Mine Locations Across Canada</h1>
      <MineMap />
    </div>
  );
}

export default App;