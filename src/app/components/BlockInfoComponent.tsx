import { flexColumn, flexRow } from '@/theme/sharedStyle';
import { Box, Typography, TypographyProps } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type InfoType = 'date' | 'time' | 'location';

type BlockInfoComponentProps = {
  type: InfoType;
  firstLine: LineType;
  secondLine: LineType;
};

type LineType = {
  label: string;
  style?: TypographyProps;
};
const icon: Record<InfoType, JSX.Element> = {
  time: <AccessTimeIcon color='warning' fontSize='medium' />,
  date: <CalendarTodayOutlinedIcon color='warning' fontSize='medium' />,
  location: <LocationOnIcon color='warning' fontSize='medium' />,
};

const BlockInfoComponent = ({
  firstLine,
  type,
  secondLine,
}: BlockInfoComponentProps) => {
  return (
    <Box
      sx={{
        ...flexRow,
        ...flexRow,
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {icon[type]}
      <Box sx={{ ...flexColumn }}>
        <Typography
          variant='body1'
          fontWeight={firstLine.style?.fontWeight}
          color='white'
          fontStyle={firstLine.style?.fontStyle}
        >
          {firstLine.label}
        </Typography>
        <Typography
          variant='body1'
          fontWeight={secondLine.style?.fontWeight}
          color='white'
          fontStyle={secondLine.style?.fontStyle}
        >
          {secondLine.label}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlockInfoComponent;
