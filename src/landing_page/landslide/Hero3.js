import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';


const Hero3 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Papa.parse('/Global_Landslide_Catalog_Export.csv', {
            download: true,
            header: true,
            complete: (result) => {
                // Log the entire result to check its structure
                console.log('Parsed Data:', result.data);
                setData(result.data);
                setLoading(false);
            },
            error: (error) => {
                setError(error);
                setLoading(false);
            }
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="hero3-container">
            <h1>Disaster Events Overview</h1>
            <BarChart data={data} />
            <PieChart data={data} />
          
        </div>
    );
};

export default Hero3;
