import BlockInfoComponent from '@/app/components/BlockInfoComponent';
import { flexColumn, flexRow } from '@/theme/sharedStyle';
import { Box, Button, Typography } from '@mui/material';

const MatchDetails = () => {
  return (
    <Box sx={{ ...flexColumn, flex: 1 }}>
      <Box sx={{ ...flexColumn, padding: '1rem', gap: '1rem' }}>
        <Typography variant='h5'>{'Basketball Game'}</Typography>
        <Box sx={{ ...flexRow, justifyContent: 'space-between', gap: '1rem' }}>
          <BlockInfoComponent
            firstLine={{ label: '15 July', style: { fontWeight: 'bold' } }}
            secondLine={{
              label: 'Friday',
              style: { fontStyle: 'italic', fontWeight: 'bold' },
            }}
            type='date'
          />
          <BlockInfoComponent
            firstLine={{ label: '8 pm', style: { fontWeight: 'bold' } }}
            secondLine={{ label: 'Until 9 pm', style: { fontWeight: 1 } }}
            type='time'
          />
        </Box>
        <Box
          sx={{
            ...flexRow,
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <BlockInfoComponent
            firstLine={{
              label: 'Dubai sports world',
              style: { fontWeight: 'bold' },
            }}
            secondLine={{
              label: 'Dubai world trade center, 4, dubai ',
              style: { fontWeight: 1 },
            }}
            type='location'
          />
          <Button
            sx={{ borderRadius: '2rem' }}
            variant={'contained'}
            color='warning'
            size='small'
          >
            Map
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchDetails;
