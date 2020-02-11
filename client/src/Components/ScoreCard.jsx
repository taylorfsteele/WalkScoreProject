import React from 'react';
import { Typography } from '@material-ui/core';

export default function ScoreCard({ scoresFunction }) {
  return (
    <div>
      <Typography>{scoresFunction.lat}</Typography>
      <Typography>{scoresFunction.lng}</Typography>
    </div>
  );
}
