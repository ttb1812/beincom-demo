export const fontWeight = {
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
  900: '900',
  950: '950',
} as const;

export const fontSizes = {
  title1: 24,
  title2: 20,
  title3: 16,
  body1: 16,
  body2: 16,
  body3: 14,
  caption1: 12,
  caption2: 12,
} as const;

export const lineHeights: Record<keyof typeof fontSizes, number> = {
  title1: 28,
  title2: 28,
  title3: 24,
  body1: 24,
  body2: 24,
  body3: 21,
  caption1: 16,
  caption2: 16,
} as const;
