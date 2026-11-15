import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LiveActivityPushTokens } from 'react-native-live-widgets';

interface PushTokenPanelProps {
  tokens: LiveActivityPushTokens;
  onRefresh: () => void;
}

export function PushTokenPanel({ tokens, onRefresh }: PushTokenPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.headerRow}
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.title}>Quản lý Push Tokens (APNs / FCM)</Text>
          <Text style={styles.subtitle}>
            {tokens.devicePushToken ? 'Đã cấp Device Token' : 'Đang khởi tạo...'} •{' '}
            {expanded ? 'Thu gọn' : 'Xem chi tiết'}
          </Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
          <Text style={styles.refreshBtnText}>Làm mới</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.tokenList}>
          <View style={styles.tokenItem}>
            <Text style={styles.tokenLabel}>DEVICE TOKEN</Text>
            <Text style={styles.tokenValue} numberOfLines={1}>
              {tokens.devicePushToken || 'Chưa có'}
            </Text>
          </View>
          <View style={styles.tokenItem}>
            <Text style={styles.tokenLabel}>PUSH-TO-START TOKEN</Text>
            <Text style={styles.tokenValue} numberOfLines={1}>
              {tokens.pushToStartToken || 'Chưa có'}
            </Text>
          </View>
          <View style={styles.tokenItem}>
            <Text style={styles.tokenLabel}>ACTIVITY UPDATE TOKEN</Text>
            <Text style={styles.tokenValue} numberOfLines={1}>
              {tokens.activityUpdateToken || 'Bật Live Activity để lấy token'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  refreshBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  refreshBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  tokenList: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  tokenItem: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
  },
  tokenLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 2,
  },
  tokenValue: {
    fontSize: 11,
    fontFamily: 'Courier',
    color: '#0F172A',
  },
});

