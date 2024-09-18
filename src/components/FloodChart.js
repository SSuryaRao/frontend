import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet

// Fix for missing Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function FloodChart() {
  const [floodData, setFloodData] = useState([]);

  useEffect(() => {
    // Fetch flood data from backend
    axios.get('http://localhost:5000/api/flood-data')
      .then((response) => {
        console.log('Flood Data:', response.data);  // Debugging line
        setFloodData(response.data);
      })
      .catch((error) => console.error('Error fetching flood data:', error));
  }, []);

  // Prepare data for charts
  const years = floodData.map(row => {
    const startDate = row['Start Date'];
    if (startDate) {
      return new Date(startDate).getFullYear(); // Extract year from the Start Date
    }
    return undefined; // Return undefined if Start Date is missing or invalid
  });

  // Filter out undefined years
  const validYears = years.filter(year => year !== undefined);

  // Group flood events by year
  const floodEventsByYear = validYears.reduce((acc, year) => {
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  console.log('Flood Events by Year:', floodEventsByYear);  // Debugging line

  // Convert the object to arrays for Plotly
  const yearLabels = Object.keys(floodEventsByYear).sort();
  const eventCounts = yearLabels.map(year => floodEventsByYear[year]);

  return (
    <div>
      <h2>Flood Data Visualization</h2>

      {/* Histogram of Flood Duration */}
      <h3>Distribution of Flood Duration</h3>
      <Plot
        data={[
          {
            x: floodData.map(row => parseFloat(row['Duration(Days)'])),
            type: 'histogram',
            nbinsx: 20,
          }
        ]}
        layout={{
          title: 'Distribution of Flood Duration',
          xaxis: { title: 'Duration (Days)' },
          yaxis: { title: 'Count' }
        }}
      />

      {/* Bar chart of Flood Events by Year */}
      <h3>Flood Events by Year</h3>
      {yearLabels.length > 0 ? (
        <Plot
          data={[
            {
              x: yearLabels,
              y: eventCounts,
              type: 'bar',
            }
          ]}
          layout={{
            title: 'Flood Events by Year',
            xaxis: { title: 'Year' },
            yaxis: { title: 'Event Count' },
          }}
        />
      ) : (
        <p>No data available for Flood Events by Year.</p>
      )}

      {/* Map of Flood Locations */}
      <h3>Flood Locations Map</h3>
      <MapContainer center={[22, 78]} zoom={5} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {floodData.map((row, index) => (
          <Marker key={index} position={[parseFloat(row['Latitude']), parseFloat(row['Longitude'])]}>
            <Popup>
              <div>
                <strong>Location:</strong> {row['Location']}<br/>
                <strong>Districts:</strong> {row['Districts']}<br/>
                <strong>Severity:</strong> {row['Severity']}<br/>
                <strong>Human Fatality:</strong> {row['Human fatality']}<br/>
                <strong>Area Affected:</strong> {row['Area Affected']}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default FloodChart;
