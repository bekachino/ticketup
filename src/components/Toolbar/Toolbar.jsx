import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";
import { RU_PATHNAMES } from "../../constants";
import './toolbar.css';

const AppToolbar = () => {
  const location = useLocation();
  
  return (
    <Box sx={{ flexGrow: 1 }}
      className='toolbar'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            {RU_PATHNAMES[location.pathname]}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;