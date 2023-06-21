import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" sx={{mr:'20px'}} >
            <Link to='/form' className=' text-white text-decoration-none'>From</Link>
          </Typography>
          <Typography  component="div" sx={{ flexGrow: 1 }}>
            <Link to='/table' className=' text-white text-decoration-none'>Table</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar