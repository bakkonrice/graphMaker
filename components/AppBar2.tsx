import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer2 from './Drawer2';
import { orange } from './config';

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1, width:"100%" }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

export default function AppBar2() {
    return <AppBar sx={{backgroundColor:orange}}>
        <Toolbar>
            <Drawer2/>
            <Typography>Chart And Graph Maker</Typography>
        </Toolbar>
    </AppBar>
}