export interface Overview {
  orders: OverviewInterfaceItem;
  gain: OverviewInterfaceItem;
}

export interface OverviewInterfaceItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}
