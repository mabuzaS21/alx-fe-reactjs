import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function SearchBar() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSearch = async () => {
        if (username.trim()) {
            setError(null);
            const data = await fetchUserData(username);
            if (data) {
                setUserData(data);
            } else {
                setError('User not found');
            }
        }
    };

    return (
        <div>
            <input 
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={handleChange}
              />
              <button onClick={handleChange}>Search</button>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              {userData && !error && (
                <div>
                    <h2>{userData.name}</h2>
                    <p>{userData.bio}</p>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                        Visit Profile
                    </a>
                 </div>
              )}
        </div>
    );
}

export default SearchBar;