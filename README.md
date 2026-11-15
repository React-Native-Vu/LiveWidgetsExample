# LiveWidgetsExample 📱

Official Showcase & Demo Application for [**`react-native-live-widgets`**](https://github.com/React-Native-Vu/react-native-live-widgets).

A complete bare React Native sample app demonstrating:
- 🏝️ **Live Activities & Dynamic Island** (Compact, Minimal, Expanded with timers & segmented progress).
- 📱 **Interactive Home Screen Widgets** (5 distinct widgets: Counter, Pro Features, Shift Attendance, Multi-Page, Dynamic Hub).
- ⚡ **Bi-directional Action Dispatcher** (TypeScript handlers triggered from widget buttons).
- 🔄 **Realtime Data Sync** with `@react-native-async-storage/async-storage` & `SharedStorage` (App Group).
- 🌐 **Silent Background Remote API Sync** (Simulated REST endpoint fetching ca làm việc / công việc).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js >= 18
- Xcode >= 15 (with iOS 16.1+ simulator or physical device)
- CocoaPods (`sudo gem install cocoapods`)
- Android Studio (for Android build)

### 2. Installation

```bash
# Clone repository
git clone https://github.com/React-Native-Vu/LiveWidgetsExample.git
cd LiveWidgetsExample

# Install dependencies
npm install

# Install iOS CocoaPods
cd ios && pod install && cd ..
```

---

## 🏃‍♂️ Running the Demo

### iOS (Simulator / Device)
```bash
# Start Metro bundler
npm start

# In another terminal:
npm run ios
# or run specifically on iPhone 16 Pro:
npx react-native run-ios --simulator="iPhone 16 Pro"
```

### Android (Emulator / Device)
```bash
npm run android
```

---

## 🧪 Interactive Test Presets Included

1. **Bộ đếm tương tác TypeScript (Interactive TS Counter)**: Tap `[+]` or `[-]` on the home screen widget to trigger TypeScript callbacks in React Native with realtime sync.
2. **Bảo mật & Tính năng Pro (Core 2.0)**: Privacy-sensitive masking, numeric rolling animation, SF Symbols with bounce/pulse effects, StandBy mode.
3. **Chấm công & Ca làm việc (Shift Attendance)**: Segmented progress bars with 4 shifts, countdown timer to end of shift, check-in quick actions.
4. **Không gian làm việc đa trang (Multi-Page Space)**: Direct carousel pagination on the widget surface without opening the app (`actionId: "page:next"`).
5. **Đồng bộ dữ liệu từ REST API**: Simulates background fetching from remote server and updates widget timelines dynamically.

---

## 📄 License
MIT © 2026 vu-tran
