import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const QUICK_INTERVALS = [
  { label: '15s', seconds: 15 },
  { label: '30s', seconds: 30 },
  { label: '1 phút', seconds: 60 },
  { label: '5 phút', seconds: 300 },
  { label: '15 phút', seconds: 900 },
  { label: '1 giờ', seconds: 3600 },
];

function splitSeconds(totalSec: number) {
  const safe = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return { h, m, s };
}

export function formatIntervalLabel(totalSec: number): string {
  const { h, m, s } = splitSeconds(Math.max(5, totalSec));
  const parts: string[] = [];
  if (h > 0) parts.push(`${h} giờ`);
  if (m > 0) parts.push(`${m} phút`);
  if (s > 0 || parts.length === 0) parts.push(`${s} giây`);
  return parts.join(' ');
}

function formatCountdown(totalSec: number): string {
  const safe = Math.max(0, Math.floor(totalSec));
  if (safe < 60) return `${safe}s`;
  const { h, m, s } = splitSeconds(safe);
  const pad = (n: number) => String(n).padStart(2, '0');
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

interface ApiSyncPanelProps {
  loading: boolean;
  onSync: () => void;
  onSetupDataEngine2?: () => void;
  onCycleMockData?: () => void;
  mockDataSummary?: string;
  autoCycleActive?: boolean;
  autoCycleCountdown?: number;
  autoIntervalSec?: number;
  onChangeAutoIntervalSec?: (seconds: number) => void;
  onToggleAutoCycle?: () => void;
}

export function ApiSyncPanel({
  loading,
  onSync,
  onSetupDataEngine2,
  onCycleMockData,
  mockDataSummary,
  autoCycleActive = false,
  autoCycleCountdown = 60,
  autoIntervalSec = 60,
  onChangeAutoIntervalSec,
  onToggleAutoCycle,
}: ApiSyncPanelProps) {
  const initialParts = splitSeconds(autoIntervalSec);
  const [hoursInput, setHoursInput] = useState<string>(String(initialParts.h));
  const [minutesInput, setMinutesInput] = useState<string>(String(initialParts.m));
  const [secondsInput, setSecondsInput] = useState<string>(String(initialParts.s));

  useEffect(() => {
    const parsedTotal =
      (parseInt(hoursInput, 10) || 0) * 3600 +
      (parseInt(minutesInput, 10) || 0) * 60 +
      (parseInt(secondsInput, 10) || 0);
    if (Math.max(5, parsedTotal) !== autoIntervalSec) {
      const next = splitSeconds(autoIntervalSec);
      setHoursInput(String(next.h));
      setMinutesInput(String(next.m));
      setSecondsInput(String(next.s));
    }
  }, [autoIntervalSec]);

  const handleFieldChange = (field: 'h' | 'm' | 's', rawText: string) => {
    const clean = rawText.replace(/[^0-9]/g, '');
    const nextHStr = field === 'h' ? clean : hoursInput;
    const nextMStr = field === 'm' ? clean : minutesInput;
    const nextSStr = field === 's' ? clean : secondsInput;

    if (field === 'h') setHoursInput(clean);
    if (field === 'm') setMinutesInput(clean);
    if (field === 's') setSecondsInput(clean);

    const h = parseInt(nextHStr, 10) || 0;
    const m = parseInt(nextMStr, 10) || 0;
    const s = parseInt(nextSStr, 10) || 0;
    const total = Math.max(5, h * 3600 + m * 60 + s);
    onChangeAutoIntervalSec?.(total);
  };
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>Background Data Engine 2.0 & API</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>TTL • ETag • Binding</Text>
        </View>
      </View>
      <Text style={styles.desc}>
        Kiểm thử gọi REST API thủ công, cấu hình Background Data Engine 2.0 (TTL, ETag/304, Retry, Đa nguồn, Schema, Error Fallback) và xoay vòng dữ liệu cho Data Binding.
      </Text>
      {mockDataSummary && <Text style={styles.mockSummary}>{mockDataSummary}</Text>}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onSync}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Đang đồng bộ dữ liệu...' : 'Gọi API & Cập nhật Widget'}
        </Text>
      </TouchableOpacity>

      {(onSetupDataEngine2 || onCycleMockData) && (
        <View style={styles.subButtonRow}>
          {onSetupDataEngine2 && (
            <TouchableOpacity
              style={[styles.subButton, styles.subButtonPrimary]}
              onPress={onSetupDataEngine2}
              activeOpacity={0.8}
            >
              <Text style={styles.subButtonPrimaryText}>Nạp Remote Config 2.0</Text>
            </TouchableOpacity>
          )}
          {onCycleMockData && (
            <TouchableOpacity
              style={[styles.subButton, styles.subButtonSecondary]}
              onPress={onCycleMockData}
              activeOpacity={0.8}
            >
              <Text style={styles.subButtonSecondaryText}>Đổi & Đồng bộ Data Binding</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {onChangeAutoIntervalSec && (
        <View style={styles.intervalBox}>
          <Text style={styles.intervalTitle}>
            Tùy chỉnh chu kỳ cập nhật ({formatIntervalLabel(autoIntervalSec)}):
          </Text>
          <View style={styles.chipRow}>
            {QUICK_INTERVALS.map((preset) => {
              const selected = autoIntervalSec === preset.seconds;
              return (
                <TouchableOpacity
                  key={preset.seconds}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => {
                    const p = splitSeconds(preset.seconds);
                    setHoursInput(String(p.h));
                    setMinutesInput(String(p.m));
                    setSecondsInput(String(p.s));
                    onChangeAutoIntervalSec(preset.seconds);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Giờ</Text>
              <TextInput
                style={styles.inputField}
                value={hoursInput}
                onChangeText={(t) => handleFieldChange('h', t)}
                keyboardType="number-pad"
                maxLength={2}
                placeholder="0"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phút</Text>
              <TextInput
                style={styles.inputField}
                value={minutesInput}
                onChangeText={(t) => handleFieldChange('m', t)}
                keyboardType="number-pad"
                maxLength={3}
                placeholder="1"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Giây</Text>
              <TextInput
                style={styles.inputField}
                value={secondsInput}
                onChangeText={(t) => handleFieldChange('s', t)}
                keyboardType="number-pad"
                maxLength={3}
                placeholder="0"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
        </View>
      )}

      {onToggleAutoCycle && (
        <TouchableOpacity
          style={[styles.autoButton, autoCycleActive && styles.autoButtonActive]}
          onPress={onToggleAutoCycle}
          activeOpacity={0.85}
        >
          <Text style={[styles.autoButtonText, autoCycleActive && styles.autoButtonTextActive]}>
            {autoCycleActive
              ? `⏹ Đang chạy Auto (Đổi sau ${formatCountdown(autoCycleCountdown)}) — Bấm để tắt`
              : `⏱ Bật tự động đổi dữ liệu (mỗi ${formatIntervalLabel(autoIntervalSec)})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  pill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  desc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  mockSummary: {
    fontSize: 11,
    color: '#0369A1',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 10,
    fontWeight: '600',
  },
  subButtonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  subButton: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  subButtonPrimary: {
    backgroundColor: '#0284C7',
  },
  subButtonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  subButtonSecondary: {
    backgroundColor: '#E2E8F0',
  },
  subButtonSecondaryText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '700',
  },
  autoButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
    alignItems: 'center',
  },
  autoButtonActive: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  autoButtonText: {
    color: '#047857',
    fontSize: 11,
    fontWeight: '700',
  },
  autoButtonTextActive: {
    color: '#B91C1C',
  },
  intervalBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  intervalTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  chipSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 3,
  },
  inputField: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
});

