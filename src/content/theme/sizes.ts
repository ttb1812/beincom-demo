// @ts-ignore
import { spacing } from './spacing';

const container = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const padding = {
  horizontalPadding: spacing['4'],
};
/**
 * The size key allows you to customize the global spacing and sizing scale for your project. By default these spacing value can be referenced by the padding, margin, and top, left, right, bottom props.
 * */
const sizes = {
  ...spacing,
  ...container,
  ...padding,
};
export default sizes;
