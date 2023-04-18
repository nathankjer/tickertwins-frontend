import * as React from 'react';
import Typography from '@mui/material/Typography';
import SearchTicker from '../src/SearchTickers';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          TickerTwins
        </Typography>
        <Typography variant="subtitle1" component="h2" align="center" color="textSecondary" gutterBottom>
          Find similar stocks using AI
        </Typography><br/>
        <SearchTicker />
      </div>
    </div>
  );
}