import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', // Centers horizontally
      alignItems: 'center',     // Centers vertically
      height: '100vh'           // Optional: takes the full viewport height
    }}>
      <CircularProgress />
    </Box>
  );
}
