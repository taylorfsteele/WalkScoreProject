import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  card: {
    //height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    //flexDirection: 'column',
    //position: 'relative',
  },
}));

export default function ScoreCard({ scoreSingle }) {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6">
              {scoreSingle[2].split(',')[0]}, {scoreSingle[2].split(',')[1]}
            </Typography>
            <Typography>Walk Score: {scoreSingle[0]}</Typography>
            <Typography>Bike Score: {scoreSingle[1]}</Typography>
            <Typography variant="caption">
              Last Checked: {Date(scoreSingle[3]).substring(0, 10)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
