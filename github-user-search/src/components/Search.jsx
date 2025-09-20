import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';  

function Search() {
  const [username, setUsername] = useState('');  
  const [location, setLocation] = useState('');  
  const [minRepos, setMinRepos] = useState('');  
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState(null);        

  
  const handleChange = (event) => {
    setUsername(event.target.value);  
  };

  
  const handleLocationChange = (event) => {
    setLocation(event.target.value);  
  };

  
  const handleMinReposChange = (event) => {
    setMinRepos(event.target.value);  
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() || location.trim() || minRepos.trim()) {
      setLoading(true);  
      setError(null);    
      setUserData(null); 

      try {
        const data = await fetchUserData(username, location, minRepos);  
        if (data) {
          setUserData(data);  
        } else {
          setError('Looks like we cant find the user'); 
        }
      } catch (err) {
        setError('An error occurred while fetching the data');  
      } finally {
        setLoading(false);  
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleChange}
          className="p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Location "
          value={location}
          onChange={handleLocationChange}
          className="p-2 border rounded mb-2"
        />
        <input
          type="number"
          placeholder="Min Repositories "
          value={minRepos}
          onChange={handleMinReposChange}
          className="p-2 border rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Search</button>
      </form>

      {loading && <p>Loading...</p>}  
      {error && <p style={{ color: 'red' }}>{error}</p>}  

      {userData && !loading && !error && (
        <div>
          <h2>{userData.name}</h2>
          <h3>{userData.login}</h3>  
          <img src={userData.avatar_url} alt={userData.login} width="100" />  
          <p>{userData.bio}</p>
          <p>Location: {userData.location}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            Visit Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;