'use client';
import { flexColumn } from '@/theme/sharedStyle';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useRef } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getSports } from '@/app/api/api';
import SportCard from './SportCard';

type HorizontalScrollContainerType = {
  title: string;
  items: HorizontalItemType[];
};

export type HorizontalItemType = {
  id: string | number;
  type: string;
  label: string;
};

const HorizontalScrollContainer = ({
  title,
  items,
}: HorizontalScrollContainerType) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 100;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ ...flexColumn }}>
      <Typography>{title}</Typography>
      <Button onClick={async () => await getSports()}>Get data</Button>
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          width: '100%',
          gap: '1rem',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            zIndex: 1,
            bgcolor: 'transparent',
            borderRadius: '50%',
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            zIndex: 1,
            bgcolor: 'transparent',
            borderRadius: '50%',
          }}
        >
          <ChevronRightIcon />
        </IconButton>
        {items.map((item, index) => {
          const imageLink = `/images/${item.type}.jpg`;
          return (
            <SportCard key={index} image={imageLink} sportName={item.label} />
          );
        })}
      </Box>
    </Box>
  );
};

export default HorizontalScrollContainer;
