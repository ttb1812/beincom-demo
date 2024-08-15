export interface IFilterItem {
  id: string;
  title: string;
  key: string;
}

export interface IFilterCarouselProps<T> {
  filterOption?: T;
  setFilterOption?: (value: T) => void;
  filters?: T[];
}
