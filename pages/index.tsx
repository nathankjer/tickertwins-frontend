import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import SearchTicker from '../src/SearchTickers';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h1"
        align="center"
        gutterBottom
      >
        TickerTwins
      </Typography>
      <Typography
        variant="subtitle1"
        component="h2"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Find similar stocks using AI
      </Typography>
      <Box mt={2}>
        <SearchTicker />
      </Box>
    </>
  );
}