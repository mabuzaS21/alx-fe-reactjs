import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);   

  
  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);  
      if (data) {
        setUserData(data);  
      } else {
        setError('Looks like we can\'t find the user');
      }
    } catch (err) {
      setError('An error occurred while fetching the data');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <Search 
        onSearch={handleSearch} 
        userData={userData} 
        loading={loading} 
        error={error} 
      /> 
    </div>
  );
}

export default App;