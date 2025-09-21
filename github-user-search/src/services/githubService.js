import axios from 'axios';

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com/search/users?q=';

export const fetchUserData = async (username, location, minRepos) => {
  try {
    let query = `${username}`;  

    if (location) {
      query += `+location:${encodeURIComponent(location)}`;  
    }
    if (minRepos) {
      query += `+repos:>=${minRepos}`;  
    }

    const apiUrl = `${GITHUB_API_URL}${query}`;
    
    const response = await axios.get(apiUrl);
    return response.data.items;  
  } catch (error) {
    
    console.error("Error fetching user data:", error.response ? error.response.data : error);

    throw new Error("Failed to fetch user data. Please try again.");
  }
};