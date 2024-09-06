export type LoginFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SportLabel = {
  football: 'Football',
  volleyball: 'Volleyball',
  handball: 'Handball',
  tennis: 'Tennis',
  basketball: 'Basketball',
  golf: 'Golf',
  tableTennis: 'Table tennis',
  cycling: 'Cycling',
  running: 'Running',
} satisfies Record<string, string>;

export type SportType = keyof typeof SportLabel;

export type SportsType = {
  id: string | number;
  type: SportType;
  discipline: string;
};

export type GameType = {
  id: string;
  type: SportType;
  location: string;
  time: Date;
  players: string[];
  maxPlayers: number;
};
