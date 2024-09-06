'use client';

import HorizontalScrollContainer, {
  HorizontalItemType,
} from '@/app/components/HorizontalScrollContainer/HorizontalScrollContainer';
import { SportsType } from '@/app/types';
import { fetchFirebaseData } from '@/firebase/config';
import { flexColumn } from '@/theme/sharedStyle';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const Home = () => {
  const [sports, setSports] = useState<SportsType[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetchFirebaseData('sports');
      if (res) {
        setSports(res);
      }
    })();
  }, []);

  const horizontalItems: HorizontalItemType[] = sports.map((sport) => {
    return { id: sport.id, label: sport.discipline, type: sport.type };
  });

  return (
    <Box sx={{ ...flexColumn, flex: 1 }}>
      Home page
      <HorizontalScrollContainer
        title='Horizontal line'
        items={horizontalItems}
      />
    </Box>
  );
};

export default Home;
