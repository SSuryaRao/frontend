import React from 'react';
import axios from 'axios';

function RunScriptButton() {
  const runScript = async () => {
    try {
      const response = await axios.post('http://localhost:5000/run-script');
      alert(response.data);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return null;
}

export default RunScriptButton;
