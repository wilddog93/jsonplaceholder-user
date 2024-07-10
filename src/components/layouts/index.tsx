import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../Footer';
import Header from '../Header';
import { FC, ReactNode, useState } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const LayoutApps: FC<LayoutProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' }}>
        {children}
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default LayoutApps;