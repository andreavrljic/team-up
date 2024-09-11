'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      color='warning'
      variant={'text'}
      onClick={router.back}
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
};

export default BackButton;
