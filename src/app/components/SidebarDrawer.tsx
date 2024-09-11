'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import { UserAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import BackButton from './BackButton';
import { flexRow } from '@/theme/sharedStyle';

const SidebarDrawer = () => {
  const auth = UserAuth();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    auth.logOut();
    localStorage.clear();
  };

  const SideBarItems = useMemo(
    () =>
      ({
        settings: {
          label: 'Settings',
          icon: <SettingsIcon />,
          action: () => router.push('/settings'),
        },
        logout: {
          label: 'Log out',
          icon: <LogoutIcon />,
          action: handleLogOut,
        },
      } satisfies Record<
        string,
        { label: string; icon: JSX.Element; action: () => void }
      >),
    []
  );

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
      <List>
        {Object.entries(SideBarItems).map(([key, value]) => (
          <ListItem key={key} disablePadding>
            <ListItemButton onClick={value.action}>
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText primary={value.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ padding: '0.5rem', ...flexRow, justifyContent: 'space-between' }}
    >
      <Button
        color='warning'
        variant={'text'}
        onClick={toggleDrawer(true)}
        startIcon={<MenuOpenOutlinedIcon />}
        size='large'
      >
        MENU
      </Button>
      <BackButton />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default SidebarDrawer;
