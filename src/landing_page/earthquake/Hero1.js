import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import BarChart from "./BarChart"; // Path to BarChart component

import MapComponent from "./MapComponent"; // Path to MapComponent

const Hero3 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/media/csvfiles/Indian_earthquake_data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
        console.log("Parsed Data:", results.data);
      },
    });
  }, []);

  return (
    <div className="conatiner">
      <div className="row mb-5">
        <div className="col-3"></div>
        <div className="col-6">
          <BarChart data={data} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-5">
        <div className="col-3"></div>
        <div className="col-6 mt-5">
          <MapComponent data={data} />
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
};

export default Hero3;
