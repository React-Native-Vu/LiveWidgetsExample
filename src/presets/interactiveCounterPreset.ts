import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

let currentCounterValue = 10;
type CounterListener = (val: number) => void;
const counterListeners = new Set<CounterListener>();

export function subscribeCounterValue(fn: CounterListener): () => void {
  counterListeners.add(fn);
  return () => {
    counterListeners.delete(fn);
  };
}

export function getCounterValue(): number {
  return currentCounterValue;
}

export function setCounterValue(val: number): void {
  currentCounterValue = val;
  counterListeners.forEach((fn) => {
    try {
      fn(val);
    } catch {}
  });
}

export const interactiveCounterPreset: UIPreset = {
  id: 'interactive_counter',
  name: 'Bộ đếm tương tác TypeScript (Interactive TS)',
  badge: 'Action Dispatcher',
  description:
    'Bấm nút [+] hoặc [-] ngay trên Widget ngoài màn hình chính để kích hoạt hàm TypeScript React Native tính toán và vẽ lại số liệu tức thì.',
  accentColor: '#10B981',
  bgPreview: '#064E3B',

  buildWidgetLayouts: () => {
    return {
      rootDeepLink: 'fastdo://counter/detail',
      containerBackground: {
        backgroundColor: { light: '#F8FAFC', dark: '#0F172A' },
      },

      small: UI.VStack(
        {
          padding: 12,
          spacing: 8,
          backgroundColor: { light: '#FFFFFF', dark: '#0F172A' },
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.Image({
            systemName: 'hand.tap.fill',
            tintColor: '#10B981',
            symbolEffect: 'bounce',
            width: 18,
            height: 18,
          }),
          UI.Badge({
            text: 'TS Action',
            backgroundColor: '#064E3B',
            textColor: '#6EE7B7',
            fontSize: 9,
          })
        ),
        UI.Text('BỘ ĐẾM SỐ', {
          fontSize: 10,
          fontWeight: 'bold',
          color: { light: '#64748B', dark: '#94A3B8' },
        }),
        UI.Text(`${currentCounterValue}`, {
          fontSize: 26,
          fontWeight: 'bold',
          color: { light: '#0F172A', dark: '#34D399' },
          numericAnimation: true,
        }),
        UI.Spacer(),
        UI.HStack(
          { spacing: 6, justifyContent: 'spaceBetween' },
          UI.Button('-', {
            actionId: 'action_counter_dec',
            backgroundColor: { light: '#F1F5F9', dark: '#1E293B' },
            textColor: { light: '#0F172A', dark: '#F8FAFC' },
            fontSize: 14,
            paddingHorizontal: 12,
            paddingVertical: 4,
          }),
          UI.Button('+', {
            actionId: 'action_counter_inc',
            backgroundColor: '#10B981',
            textColor: '#FFFFFF',
            fontSize: 14,
            paddingHorizontal: 12,
            paddingVertical: 4,
          })
        )
      ),

      medium: UI.VStack(
        {
          padding: 14,
          spacing: 10,
          backgroundColor: { light: '#FFFFFF', dark: '#0F172A' },
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.HStack(
            { spacing: 6, alignment: 'center' },
            UI.Image({
              systemName: 'bolt.fill',
              tintColor: '#10B981',
              symbolEffect: 'pulse',
              width: 20,
              height: 20,
            }),
            UI.VStack(
              { spacing: 2 },
              UI.Text('TƯƠNG TÁC HÀM TYPESCRIPT TRỰC TIẾP', {
                fontSize: 10,
                fontWeight: 'bold',
                color: { light: '#047857', dark: '#34D399' },
              }),
              UI.Text('Widget tap -> Native -> React Native TS Engine', {
                fontSize: 9,
                color: { light: '#64748B', dark: '#94A3B8' },
              })
            )
          ),
          UI.Badge({
            text: 'Hai chiều (Bi-directional)',
            backgroundColor: '#064E3B',
            textColor: '#6EE7B7',
            fontSize: 9,
          })
        ),
        UI.Divider({ color: { light: '#E2E8F0', dark: '#334155' } }),
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.VStack(
            { spacing: 4 },
            UI.Text('Giá trị đếm thời gian thực:', {
              fontSize: 11,
              color: { light: '#64748B', dark: '#94A3B8' },
            }),
            UI.Text(`${currentCounterValue} lượt`, {
              fontSize: 22,
              fontWeight: 'bold',
              color: { light: '#0F172A', dark: '#F8FAFC' },
              numericAnimation: true,
            })
          ),
          UI.HStack(
            { spacing: 6, alignment: 'center' },
            UI.Button('Trừ (-1)', {
              actionId: 'action_counter_dec',
              backgroundColor: { light: '#E2E8F0', dark: '#334155' },
              textColor: { light: '#0F172A', dark: '#F8FAFC' },
              fontSize: 11,
              paddingHorizontal: 10,
              paddingVertical: 6,
            }),
            UI.Button('Đặt lại (0)', {
              actionId: 'action_counter_reset',
              backgroundColor: { light: '#FEE2E2', dark: '#7F1D1D' },
              textColor: { light: '#DC2626', dark: '#FCA5A5' },
              fontSize: 11,
              paddingHorizontal: 8,
              paddingVertical: 6,
            }),
            UI.Button('Cộng (+1)', {
              actionId: 'action_counter_inc',
              backgroundColor: '#10B981',
              textColor: '#FFFFFF',
              fontSize: 11,
              paddingHorizontal: 12,
              paddingVertical: 6,
            })
          )
        ),
        UI.Text('⚡ Bấm nút trên Widget: code TS trong App.tsx sẽ chạy và cập nhật giao diện', {
          fontSize: 9,
          color: { light: '#64748B', dark: '#94A3B8' },
        })
      ),

      large: UI.VStack(
        {
          padding: 16,
          spacing: 12,
          backgroundColor: { light: '#FFFFFF', dark: '#0F172A' },
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.Text('BẢNG ĐIỀU KHIỂN TƯƠNG TÁC TYPESCRIPT', {
            fontSize: 12,
            fontWeight: 'bold',
            color: { light: '#0F172A', dark: '#F8FAFC' },
          }),
          UI.Badge({
            text: 'Live Bi-directional',
            backgroundColor: '#064E3B',
            textColor: '#6EE7B7',
            fontSize: 10,
          })
        ),
        UI.Divider({ color: { light: '#E2E8F0', dark: '#334155' } }),
        UI.HStack(
          { justifyContent: 'spaceAround', alignment: 'center' },
          UI.VStack(
            { spacing: 4, alignment: 'center' },
            UI.Text('GIÁ TRỊ HIỆN TẠI', { fontSize: 10, color: '#94A3B8' }),
            UI.Text(`${currentCounterValue}`, {
              fontSize: 32,
              fontWeight: 'bold',
              color: '#10B981',
              numericAnimation: true,
            })
          ),
          UI.VStack(
            { spacing: 6 },
            UI.Button('Tăng giá trị (+1)', {
              actionId: 'action_counter_inc',
              backgroundColor: '#10B981',
              textColor: '#FFFFFF',
              fontSize: 11,
              paddingHorizontal: 14,
              paddingVertical: 6,
            }),
            UI.Button('Giảm giá trị (-1)', {
              actionId: 'action_counter_dec',
              backgroundColor: { light: '#E2E8F0', dark: '#334155' },
              textColor: { light: '#0F172A', dark: '#F8FAFC' },
              fontSize: 11,
              paddingHorizontal: 14,
              paddingVertical: 6,
            }),
            UI.Button('Đặt lại về 0', {
              actionId: 'action_counter_reset',
              backgroundColor: { light: '#FEE2E2', dark: '#7F1D1D' },
              textColor: { light: '#DC2626', dark: '#FCA5A5' },
              fontSize: 11,
              paddingHorizontal: 14,
              paddingVertical: 6,
            })
          )
        )
      ),
    };
  },

  buildLiveActivity: () => {
    return {
      lockScreen: UI.VStack(
        {
          padding: 14,
          spacing: 10,
          backgroundColor: '#0F172A',
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.HStack(
            { spacing: 6, alignment: 'center' },
            UI.Image({
              systemName: 'bolt.badge.clock.fill',
              tintColor: '#10B981',
              symbolEffect: 'pulse',
              width: 20,
              height: 20,
            }),
            UI.Text('Tương tác Live Activity TypeScript', {
              fontSize: 13,
              fontWeight: 'bold',
              color: '#F8FAFC',
            })
          ),
          UI.Badge({
            text: `Count: ${currentCounterValue}`,
            backgroundColor: '#064E3B',
            textColor: '#6EE7B7',
            fontSize: 10,
          })
        ),
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.Text('Bấm nút dưới để gọi logic TS:', {
            fontSize: 11,
            color: '#94A3B8',
          }),
          UI.HStack(
            { spacing: 6 },
            UI.Button('-1', {
              actionId: 'action_counter_dec',
              backgroundColor: '#334155',
              textColor: '#F8FAFC',
              fontSize: 12,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }),
            UI.Button('+1', {
              actionId: 'action_counter_inc',
              backgroundColor: '#10B981',
              textColor: '#FFFFFF',
              fontSize: 12,
              paddingHorizontal: 14,
              paddingVertical: 6,
            })
          )
        )
      ),

      dynamicIsland: {
        compactLeading: UI.Image({
          systemName: 'hand.tap.fill',
          tintColor: '#10B981',
          width: 15,
          height: 15,
        }),
        compactTrailing: UI.Text(`${currentCounterValue}`, {
          color: '#10B981',
          fontSize: 12,
          fontWeight: 'bold',
          numericAnimation: true,
        }),
        minimal: UI.Text(`${currentCounterValue}`, {
          color: '#10B981',
          fontSize: 11,
          fontWeight: 'bold',
        }),
        expanded: {
          leading: UI.Image({
            systemName: 'bolt.fill',
            tintColor: '#10B981',
            width: 22,
            height: 22,
          }),
          trailing: UI.Badge({
            text: 'TS Engine',
            backgroundColor: '#064E3B',
            textColor: '#6EE7B7',
            fontSize: 10,
          }),
          bottom: UI.HStack(
            { justifyContent: 'spaceBetween', alignment: 'center' },
            UI.Text(`Số đếm hiện tại: ${currentCounterValue}`, {
              fontSize: 13,
              fontWeight: 'bold',
              color: '#F8FAFC',
            }),
            UI.Button('Tăng (+1)', {
              actionId: 'action_counter_inc',
              backgroundColor: '#10B981',
              textColor: '#FFFFFF',
              fontSize: 11,
              paddingHorizontal: 12,
              paddingVertical: 5,
            })
          ),
        },
      },
    };
  },
};
