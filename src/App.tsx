import React from 'react';
import './App.css';
import Encrypt from './components/Encrypt/Encrypt';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="app">
      <Header />
      <Encrypt />
    </div>
  );
}

export default App;
