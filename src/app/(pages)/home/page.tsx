import HorizontalScrollContainer from '@/app/components/HorizontalScrollContainer/HorizontalScrollContainer';
import { flexColumn } from '@/theme/sharedStyle';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ ...flexColumn, flex: 1 }}>
      Home page
      <HorizontalScrollContainer title='Horizontal line' />
    </Box>
  );
};

export default Home;
