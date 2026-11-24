import React, { useEffect, useRef, useState } from 'react';
import {
  AppState,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ControlWidget,
  ControlWidgetConfig,
  LiveActivity,
  LiveActivityPushTokens,
  SharedStorage,
  UI,
  Widget,
  WidgetPreview,
  useWidgetAction,
} from 'react-native-live-widgets';

const SAMPLE_BINDING_DATASETS = [
  {
    user: { name: 'Trần Tuấn Vũ', role: 'Mobile Lead' },
    attendance: { progress: 82, checkInTime: '07:54', onTime: true },
    kpi: { revenue: 45200000 },
    _syncStatus: 'ok',
    _lastSyncTime: '08:15:00',
  },
  {
    user: { name: 'Nguyễn Minh Anh', role: 'Product Manager' },
    attendance: { progress: 96, checkInTime: '07:45', onTime: true },
    kpi: { revenue: 68500000 },
    _syncStatus: 'ok',
    _lastSyncTime: '09:30:00',
  },
  {
    user: { name: 'Lê Hoàng Nam', role: 'iOS Engineer' },
    attendance: { progress: 45, checkInTime: '08:35', onTime: false },
    kpi: { revenue: 19800000 },
    _syncStatus: 'partial',
    _lastSyncTime: '10:05:00',
  },
];

import { ShiftApiResponse, UIPreset } from './src/types/preset';
import { buildWidgetFromApi, dataBindingPreset, UI_PRESETS } from './src/presets';
import { shiftAttendancePreset } from './src/presets/shiftAttendancePreset';
import { proFeaturesPreset } from './src/presets/proFeaturesPreset';
import { interactiveWorkspacePreset } from './src/presets/interactiveWorkspacePreset';
import {
  getCounterValue,
  setCounterValue,
  subscribeCounterValue,
  interactiveCounterPreset,
} from './src/presets/interactiveCounterPreset';
import { HeaderSection } from './src/components/HeaderSection';
import { MusicPlayerSection } from './src/components/MusicPlayerSection';
import { ApiSyncPanel, formatIntervalLabel } from './src/components/ApiSyncPanel';
import { FeaturesTesterPanel } from './src/components/FeaturesTesterPanel';
import { EnterpriseFeaturesPanel } from './src/components/EnterpriseFeaturesPanel';
import { PushTokenPanel } from './src/components/PushTokenPanel';
import { PresetCard } from './src/components/PresetCard';
import { ActivityLogPanel } from './src/components/ActivityLogPanel';

const APP_GROUP = 'group.com.livewidgetsexample';

