import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 300,
      fontSize: '6rem',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '4rem',
      },
    },
    h2: {
      fontWeight: 400,
      fontSize: '4rem',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '3rem',
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: '3rem',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '2rem',
      },
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
      },
    },
    body1: {
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '0.875rem',
      },
    },
    body2: {
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '0.75rem',
      },
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;