import React from 'react';
import './App.css';
import Form from './Components/Form';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScoreCard from './Components/ScoreCard';

async function loadScores(updateCallback) {
  const res = await fetch('http://localhost:3001/address');
  const scores = await res.json();
  updateCallback(scores);
}

function App() {
  const [scoresList, updateScoresList] = React.useState([]);
  React.useEffect(() => {
    loadScores(updateScoresList);
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <Form scoresList={scoresList} updateScoresList={updateScoresList} />
    </div>
  );
}

export default App;
