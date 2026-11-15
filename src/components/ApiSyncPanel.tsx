import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ApiSyncPanelProps {
  loading: boolean;
  onSync: () => void;
}

export function ApiSyncPanel({ loading, onSync }: ApiSyncPanelProps) {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>Đồng bộ dữ liệu từ API</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>REST / JSON</Text>
        </View>
      </View>
      <Text style={styles.desc}>
        Mô phỏng gọi endpoint lấy dữ liệu ca làm việc và danh sách công việc theo thời gian thực rồi cập nhật thẳng ra Widget.
      </Text>
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
});

