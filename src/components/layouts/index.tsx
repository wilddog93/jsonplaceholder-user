import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../Footer';
import Header from '../Header';
import { useState } from 'react';
import { Outlet } from 'react-router';

const LayoutApps = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Outlet />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default LayoutApps;