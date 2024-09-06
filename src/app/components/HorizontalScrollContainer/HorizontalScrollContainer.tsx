'use client';
import { flexColumn } from '@/theme/sharedStyle';
import { Box, IconButton, Typography } from '@mui/material';
import { useRef } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
    <Box sx={{ ...flexColumn, gap: '1rem' }}>
      <Typography variant='h5'>{title}</Typography>
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
          msOverflowStyle: 'none',
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
          size='large'
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
          size='large'
        >
          <ChevronRightIcon />
        </IconButton>
        {items.map((item, index) => {
          const imageLink = `/images/${item.type}.jpg`;
          return (
            <SportCard
              key={index}
              image={imageLink}
              sportName={item.label}
              type={item.type}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default HorizontalScrollContainer;
