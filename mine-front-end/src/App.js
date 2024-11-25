import './App.css';
import React from "react";
import MineMap from "./map_front_end/MineMap";
import MineInfoForm from "./form_data_front_end/FormData";


function App() {
  return (
    <div className="App">
      <h1>Mine Locations Across Canada</h1>
      <MineMap />
      <div className="form">
        <h1>Form Details</h1>
        <MineInfoForm/>
    </div>
    </div>
  );
}

export default App;