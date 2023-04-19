import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { useRouter } from 'next/router';
import SearchTicker from '../src/SearchTickers';

interface Ticker {
  symbol: string;
  name: string;
  description: string;
  type: string;
  enabled: boolean;
}

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [randomTickers, setRandomTickers] = useState<Ticker[]>([]);

  useEffect(() => {
    async function fetchRandomTickers() {
      const response = await fetch('https://tickertwins-backend-vct4oolaqq-ue.a.run.app/tickers/random');
      const data: Ticker[] = await response.json();
      setRandomTickers(data);
    }

    fetchRandomTickers();
  }, []);

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
      </Box><br/>
      <Typography
        variant="subtitle1"
        component="p"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Or pick one of these:
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} pb={2}>
        {randomTickers.map((ticker) => (
          <Chip
            key={ticker.symbol}
            label={ticker.symbol}
            onClick={() => router.push(`/tickers/${ticker.symbol}`)}
          />
        ))}
      </Box>
    </>
  );
}