import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import TableTennisIcon from '@mui/icons-material/TableRestaurant';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Box } from '@mui/material';
import { SportLabel, SportsType, SportType } from '@/app/types';
import { flexColumn } from '@/theme/sharedStyle';
import { useState } from 'react';
type ExtendedSportType = SportType | 'all';

type SportFilterProps = {
  sports: SportsType[];
};

const SportIcons: Record<SportType, React.ReactElement> = {
  football: <SportsSoccerIcon />,
  volleyball: <SportsVolleyballIcon />,
  handball: <SportsHandballIcon />,
  tennis: <SportsTennisIcon />,
  basketball: <SportsBasketballIcon />,
  golf: <GolfCourseIcon />,
  tableTennis: <TableTennisIcon />,
  cycling: <PedalBikeIcon />,
  running: <DirectionsRunIcon />,
};

const FilterSports = ({ sports }: SportFilterProps) => {
  const [selectedSports, setSelectedSports] = React.useState<string[]>(['all']);
  const [filteredData, setFilteredData] = useState<ExtendedSportType[]>([]);

  const handleFilterChange = (selectedSports: string[]) => {
    if (selectedSports.includes('all')) {
      const allSportTypes = sports.map((sport) => sport.type);
      setFilteredData(['all', ...allSportTypes]);
    } else {
      const filtered = Object.keys(SportLabel).filter((item) =>
        selectedSports.includes(item)
      );
      setFilteredData(filtered as Array<keyof typeof SportLabel>);
    }
  };
  const handleSportChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedSports: string[]
  ) => {
    setSelectedSports(newSelectedSports);
    handleFilterChange(newSelectedSports);
  };

  return (
    <Box
      sx={{
        ...flexColumn,
        justifyContent: 'center',
        padding: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <ToggleButtonGroup
        value={filteredData}
        onChange={handleSportChange}
        aria-label='Sports Filter'
        sx={{
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: 'transparent',
          padding: '0.5rem',
          borderRadius: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <ToggleButton
          value='all'
          sx={{
            border: 'none',
            '&.Mui-selected': {
              borderRadius: '2rem',
            },
          }}
          aria-label='all sports'
        >
          <AllInclusiveIcon />
        </ToggleButton>
        {Object.entries(SportIcons).map(([key, value]) => {
          return (
            <ToggleButton
              key={key}
              value={key}
              aria-label='key'
              sx={{
                border: 'none',
                '&.Mui-selected': {
                  borderRadius: '2rem',
                },
                '&:hover': {
                  borderRadius: '2rem',
                },
              }}
            >
              {value}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default FilterSports;
