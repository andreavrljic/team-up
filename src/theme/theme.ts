import { colors, createTheme } from '@mui/material';
import { orange } from './colors';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: false;
    mobile: true;
    tablet: true;
    md: false;
    lg: true;
    xl: false;
  }
}

const theme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          '&.Mui-focused': {
            backgroundColor: 'white',
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: orange.primary,
          },
          color: 'white',
        },
      },
    },
  },
});

if (theme.components) {
}

export { theme };
