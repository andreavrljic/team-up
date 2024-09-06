'use client';
import { getGames } from '@/app/api/api';
import { GameType, SportLabel, SportType } from '@/app/types';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { flexColumn } from '@/theme/sharedStyle';

const SportMatches = () => {
  const param = useParams();
  const [games, setGames] = useState<GameType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getGames();
      if (res) {
        setGames(res || []);
      }
    })();
  }, []);

  return (
    <Box sx={{ ...flexColumn, padding: '0.5rem', gap: '1rem' }}>
      <Typography variant='h2'>
        {SportLabel[param.sport as SportType]}
      </Typography>
      {games.map((game) => (
        <GameCard key={game.id} gameDetails={game} />
      ))}
    </Box>
  );
};

export default SportMatches;
