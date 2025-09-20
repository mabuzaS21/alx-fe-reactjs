import React from 'react';

function Search({ onSearch, userData, loading, error }) {
  const [username, setUsername] = React.useState('');  

  const handleChange = (event) => {
    setUsername(event.target.value);  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim()) {
      onSearch(username);  
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
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}  

      {error && <p style={{ color: 'red' }}>{error}</p>}  

      {userData && !loading && !error && (
        <div>
          <h2>{userData.name}</h2>
          <h3>{userData.login}</h3>  
          <img src={userData.avatar_url} alt={userData.login} width="100" />  
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            Visit Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;