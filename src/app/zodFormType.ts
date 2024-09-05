import { z } from 'zod';
import { passwordConstants, regexExp } from './utils';

const isPasswordValid = (password: string) => {
  return (
    password.length >= passwordConstants.passMin &&
    password.length <= passwordConstants.passMax &&
    regexExp.upperCase.test(password) &&
    regexExp.lowercase.test(password) &&
    regexExp.number.test(password) &&
    regexExp.symbol.test(password)
  );
};

export const BasicLoginSchema = z.object({
  email: z.string().email('Please provide a valid value.'),
  password: z.string(),
});

export const LoginSchema = (signUp: boolean) => {
  const baseSchema = BasicLoginSchema.extend({
    ...(signUp && {
      username: z.string().min(1, 'Username is required'),
      confirmPassword: z.string(),
    }),
  });

  return baseSchema
    .refine(
      (data) => {
        if (signUp) {
          return isPasswordValid(data.password);
        }
        return true;
      },
      {
        message: 'Ensure that the password meets the requirements.',
        path: ['password'],
      }
    )
    .refine(
      (data) => {
        if (signUp && data.confirmPassword) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "Passwords don't match.",
        path: ['confirmPassword'],
      }
    );
};
