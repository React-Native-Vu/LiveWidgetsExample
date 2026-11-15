import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveActivityInfo, LiveActivity, SharedStorage, Widget } from 'react-native-live-widgets';
import {
  getCounterValue,
  setCounterValue,
  subscribeCounterValue,
  interactiveCounterPreset,
} from '../presets/interactiveCounterPreset';

interface Props {
  appGroup: string;
  onLog: (msg: string) => void;
  onCounterChanged?: (val: number) => void;
}

export const FeaturesTesterPanel: React.FC<Props> = ({ appGroup, onLog, onCounterChanged }) => {
  const [counter, setCounter] = useState<number>(getCounterValue());
  const [checkingAuth, setCheckingAuth] = useState<boolean>(false);
  const [authEnabled, setAuthEnabled] = useState<boolean | null>(null);
  const [frequentPushes, setFrequentPushes] = useState<boolean | null>(null);
  const [activeActivities, setActiveActivities] = useState<ActiveActivityInfo[]>([]);
  const [inspecting, setInspecting] = useState<boolean>(false);

  // Đồng bộ số liệu 2 chiều từ AsyncStorage và SharedStorage khi mở App
  const syncLatestCounter = async () => {
    try {
      // 1. Kiểm tra xem ngoài widget lúc App bị kill có bị bấm đổi số không (SharedStorage)
      const rawShared = await SharedStorage.get('widget_counter_value', appGroup);
      if (rawShared) {
        const numShared = parseInt(String(rawShared), 10);
        if (!isNaN(numShared)) {
          setCounter(numShared);
          setCounterValue(numShared);
          await AsyncStorage.setItem('widget_counter_value', `${numShared}`);
          return;
        }
      }

      // 2. Nếu chưa có từ Widget, đọc từ local AsyncStorage của App
      const localVal = await AsyncStorage.getItem('widget_counter_value');
      if (localVal !== null) {
        const numLocal = parseInt(localVal, 10);
        if (!isNaN(numLocal)) {
          setCounter(numLocal);
          setCounterValue(numLocal);
        }
      }
    } catch (e: any) {
      console.warn('Lỗi đọc counter:', e);
    }
  };

  useEffect(() => {
    syncLatestCounter();

    const unsubSubscribe = subscribeCounterValue((val) => {
      setCounter(val);
    });

    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        syncLatestCounter();
      }
    });

    return () => {
      unsubSubscribe();
      sub.remove();
    };
  }, []);

  // Cập nhật giá trị đếm và vẽ lại Widget ngoài màn hình chính ngay lập tức
  const updateCounterAndWidget = async (newVal: number) => {
    setCounter(newVal);
    setCounterValue(newVal);
    onCounterChanged?.(newVal);

    try {
      // Lưu đồng thời vào AsyncStorage và SharedStorage của AppGroup
      await AsyncStorage.setItem('widget_counter_value', `${newVal}`);
      await SharedStorage.set('widget_counter_value', newVal, appGroup);
      await SharedStorage.remove('widget_timeline_main', appGroup);

      const layouts = interactiveCounterPreset.buildWidgetLayouts();
      await Widget.setLayout('main', layouts, appGroup);
      await Widget.setLayout('counter', layouts, appGroup);
      await Widget.reloadAll();
      onLog(`⚡ [AsyncStorage & TS Callback] Đã lưu Counter = ${newVal} và vẽ lại Widget`);
    } catch (e: any) {
      onLog(`Lỗi đồng bộ Counter: ${e.message}`);
    }
  };

  const handleIncrement = () => {
    const base = Math.max(counter, getCounterValue());
    updateCounterAndWidget(base + 1);
  };
  const handleDecrement = () => {
    const base = getCounterValue();
    updateCounterAndWidget(base - 1);
  };
  const handleReset = () => updateCounterAndWidget(0);

  // Kiểm tra quyền hệ thống
  const checkSystemPermissions = async () => {
    try {
      setCheckingAuth(true);
      const isEnabled = await LiveActivity.areActivitiesEnabled();
      const isFrequent = await LiveActivity.areFrequentPushesEnabled();
      setAuthEnabled(isEnabled);
      setFrequentPushes(isFrequent);
      onLog(
        `Quyền hệ thống: LiveActivity=${isEnabled ? 'ĐÃ CẤP' : 'TẮT'} | FrequentPushes=${
          isFrequent ? 'BẬT' : 'TẮT'
        }`
      );
    } catch (e: any) {
      onLog(`Lỗi kiểm tra quyền: ${e.message}`);
    } finally {
      setCheckingAuth(false);
    }
  };

  // Tra cứu danh sách Live Activity đang chạy
  const inspectActiveActivities = async () => {
    try {
      setInspecting(true);
      const list = await LiveActivity.getActiveActivities();
      setActiveActivities(list);
      onLog(`Tìm thấy ${list.length} phiên Live Activity đang chạy trên máy`);
    } catch (e: any) {
      onLog(`Lỗi lấy danh sách Live Activity: ${e.message}`);
    } finally {
      setInspecting(false);
    }
  };

  // Tắt một activity cụ thể
  const handleEndActivity = async (id: string) => {
    try {
      await LiveActivity.end(id, {
        dismissalPolicy: 'immediate',
      });
      onLog(`Đã tắt Live Activity: ${id}`);
      await inspectActiveActivities();
    } catch (e: any) {
      onLog(`Lỗi tắt Live Activity ${id}: ${e.message}`);
    }
  };

  // Thử nghiệm Timeline tự động 3 mốc thời gian
  const handleSetTimelineDemo = async () => {
    try {
      const now = Math.floor(Date.now() / 1000);
      onLog('Đang tạo Timeline 3 mốc thời gian...');

      const ok = await Widget.setTimeline(
        'main',
        {
          policy: 'afterDate',
          afterDate: now + 120, // Làm mới sau 2 phút
          entries: [
            {
              date: now,
              layout: interactiveCounterPreset.buildWidgetLayouts(),
            },
          ],
        },
        appGroup
      );

      if (ok) {
        onLog('✅ Đã thiết lập Timeline tự động (Policy: afterDate 120s)');
        Alert.alert('Thành công', 'Đã lưu Timeline 3 mốc vào Widget. iOS sẽ tự động chuyển cảnh theo mốc.');
      } else {
        onLog('Không thể lưu Timeline');
      }
    } catch (e: any) {
      onLog(`Lỗi thiết lập Timeline: ${e.message}`);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleWithBadge}>
          <Text style={styles.cardTitle}>TRUNG TÂM KIỂM THỬ TÍNH NĂNG PRO</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Core 2.0</Text>
          </View>
        </View>
      </View>
      <Text style={styles.cardSubtitle}>
        Kiểm tra trực quan: Action Dispatcher (Hàm TS), Trạng thái Quyền & Quản lý Live Activities.
      </Text>

      {/* ── 1. ACTION DISPATCHER & COUNTER TEST ── */}
      <View style={styles.sectionBox}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>⚡ 1. Action Dispatcher (Hàm TS hai chiều)</Text>
          <Text style={styles.counterDisplay}>{counter}</Text>
        </View>
        <Text style={styles.sectionDesc}>
          Bấm nút [-] [0] [+] để kích hoạt logic TS và cập nhật Widget tức thì:
        </Text>
        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.btnDec]} onPress={handleDecrement}>
            <Text style={styles.btnTextDec}>-1 (Trừ)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.btnReset]} onPress={handleReset}>
            <Text style={styles.btnTextReset}>Reset (0)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.btnInc]} onPress={handleIncrement}>
            <Text style={styles.btnTextInc}>+1 (Cộng)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── 2. SYSTEM PERMISSIONS & SETTINGS CHECK ── */}
      <View style={styles.sectionBox}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>🛡️ 2. Quyền & Cài đặt hệ thống</Text>
          <TouchableOpacity
            style={styles.smallOutlineBtn}
            onPress={checkSystemPermissions}
            disabled={checkingAuth}
          >
            {checkingAuth ? (
              <ActivityIndicator size="small" color="#0284C7" />
            ) : (
              <Text style={styles.smallOutlineBtnText}>Kiểm tra</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusKey}>Hoạt động trực tiếp (Live Activities):</Text>
          <View
            style={[
              styles.statusPill,
              authEnabled === true
                ? styles.pillSuccess
                : authEnabled === false
                ? styles.pillDanger
                : styles.pillNeutral,
            ]}
          >
            <Text style={styles.statusPillText}>
              {authEnabled === true ? '✅ Đã Bật' : authEnabled === false ? '❌ Đang Tắt' : 'Chưa test'}
            </Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusKey}>APNs Frequent Pushes (iOS 16.2+):</Text>
          <View
            style={[
              styles.statusPill,
              frequentPushes === true
                ? styles.pillSuccess
                : frequentPushes === false
                ? styles.pillDanger
                : styles.pillNeutral,
            ]}
          >
            <Text style={styles.statusPillText}>
              {frequentPushes === true ? '✅ Sẵn sàng' : frequentPushes === false ? '⚠️ Giới hạn' : 'Chưa test'}
            </Text>
          </View>
        </View>
      </View>

      {/* ── 3. ACTIVE LIVE ACTIVITIES INSPECTOR ── */}
      <View style={styles.sectionBox}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>
            📋 3. Live Activities đang chạy ({activeActivities.length})
          </Text>
          <TouchableOpacity
            style={styles.smallOutlineBtn}
            onPress={inspectActiveActivities}
            disabled={inspecting}
          >
            {inspecting ? (
              <ActivityIndicator size="small" color="#0284C7" />
            ) : (
              <Text style={styles.smallOutlineBtnText}>Quét DS</Text>
            )}
          </TouchableOpacity>
        </View>

        {activeActivities.length === 0 ? (
          <Text style={styles.emptyText}>Hiện không có phiên Live Activity nào đang chạy ngầm.</Text>
        ) : (
          activeActivities.map((act) => (
            <View key={act.activityId} style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityIdText} numberOfLines={1}>
                  ID: {act.activityId}
                </Text>
                {act.pushToken && (
                  <Text style={styles.activityTokenText} numberOfLines={1}>
                    Token: {act.pushToken.slice(0, 16)}...
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.endBtn}
                onPress={() => handleEndActivity(act.activityId)}
              >
                <Text style={styles.endBtnText}>Tắt</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* ── 4. TIMELINE DEMO BUTTON ── */}
      <TouchableOpacity style={styles.timelineBtn} onPress={handleSetTimelineDemo}>
        <Text style={styles.timelineBtnText}>⏱️ Thử nghiệm Timeline Entries (Tự đổi sau 2p)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 12,
  },
  sectionBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
  },
  counterDisplay: {
    fontSize: 16,
    fontWeight: '800',
    color: '#10B981',
  },
  sectionDesc: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 8,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnDec: {
    backgroundColor: '#E2E8F0',
  },
  btnTextDec: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '700',
  },
  btnReset: {
    backgroundColor: '#FEE2E2',
  },
  btnTextReset: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '700',
  },
  btnInc: {
    backgroundColor: '#10B981',
  },
  btnTextInc: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  smallOutlineBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0284C7',
    backgroundColor: '#F0F9FF',
  },
  smallOutlineBtnText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0284C7',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  statusKey: {
    fontSize: 11,
    color: '#475569',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  pillSuccess: {
    backgroundColor: '#DCFCE7',
  },
  pillDanger: {
    backgroundColor: '#FEE2E2',
  },
  pillNeutral: {
    backgroundColor: '#F1F5F9',
  },
  emptyText: {
    fontSize: 11,
    color: '#94A3B8',
    fontStyle: 'italic',
    marginTop: 4,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 6,
  },
  activityInfo: {
    flex: 1,
    marginRight: 8,
  },
  activityIdText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  activityTokenText: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
  },
  endBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  endBtnText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
  timelineBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 2,
  },
  timelineBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
});
