import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ControlWidget,
  ControlWidgetConfig,
  LocaleFormatter,
  MediaSession,
  NavigationLive,
  SmartHomeControl,
  UI,
  Widget,
  createDonutChartNode,
  createListNode,
  createSparklineNode,
  createTimelineNode,
  usePendingActions,
} from 'react-native-live-widgets';

interface Props {
  appGroup: string;
  onLog: (msg: string) => void;
  onControlChanged?: (cfg: ControlWidgetConfig) => void;
}

export const EnterpriseFeaturesPanel: React.FC<Props> = ({
  appGroup,
  onLog,
  onControlChanged,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [output, setOutput] = useState<string>(
    'Bấm các nút bên trên để kiểm thử trực tiếp Nhóm A, B, C, D, E trên thiết bị thật / Simulator.'
  );
  const [navStep, setNavStep] = useState(0);
  const [acOn, setAcOn] = useState(true);
  const { pendingCount, refresh: refreshQueue } = usePendingActions({
    widgetKey: 'shift',
    instanceId: 'branch_hcm',
    appGroup,
  });

  const buildAccessibleDemoLayout = () =>
    UI.VStack(
      { padding: 14, spacing: 8, backgroundColor: '#0F172A', borderRadius: 16 },
      UI.Text('Cảnh báo ca sáng: Chưa Check-in', {
        typography: 'headline',
        color: '#FBBF24',
        accessibilityRole: 'header',
        accessibilityFocusOrder: 1,
        accessibilityLiveRegion: 'assertive',
      }),
      UI.HStack(
        { spacing: 8, accessibilityGroup: 'combine', accessibilityFocusOrder: 2 },
        UI.Image('clock.fill', { accessible: false }),
        UI.Text('Ca hành chính 08:00 - 17:30', { color: '#E2E8F0', fontSize: 12 }),
        UI.Text('Chi nhánh HCM', { color: '#38BDF8', fontSize: 12 })
      ),
      UI.Button({
        title: 'Check-in ngay',
        actionId: 'action_demo_checkin',
        accessibilityFocusOrder: 3,
        accessibilityState: { checked: false, disabled: false },
        accessibilityHint: 'Chạm hai lần để xác nhận chấm công',
      })
    );

  // ─── NHÓM A: NATIVE ACCESSIBILITY ─────────────────────────────────────────
  const handleTestAccessibility = async () => {
    const layout = buildAccessibleDemoLayout();
    await Widget.setLayout('main', { small: layout, medium: layout, large: layout }, appGroup);
    const tree = Widget.inspectAccessibilityTree(layout);
    setOutput(tree);
    onLog('♿ [Nhóm A] Đã đẩy Widget Accessibility (rn_semantic_layer / VoiceOver) & in Focus Tree.');
  };

  // ─── NHÓM B: PERSISTENT ACTION QUEUE & ATOMIC STATE ───────────────────────
  const handleEnqueueOfflineCheckin = async () => {
    const res = await Widget.enqueueAction('CHECK_IN', {
      widgetKey: 'shift',
      instanceId: 'branch_hcm',
      payload: { shiftId: 'MORNING_01', at: new Date().toLocaleTimeString() },
      dedupeKey: 'checkin_morning_01',
      dedupeWindowMs: 4000,
      appGroup,
    });
    await refreshQueue();
    const msg = res.deduplicated
      ? `🛡️ [Deduplicated!] Đã chặn double-tap trùng trong 4s (idempotencyKey: ${res.action.idempotencyKey})`
      : `📥 [Queued] Đã lưu Check-in offline!\n• ID: ${res.action.id}\n• Idempotency-Key: ${res.action.idempotencyKey}`;
    setOutput(msg);
    onLog(msg);
  };

  const handleSyncQueue = async () => {
    const report = await Widget.syncPendingActions({
      widgetKey: 'shift',
      instanceId: 'branch_hcm',
      appGroup,
      retry: { maxRetries: 2, strategy: 'exponential', baseDelayMs: 200 },
      handler: async (action) => {
        onLog(`⚡ Sending ${action.actionId} with Idempotency-Key: ${action.idempotencyKey}`);
        return { ok: true };
      },
    });
    await refreshQueue();
    const msg = `✅ [Sync Queue] Total: ${report.total} | Acked: ${report.acked} | Failed: ${report.failed} | DeadLetter: ${report.deadLettered}`;
    setOutput(msg);
    onLog(msg);
  };

  const handleAtomicStateTest = async () => {
    Widget.registerStateSchema('demo_shift_state', {
      version: 2,
      migrate: (oldData) => ({ ...(oldData || {}), migrated: true }),
    });
    const envHcm = await Widget.updateStateAtomic(
      'demo_shift_state',
      (prev: any) => ({ visits: (prev?.visits || 0) + 1, branch: 'HCM' }),
      { instanceId: 'branch_hcm', appGroup, conflictStrategy: 'last_write_wins' }
    );
    const envHn = await Widget.updateStateAtomic(
      'demo_shift_state',
      (prev: any) => ({ visits: (prev?.visits || 0) + 10, branch: 'HN' }),
      { instanceId: 'branch_hn', appGroup, conflictStrategy: 'last_write_wins' }
    );
    const msg =
      `🔒 [Atomic State + Isolation]\n` +
      `• branch_hcm: v${envHcm._v} rev#${envHcm._rev} -> ${JSON.stringify(envHcm.data)}\n` +
      `• branch_hn:  v${envHn._v} rev#${envHn._rev} -> ${JSON.stringify(envHn.data)}`;
    setOutput(msg);
    onLog('🔒 [Nhóm B] Đã test Atomic State Update & Multi-Instance Isolation (HCM vs HN).');
  };

  // ─── NHÓM C: BACKGROUND DATA ENGINE (SWR & SECURE TOKEN) ──────────────────
  const handleSetupSWR = async () => {
    await Widget.setSecureToken('demo_jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo', appGroup);
    await Widget.setRemoteConfig(
      'main',
      {
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'GET',
        headers: { Authorization: 'Bearer {{$secure.demo_jwt}}' },
        cacheTtlSeconds: 60,
        staleTtlSeconds: 600,
        cacheStrategy: 'stale_while_revalidate',
        offlineFallback: 'stale_cache',
        enableETag: true,
        enableDataDiff: true,
      },
      appGroup
    );
    const telemetry = await Widget.getSyncStatus('main', appGroup);
    const diff = Widget.computeDataDiff({ kpi: 80, status: 'ok' }, { kpi: 92, status: 'ok' });
    const msg =
      `🌐 [SWR + Secure Token + Data Diff]\n` +
      `• Token stored at widget_secure_cred_demo_jwt\n` +
      `• Sync Telemetry: ${JSON.stringify(telemetry)}\n` +
      `• Data Diff changedKeys: [${diff.changedKeys.join(', ')}]`;
    setOutput(msg);
    onLog('🌐 [Nhóm C] Đã cấu hình SWR + Secure Token + đọc Sync Telemetry.');
  };

  const handleInvalidateCache = async () => {
    await Widget.invalidateCache('main', undefined, appGroup);
    setOutput('🗑️ [Cache Invalidation] Đã xóa cờ Cache TTL & yêu cầu Widget reload lấy dữ liệu mới nhất.');
    onLog('🗑️ [Nhóm C] Widget.invalidateCache("main") thành công.');
  };

  // ─── NHÓM D: DIAGNOSTICS, PROFILER & SNAPSHOT TESTING ─────────────────────
  const handleRunDiagnosticsAndProfiler = async () => {
    const layout = buildAccessibleDemoLayout();
    const irPerf = Widget.profileIR(layout);
    const diag = Widget.diagnose(layout);
    const prof = await Widget.getProfilerReport('main', appGroup);
    const snap = Widget.createSnapshot(layout, {
      sizes: ['small', 'medium'],
      themes: ['light', 'dark', 'tinted'],
    });
    const diff = Widget.compareSnapshots(snap, snap);
    const msg =
      `${Widget.formatProfilerReport(prof)}\n` +
      `• IR Nodes: ${irPerf.nodeCount} (${irPerf.nativeRatio}% Native)\n` +
      `• Snapshot Matrix: ${Object.keys(snap.variants).length} variants (Diff passed: ${diff.passed})\n\n` +
      `${Widget.formatDiagnostics(diag)}`;
    setOutput(msg);
    onLog('🔬 [Nhóm D] Đã chạy Profiler + Diagnostics + Snapshot 6 variants.');
  };

  // ─── NHÓM E: MEDIASESSION, NAVIGATION LIVE, SMART HOME & PRIMITIVES ───────
  const handleStartMediaSession = async () => {
    await MediaSession.setMetadata({
      title: 'Midnight Coding — Lofi',
      artist: 'React Native Live Widgets',
      album: 'v1.3 Enterprise',
      durationSeconds: 240,
    });
    await MediaSession.setPlaybackState({ state: 'playing', positionSeconds: 32, rate: 1.0 });
    setOutput('🎵 [MediaSession] Đã đẩy Now Playing lên Lock Screen / Control Center / Android Media Player!');
    onLog('🎵 [Nhóm E] MediaSession.setMetadata + setPlaybackState("playing") thành công.');
  };

  const handleClearMediaSession = async () => {
    await MediaSession.clear();
    setOutput('⏹ [MediaSession] Đã tắt & xóa Now Playing khỏi hệ thống.');
    onLog('⏹ [Nhóm E] MediaSession.clear() thành công.');
  };

  const handleNavigationLive = async () => {
    const steps = [
      {
        destination: 'Sân bay Tân Sơn Nhất',
        maneuver: 'turn_right' as const,
        instruction: 'Rẽ phải vào đường Trường Sơn',
        distanceMeters: 350,
        etaTimestamp: Date.now() + 14 * 60 * 1000,
        routeProgress: 0.45,
      },
      {
        destination: 'Sân bay Tân Sơn Nhất',
        maneuver: 'straight' as const,
        instruction: 'Đi thẳng vào Ga Quốc nội T1',
        distanceMeters: 120,
        etaTimestamp: Date.now() + 3 * 60 * 1000,
        routeProgress: 0.85,
      },
    ];
    const current = steps[navStep % steps.length];
    if (navStep === 0) {
      await NavigationLive.start('nav_trip_demo', current);
    } else {
      await NavigationLive.updateManeuver('nav_trip_demo', current);
    }
    setNavStep((prev) => prev + 1);
    setOutput(
      `🗺️ [NavigationLive] ${current.instruction} (${current.distanceMeters}m • ${Math.round(current.routeProgress * 100)}%)\n→ Ra màn hình Home để xem Dynamic Island Turn-by-Turn!`
    );
    onLog(`🗺️ [Nhóm E] NavigationLive: ${current.instruction}`);
  };

  const handleSmartHomeAndPrimitives = async () => {
    const nextAc = !acOn;
    setAcOn(nextAc);
    const acCfg = SmartHomeControl.createToggle({
      deviceId: 'office_ac',
      name: 'Điều hòa Văn phòng',
      deviceType: 'ac',
      isOn: nextAc,
      detailText: nextAc ? '24°C • Cool' : 'Đã tắt',
    });
    await ControlWidget.set('office_ac', acCfg, appGroup);
    onControlChanged?.(acCfg);

    const revenueText = LocaleFormatter.formatCurrency(128500000, 'VND', 'vi-VN');
    const ecosystemLayout = UI.VStack(
      { padding: 14, spacing: 8, backgroundColor: '#0F172A', borderRadius: 16 },
      UI.HStack(
        { spacing: 8, alignment: 'center' },
        UI.Text(`Doanh thu: ${revenueText}`, { typography: 'headline', color: '#38BDF8' }),
        UI.Spacer(),
        createDonutChartNode({
          segments: [
            { value: 82, color: '#10B981', label: 'KPI' },
            { value: 18, color: '#334155', label: 'Còn lại' },
          ],
          size: 46,
          centerLabel: 'KPI',
        })
      ),
      createTimelineNode([
        { time: '08:00', title: 'Check-in ca sáng', status: 'done' },
        { time: '10:30', title: 'Họp Sprint Review', status: 'active' },
        { time: '15:00', title: 'Release v1.3.0', status: 'upcoming' },
      ]),
      createListNode({
        items: ['Sparkline +18%'],
        renderItem: (it) => UI.Text(it, { fontSize: 11, color: '#34D399' }),
      }),
      createSparklineNode({ data: [12, 18, 16, 25, 31], color: '#10B981', height: 28 })
    );
    await Widget.setLayout('main', { small: ecosystemLayout, medium: ecosystemLayout, large: ecosystemLayout }, appGroup);
    setOutput(
      `🏠 [SmartHome + Ecosystem Primitives]\n` +
        `• ControlWidget: ${acCfg.title} (${acCfg.subtitle})\n` +
        `• LocaleFormatter: ${revenueText}\n` +
        `• Đã đẩy Timeline + DonutChart + Sparkline ra Home Screen Widget!`
    );
    onLog('🏠 [Nhóm E] Đã đồng bộ SmartHome Control + Ecosystem Primitives ra Widget.');
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.title}>🚀 TEST TÍNH NĂNG MỚI (NHÓM A → E)</Text>
        <Text style={styles.toggleText}>{expanded ? 'Thu gọn ▲' : 'Mở rộng ▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.body}>
          <Text style={styles.groupTitle}>♿ Nhóm A — Native Accessibility (TalkBack / VoiceOver)</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleTestAccessibility}>
              <Text style={styles.btnText}>Đẩy A11y Widget &amp; Inspect Tree</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.groupTitle}>
            🔄 Nhóm B — Persistent Action Queue (Đang chờ: {pendingCount}) &amp; Atomic State
          </Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btnSecondary} onPress={handleEnqueueOfflineCheckin}>
              <Text style={styles.btnSecText}>Enqueue Check-in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSyncQueue}>
              <Text style={styles.btnText}>Sync Queue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={handleAtomicStateTest}>
              <Text style={styles.btnSecText}>Atomic v1→v2</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.groupTitle}>🌐 Nhóm C — Background Data Engine (SWR &amp; Secure Token)</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSetupSWR}>
              <Text style={styles.btnText}>Setup SWR + Token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={handleInvalidateCache}>
              <Text style={styles.btnSecText}>Invalidate Cache</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.groupTitle}>🔬 Nhóm D — Diagnostics, Profiler &amp; Snapshot Diff</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleRunDiagnosticsAndProfiler}>
              <Text style={styles.btnText}>Chạy Profiler + Diagnostics + Snapshot</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.groupTitle}>🎵 Nhóm E — MediaSession, Navigation Live &amp; Smart Home</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleStartMediaSession}>
              <Text style={styles.btnText}>Now Playing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={handleClearMediaSession}>
              <Text style={styles.btnSecText}>Tắt Media</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleNavigationLive}>
              <Text style={styles.btnText}>Nav Turn-by-Turn</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.row, { marginTop: 6 }]}>
            <TouchableOpacity style={styles.btnSecondary} onPress={handleSmartHomeAndPrimitives}>
              <Text style={styles.btnSecText}>Smart Home AC + Timeline + Sparkline Widget</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.consoleBox}>
            <Text style={styles.consoleText}>{output}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0284C7',
  },
  body: {
    marginTop: 10,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginTop: 10,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#0284C7',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnSecText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '600',
  },
  consoleBox: {
    marginTop: 12,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 10,
  },
  consoleText: {
    color: '#A5F3FC',
    fontSize: 11,
    fontFamily: 'Courier',
    lineHeight: 16,
  },
});
