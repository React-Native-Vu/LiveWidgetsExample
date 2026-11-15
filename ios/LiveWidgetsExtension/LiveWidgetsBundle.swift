import WidgetKit
import SwiftUI
#if canImport(react_native_live_widgets)
import react_native_live_widgets
#endif

/// Bundle mở rộng hỗ trợ cả Live Activity (Lock Screen & Dynamic Island)
/// và Home Screen Widgets (Màn hình chính iOS 16.1 -> iOS 17/18/27+)
@main
struct LiveWidgetsBundle: WidgetBundle {
  var body: some Widget {
    // 1. Live Activity & Dynamic Island (iOS 16.1+)
    if #available(iOS 16.1, *) {
      DynamicLiveActivityWidget()
    }

    // 2. Tiện ích chính (Dynamic / Đang chọn trong App)
    DynamicHomeScreenWidget()

    // 3. Tiện ích Bộ đếm tương tác (Interactive TS Counter)
    InteractiveCounterHomeScreenWidget()

    // 4. Tiện ích Bảo mật & Tính năng Pro (Core 2.0)
    ProFeaturesHomeScreenWidget()

    // 5. Tiện ích Chấm công & Ca làm việc (Shift Attendance)
    ShiftAttendanceHomeScreenWidget()

    // 6. Tiện ích Không gian làm việc đa trang (Multi-Page Workspace)
    MultiPageHomeScreenWidget()
  }
}

// ── 1. TIỆN ÍCH CHÍNH (ĐỒNG BỘ THEO MẪU ĐANG CHỌN) ──
struct DynamicHomeScreenWidget: Widget {
  let kind: String = "DynamicHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "main")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName("Tiện ích Live Widgets")
    .description("Tự động đồng bộ và hiển thị theo mẫu giao diện bạn chọn trong ứng dụng.")
    .supportedFamilies(commonFamilies)
  }
}

// ── 2. TIỆN ÍCH BỘ ĐẾM TƯƠNG TÁC TYPESCRIPT ──
struct InteractiveCounterHomeScreenWidget: Widget {
  let kind: String = "InteractiveCounterHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "counter")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName("Bộ đếm tương tác (TS)")
    .description("Bấm nút [+] hoặc [-] để kích hoạt trực tiếp hàm logic TypeScript.")
    .supportedFamilies(commonFamilies)
  }
}

// ── 3. TIỆN ÍCH BẢO MẬT & KPI PRO (CORE 2.0) ──
struct ProFeaturesHomeScreenWidget: Widget {
  let kind: String = "ProFeaturesHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "pro")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName("Bảo mật & KPI Pro")
    .description("Tự che số khi khoá máy (Privacy Sensitive) và hỗ trợ chế độ StandBy.")
    .supportedFamilies(commonFamilies)
  }
}

// ── 4. TIỆN ÍCH CHẤM CÔNG & CA LÀM VIỆC ──
struct ShiftAttendanceHomeScreenWidget: Widget {
  let kind: String = "ShiftAttendanceHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "shift")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName("Chấm công & Ca làm việc")
    .description("Theo dõi giờ vào làm, thời gian tan ca và thanh tiến trình công việc.")
    .supportedFamilies(commonFamilies)
  }
}

// ── 5. TIỆN ÍCH KHÔNG GIAN ĐA TRANG (MULTI-PAGE) ──
struct MultiPageHomeScreenWidget: Widget {
  let kind: String = "MultiPageHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "workspace")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName("Không gian đa trang")
    .description("Chuyển đổi qua lại giữa Ca làm, Công việc và OKRs ngay trên mặt Widget.")
    .supportedFamilies(commonFamilies)
  }
}

private var commonFamilies: [WidgetFamily] {
  var list: [WidgetFamily] = [.systemSmall, .systemMedium, .systemLarge]
  if #available(iOS 16.0, *) {
    list.append(contentsOf: [.accessoryRectangular, .accessoryCircular, .accessoryInline])
  }
  return list
}
