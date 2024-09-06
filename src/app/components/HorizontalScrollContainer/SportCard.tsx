'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { flexColumn } from '@/theme/sharedStyle';

export type SportCardProps<SportType extends string> = {
  sportName: SportType;
  image: string;
  type: string | number;
};

const SportCard = <SportType extends string>({
  sportName,
  image,
  type,
}: SportCardProps<SportType>) => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string>(image);
  const handleImageError = () => {
    setImageSrc('/images/default.jpg');
  };

  const handleJoinSportGames = () => {
    router.push(`/${type}/matches`);
  };

  return (
    <Card sx={{ minWidth: '18rem' }}>
      <CardMedia
        sx={{ height: '18rem' }}
        component='img'
        alt={sportName}
        image={imageSrc}
        onError={handleImageError}
      />
      <CardContent sx={{ height: '3rem' }}>
        <Typography gutterBottom variant='h5' component='div'>
          {sportName}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignItems: 'end', ...flexColumn }}>
        <Button onClick={handleJoinSportGames} size='small'>
          See all games
        </Button>
        <Button onClick={handleJoinSportGames} size='small'>
          Create new game
        </Button>
      </CardActions>
    </Card>
  );
};

export default SportCard;
