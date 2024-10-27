import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css'; // Import the CSS file

const FormComponent = ({ fetchData }) => { // Accept fetchData as prop
    const [partNumber, setPartNumber] = useState('');
    const [demand, setDemand] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/add-data", {
            part_number: partNumber,
            date: new Date().toISOString().slice(0, 10),
            demand: parseInt(demand),
        });
        setPartNumber('');
        setDemand('');
        fetchData(); // Fetch updated data after submission
    };

    return (
        <div className="form-container">
            <h2>Add Part Demand</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Part Number"
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                />
                <input
                    className="input-field"
                    type="number"
                    placeholder="Demand"
                    value={demand}
                    onChange={(e) => setDemand(e.target.value)}
                />
                <button className="submit-button" type="submit">Add Data</button>
            </form>
        </div>
    );
};

export default FormComponent;
