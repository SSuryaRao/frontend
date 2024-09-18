import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse"; // CSV parsing library

function Graphbar() {
  const [data, setData] = useState([]);

  // Load CSV data using PapaParse
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("media/csvfiles/Disaster.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // convert to string
      const parsedData = Papa.parse(csv, { header: true });
      setData(parsedData.data); // setting state
    }
    fetchData();
  }, []);

  // Prepare data for visualizations
  const years = data.map((row) => row.Year);
  const totalDeaths = data.map((row) => parseFloat(row["Total Deaths"]));
  const disasterTypes = [...new Set(data.map((row) => row["Disaster Type"]))];
  const continents = [...new Set(data.map((row) => row["Continent"]))];

  // Aggregate total deaths by continent for the pie chart
  const deathsByContinent = continents.map((continent) => {
    return data
      .filter((row) => row.Continent === continent)
      .reduce((sum, row) => sum + parseFloat(row["Total Deaths"] || 0), 0);
  });

  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-6">
          {/* Line chart: Total deaths over the years */}
          <Plot
            data={[
              {
                x: years,
                y: totalDeaths,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ title: "Total Deaths Over Time" }}
          />

          {/* Bar chart: Total deaths by Disaster Type */}
          <Plot
            data={[
              {
                x: disasterTypes,
                y: disasterTypes.map((type) => {
                  return data
                    .filter((row) => row["Disaster Type"] === type)
                    .reduce(
                      (sum, row) => sum + parseFloat(row["Total Deaths"] || 0),
                      0
                    );
                }),
                type: "bar",
              },
            ]}
            layout={{ title: "Total Deaths by Disaster Type" }}
          />

          
        </div>
        <div className="col-6">
            {/* Pie chart: Total deaths by Continent */}
          <Plot
            data={[
              {
                values: deathsByContinent,
                labels: continents,
                type: "pie",
                textinfo: "label+percent", // Display label and percentage on the chart
                insidetextorientation: "radial", // Ensures text is readable
              },
            ]}
            layout={{ title: "Total Deaths by Continent" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Graphbar;