export default function App() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(UI_PRESETS[0].id);
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);
  const [loadingApi, setLoadingApi] = useState<boolean>(false);
  const [pushTokens, setPushTokens] = useState<LiveActivityPushTokens>({
    devicePushToken: null,
    pushToStartToken: null,
    activityUpdateToken: null,
    allActivityUpdateTokens: {},
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [canPinWidget, setCanPinWidget] = useState<boolean>(false);
  const [mockDataIdx, setMockDataIdx] = useState<number>(0);
  const [autoCycle1Min, setAutoCycle1Min] = useState<boolean>(false);
  const [autoIntervalSec, setAutoIntervalSec] = useState<number>(60);
  const [autoCountdownSec, setAutoCountdownSec] = useState<number>(60);
  const mockDataIdxRef = useRef<number>(mockDataIdx);
  mockDataIdxRef.current = mockDataIdx;
  const autoIntervalSecRef = useRef<number>(autoIntervalSec);
  autoIntervalSecRef.current = autoIntervalSec;
  const lastAutoTickTimeRef = useRef<string | null>(null);
  const autoRemainingRef = useRef<number>(60);
  const [, setCounterUiValue] = useState<number>(() => getCounterValue());
  const selectedPresetIdRef = useRef<string>(selectedPresetId);
  selectedPresetIdRef.current = selectedPresetId;
  const activeActivityIdRef = useRef<string | null>(activeActivityId);
  activeActivityIdRef.current = activeActivityId;
  const [activeControlCfg, setActiveControlCfg] = useState<ControlWidgetConfig>(() =>
    ControlWidget.toggle({
      title: 'Tạm nghỉ',
      subtitle: 'Chạm để vào ca',
      checkedTitle: 'Đang trong ca',
      checkedSubtitle: 'Live Control đang bật',
      systemName: 'clock.badge.checkmark.fill',
      tintColor: '#10B981',
      checked: true,
      actionId: 'toggle:attendance_control',
    })
  );

  const activeBoundData = lastAutoTickTimeRef.current
    ? {
        ...SAMPLE_BINDING_DATASETS[mockDataIdx],
        _lastSyncTime: lastAutoTickTimeRef.current,
      }
    : SAMPLE_BINDING_DATASETS[mockDataIdx];

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  };

  // Hook v1.2: Lắng nghe toàn cục sự kiện tương tác nút bấm, tương thích Fast Refresh
  useWidgetAction((actionId) => {
    addLog(`[Hook useWidgetAction] Thao tác: ${actionId}`);
  });

  const handleRequestPinWidget = async () => {
    try {
      const ok = await Widget.requestPin();
      if (ok) {
        addLog('Đã mở hộp thoại ghim Tiện ích vào Màn hình chính');
      } else {
        addLog('Thiết bị hoặc Launcher không hỗ trợ ghim tự động');
      }
    } catch (e: any) {
      addLog(`Lỗi ghim Widget: ${e.message}`);
    }
  };

  const refreshAllApnsTokens = async (actId?: string | null) => {
    const tokens = await LiveActivity.getAllPushTokens(actId || activeActivityId || '');
    setPushTokens(tokens);
    addLog(
      `Push Tokens: Device=${tokens.devicePushToken?.slice(0, 10) || 'N/A'}... | Start=${
        tokens.pushToStartToken?.slice(0, 10) || 'N/A'
      }...`
    );
  };

  const handleFetchApiToWidget = async () => {
    try {
      setLoadingApi(true);
      addLog('Đang gọi API lấy dữ liệu ca làm việc...');

      await fetch('https://jsonplaceholder.typicode.com/todos/1').catch(() => null);

      const randomDoneHours = Number((Math.random() * 4 + 3.5).toFixed(1));
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const apiData: ShiftApiResponse = {
        employeeName: 'Trần Tuấn Vũ',
        department: 'Mobile Team',
        shiftName: `Ca chiều (Cập nhật lúc ${nowStr})`,
        checkInTime: '07:55',
        endTimestamp: Math.floor(Date.now() / 1000) + 3900,
        completedHours: randomDoneHours,
        totalHours: 8,
        tasks: [
          { id: '1', title: 'Đồng bộ API chấm công vào Widget', done: true, time: '09:30' },
          { id: '2', title: 'Hiển thị danh sách công việc động', done: true, time: '11:15' },
          { id: '3', title: `Kiểm tra lúc ${nowStr} (${randomDoneHours}/8h)`, done: false, time: 'Đang chạy' },
        ],
      };

      const dynamicLayouts = buildWidgetFromApi(apiData);
      setAutoCycle1Min(false);
      lastAutoTickTimeRef.current = null;
      await SharedStorage.remove('widget_timeline_main', APP_GROUP);
      await Widget.setLayout('main', dynamicLayouts, APP_GROUP);
      await Widget.reload('DynamicHomeScreenWidget');

      setSelectedPresetId('api_live');
      addLog(`Đã đồng bộ API (${randomDoneHours}/8h) ra Widget`);
    } catch (e: any) {
      addLog(`Lỗi gọi API: ${e.message}`);
    } finally {
      setLoadingApi(false);
    }
  };

  const handleSetupDataEngine2 = async () => {
    try {
      setAutoCycle1Min(false);
      lastAutoTickTimeRef.current = null;
      await SharedStorage.remove('widget_timeline_main', APP_GROUP);
      const customTtlSec = autoIntervalSecRef.current;
      const customRefreshMins = Math.max(1, Math.round(customTtlSec / 60));
      const ok = await Widget.setRemoteConfig(
        'main',
        {
          cacheTtlSeconds: customTtlSec,
          timeoutMs: 6000,
          enableETag: true,
          maxRetries: 2,
          retryDelayMs: 500,
          sources: {
            todo: { url: 'https://jsonplaceholder.typicode.com/todos/1' },
            post: { url: 'https://jsonplaceholder.typicode.com/posts/1' },
          },
          mapping: {
            'user.name': '{{todo.title|upper}}',
            'attendance.progress': '{{todo.userId|multiply:88|default:88}}',
          },
          schema: {
            requiredKeys: ['todo.title'],
            defaults: {
              'user.role': 'Remote Synced',
              'attendance.checkInTime': '08:00',
              'attendance.onTime': true,
              'kpi.revenue': 52000000,
            },
          },
          errorFallback: UI.VStack(
            { padding: 14, backgroundColor: '#450A0A', spacing: 4 },
            UI.Text('Lỗi Data Engine 2.0 ({{_httpStatus}})', {
              fontSize: 13,
              fontWeight: 'bold',
              color: '#FCA5A5',
            }),
            UI.Text('{{_syncError}}', { fontSize: 11, color: '#FECACA' })
          ),
          refreshIntervalMinutes: customRefreshMins,
        },
        APP_GROUP
      );
      await Widget.reloadAll();
      addLog(
        ok
          ? `🚀 Đã nạp Remote Config 2.0 (TTL ${customTtlSec}s, Interval ${customRefreshMins}m, ETag, Retry x2, Multi-Source, Schema)`
          : '⚠️ Không thể nạp Remote Config 2.0'
      );
    } catch (e: any) {
      addLog(`Lỗi Data Engine 2.0: ${e.message}`);
    }
  };

  const scheduleCustomTimeline = async (
    startIdx: number,
    intervalSec = autoIntervalSecRef.current,
    nowMs = Date.now()
  ) => {
    const safeInterval = Math.max(5, intervalSec);
    const baseLayouts = dataBindingPreset.buildWidgetLayouts();
    const entries = Array.from({ length: 15 }, (_, i) => {
      const entryMs = nowMs + i * safeInterval * 1000;
      const sample = SAMPLE_BINDING_DATASETS[(startIdx + i) % SAMPLE_BINDING_DATASETS.length];
      const syncLabel = new Date(entryMs).toLocaleTimeString('en-GB', { hour12: false });
      return {
        date: Math.floor(entryMs / 1000),
        layout: baseLayouts,
        data: {
          ...sample,
          _lastSyncTime: syncLabel,
        },
      };
    });

    const currentSample = SAMPLE_BINDING_DATASETS[startIdx % SAMPLE_BINDING_DATASETS.length];
    const currentSyncLabel = new Date(nowMs).toLocaleTimeString('en-GB', { hour12: false });
    await Widget.setLayout('main', baseLayouts, APP_GROUP);
    await Widget.setData(
      'main',
      { ...currentSample, _lastSyncTime: currentSyncLabel },
      APP_GROUP
    );
    await Widget.setTimeline('main', { entries, policy: 'atEnd' }, APP_GROUP);
  };

  const handleChangeAutoIntervalSec = async (seconds: number) => {
    const safeSec = Math.max(5, Math.floor(seconds));
    autoIntervalSecRef.current = safeSec;
    setAutoIntervalSec(safeSec);
    autoRemainingRef.current = safeSec;
    setAutoCountdownSec(safeSec);

    if (autoCycle1Min) {
      const nowMs = Date.now();
      lastAutoTickTimeRef.current = new Date(nowMs).toLocaleTimeString('en-GB', { hour12: false });
      try {
        await scheduleCustomTimeline(mockDataIdxRef.current, safeSec, nowMs);
        addLog(`⏱ Đã đổi chu kỳ Auto sang mỗi ${formatIntervalLabel(safeSec)}`);
      } catch (e: any) {
        addLog(`Lỗi cập nhật chu kỳ Timeline: ${e.message}`);
      }
    }
  };

  const handleToggleAutoCycle = async () => {
    const intervalSec = Math.max(5, autoIntervalSecRef.current);
    if (autoCycle1Min) {
      setAutoCycle1Min(false);
      autoRemainingRef.current = intervalSec;
      setAutoCountdownSec(intervalSec);
      await SharedStorage.remove('widget_timeline_main', APP_GROUP);
      addLog('⏹ Đã tắt chế độ tự động đổi dữ liệu');
      return;
    }

    const nowMs = Date.now();
    lastAutoTickTimeRef.current = new Date(nowMs).toLocaleTimeString('en-GB', { hour12: false });
    autoRemainingRef.current = intervalSec;
    setSelectedPresetId(dataBindingPreset.id);
    setAutoCountdownSec(intervalSec);
    setAutoCycle1Min(true);
    try {
      await scheduleCustomTimeline(mockDataIdxRef.current, intervalSec, nowMs);
      const curr = SAMPLE_BINDING_DATASETS[mockDataIdxRef.current];
      addLog(
        `⏱ Bật Auto mỗi ${formatIntervalLabel(intervalSec)}: Bắt đầu với ${curr.user.name} (${curr.attendance.progress}%), đã lập lịch 15 mốc Timeline`
      );
    } catch (e: any) {
      addLog(`Lỗi bật Auto Sync: ${e.message}`);
    }
  };

  const handleCycleMockData = async () => {
    const nextIdx = (mockDataIdx + 1) % SAMPLE_BINDING_DATASETS.length;
    setMockDataIdx(nextIdx);
    const nextSample = SAMPLE_BINDING_DATASETS[nextIdx];
    const nowMs = Date.now();
    lastAutoTickTimeRef.current = new Date(nowMs).toLocaleTimeString('en-GB', { hour12: false });
    try {
      setSelectedPresetId(dataBindingPreset.id);
      if (autoCycle1Min) {
        const intervalSec = Math.max(5, autoIntervalSecRef.current);
        autoRemainingRef.current = intervalSec;
        setAutoCountdownSec(intervalSec);
        await scheduleCustomTimeline(nextIdx, intervalSec, nowMs);
      } else {
        await SharedStorage.remove('widget_timeline_main', APP_GROUP);
        await Widget.setLayout('main', dataBindingPreset.buildWidgetLayouts(), APP_GROUP);
        await Widget.setData(
          'main',
          { ...nextSample, _lastSyncTime: lastAutoTickTimeRef.current },
          APP_GROUP
        );
      }
      addLog(
        `🔄 Đã đổi & đồng bộ Data Binding -> ${nextSample.user.name} (${nextSample.attendance.progress}%)`
      );
    } catch (e: any) {
      addLog(`Lỗi đồng bộ Data Binding: ${e.message}`);
    }
  };

  const applyPresetToWidget = async (preset: UIPreset) => {
    try {
      setSelectedPresetId(preset.id);
      setAutoCycle1Min(false);
      lastAutoTickTimeRef.current = null;
      await SharedStorage.remove('widget_timeline_main', APP_GROUP);
      const layouts = preset.buildWidgetLayouts();

      // Cập nhật slot 'main' theo preset người dùng đang chọn trên giao diện
      const ok = await Widget.setLayout('main', layouts, APP_GROUP);

      // Nếu preset này ứng với một slot chuyên biệt, cập nhật đồng bộ thêm vào slot đó
      if (preset.id === 'interactive_counter') {
        await Widget.setLayout('counter', layouts, APP_GROUP);
      } else if (preset.id === 'shift_attendance') {
        await Widget.setLayout('shift', layouts, APP_GROUP);
      } else if (preset.id === 'pro_features') {
        await Widget.setLayout('pro', layouts, APP_GROUP);
      } else if (preset.id === 'interactive_workspace' || preset.id === 'jsx_workspace') {
        await Widget.setLayout('workspace', layouts, APP_GROUP);
      }

      if (preset.id === 'data_engine_binding') {
        await Widget.setData('main', SAMPLE_BINDING_DATASETS[mockDataIdx], APP_GROUP);
      }

      await Widget.reloadAll();

      if (ok) {
        addLog(`Đã cập nhật mẫu "${preset.name}" ra Widget`);
      } else {
        addLog('Chưa kết nối được Native Module');
      }
    } catch (e: any) {
      addLog(`Lỗi cập nhật Widget: ${e.message}`);
    }
  };

  const applyPresetToLiveActivity = async (preset: UIPreset) => {
    try {
      const { lockScreen, dynamicIsland } = preset.buildLiveActivity();
      const actId = activeActivityId || `live_${Date.now()}`;

      if (activeActivityId) {
        await LiveActivity.update({
          activityId: activeActivityId,
          lockScreen,
          dynamicIsland,
        });
        addLog(`Đã đổi Live Activity sang mẫu "${preset.name}"`);
      } else {
        const ok = await LiveActivity.start({
          activityId: actId,
          lockScreen,
          dynamicIsland,
        });
        if (ok) {
          setActiveActivityId(actId);
          await refreshAllApnsTokens(actId);
          addLog(`Đã khởi chạy Live Activity (${actId})`);
        } else {
          addLog('Không thể bật Live Activity (kiểm tra quyền thông báo)');
        }
      }
    } catch (e: any) {
      addLog(`Lỗi Live Activity: ${e.message}`);
    }
  };

  const handleStopLiveActivity = async () => {
    if (!activeActivityId) return;
    await LiveActivity.endAll();
    setActiveActivityId(null);
    addLog('Đã kết thúc phiên Live Activity');
  };

  const persistCounterFromApp = async (newVal: number, sourceLabel = 'App Preview') => {
    setCounterValue(newVal);
    try {
      await AsyncStorage.setItem('widget_counter_value', `${newVal}`);
      await SharedStorage.set('widget_counter_value', newVal, APP_GROUP);
      await SharedStorage.remove('widget_timeline_main', APP_GROUP);
      const layouts = interactiveCounterPreset.buildWidgetLayouts();
      await Widget.setLayout('counter', layouts, APP_GROUP);
      if (selectedPresetIdRef.current === 'interactive_counter') {
        await Widget.setLayout('main', layouts, APP_GROUP);
      }
      if (activeActivityIdRef.current) {
        const { lockScreen, dynamicIsland } = interactiveCounterPreset.buildLiveActivity();
        await LiveActivity.update({
          activityId: activeActivityIdRef.current,
          lockScreen,
          dynamicIsland,
        });
      }
      await Widget.reloadAll();
      addLog(`⚡ [${sourceLabel}] Cập nhật Counter = ${newVal} (đã đồng bộ ra Widget)`);
    } catch (e: any) {
      addLog(`Lỗi cập nhật Counter: ${e.message}`);
    }
  };

  useEffect(() => {
    const unsubCounterUi = subscribeCounterValue((val) => {
      setCounterUiValue(val);
    });

    Widget.isPinSupported().then((supported) => setCanPinWidget(supported));

    const initWidgets = async () => {
      try {
        const raw = await SharedStorage.get('widget_counter_value', APP_GROUP);
        if (raw !== null && raw !== undefined) {
          const num = parseInt(String(raw), 10);
          if (!isNaN(num)) {
            setCounterValue(num);
          }
        } else {
          const saved = await AsyncStorage.getItem('widget_counter_value');
          const parsed = saved !== null ? parseInt(saved, 10) : NaN;
          const initialVal = !isNaN(parsed) ? parsed : getCounterValue();
          setCounterValue(initialVal);
          await SharedStorage.set('widget_counter_value', initialVal, APP_GROUP);
        }
      } catch {}

      // Khởi tạo các layout CHUYÊN BIỆT cho từng slot tiện ích:
      // Đảm bảo trong Widget Gallery mỗi tiện ích hiển thị giao diện đặc trưng riêng, không bị trùng lặp!
      try {
        await Widget.setLayout('counter', interactiveCounterPreset.buildWidgetLayouts(), APP_GROUP);
        await Widget.setLayout('shift', shiftAttendancePreset.buildWidgetLayouts(), APP_GROUP);
        await Widget.setLayout('pro', proFeaturesPreset.buildWidgetLayouts(), APP_GROUP);
        await Widget.setLayout('workspace', interactiveWorkspacePreset.buildWidgetLayouts(), APP_GROUP);
        await Widget.setLayout('main', UI_PRESETS[0].buildWidgetLayouts(), APP_GROUP);
        await Widget.setData('main', SAMPLE_BINDING_DATASETS[0], APP_GROUP);
        await Widget.reloadAll();
      } catch (e: any) {
        addLog(`Lỗi khởi tạo widget slots: ${e?.message}`);
      }
    };

    initWidgets();

    refreshAllApnsTokens();

    LiveActivity.areActivitiesEnabled().then((enabled) => {
      addLog(`Trạng thái Quyền Live Activity: ${enabled ? '✅ Đã Bật' : '❌ Đang Tắt'}`);
    });

    LiveActivity.areFrequentPushesEnabled().then((frequent) => {
      addLog(`Frequent APNs Pushes: ${frequent ? '✅ Sẵn sàng' : '⚠️ Bị hạn chế'}`);
    });

    LiveActivity.getActiveActivities().then((activities) => {
      addLog(`Số Live Activity đang hoạt động: ${activities.length}`);
    });

    const unsubAction = LiveActivity.registerAction('action_demo_checkin', async () => {
      addLog('⚡ Nhận sự kiện từ Widget Button: Hàm TypeScript đã được kích hoạt thành công!');
    });

    const counterActionModes: Array<[string, 'inc' | 'dec' | 'reset']> = [
      ['action_counter_inc', 'inc'],
      ['counter:inc', 'inc'],
      ['action_counter_dec', 'dec'],
      ['counter:dec', 'dec'],
      ['action_counter_reset', 'reset'],
      ['counter:reset', 'reset'],
    ];

    const unsubCounterActions = counterActionModes.map(([actionId, mode]) =>
      LiveActivity.registerAction(actionId, async (event) => {
        if (event?.fromNativeWidget) {
          const rawVal =
            event.counterValue !== undefined && event.counterValue !== null
              ? event.counterValue
              : await SharedStorage.get('widget_counter_value', APP_GROUP);
          const parsed = parseInt(String(rawVal), 10);
          const nextVal = !isNaN(parsed)
            ? parsed
            : mode === 'reset'
            ? 0
            : getCounterValue() + (mode === 'inc' ? 1 : -1);
          setCounterValue(nextVal);
          await AsyncStorage.setItem('widget_counter_value', `${nextVal}`).catch(() => {});
          addLog(`⚡ [Widget Native Button] Đồng bộ từ Extension: Counter = ${nextVal}`);
          return;
        }

        const nextVal =
          mode === 'reset' ? 0 : getCounterValue() + (mode === 'inc' ? 1 : -1);
        await persistCounterFromApp(nextVal, 'Widget Native Button');
      })
    );

    const jsxActions: Array<[string, string]> = [
      ['action_jsx_checkin', 'JSX Check-in: Điểm danh ca làm thành công!'],
      ['action_jsx_checkout', 'JSX Check-out: Đã ghi nhận kết thúc ca làm!'],
      ['action_jsx_refresh', 'JSX Làm mới: Đã đồng bộ dữ liệu ca làm mới nhất!'],
      ['action_jsx_leave', 'JSX Nghỉ phép: Đã gửi yêu cầu xin nghỉ phép!'],
      ['action_jsx_report', 'JSX Báo cáo: Đã gửi báo cáo cuối ca!'],
    ];
    const unsubJsxActions = jsxActions.map(([id, msg]) =>
      LiveActivity.registerAction(id, () => {
        addLog(`⚡ ${msg}`);
      })
    );

    // Khi người dùng từ ngoài màn hình chính quay lại App:
    const subAppState = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        const rawShared = await SharedStorage.get('widget_counter_value', APP_GROUP);
        if (rawShared !== null && rawShared !== undefined) {
          const num = parseInt(String(rawShared), 10);
          if (!isNaN(num) && num !== getCounterValue()) {
            setCounterValue(num);
            await AsyncStorage.setItem('widget_counter_value', `${num}`);
            addLog(`🔄 Đồng bộ số đếm từ Widget vào App: ${num}`);
          }
        }
      }
    });

    const unsubDevice = LiveActivity.onDevicePushTokenChange((token) => {
      setPushTokens((prev) => ({ ...prev, devicePushToken: token }));
      addLog(`Device Token: ${token.slice(0, 16)}...`);
    });

    const unsubStart = LiveActivity.onPushToStartTokenChange((token) => {
      setPushTokens((prev) => ({ ...prev, pushToStartToken: token }));
      addLog(`Push-to-Start Token: ${token.slice(0, 16)}...`);
    });

    const unsubUpdate = LiveActivity.onActivityUpdateTokenChange(({ activityId, token }) => {
      setPushTokens((prev) => ({
        ...prev,
        activityUpdateToken: token,
        allActivityUpdateTokens: { ...prev.allActivityUpdateTokens, [activityId]: token },
      }));
      addLog(`Activity Update Token (${activityId}): ${token.slice(0, 16)}...`);
    });

    const unsubLifecycle = LiveActivity.onStateChange((event) => {
      addLog(`[Lifecycle ${event.activityId}] -> ${event.state}`);
    });

    return () => {
      subAppState.remove();
      unsubCounterUi();
      unsubAction();
      unsubCounterActions.forEach((unsub) => unsub());
      unsubJsxActions.forEach((unsub) => unsub());
      unsubDevice();
      unsubStart();
      unsubUpdate();
      unsubLifecycle();
    };
  }, []);

  useEffect(() => {
    const safeSec = Math.max(5, autoIntervalSec);
    if (!autoCycle1Min) {
      autoRemainingRef.current = safeSec;
      setAutoCountdownSec(safeSec);
      return;
    }

    autoRemainingRef.current = safeSec;
    setAutoCountdownSec(safeSec);

    const timer = setInterval(() => {
      autoRemainingRef.current -= 1;
      if (autoRemainingRef.current <= 0) {
        const currentInterval = Math.max(5, autoIntervalSecRef.current);
        autoRemainingRef.current = currentInterval;
        const nextIdx = (mockDataIdxRef.current + 1) % SAMPLE_BINDING_DATASETS.length;
        mockDataIdxRef.current = nextIdx;
        const nextSample = SAMPLE_BINDING_DATASETS[nextIdx];
        const nowMs = Date.now();
        lastAutoTickTimeRef.current = new Date(nowMs).toLocaleTimeString('en-GB', { hour12: false });
        setMockDataIdx(nextIdx);
        setSelectedPresetId(dataBindingPreset.id);
        scheduleCustomTimeline(nextIdx, currentInterval, nowMs).catch(() => {});
        addLog(
          `⏰ [Auto ${formatIntervalLabel(currentInterval)}] Đã tự động đổi dữ liệu -> ${nextSample.user.name} (${nextSample.attendance.progress}%)`
        );
      }
      setAutoCountdownSec(autoRemainingRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, [autoCycle1Min, autoIntervalSec]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <HeaderSection />

        {/* ── BẢNG KIỂM THỬ TÍNH NĂNG MỚI NHÓM A → E (v1.3 ENTERPRISE) ── */}
        <EnterpriseFeaturesPanel
          appGroup={APP_GROUP}
          onLog={addLog}
          onControlChanged={(cfg) => setActiveControlCfg(cfg)}
        />

        {/* Tạm ẩn tính năng Audio Test, để lại để test sau */}
        {/* <MusicPlayerSection
          onLog={addLog}
          onActivityChanged={(actId) => setActiveActivityId(actId)}
          onApplyWidget={() => setSelectedPresetId('music_player')}
        /> */}

        {/* ── BẢNG KIỂM THỬ TÍNH NĂNG MỚI (CORE 2.0) ── */}
        <FeaturesTesterPanel
          appGroup={APP_GROUP}
          onLog={addLog}
          onControlChanged={(cfg) => setActiveControlCfg(cfg)}
        />

        <ApiSyncPanel
          loading={loadingApi}
          onSync={handleFetchApiToWidget}
          onSetupDataEngine2={handleSetupDataEngine2}
          onCycleMockData={handleCycleMockData}
          autoCycleActive={autoCycle1Min}
          autoCycleCountdown={autoCountdownSec}
          autoIntervalSec={autoIntervalSec}
          onChangeAutoIntervalSec={handleChangeAutoIntervalSec}
          onToggleAutoCycle={handleToggleAutoCycle}
          mockDataSummary={`Preview Data: ${activeBoundData.user.name} • ${activeBoundData.attendance.progress}% • ${activeBoundData.kpi.revenue.toLocaleString('en-US')}₫`}
        />

        {Platform.OS === 'android' && (
          <TouchableOpacity style={styles.pinButton} onPress={handleRequestPinWidget}>
            <Text style={styles.pinButtonText}>Ghim Tiện ích vào Màn hình chính</Text>
          </TouchableOpacity>
        )}

        <PushTokenPanel tokens={pushTokens} onRefresh={() => refreshAllApnsTokens()} />

        <Text style={styles.sectionTitle}>XEM TRƯỚC WIDGET TRONG APP (WIDGETPREVIEW)</Text>
        <WidgetPreview
          size="medium"
          showBadge={true}
          interactiveSizeSwitch={true}
          data={activeBoundData}
          controlConfig={activeControlCfg}
          layout={
            (UI_PRESETS.find((p) => p.id === selectedPresetId) || UI_PRESETS[0]).buildWidgetLayouts() as any
          }
          onAction={async (actionId: string) => {
            addLog(`[Preview Tap] Bấm nút: ${actionId}`);
            if (actionId === 'action_counter_inc' || actionId.startsWith('counter:inc')) {
              await persistCounterFromApp(getCounterValue() + 1);
            } else if (actionId === 'action_counter_dec' || actionId.startsWith('counter:dec')) {
              await persistCounterFromApp(getCounterValue() - 1);
            } else if (actionId === 'action_counter_reset' || actionId.startsWith('counter:reset')) {
              await persistCounterFromApp(0);
            }
          }}
        />

        <Text style={styles.sectionTitle}>DANH SÁCH MẪU GIAO DIỆN</Text>

        {UI_PRESETS.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            isSelected={preset.id === selectedPresetId}
            hasActiveLiveActivity={Boolean(activeActivityId)}
            onApplyWidget={applyPresetToWidget}
            onApplyLiveActivity={applyPresetToLiveActivity}
          />
        ))}

        {activeActivityId && (
          <TouchableOpacity style={styles.stopButton} onPress={handleStopLiveActivity}>
            <Text style={styles.stopButtonText}>Kết thúc Live Activity đang chạy</Text>
          </TouchableOpacity>
        )}

        <ActivityLogPanel logs={logs} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  stopButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  pinButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
  },
  pinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
