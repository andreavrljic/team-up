'use client';
import { Box, Typography } from '@mui/material';
import { flexColumn, flexRow } from '@/theme/sharedStyle';
import { useContext } from 'react';
import { DeviceContext } from '@/app/context/DeviceTypeContext';
import TUButton from '@/app/components/TUButton';
import { useRouter } from 'next/navigation';

const Welcome = () => {
  const deviceType = useContext(DeviceContext);
  const router = useRouter();
  return (
    <Box
      sx={{
        ...flexColumn,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        gap: '4.5rem',
        paddingTop: '30%',
      }}
    >
      <Typography variant='h3' textAlign={'center'}>
        Welcome to Team Up!
      </Typography>
      <Box
        sx={{
          ...flexColumn,
          gap: '1rem',
          maxWidth: deviceType === 'desktop' ? '50%' : '100%',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            ...flexRow,
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TUButton
            size='medium'
            color='warning'
            variant='contained'
            sx={{ borderRadius: '0.5rem' }}
            label='Book a game'
            onClick={() => {
              console.log('Book a game');
            }}
          />
          <TUButton
            size='medium'
            color='warning'
            variant='contained'
            label='Join a game'
            onClick={() => {
              console.log('Join a game');
            }}
          />
        </Box>
        <TUButton
          size='medium'
          variant='contained'
          fullWidth
          label='Proceed to Homepage'
          onClick={() => {
            router.push('/home');
          }}
        />
      </Box>
    </Box>
  );
};

export default Welcome;
