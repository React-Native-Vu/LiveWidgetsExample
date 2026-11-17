//
// LiveWidgetsBundle.swift
// Generated automatically by react-native-live-widgets. DO NOT EDIT DIRECTLY.
// Source config: widgets.config.ts
//

import WidgetKit
import SwiftUI
#if canImport(react_native_live_widgets)
import react_native_live_widgets
#endif

/// Bundle extension supporting both Live Activities (Dynamic Island / Lock Screen)
/// and Home Screen Widgets (iOS 16.1 -> iOS 17/18+)
@main
struct LiveWidgetsBundle: WidgetBundle {
  var body: some Widget {
    // 1. Live Activity & Dynamic Island (iOS 16.1+)
    if #available(iOS 16.1, *) {
      DynamicLiveActivityWidget()
    }

    // 2. Home Screen Widgets registered from TypeScript configuration
    DynamicHomeScreenWidget()
    InteractiveCounterHomeScreenWidget()
    ProFeaturesHomeScreenWidget()
    ShiftAttendanceHomeScreenWidget()
    MultiPageHomeScreenWidget()

    // 3. iOS 18+ Interactive Control Center Widgets
    if #available(iOS 18.0, *) {
      DynamicControlWidget()
      DynamicControlToggleWidget()
    }
  }
}

// ── 1. TIỆN ÍCH: TIỆN ÍCH LIVE WIDGETS (KEY: "main") ──
struct DynamicHomeScreenWidget: Widget {
  let kind: String = "DynamicHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "main")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName(LocalizedStringKey("widgets.main.title"))
    .description(LocalizedStringKey("widgets.main.desc"))
    .supportedFamilies(commonFamilies)
  }
}

// ── 2. TIỆN ÍCH: BỘ ĐẾM TƯƠNG TÁC (TS) (KEY: "counter") ──
struct InteractiveCounterHomeScreenWidget: Widget {
  let kind: String = "InteractiveCounterHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "counter")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName(LocalizedStringKey("widgets.counter.title"))
    .description(LocalizedStringKey("widgets.counter.desc"))
    .supportedFamilies(commonFamilies)
  }
}

// ── 3. TIỆN ÍCH: BẢO MẬT & KPI PRO (KEY: "pro") ──
struct ProFeaturesHomeScreenWidget: Widget {
  let kind: String = "ProFeaturesHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "pro")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName(LocalizedStringKey("widgets.pro.title"))
    .description(LocalizedStringKey("widgets.pro.desc"))
    .supportedFamilies(commonFamilies)
    .applyStandByMargins()
  }
}

// ── 4. TIỆN ÍCH: CHẤM CÔNG & CA LÀM VIỆC (KEY: "shift") ──
struct ShiftAttendanceHomeScreenWidget: Widget {
  let kind: String = "ShiftAttendanceHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "shift")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName(LocalizedStringKey("widgets.shift.title"))
    .description(LocalizedStringKey("widgets.shift.desc"))
    .supportedFamilies(commonFamilies)
  }
}

// ── 5. TIỆN ÍCH: KHÔNG GIAN ĐA TRANG (KEY: "workspace") ──
struct MultiPageHomeScreenWidget: Widget {
  let kind: String = "MultiPageHomeScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: DynamicWidgetProvider(widgetKey: "workspace")) { entry in
      DynamicHomeScreenWidgetView(entry: entry)
    }
    .configurationDisplayName(LocalizedStringKey("widgets.workspace.title"))
    .description(LocalizedStringKey("widgets.workspace.desc"))
    .supportedFamilies(commonFamilies)
  }
}

private var commonFamilies: [WidgetFamily] {
  var list: [WidgetFamily] = [.systemSmall, .systemMedium, .systemLarge, .systemExtraLarge]
  if #available(iOS 16.0, *) {
    list.append(contentsOf: [.accessoryRectangular, .accessoryCircular, .accessoryInline])
  }
  return list
}
