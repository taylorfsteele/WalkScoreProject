import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  card: {
    textAlign: 'left',
  },
}));

export default function ScoreCard({ scoreSingle, updateScoresList }) {
  const classes = useStyles();
  const handleDelete = async placeID => {
    try {
      const response = await fetch('http://localhost:3001/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeID }),
      });
      const jsonResponse = await response.json();
      updateScoresList(jsonResponse);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          action={
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleDelete(scoreSingle.placeID);
              }}
            >
              <CloseIcon />
            </IconButton>
          }
          titleTypographyProps={{ variant: 'subtitle1' }}
          title={`${scoreSingle.formattedAddress.split(',')[0]}, ${
            scoreSingle.formattedAddress.split(',')[1]
          }`}
          subheader={`Last Checked: ${Date(
            scoreSingle.lastCalledTime,
          ).substring(0, 10)}`}
          subheaderTypographyProps={{ variant: 'caption' }}
        />
        <CardContent style={{ paddingTop: 0 }}>
          <Typography>Walk Score: {scoreSingle.walkScore}</Typography>
          <Typography>Bike Score: {scoreSingle.bikeScore}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

ScoreCard.propTypes = {
  updateScoresList: PropTypes.arrayOf(PropTypes.object),
  scoreSingle: PropTypes.shape,
};

ScoreCard.defaultProps = {
  updateScoresList: [],
  scoreSingle: {},
};
