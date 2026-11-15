import {
  DynamicIslandConfig,
  LayoutNode,
  WidgetLayoutConfig,
} from 'react-native-live-widgets';

export interface UIPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  accentColor: string;
  bgPreview: string;
  buildWidgetLayouts: () => WidgetLayoutConfig;
  buildLiveActivity: (isPlaying?: boolean, phase?: number) => {
    lockScreen: LayoutNode;
    dynamicIsland: DynamicIslandConfig;
  };
}

export interface ShiftApiResponse {
  employeeName: string;
  department: string;
  shiftName: string;
  checkInTime: string;
  endTimestamp: number;
  completedHours: number;
  totalHours: number;
  tasks: Array<{ id: string; title: string; done: boolean; time: string }>;
}

