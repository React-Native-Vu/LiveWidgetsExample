import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function HeaderSection() {
  return (
    <View style={styles.header}>
      <View style={styles.tagRow}>
        <View style={styles.dot} />
        <Text style={styles.tagText}>REACT NATIVE LIVE WIDGETS</Text>
      </View>
      <Text style={styles.title}>Bảng điều khiển Widget & Live Activity</Text>
      <Text style={styles.subtitle}>
        Chọn mẫu giao diện bên dưới để đồng bộ trực tiếp ra màn hình chính và màn hình khóa.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 18,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
    marginRight: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 19,
  },
});

