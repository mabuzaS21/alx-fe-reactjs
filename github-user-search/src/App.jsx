import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <SearchBar />
    </div>
  );
}

export default App;