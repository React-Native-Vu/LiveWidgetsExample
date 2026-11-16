import React from 'react';
import { StyleSheet } from 'react-native';
import {
  VStack,
  HStack,
  Text,
  Badge,
  Progress,
  Button,
  Spacer,
  Image,
  WidgetLayoutConfig,
  LayoutNode,
  DynamicIslandConfig,
} from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const buildJsxWidgets = (userName: string = 'Trần Tuấn Vũ', shiftStatus: string = 'Vào ca sáng (07:54)'): WidgetLayoutConfig => {
  return {
    small: (
      <VStack style={styles.card} padding={12}>
        <HStack justifyContent="spaceBetween">
          <Badge text="CA SÁNG" backgroundColor="#1E3A8A" textColor="#93C5FD" fontSize={9} />
          <Text fontSize={11} color="#94A3B8">07:54</Text>
        </HStack>
        <Spacer minLength={4} />
        <Text fontSize={14} fontWeight="bold" color="#FFFFFF" numberOfLines={1}>
          {userName}
        </Text>
        <Text fontSize={10} color="#10B981" numberOfLines={1}>
          ● Đang trong ca
        </Text>
        <Spacer minLength={4} />
        <Progress value={0.75} style="segmented" segments={4} tintColor="#2563EB" height={6} />
        <Spacer minLength={4} />
        <Button
          title="Điểm danh"
          actionId="action_jsx_checkin"
          backgroundColor="#2563EB"
          textColor="#FFFFFF"
          fontSize={11}
          fullWidth
        />
      </VStack>
    ) as any,
    medium: (
      <VStack style={styles.card} padding={14}>
        <HStack justifyContent="spaceBetween" alignment="center">
          <HStack alignment="center" style={{ gap: 8 }}>
            <Image
              url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              width={32}
              height={32}
              borderRadius={16}
            />
            <VStack>
              <Text fontSize={13} fontWeight="bold" color="#FFFFFF">
                {userName}
              </Text>
              <Text fontSize={10} color="#94A3B8">
                Mobile Dev Team • Fastdo
              </Text>
            </VStack>
          </HStack>
          <Badge text="HỢP LỆ" backgroundColor="#064E3B" textColor="#6EE7B7" fontSize={10} />
        </HStack>

        <Spacer minLength={8} />

        <HStack justifyContent="spaceBetween">
          <Text fontSize={11} color="#E2E8F0">
            {shiftStatus}
          </Text>
          <Text fontSize={11} fontWeight="bold" color="#38BDF8">
            75% thời gian
          </Text>
        </HStack>

        <Spacer minLength={4} />
        <Progress value={0.75} style="segmented" segments={4} tintColor="#38BDF8" height={6} />

        <Spacer minLength={8} />

        <HStack style={{ gap: 8 }}>
          <Button
            title="Check-out"
            actionId="action_jsx_checkout"
            backgroundColor="#1E293B"
            textColor="#F8FAFC"
            fontSize={11}
            fullWidth
          />
          <Button
            title="Làm mới"
            actionId="action_jsx_refresh"
            backgroundColor="#2563EB"
            textColor="#FFFFFF"
            fontSize={11}
            fullWidth
          />
        </HStack>
      </VStack>
    ) as any,
    large: (
      <VStack style={styles.card} padding={16}>
        <HStack justifyContent="spaceBetween" alignment="center">
          <Text fontSize={14} fontWeight="bold" color="#FFFFFF">
            BẢNG ĐIỀU HÀNH FASTDO (JSX DSL)
          </Text>
          <Badge text="LIVE SYNC" backgroundColor="#064E3B" textColor="#6EE7B7" />
        </HStack>

        <Spacer minLength={10} />

        <VStack style={styles.subCard} padding={10}>
          <HStack justifyContent="spaceBetween">
            <Text fontSize={12} fontWeight="bold" color="#FFFFFF">
              {userName}
            </Text>
            <Text fontSize={11} color="#10B981">
              Đã chấm công (07:54)
            </Text>
          </HStack>
          <Spacer minLength={4} />
          <Text fontSize={10} color="#94A3B8">
            Ca hành chính: 08:00 - 17:30 • Văn phòng Đà Nẵng
          </Text>
        </VStack>

        <Spacer minLength={8} />

        <HStack justifyContent="spaceBetween">
          <Text fontSize={11} color="#94A3B8">Tiến độ ca làm việc</Text>
          <Text fontSize={11} fontWeight="bold" color="#38BDF8">6h 15m / 8h 00m</Text>
        </HStack>

        <Spacer minLength={4} />
        <Progress value={0.78} tintColor="#2563EB" height={8} />

        <Spacer minLength={12} />

        <HStack style={{ gap: 8 }}>
          <Button
            title="Xin nghỉ phép"
            actionId="action_jsx_leave"
            backgroundColor="#1E293B"
            textColor="#CBD5E1"
            fontSize={11}
            fullWidth
          />
          <Button
            title="Gửi báo cáo"
            actionId="action_jsx_report"
            backgroundColor="#2563EB"
            textColor="#FFFFFF"
            fontSize={11}
            fullWidth
          />
        </HStack>
      </VStack>
    ) as any,
  };
};

export const jsxWorkspacePreset: UIPreset = {
  id: 'jsx_workspace_preset',
  name: 'JSX Declarative UI (Mới v1.2)',
  badge: 'JSX TSX',
  category: 'workspace',
  description: 'Giao diện viết hoàn toàn bằng cú pháp React JSX/TSX Component (<VStack>, <Text>, <Button>) với style props.',
  accentColor: '#38BDF8',
  bgPreview: '#0F172A',
  buildWidgetLayouts: () => {
    return buildJsxWidgets();
  },
  buildLiveActivity: (): { lockScreen: LayoutNode; dynamicIsland: DynamicIslandConfig } => {
    return {
      lockScreen: (
        <VStack style={styles.card} padding={16}>
          <HStack justifyContent="spaceBetween" alignment="center">
            <Text fontSize={14} fontWeight="bold" color="#FFFFFF">
              Fastdo Ca Làm Sáng
            </Text>
            <Badge text="07:54 (Hợp lệ)" backgroundColor="#064E3B" textColor="#6EE7B7" />
          </HStack>
          <Progress value={0.75} style="segmented" segments={4} tintColor="#38BDF8" height={6} />
          <Button title="Check-out ca làm" actionId="action_jsx_checkout" fullWidth />
        </VStack>
      ) as any,
      dynamicIsland: {
        compactLeading: (<Text color="#38BDF8" fontWeight="bold">07:54</Text>) as any,
        compactTrailing: (<Badge text="OK" backgroundColor="#064E3B" textColor="#6EE7B7" />) as any,
        minimal: (<Text color="#10B981">●</Text>) as any,
        expanded: (
          <VStack style={styles.card} padding={12}>
            <HStack justifyContent="spaceBetween">
              <Text fontSize={13} fontWeight="bold" color="#FFFFFF">Trần Tuấn Vũ</Text>
              <Text fontSize={11} color="#38BDF8">Đang trong ca</Text>
            </HStack>
            <Progress value={0.75} tintColor="#2563EB" height={4} />
          </VStack>
        ) as any,
      },
    };
  },
} as any;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  subCard: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
});
