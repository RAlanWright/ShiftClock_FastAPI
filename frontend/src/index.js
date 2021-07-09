import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from '@chakra-ui/react'

import Header from './components/Header'
import Shifts from './components/Shifts'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Shifts />
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)