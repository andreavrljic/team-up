'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export type SportCardProps<SportType extends string> = {
  sportName: SportType;
  image: string;
};

const SportCard = <SportType extends string>({
  sportName,
  image,
}: SportCardProps<SportType>) => {
  const [imageSrc, setImageSrc] = useState<string>(image);
  const handleImageError = () => {
    setImageSrc('/images/default.jpg');
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
      <CardActions sx={{ justifyContent: 'end' }}>
        <Button size='small'>Join</Button>
      </CardActions>
    </Card>
  );
};

export default SportCard;
