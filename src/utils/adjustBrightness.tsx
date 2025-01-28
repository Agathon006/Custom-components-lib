export const adjustBrightness = (color: string, factor: number): string => {
  const colorNames: { [key: string]: string } = {
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    yellow: '#FFFF00',
    orange: '#FFA500',
    purple: '#800080',
    pink: '#FFC0CB',
    brown: '#A52A2A',
    gray: '#808080',
    black: '#000000',
    white: '#FFFFFF',
  };

  const hexRegex = /^#[0-9A-Fa-f]{6}$/;

  if (colorNames[color.toLowerCase()]) {
    color = colorNames[color.toLowerCase()];
  }

  if (!hexRegex.test(color)) {
    return 'var(--color-grey)';
  }

  color = color.replace(/^#/, '');

  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  r = Math.round(r * factor);
  g = Math.round(g * factor);
  b = Math.round(b * factor);

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  const newHex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;

  return newHex;
};
