import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const [isJsonValid, setIsJsonValid] = useState(false);

  useEffect(() => {
    document.title = "21BCE3254"; 
  }, []);

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      setIsJsonValid(true);
    } catch (e) {
      setIsJsonValid(false);
    }
  };

  const handleJsonChange = (e) => {
    setJsonData(e.target.value);
    validateJson(e.target.value);
  };

  const handleSubmit = async () => {
    if (!isJsonValid) {
      alert('Please enter valid JSON');
      return;
    }

    try {
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('https://shreyansh-backend.vercel.app/bfhl', parsedData);
      setResponse(res.data);
    } catch (error) {
      alert('API Error: Unable to process request');
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        <h3>Filtered Response</h3>
        {filter.includes('numbers') && (
          <div>Numbers: {response.numbers.join(', ')}</div>
        )}
        {filter.includes('alphabets') && (
          <div>Alphabets: {response.alphabets.join(', ')}</div>
        )}
        {filter.includes('highest_lowercase_alphabet') && (
          <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <TextField
        label="API Input"
        multiline
        rows={4}
        variant="outlined"
        value={jsonData}
        onChange={handleJsonChange}
        style={{ width: '400px', marginBottom: '20px' }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isJsonValid}
      >
        Submit
      </Button>
      <br /><br />
      {isJsonValid && response && (
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Multi Filter</InputLabel>
          <Select
            multiple
            value={filter}
            onChange={handleFilterChange}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            <MenuItem value="numbers">Numbers</MenuItem>
            <MenuItem value="alphabets">Alphabets</MenuItem>
            <MenuItem value="highest_lowercase_alphabet">Highest Lowercase Alphabet</MenuItem>
          </Select>
        </FormControl>
      )}
      <br /><br />
      {renderResponse()}
    </div>
  );
}

export default App;
