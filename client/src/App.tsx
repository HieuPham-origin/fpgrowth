import React from 'react'
import { RouterProvider } from 'react-router'
import router from './utils/routes'
import { createTheme, ThemeProvider } from "@mui/material"


const theme = createTheme({}); // material UI theme 


function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
