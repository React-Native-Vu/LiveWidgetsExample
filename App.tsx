import React, { useEffect, useState } from 'react';
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
  LiveActivity,
  LiveActivityPushTokens,
  SharedStorage,
  Widget,
} from 'react-native-live-widgets';

import { ShiftApiResponse, UIPreset } from './src/types/preset';
import { buildWidgetFromApi, UI_PRESETS } from './src/presets';
import {
  getCounterValue,
  setCounterValue,
  interactiveCounterPreset,
} from './src/presets/interactiveCounterPreset';
import { HeaderSection } from './src/components/HeaderSection';
import { MusicPlayerSection } from './src/components/MusicPlayerSection';
import { ApiSyncPanel } from './src/components/ApiSyncPanel';
import { FeaturesTesterPanel } from './src/components/FeaturesTesterPanel';
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

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  };

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

  const applyPresetToWidget = async (preset: UIPreset) => {
    try {
      setSelectedPresetId(preset.id);
      await SharedStorage.remove('widget_timeline_main', APP_GROUP);
      const layouts = preset.buildWidgetLayouts();
      const ok = await Widget.setLayout('main', layouts, APP_GROUP);

      // Đồng thời cập nhật vào key tương ứng cho các Widget độc lập
      if (preset.id === 'interactive_counter') {
        await Widget.setLayout('counter', layouts, APP_GROUP);
      } else if (preset.id === 'pro_features') {
        await Widget.setLayout('pro', layouts, APP_GROUP);
      } else if (preset.id === 'shift_attendance') {
        await Widget.setLayout('shift', layouts, APP_GROUP);
      } else if (preset.id === 'interactive_workspace') {
        await Widget.setLayout('workspace', layouts, APP_GROUP);
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

  useEffect(() => {
    Widget.isPinSupported().then((supported) => setCanPinWidget(supported));

    const initWidgets = async () => {
      try {
        const raw = await SharedStorage.get('widget_counter_value', APP_GROUP);
        if (raw !== null && raw !== undefined) {
          const num = parseInt(String(raw), 10);
          if (!isNaN(num)) {
            setCounterValue(num);
          }
        }
      } catch {}

      await applyPresetToWidget(UI_PRESETS[0]);

      // Khởi tạo trước dữ liệu cho từng widget độc lập
      for (const p of UI_PRESETS) {
        const layouts = p.buildWidgetLayouts();
        if (p.id === 'interactive_counter') {
          Widget.setLayout('counter', layouts, APP_GROUP);
        } else if (p.id === 'pro_features') {
          Widget.setLayout('pro', layouts, APP_GROUP);
        } else if (p.id === 'shift_attendance') {
          Widget.setLayout('shift', layouts, APP_GROUP);
        } else if (p.id === 'interactive_workspace') {
          Widget.setLayout('workspace', layouts, APP_GROUP);
        }
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

    const updateCounterFromAction = async (newVal: number) => {
      setCounterValue(newVal);
      try {
        await AsyncStorage.setItem('widget_counter_value', `${newVal}`);
        await SharedStorage.set('widget_counter_value', newVal, APP_GROUP);
        await SharedStorage.remove('widget_timeline_main', APP_GROUP);
        const layouts = interactiveCounterPreset.buildWidgetLayouts();
        await Widget.setLayout('main', layouts, APP_GROUP);
        await Widget.setLayout('counter', layouts, APP_GROUP);
        await Widget.reloadAll();
        addLog(`⚡ [Widget Native Button] TS Handler chạy thành công: Counter = ${newVal}`);
      } catch (e: any) {
        addLog(`Lỗi cập nhật từ Action: ${e.message}`);
      }
    };

    const unsubInc = LiveActivity.registerAction('action_counter_inc', async () => {
      const current = getCounterValue() + 1;
      await updateCounterFromAction(current);
    });

    const unsubDec = LiveActivity.registerAction('action_counter_dec', async () => {
      const current = getCounterValue() - 1;
      await updateCounterFromAction(current);
    });

    const unsubReset = LiveActivity.registerAction('action_counter_reset', async () => {
      await updateCounterFromAction(0);
    });

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

    return () => {
      subAppState.remove();
      unsubAction();
      unsubInc();
      unsubDec();
      unsubReset();
      unsubDevice();
      unsubStart();
      unsubUpdate();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <HeaderSection />

        {/* Tạm ẩn tính năng Audio Test, để lại để test sau */}
        {/* <MusicPlayerSection
          onLog={addLog}
          onActivityChanged={(actId) => setActiveActivityId(actId)}
          onApplyWidget={() => setSelectedPresetId('music_player')}
        /> */}

        {/* ── BẢNG KIỂM THỬ TÍNH NĂNG MỚI (CORE 2.0) ── */}
        <FeaturesTesterPanel appGroup={APP_GROUP} onLog={addLog} />

        <ApiSyncPanel loading={loadingApi} onSync={handleFetchApiToWidget} />

        {Platform.OS === 'android' && (
          <TouchableOpacity style={styles.pinButton} onPress={handleRequestPinWidget}>
            <Text style={styles.pinButtonText}>Ghim Tiện ích vào Màn hình chính</Text>
          </TouchableOpacity>
        )}

        <PushTokenPanel tokens={pushTokens} onRefresh={() => refreshAllApnsTokens()} />

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
