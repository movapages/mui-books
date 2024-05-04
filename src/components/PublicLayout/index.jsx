import React from 'react';
import { Outlet } from 'react-router';
import {Box, Grid} from '@mui/material';
import TreeBrowser from "../TreeBrowser";

function PublicLayout() {
  return (
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{marginTop: '8px'}}>
            <TreeBrowser />
          </Grid>
          <Grid item xs={8}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
  );
}

export default PublicLayout;
