import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import PublicLayout from './components/PublicLayout';
import ViewContent from "./components/ViewContent";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
        *::-webkit-scrollbar-thumb: {
          border-radius: 45px,
        }
        }
      `
      }
    },
  }
);

export const routerConfig = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <ViewContent />,
        name: 'Book API',
      }
    ],
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{border: '1px solid whitesmoke', maxHeight: '100vh', marginTop: '24px'}}>
        <RouterProvider router={createBrowserRouter(routerConfig)} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
