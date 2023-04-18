import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Navbar from "../src/Navbar"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { GlobalStyles } from "@mui/system";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Navbar></Navbar>
        <GlobalStyles
          styles={{
            body: {
              overflow: "hidden",
            },
          }}
        />
        <Box
          sx={{
            minHeight: '95vh',
            background: `
            background-color:#99f8ff;
            background-image:
            radial-gradient(at 9% 36%, hsla(62,93%,63%,1) 0px, transparent 50%),
            radial-gradient(at 24% 85%, hsla(329,72%,73%,1) 0px, transparent 50%),
            radial-gradient(at 71% 32%, hsla(162,78%,78%,1) 0px, transparent 50%),
            radial-gradient(at 18% 61%, hsla(296,71%,60%,1) 0px, transparent 50%),
            radial-gradient(at 59% 50%, hsla(182,81%,66%,1) 0px, transparent 50%),
            radial-gradient(at 17% 28%, hsla(88,97%,70%,1) 0px, transparent 50%),
            radial-gradient(at 19% 46%, hsla(260,84%,60%,1) 0px, transparent 50%);
            `,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
              <Card sx={{ minWidth: 600, padding:"5em" }}>
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
