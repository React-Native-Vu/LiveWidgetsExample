import { defineWidgetsConfig } from 'react-native-live-widgets';

/**
 * Cấu hình hệ thống Tiện ích WidgetKit (iOS) & Android Widgets
 * Hỗ trợ Đa ngôn ngữ (i18n) tự động:
 * - Trỏ vào thư mục chứa các file json ngôn ngữ (vi.json, en.json, ja.json...)
 * - Tự động đồng bộ các bản dịch sang Apple Localizable.strings & Localizable.xcstrings
 * - Khi đổi ngôn ngữ thiết bị iPhone (Tiếng Việt, Anh, Nhật...), Widget Gallery tự đổi theo!
 *
 * Chạy lệnh sau để tự động sinh mã Swift & bản dịch:
 *   npx react-native-live-widgets codegen
 */
export default defineWidgetsConfig({
  bundleName: 'LiveWidgetsBundle',
  liveActivity: true, // Tiện ích Live Activity & Dynamic Island (iOS 16.1+)
  controlWidgets: true, // Tiện ích Trung tâm điều khiển Control Center (iOS 18.0+)

  // 🌐 Cấu hình nguồn đa ngôn ngữ i18n
  i18n: {
    localesDir: './src/locales',
    defaultLocale: 'vi',
  },

  widgets: [
    {
      key: 'main',
      kind: 'DynamicHomeScreenWidget',
      // 👇 Truyền trực tiếp key string như hàm t('widgets.main.title')
      displayName: 'widgets.main.title',
      description: 'widgets.main.desc',
    },
    {
      key: 'counter',
      kind: 'InteractiveCounterHomeScreenWidget',
      displayName: 'widgets.counter.title',
      description: 'widgets.counter.desc',
    },
    {
      key: 'pro',
      kind: 'ProFeaturesHomeScreenWidget',
      displayName: 'widgets.pro.title',
      description: 'widgets.pro.desc',
      standbyMargins: true,
    },
    {
      key: 'shift',
      kind: 'ShiftAttendanceHomeScreenWidget',
      displayName: 'widgets.shift.title',
      description: 'widgets.shift.desc',
    },
    {
      key: 'workspace',
      kind: 'MultiPageHomeScreenWidget',
      displayName: 'widgets.workspace.title',
      description: 'widgets.workspace.desc',
    },
  ],
});
