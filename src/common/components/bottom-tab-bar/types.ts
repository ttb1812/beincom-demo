export interface ICustomTabButtonProps {
  onPress?: () => void;
  onLongPress?: () => void;
  label?: string;
  isFocused: boolean;
  routeName?: string;
}
