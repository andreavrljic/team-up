export const regexExp = {
  upperCase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  symbol: /[^\w\s]/,
  phoneNumber: /^[0-9]{3}[0-9]{3}[0-9]{4}$/,
  alphabetic: /[A-Za-z]/,
  onlyNumbers: /^[0-9]+$/,
  fixedLengthNumbers: (numbersLength: number) =>
    new RegExp(`^[0-9]{${numbersLength}}$`),
};

export type ValidationRequirement = {
  message: string;
  regex: RegExp;
};

export type ValidationRequirements = Record<string, ValidationRequirement>;

export const checkValueRequirements = <T extends ValidationRequirements>(
  validatingValue: string,
  requirements: T
): Record<keyof T, boolean> => {
  return Object.fromEntries(
    Object.entries(requirements).map(
      ([key, value]: [keyof T, ValidationRequirement]) => {
        return [key, value.regex.test(validatingValue)];
      }
    )
  ) as Record<keyof T, boolean>;
};

export type PasswordRequirement = {
  message: string;
  regex: RegExp;
};

export type PasswordRequirements = Record<string, PasswordRequirement>;

export const passwordConstants = {
  passMin: 3,
  passMax: 10,
};

export const passwordRequirements = {
  lengthPass: {
    message: `${passwordConstants.passMin} - ${passwordConstants.passMax} characters`,
    regex: new RegExp(
      `^.{${passwordConstants.passMin},${passwordConstants.passMax}}$`
    ),
  },
  uppercase: {
    message: 'At least one uppercase letter',
    regex: regexExp.upperCase,
  },
  lowercase: {
    message: 'At least one lowercase letter',
    regex: regexExp.lowercase,
  },
  number: { message: 'At least one number', regex: regexExp.number },
  symbol: { message: 'At least one symbol', regex: regexExp.symbol },
} satisfies Record<string, PasswordRequirement>;

export type PasswordRequirementsType = keyof typeof passwordRequirements;

export const checkPasswordRequirements = (
  password: string
): Record<keyof PasswordRequirements, boolean> => {
  return checkValueRequirements(password, passwordRequirements);
};
