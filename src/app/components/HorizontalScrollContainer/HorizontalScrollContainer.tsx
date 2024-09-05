'use client';
import { flexColumn } from '@/theme/sharedStyle';
import { Box, IconButton, Typography } from '@mui/material';
import { useRef } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type HorizontalScrollContainerType = {
  title: string;
};

const HorizontalScrollContainer = ({
  title,
}: HorizontalScrollContainerType) => {
  const items = Array(10).fill('Item');

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
          return (
            <Box
              key={index}
              sx={{
                flex: '0 0 auto',
                minHeight: '5rem',
                minWidth: '10rem',
                border: '1px red solid',
              }}
            >
              <h2>Card</h2>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HorizontalScrollContainer;
