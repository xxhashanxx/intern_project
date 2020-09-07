export interface TabItem {
  label: string;
  name: string;
}
export type TabItems = Array<TabItem>;

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
