export const flexRow = {
  display: 'flex',
  flexDirection: 'row',
} as const;

export const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
};

export const linearGradient = (topColor: string, bottomColor: string) => {
  return `linear-gradient(to bottom left,${topColor}, ${bottomColor})`;
};
