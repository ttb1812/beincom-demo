//@ts-ignore
export interface PlatformProps<T> {
  /**
   * Props only for ios
   */
  _ios?: Partial<T>;
  /**
   * Props only for android
   */
  _android?: Partial<T>;
  /**
   * Props only for table
   */
  _tablet?: Partial<T>;
  /**
   * Props with highest specificity
   */
  _important?: Partial<T>;
}
