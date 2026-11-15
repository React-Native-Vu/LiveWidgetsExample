import { UIPreset } from '../types/preset';
import { interactiveCounterPreset } from './interactiveCounterPreset';
import { proFeaturesPreset } from './proFeaturesPreset';
import { interactiveWorkspacePreset } from './interactiveWorkspacePreset';
import { executiveKpiPreset } from './executiveKpiPreset';
import { mediaOrderPreset } from './mediaOrderPreset';
import { shiftAttendancePreset } from './shiftAttendancePreset';
import { deliveryTrackingPreset } from './deliveryTrackingPreset';
import { workoutTrackerPreset } from './workoutTrackerPreset';
import { sprintTasksPreset } from './sprintTasksPreset';

export const UI_PRESETS: UIPreset[] = [
  interactiveCounterPreset,
  proFeaturesPreset,
  interactiveWorkspacePreset,
  executiveKpiPreset,
  mediaOrderPreset,
  shiftAttendancePreset,
  deliveryTrackingPreset,
  workoutTrackerPreset,
  sprintTasksPreset,
];

export { buildWidgetFromApi } from './apiShiftBuilder';
