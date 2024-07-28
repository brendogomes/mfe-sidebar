import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
const drawerBackgroundColor = 'rgb(13, 14, 18)';
const iconColor = 'lightblue';
const borderColor = 'rgba(255, 255, 255, 0.1)';

const DrawerList = styled(List)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: drawerBackgroundColor,
  height: '100%'
}));

const DrawerListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: drawerBackgroundColor,
  '&:hover': {
    backgroundColor: 'rgba(13, 14, 18, 0.8)',
  },
}));

const DrawerListItemButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: drawerBackgroundColor,
  '&:hover': {
    backgroundColor: 'rgba(13, 14, 18, 0.8)',
  },
  color: 'white',
}));

const DrawerToggleButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'flex-end',
  color: 'white',
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: iconColor,
}));

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <div>
      <DrawerList>
        <DrawerToggleButton onClick={handleDrawerToggle}>
          {drawerOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </DrawerToggleButton>
          <DrawerListItem disablePadding>
            <DrawerListItemButton sx={{ justifyContent: 'center' }}>
              <StyledListItemIcon sx={{ minWidth: 30 }}>
                <DashboardIcon />
              </StyledListItemIcon>
              {drawerOpen && (
                <ListItemText
                  primary={'Dashboard'}
                  sx={{
                    opacity: drawerOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    ml: 1,
                    color: 'white',
                  }}
                />
              )}
            </DrawerListItemButton>
          </DrawerListItem>
      </DrawerList>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
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
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              position: 'relative',
              backgroundColor: drawerBackgroundColor,
              borderRight: `1px solid ${borderColor}`,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
              transition: 'width 0.3s ease',
              overflow: 'hidden',
              position: 'relative',
              height: '100vh',
              backgroundColor: drawerBackgroundColor,
              borderRight: `1px solid ${borderColor}`,
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
