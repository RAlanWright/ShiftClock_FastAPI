import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@chakra-ui/react';

import Header from './components/Header';

function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);