import React from 'react';
import './App.css';
import Row from './Row';
import requests from './requests'

function App() {
  return (
    <div className="App">
      <h2>hey</h2>
      <Row title="NETFLIX ORIGINALS" fetchUrl ={requests.fetchNetflixOriginals} />
      <Row title="Tranding Now" fetchUrl ={requests.fetchTrending} />
    </div>
  );
}

export default App;
