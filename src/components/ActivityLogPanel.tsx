import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ActivityLogPanelProps {
  logs: string[];
}

export function ActivityLogPanel({ logs }: ActivityLogPanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NHẬT KÝ HỆ THỐNG</Text>
      {logs.length === 0 ? (
        <Text style={styles.empty}>Chưa có sự kiện nào được ghi nhận.</Text>
      ) : (
        logs.map((log, index) => (
          <Text key={index} style={styles.line}>
            {log}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    minHeight: 110,
  },
  title: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  empty: {
    color: '#64748B',
    fontSize: 11,
  },
  line: {
    color: '#E2E8F0',
    fontSize: 11,
    fontFamily: 'Courier',
    marginBottom: 4,
    lineHeight: 16,
  },
});

