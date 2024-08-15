export interface IItemList {
  id?: string;
  title: string;
  subTitle?: string;
  isSelected?: boolean;
}

export interface ISingleDrawerProps<ItemT> {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  data: ItemT[];
  onSelect?: (item?: ItemT) => void;
  itemSelected?: ItemT;
}

export interface IDrawerHeaderProps {
  onClose?: () => void;
  title?: string;
}
