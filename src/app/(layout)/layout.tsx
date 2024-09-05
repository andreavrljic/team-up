'use client';
import { flexColumn } from '@/theme/sharedStyle';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  styled,
} from '@mui/material';
import { useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ ...flexColumn, flexGrow: 1 }}>
      {children}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          background: 'radial-gradient(circle, #4B5D00, #3A2F00)',
          color: 'white',
        }}
      >
        <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
        <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
        <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default PageLayout;
