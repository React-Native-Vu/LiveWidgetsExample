import React from 'react';
import {
  Badge,
  Button,
  Gauge,
  HStack,
  Image,
  LayoutNode,
  Progress,
  Spacer,
  Text,
  UI,
  VStack,
  Widget,
  renderToWidget,
} from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

interface DashboardBindSchema {
  user: {
    name: string;
    role: string;
  };
  attendance: {
    progress: number;
    checkInTime: string;
    onTime: boolean;
  };
  kpi: {
    revenue: number;
  };
  _syncStatus: string;
  _lastSyncTime: string;
}

const data = Widget.createDataBinding<DashboardBindSchema>({
  defaults: {
    user: { name: 'Trần Tuấn Vũ', role: 'Mobile Lead' },
    attendance: { progress: 82, checkInTime: '07:54', onTime: true },
    kpi: { revenue: 45200000 },
    _syncStatus: 'ok',
    _lastSyncTime: '08:00:00',
  },
});

const toNode = (el: React.ReactElement): LayoutNode => renderToWidget(el)!;

export const dataBindingPreset: UIPreset = {
  id: 'data_engine_binding',
  name: 'Data Engine 2.0 & StandBy / XL',
  badge: 'Binding + Family',
  description:
    'Demo Structured Data Binding (data.user.name, pipe .divide(100), currency, conditional), StandBy Mode (widgetAccentable) và Extra Large cho iPadOS / Tablet.',
  accentColor: '#10B981',
  bgPreview: '#020617',

  buildWidgetLayouts: () => ({
    small: toNode(
      <VStack padding={12} spacing={6} backgroundColor="#0F172A">
        <HStack justifyContent="spaceBetween" alignment="center">
          <Badge text="DATA 2.0" backgroundColor="#064E3B" textColor="#6EE7B7" fontSize={9} />
          <Text fontSize={10} color="#94A3B8">
            {data.attendance.checkInTime}
          </Text>
        </HStack>
        <Text fontSize={13} fontWeight="bold" color="#FFFFFF" numberOfLines={1}>
          {data.user.name}
        </Text>
        <Text fontSize={11} color="#34D399" fontWeight="semibold">
          {data.attendance.progress}% ca làm
        </Text>
        <Progress value={data.attendance.progress.divide(100)} tintColor="#10B981" height={6} />
        <Spacer minLength={2} />
        <Text fontSize={9} color="#64748B">
          Sync: {data._lastSyncTime}
        </Text>
      </VStack>
    ),

    medium: toNode(
      <VStack padding={14} spacing={8} backgroundColor="#0F172A">
        <HStack justifyContent="spaceBetween" alignment="center">
          <VStack spacing={2}>
            <Text fontSize={14} fontWeight="bold" color="#FFFFFF" numberOfLines={1}>
              {data.user.name}
            </Text>
            <Text fontSize={10} color="#94A3B8">
              {data.user.role} • {data.attendance.onTime.ifTruthy('Đúng giờ', 'Đi trễ')}
            </Text>
          </VStack>
          <Badge text={data._syncStatus.upper()} backgroundColor="#065F46" textColor="#A7F3D0" fontSize={9} />
        </HStack>

        <HStack justifyContent="spaceBetween" alignment="center" spacing={10}>
          <VStack spacing={4}>
            <HStack justifyContent="spaceBetween">
              <Text fontSize={11} color="#CBD5E1">
                Tiến độ ngày công
              </Text>
              <Text fontSize={11} fontWeight="bold" color="#38BDF8">
                {data.attendance.progress}%
              </Text>
            </HStack>
            <Progress value={data.attendance.progress.divide(100)} tintColor="#38BDF8" height={6} />
            <Text fontSize={10} color="#34D399" fontWeight="semibold">
              Doanh số: {UI.bind('kpi.revenue', { currency: '₫' })}
            </Text>
          </VStack>

          <Gauge
            value={data.attendance.progress.divide(100)}
            valueText={`${data.attendance.progress}%`}
            label="KPI"
            tintColor="#10B981"
            size={56}
            strokeWidth={6}
          />
        </HStack>

        <HStack justifyContent="spaceBetween" alignment="center">
          <Text fontSize={9} color="#64748B">
            Cập nhật lúc {data._lastSyncTime}
          </Text>
          <Button
            title="↻ Đồng bộ API"
            actionId="refresh:main"
            backgroundColor="#0284C7"
            textColor="#FFFFFF"
            fontSize={10}
            paddingHorizontal={10}
            paddingVertical={4}
          />
        </HStack>
      </VStack>
    ),

    large: toNode(
      <VStack padding={16} spacing={10} backgroundColor="#0F172A">
        <HStack justifyContent="spaceBetween" alignment="center">
          <Text fontSize={14} fontWeight="bold" color="#F8FAFC">
            DATA ENGINE 2.0 (LARGE)
          </Text>
          <Badge text={data.attendance.onTime.ifTruthy('ON TIME', 'LATE')} backgroundColor="#064E3B" textColor="#6EE7B7" fontSize={10} />
        </HStack>
        <Text fontSize={15} fontWeight="bold" color="#FFFFFF">
          {data.user.name} — {data.user.role}
        </Text>
        <HStack justifyContent="spaceBetween" alignment="center" spacing={12}>
          <Gauge
            value={data.attendance.progress.divide(100)}
            valueText={`${data.attendance.progress}%`}
            label="HOÀN THÀNH"
            tintColor="#10B981"
            size={78}
            strokeWidth={8}
          />
          <VStack spacing={6}>
            <Text fontSize={11} color="#94A3B8">
              Doanh thu quy đổi (Currency Pipe):
            </Text>
            <Text fontSize={16} fontWeight="bold" color="#34D399">
              {UI.bind('kpi.revenue', { currency: '₫' })}
            </Text>
            <Progress value={data.attendance.progress.divide(100)} tintColor="#38BDF8" height={7} />
          </VStack>
        </HStack>
        <Spacer minLength={4} />
        <Text fontSize={10} color="#64748B">
          Sync Status: {data._syncStatus} • Last Sync: {data._lastSyncTime}
        </Text>
      </VStack>
    ),

    extraLarge: toNode(
      <VStack padding={20} spacing={12} backgroundColor="#020617">
        <HStack justifyContent="spaceBetween" alignment="center">
          <VStack spacing={2}>
            <Text fontSize={18} fontWeight="bold" color="#FFFFFF">
              EXECUTIVE BOARD (EXTRA LARGE • IPADOS / TABLET)
            </Text>
            <Text fontSize={12} color="#94A3B8">
              {data.user.name} ({data.user.role}) • Vào ca {data.attendance.checkInTime}
            </Text>
          </VStack>
          <Badge text="XLARGE VIEW" backgroundColor="#1E3A8A" textColor="#93C5FD" fontSize={11} />
        </HStack>
        <HStack justifyContent="spaceBetween" alignment="center" spacing={16}>
          <Gauge
            value={data.attendance.progress.divide(100)}
            valueText={`${data.attendance.progress}%`}
            label="ATTENDANCE"
            tintColor="#10B981"
            size={92}
            strokeWidth={9}
          />
          <VStack spacing={8}>
            <Text fontSize={12} color="#94A3B8">
              Chỉ số doanh số KPI lũy kế (Pipe currency):
            </Text>
            <Text fontSize={22} fontWeight="bold" color="#34D399">
              {UI.bind('kpi.revenue', { currency: '₫' })}
            </Text>
            <Progress value={data.attendance.progress.divide(100)} tintColor="#10B981" height={8} />
          </VStack>
        </HStack>
        <Spacer minLength={6} />
        <HStack justifyContent="spaceBetween" alignment="center">
          <Text fontSize={11} color="#64748B">
            Trạng thái API nền: {data._syncStatus} • {data._lastSyncTime}
          </Text>
          <Button
            title="↻ Đồng bộ tất cả nguồn API"
            actionId="refresh:main"
            backgroundColor="#0284C7"
            textColor="#FFFFFF"
            fontSize={12}
            paddingHorizontal={12}
            paddingVertical={6}
          />
        </HStack>
      </VStack>
    ),

    standBy: toNode(
      <VStack padding={14} spacing={8} backgroundColor="#000000" alignment="center">
        <Text fontSize={12} fontWeight="bold" color="#94A3B8" widgetAccentable>
          {data.user.name.upper()}
        </Text>
        <Text fontSize={30} fontWeight="bold" color="#FFFFFF" widgetAccentable>
          {data.attendance.progress}%
        </Text>
        <Progress
          value={data.attendance.progress.divide(100)}
          tintColor="#10B981"
          trackColor="#1E293B"
          height={8}
          widgetAccentable
        />
        <Text fontSize={11} color="#34D399" widgetAccentable>
          StandBy • {data.attendance.checkInTime}
        </Text>
      </VStack>
    ),
  }),

  buildLiveActivity: () => ({
    lockScreen: toNode(
      <VStack padding={14} spacing={8} backgroundColor="#0F172A">
        <HStack justifyContent="spaceBetween" alignment="center">
          <Text fontSize={13} fontWeight="bold" color="#FFFFFF">
            Data Binding Live Activity
          </Text>
          <Badge text="ACTIVE" backgroundColor="#065F46" textColor="#A7F3D0" fontSize={10} />
        </HStack>
        <Text fontSize={12} color="#CBD5E1">
          {data.user.name} • Tiến độ {data.attendance.progress}%
        </Text>
        <Progress value={data.attendance.progress.divide(100)} tintColor="#10B981" height={6} />
      </VStack>
    ),
    dynamicIsland: {
      compactLeading: (
        <Image
          systemNameIos="bolt.horizontal.fill"
          systemNameAndroid=""
          tintColor="#10B981"
          width={16}
          height={16}
        />
      ),
      compactTrailing: (
        <Text fontSize={12} fontWeight="bold" color="#34D399">
          82%
        </Text>
      ),
      minimal: (
        <Image
          systemNameIos="chart.line.uptrend.xyaxis"
          systemNameAndroid="trending_up"
          tintColor="#10B981"
          width={14}
          height={14}
        />
      ),
      expanded: {
        leading: (
          <Image
            systemName="person.crop.circle.badge.checkmark"
            systemNameAndroid="verified"
            tintColor="#10B981"
            width={24}
            height={24}
          />
        ),
        trailing: (
          <Badge text="Data 2.0" backgroundColor="#064E3B" textColor="#6EE7B7" />
        ),
        bottom: (
          <Progress value={0.82} tintColor="#10B981" height={5} />
        ),
      },
    },
  }),
};
