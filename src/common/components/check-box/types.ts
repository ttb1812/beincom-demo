export interface ICheckBoxProps {
  isChecked?: boolean;
  indeterminate?: boolean;
  onToggle?: () => void;
  underlayColor?: string;
  uncheckedColor?: string;
}
