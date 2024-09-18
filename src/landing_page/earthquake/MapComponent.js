import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ data }) => {
    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map((event, index) => {
                const latitude = parseFloat(event['Latitude']);
                const longitude = parseFloat(event['Longitude']);
                if (!latitude || !longitude) {
                    console.warn(`Missing latitude or longitude for event at index ${index}`);
                    return null;
                }
                return (
                    <Marker key={index} position={[latitude, longitude]}>
                        <Popup>
                            {event['Location']}<br />
                            Magnitude: {event['Magnitude']}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default MapComponent;
