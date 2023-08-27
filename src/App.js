import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import { createTheme } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0067AC',
    },
  },
});

const GOOGLE_OAUTH_CLIENT_ID = `865991652545-t3q4olbn87u6bgv7l15b6k8qaor63e66.apps.googleusercontent.com`

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </SnackbarProvider>
    </GoogleOAuthProvider>
  );
}
