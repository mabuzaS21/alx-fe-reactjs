import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';  

function Search() {
  const [username, setUsername] = useState('');  
  const [location, setLocation] = useState('');  
  const [minRepos, setMinRepos] = useState('');  
  const [userData, setUserData] = useState([]); 
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
      setUserData([]);  

      try {
        const data = await fetchUserData(username, location, minRepos);  
        if (data && data.length > 0) {
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

      {userData.length > 0 && !loading && !error && (
        <div>
          <h2>Search Results:</h2>
          <div className="user-list">
            {userData.map((user) => (
              <div key={user.id} className="user-card p-4 border mb-4 rounded">
                <img src={user.avatar_url} alt={user.login} width="100" />
                <h3>{user.login}</h3>  
                <p>{user.name}</p>
                <p>{user.bio}</p>
                <p>Location: {user.location || 'N/A'}</p>
                <p>Public Repos: {user.public_repos}</p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  Visit Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;