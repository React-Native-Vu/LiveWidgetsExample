import { UIPreset } from '../types/preset';
import { dataBindingPreset } from './dataBindingPreset';
import { jsxWorkspacePreset } from './jsxWorkspacePreset';
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
  dataBindingPreset,
  jsxWorkspacePreset,
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

export { dataBindingPreset } from './dataBindingPreset';
export { buildWidgetFromApi } from './apiShiftBuilder';
export { jsxWorkspacePreset, buildJsxWidgets } from './jsxWorkspacePreset';
