import { defineWidgetConfig } from 'react-native-live-widgets';

/**
 * ==============================================================================
 * react-native-live-widgets Configuration (widgets.config.ts)
 * ==============================================================================
 *
 * This configuration file drives the TypeScript codegen engine.
 * Run the following command whenever you modify this file:
 *
 *   npx react-native-live-widgets codegen
 *
 * It will automatically:
 *   1. Generate 'LiveWidgetsBundle.swift' for iOS WidgetKit Extension.
 *   2. Generate modern Apple String Catalog ('Localizable.xcstrings').
 *   3. Synchronize Android string resources ('res/values-{locale}/strings.xml').
 *   4. Synchronize SF Symbols (iOS) & Material Icons (Android) type definitions.
 * ==============================================================================
 */
export default defineWidgetConfig({
  /**
   * The name of the Swift WidgetBundle struct generated in the iOS extension.
   * Default: 'LiveWidgetsBundle'
   */
  bundleName: 'LiveWidgetsBundle',

  /**
   * Enable or disable iOS Lock Screen Live Activities & Dynamic Island.
   * Set to 'false' if your application only uses Home Screen widgets.
   */
  liveActivity: true,

  /**
   * Enable or disable iOS 18+ Interactive Control Center widgets.
   */
  controlWidgets: true,

  /**
   * Default fallback locale for widget titles, descriptions, and static labels.
   */
  defaultLocale: 'vi',

  /**
   * Multi-language translation catalog.
   * Keys defined here are automatically mapped to:
   *   - iOS: Localizable.xcstrings (LocalizedStringKey in Swift)
   *   - Android: res/values-{lang}/strings.xml (R.string in Kotlin/Java)
   */
  locales: {
    vi: {
      'widgets.main.title': 'Tiện ích Live Widgets',
      'widgets.main.desc': 'Tự động đồng bộ và hiển thị theo mẫu giao diện bạn chọn trong ứng dụng.',
      'widgets.counter.title': 'Bộ đếm tương tác (TS)',
      'widgets.counter.desc': 'Bấm nút [+] hoặc [-] để kích hoạt trực tiếp hàm logic TypeScript.',
      'widgets.pro.title': 'Bảo mật & KPI Pro',
      'widgets.pro.desc': 'Tự che số khi khoá máy (Privacy Sensitive) và hỗ trợ chế độ StandBy.',
      'widgets.shift.title': 'Chấm công & Ca làm việc',
      'widgets.shift.desc': 'Theo dõi giờ vào làm, thời gian tan ca và thanh tiến trình công việc.',
      'widgets.workspace.title': 'Không gian đa trang',
      'widgets.workspace.desc': 'Chuyển đổi qua lại giữa Ca làm, Công việc và OKRs ngay trên mặt Widget.',
    },
    en: {
      'widgets.main.title': 'Live Widgets Utility',
      'widgets.main.desc': 'Automatically syncs and displays layouts defined in your React Native app.',
      'widgets.counter.title': 'Interactive Counter (TS)',
      'widgets.counter.desc': 'Tap [+] or [-] to trigger TypeScript logic without opening the app.',
      'widgets.pro.title': 'Security & KPI Pro',
      'widgets.pro.desc': 'Auto-redacts numbers when locked (Privacy Sensitive) and supports StandBy mode.',
      'widgets.shift.title': 'Attendance & Shift',
      'widgets.shift.desc': 'Track shift check-in, checkout time, and work progress bar.',
      'widgets.workspace.title': 'Multi-page Workspace',
      'widgets.workspace.desc': 'Switch between Shifts, Tasks, and OKRs right from the Home Widget.',
    },
  },

  /**
   * List of registered Home Screen widgets.
   * Each entry maps to a distinct timeline provider and widget kind.
   */
  widgets: [
    {
      /** Unique key identifier used in Widget.setLayout('<key>', ...) */
      key: 'main',

      /** Native Swift struct kind name generated in WidgetBundle */
      kind: 'DynamicHomeScreenWidget',

      /** Display name shown in the iOS & Android Widget Gallery picker */
      displayName: 'widgets.main.title',

      /** Description shown below the widget preview in the Widget Gallery */
      description: 'widgets.main.desc',

      /** Supported widget sizes for this widget */
      supportedFamilies: ['systemSmall', 'systemMedium', 'systemLarge'],
    },
    {
      key: 'counter',
      kind: 'InteractiveCounterHomeScreenWidget',
      displayName: 'widgets.counter.title',
      description: 'widgets.counter.desc',
      supportedFamilies: ['systemSmall', 'systemMedium', 'systemLarge'],
    },
    {
      key: 'pro',
      kind: 'ProFeaturesHomeScreenWidget',
      displayName: 'widgets.pro.title',
      description: 'widgets.pro.desc',
      supportedFamilies: ['systemSmall', 'systemMedium', 'systemLarge'],
    },
    {
      key: 'shift',
      kind: 'ShiftAttendanceHomeScreenWidget',
      displayName: 'widgets.shift.title',
      description: 'widgets.shift.desc',
      supportedFamilies: ['systemSmall', 'systemMedium', 'systemLarge'],
    },
    {
      key: 'workspace',
      kind: 'MultiPageHomeScreenWidget',
      displayName: 'widgets.workspace.title',
      description: 'widgets.workspace.desc',
      supportedFamilies: ['systemSmall', 'systemMedium', 'systemLarge'],
    },
  ],
});
