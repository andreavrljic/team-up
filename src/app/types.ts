export type LoginFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SportType =
  | 'football'
  | 'volleyball'
  | 'handball'
  | 'tennis'
  | 'basketball'
  | 'golf'
  | 'tableTennis'
  | 'cycling'
  | 'running';

export type SportsType = {
  id: string | number;
  type: SportType;
  discipline: string;
};
