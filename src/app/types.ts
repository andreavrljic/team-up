import { TextFieldProps } from '@mui/material';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export type LoginFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  phoneNumber: string;
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

export type SettingsFormType = {
  email: string;
  username: string;
  age: number;
  photoURL: string;
  phoneNumber: string;
};

export type TextfieldFormProps<FormSchema extends FieldValues> = {
  form: UseFormReturn<FormSchema>;
  id: Path<FormSchema>;
} & TextFieldProps;

export type UserProfileType = {
  username?: string;
  email?: string;
  age?: number;
  contactPhoneNumber?: string;
  photoURL?: string;
};

export type UpdateUserProfileType = {
  username?: string;
  age?: number;
  phoneNumber?: string;
  photoURL?: string;
};
