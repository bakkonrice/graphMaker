import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {exporting} from "./config"
import Link from 'next/link';

type Anchor = 'left';

let section1: string[] = ["New Project", 'My Projects'] //part before the divider | "New Project" isn't included because it does redirect
let section1links: string[] = ['./new', './home'] //destination when clicked
let section2: string[] = ['Recently Deleted', 'More'] //part after the divider
let section2links: string[] = ['./trash', './more'] //destinate when clicked

let ending: string = ""

if (exporting){
  ending = ".html"
}

export default function Drawer2() {

  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box className="test"
      bgcolor="#3b3b3b"
      sx={{ width: 250, height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {section1.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link href={section1links[index] + ending}>
              <ListItemButton>
                <ListItemIcon sx={{color: "#ffffff"}}>
                  {index % 2 === 0 ? <NoteAddIcon /> : <FolderIcon />}
                </ListItemIcon>
                <ListItemText sx={{color: "#ffffff"}} primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider sx={{backgroundColor: '#ffffff'}} />
      <List>
        {section2.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={section2links[index] + ending}>
              <ListItemIcon sx={{color: "#ffffff"}}>
                {index % 2 === 0 ? <DeleteIcon /> : <MoreHorizIcon />}
              </ListItemIcon>
              <ListItemText sx={{color: "#ffffff"}} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}><MenuIcon color='primary'/></IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}