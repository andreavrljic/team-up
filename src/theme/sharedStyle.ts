export const flexRow = {
  display: 'flex',
  flexDirection: 'row',
} as const;

export const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
};

export const linearGradient = (topColor: string, bottomColor: string) => {
  const a = `linear-gradient(to bottom left,${topColor}, ${bottomColor})`;
  console.log('da', a);
  return a;
};
