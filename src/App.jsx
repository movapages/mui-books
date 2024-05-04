import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Container} from "@mui/material";
import PublicLayout from './components/PublicLayout';
import ViewContent from "./components/ViewContent";

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
    <Container maxWidth="xl" sx={{border: '1px solid whitesmoke', maxHeight: '100vh', marginTop: '24px'}}>
      <RouterProvider router={createBrowserRouter(routerConfig)} />
    </Container>
  );
}

export default App;
