import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UIPreset } from '../types/preset';

interface PresetCardProps {
  preset: UIPreset;
  isSelected: boolean;
  hasActiveLiveActivity: boolean;
  onApplyWidget: (preset: UIPreset) => void;
  onApplyLiveActivity: (preset: UIPreset) => void;
}

export function PresetCard({
  preset,
  isSelected,
  hasActiveLiveActivity,
  onApplyWidget,
  onApplyLiveActivity,
}: PresetCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && { borderColor: preset.accentColor, borderWidth: 2 },
      ]}
      onPress={() => onApplyWidget(preset)}
      activeOpacity={0.92}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.indicator, { backgroundColor: preset.accentColor }]} />
          <Text style={styles.title}>{preset.name}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: preset.bgPreview }]}>
          <Text style={[styles.badgeText, { color: preset.accentColor }]}>
            {preset.badge}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{preset.description}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            { backgroundColor: isSelected ? '#0F172A' : preset.accentColor },
          ]}
          onPress={() => onApplyWidget(preset)}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryBtnText}>
            {isSelected ? '✓ Đang áp dụng (Bấm để tải lại)' : 'Cập nhật Widget'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => onApplyLiveActivity(preset)}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>
            {hasActiveLiveActivity ? 'Đổi Live Activity' : 'Bật Live Activity'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '600',
  },
});

