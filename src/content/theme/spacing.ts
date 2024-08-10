import { DimensionValue } from 'react-native';

/**
 * The available spacing sizes.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = medium+ - ?
 * 6 = large   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */
export const spacing = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '13': 52,
  '14': 56,
  '16': 64,
  '18': 72,
  '20': 80,
  '24': 96,
  '32': 128,
  '40': 160,
  '48': 192,
  '56': 224,
  '64': 256,
  '72': 288,
  '80': 320,
  '96': 384,
  '1/2': '50%' as DimensionValue,
  '1/3': '33.333%' as DimensionValue,
  '2/3': '66.666%' as DimensionValue,
  '1/4': '25%' as DimensionValue,
  '2/4': '50%' as DimensionValue,
  '3/4': '75%' as DimensionValue,
  '1/5': '20%' as DimensionValue,
  '2/5': '40%' as DimensionValue,
  '3/5': '60%' as DimensionValue,
  '4/5': '80%' as DimensionValue,
  '1/6': '16.666%' as DimensionValue,
  '2/6': '33.333%' as DimensionValue,
  '3/6': '50%' as DimensionValue,
  '4/6': '66.666%' as DimensionValue,
  '5/6': '83.333%' as DimensionValue,
  full: '100%' as DimensionValue,
} as const;
