import CardDetails, { CardItems } from '@/app/components/CardDetails';
import { GameType, SportLabel } from '@/app/types';
import { orange } from '@/theme/colors';

type GameCardProps = { gameDetails: GameType };

const GameCard = ({ gameDetails }: GameCardProps) => {
  const freePlayer = gameDetails.players.length < gameDetails.maxPlayers;
  const cardItems: CardItems = {
    cardContent: {
      left: [
        {
          text: `${SportLabel[gameDetails.type]}`,
          style: { variant: 'h5' },
        },
        { text: `Location: ${gameDetails.location}` },
        { text: `Date: ${new Date(gameDetails.time)}` },
      ],
      right: [
        {
          text: `Players: ${gameDetails.players.length}/${gameDetails.maxPlayers}`,
          style: { color: freePlayer ? orange.primary : 'black' },
        },
      ],
      button: [
        {
          children: 'Join',
          variant: 'contained',
          color: 'warning',
          disabled: !freePlayer,
        },
      ],
    },
    id: gameDetails.id,
  };

  return <CardDetails cardItems={cardItems} />;
};

export default GameCard;
