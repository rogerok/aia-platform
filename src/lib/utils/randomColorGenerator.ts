const hexCharacters = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
] as const;

export const generateRandomHex = (): string => {
  let hex = '#';

  for (let i = 0; i < 6; i++) {
    hex += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
  }

  return hex;
};

export const generateRandomLinearGradient = () => {
  const deg = Math.floor(Math.random() * 360);

  return `linear-gradient(${deg}deg, ${generateRandomHex()}, ${generateRandomHex()}, ${generateRandomHex()})` as const;
};
