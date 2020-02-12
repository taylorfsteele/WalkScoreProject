import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Components/Form';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScoreCard from './Components/ScoreCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    margin: 0,
    width: '100%',
  },
}));

async function loadScores(updateCallback) {
  const res = await fetch('http://localhost:3001/address');
  const scores = await res.json();
  updateCallback(scores);
}

function App() {
  const classes = useStyles();
  const [scoresList, updateScoresList] = React.useState([]);
  React.useEffect(() => {
    loadScores(updateScoresList);
  }, []);
  console.log(scoresList);

  return (
    <div className="App">
      <CssBaseline />
      <Form />
      <Grid className={classes.container} container spacing={3}>
        {scoresList.map((scoreSingle, i) => (
          <ScoreCard key={i} scoreSingle={scoreSingle} />
        ))}
      </Grid>
    </div>
  );
}

export default App;
