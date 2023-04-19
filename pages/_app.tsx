import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Navbar from "../src/Navbar";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import SearchTicker from '../src/SearchTickers';
import Hidden from '@mui/material/Hidden';
import { SxProps } from '@mui/system';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const backgroundStyles: SxProps = {
  minHeight: '95vh',
  backgroundImage: `url('../src/backgroundStyles.css')`,
  display: 'flex',
  justifyContent: 'center',
};

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar>
          <Hidden xsDown>
            {!isHomePage && <SearchTicker />}
          </Hidden>
        </Navbar>
        <Box sx={backgroundStyles}>
          <Container maxWidth="lg">
            <Box
              sx={{
                my: 8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card sx={{ width: '100%', maxWidth: 800, padding: isMobile ? '2em' : '5em' }}>
                <CardContent>
                  <Component {...pageProps} />
                </CardContent>
              </Card>
            </Box>
          </Container>
        </Box>        
      </ThemeProvider>
    </CacheProvider>
  );
}