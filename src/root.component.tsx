import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;
const collapsedDrawerWidth = 100;

interface Props {
  window?: () => Window;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DrawerList = styled(List)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {drawerOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <DrawerList>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ justifyContent: 'center' }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {drawerOpen && (
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: drawerOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    ml: 1,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </DrawerList>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
              transition: 'width 0.3s ease',
              overflow: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
