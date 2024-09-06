'use client';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

const SportMatches = () => {
  const param = useParams();
  return (
    <Box>
      <Typography variant='h2'>{param.sport}</Typography>
    </Box>
  );
};

export default SportMatches;
