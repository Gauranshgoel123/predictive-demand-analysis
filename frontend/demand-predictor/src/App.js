import React, { useState, useEffect } from 'react';
import ChartComponent from './components/ChartComponent';
import FormComponent from './components/FormComponent';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://predictive-demand-analysis.onrender.com/api/get-demand");
            console.log("Historical Demand Data:", response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch initial data
    }, []);

    return (
        <div className="App">
            <h1 className='heading'>Predictive Demand Analysis</h1>
            <ChartComponent data={data} />  {/* Ensure data is passed correctly */}
            <FormComponent fetchData={fetchData} /> {/* Pass fetchData as prop */}
        </div>
    );
}

export default App;
