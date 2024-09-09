import { green, white } from '@/theme/colors';
import { flexColumn, flexRow } from '@/theme/sharedStyle';
import {
  Box,
  Button,
  ButtonProps,
  Typography,
  TypographyOwnProps,
} from '@mui/material';

type Item = {
  text: string | number;
  style?: {
    variant?: TypographyOwnProps['variant'];
    color?: string;
    fontWeight?: string;
  };
};

type RowItem = {
  left?: Item[];
  right?: Item[];
  button?: ButtonProps[];
};

export type CardItems = {
  cardContent: RowItem;
  id: string | number;
};

type ListCardProp = { cardItems: CardItems };

const CardDetails = ({ cardItems }: ListCardProp) => {
  return (
    <Box
      sx={{
        ...flexColumn,

        border: `0.125rem solid ${green.primary}`,
        borderRadius: '0.25rem ',
        padding: '0.75rem',
        backgroundColor: white.bone,
        gap: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        key={`index-${cardItems.id}`}
        sx={{
          ...flexRow,
          justifyContent: 'space-between',
        }}
      >
        <Box key={`left-row`} sx={{ ...flexColumn }}>
          {cardItems.cardContent.left?.map((rowItem, index) => (
            <Typography
              key={`left-row-${index}`}
              variant={rowItem.style?.variant ?? 'body2'}
              color={rowItem.style?.color ?? 'black'}
            >
              {rowItem.text}
            </Typography>
          ))}
        </Box>
        <Box key={`right-row-index`} sx={{ ...flexColumn }}>
          {cardItems.cardContent.right?.map((rowItem, index) => {
            console.log('row', rowItem.text, 'm');
            return (
              <Typography
                key={`right-row-${index}`}
                variant={rowItem.style?.variant ?? 'body2'}
                color={rowItem.style?.color ?? 'black'}
              >
                {rowItem.text || '\u00A0'}
              </Typography>
            );
          })}
        </Box>
      </Box>
      {cardItems.cardContent.button?.map((button, index) => (
        <Button key={index} variant={button.variant} {...button}>
          {button.children}
        </Button>
      ))}
    </Box>
  );
};

export default CardDetails;
