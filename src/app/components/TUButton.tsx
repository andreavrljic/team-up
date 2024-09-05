import { Button, ButtonProps } from '@mui/material';

type TUButtonType = { label: string } & ButtonProps;

const TUButton = ({
  size = 'medium',
  color = 'primary',
  variant = 'contained',
  label,
  onClick,
}: TUButtonType) => {
  return (
    <Button
      size={size}
      color={color}
      variant={variant}
      sx={{ borderRadius: '0.5rem' }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default TUButton;
