import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const executiveKpiPreset: UIPreset = {
  id: 'analytics_kpi',
  name: 'Bảng điều hành KPI & Biểu đồ',
  badge: 'Gauge + Chart + Grid',
  description:
    'Sử dụng các Component nâng cao: Đồng hồ đo Gauge, Biểu đồ cột/đường Chart, Lưới Grid 2x2, Nhãn Badge và Công tắc Toggle.',
  accentColor: '#0284C7',
  bgPreview: '#F0F9FF',
  buildWidgetLayouts: () => {
    return {
      small: UI.VStack(
        { padding: 12, spacing: 6, backgroundColor: '#0F172A' },
        UI.HStack(
          UI.Badge('KPI Q4', { backgroundColor: '#1E293B', textColor: '#38BDF8', fontSize: 9 }),
          UI.Spacer(),
          UI.Badge('+18%', { backgroundColor: '#064E3B', textColor: '#34D399', fontSize: 9 })
        ),
        UI.HStack(
          { spacing: 8 },
          UI.Gauge(0.86, {
            size: 58,
            tintColor: '#38BDF8',
            trackColor: '#1E293B',
            textColor: '#F8FAFC',
            labelColor: '#94A3B8',
            valueText: '86%',
            label: 'Đạt chuẩn',
          }),
          UI.VStack(
            { spacing: 2 },
            UI.Text('1.28 Tỷ', { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC' }),
            UI.Text('Doanh thu tuần', { fontSize: 10, color: '#94A3B8' })
          )
        )
      ),

      medium: UI.VStack(
        { padding: 14, spacing: 8, backgroundColor: '#0F172A' },
        UI.HStack(
          UI.Text('BÁO CÁO KPI & DOANH THU TUẦN', { fontSize: 10, fontWeight: 'bold', color: '#38BDF8' }),
          UI.Spacer(),
          UI.Badge('Vượt chỉ tiêu +18%', { backgroundColor: '#064E3B', textColor: '#34D399', fontSize: 10 })
        ),
        UI.HStack(
          { spacing: 14 },
          UI.Gauge(0.86, {
            size: 68,
            tintColor: '#38BDF8',
            trackColor: '#1E293B',
            textColor: '#F8FAFC',
            labelColor: '#94A3B8',
            valueText: '86%',
            label: 'KPI Quý',
          }),
          UI.VStack(
            { spacing: 4 },
            UI.Chart([42, 58, 51, 74, 68, 92, 108], {
              style: 'bar',
              labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
              tintColor: '#38BDF8',
              secondaryColor: '#1E3A8A',
              labelColor: '#94A3B8',
              height: 44,
            })
          )
        )
      ),

      large: UI.VStack(
        { padding: 16, spacing: 8, backgroundColor: '#0F172A' },
        UI.HStack(
          UI.Text('TỔNG QUAN ĐIỀU HÀNH (KPI & BIỂU ĐỒ)', { fontSize: 10, fontWeight: 'bold', color: '#38BDF8' }),
          UI.Spacer(),
          UI.Badge('LIVE SYNC', { backgroundColor: '#064E3B', textColor: '#34D399', fontSize: 9 })
        ),
        UI.HStack(
          { spacing: 14 },
          UI.Gauge(0.86, {
            size: 66,
            tintColor: '#38BDF8',
            trackColor: '#1E293B',
            textColor: '#F8FAFC',
            labelColor: '#94A3B8',
            valueText: '86%',
            label: 'KPI Quý',
          }),
          UI.Chart([35, 52, 48, 70, 65, 88, 105], {
            style: 'line',
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            tintColor: '#34D399',
            labelColor: '#94A3B8',
            height: 46,
          })
        ),
        UI.Divider({ color: '#1E293B', thickness: 1, marginVertical: 2 }),
        UI.Grid(
          { columns: 2, columnSpacing: 8, rowSpacing: 8 },
          UI.VStack(
            { padding: 8, spacing: 2, backgroundColor: '#1E293B', borderRadius: 8 },
            UI.Text('Doanh thu tháng', { fontSize: 10, color: '#94A3B8' }),
            UI.Text('4.85 Tỷ ₫', { fontSize: 14, fontWeight: 'bold', color: '#F8FAFC' })
          ),
          UI.VStack(
            { padding: 8, spacing: 2, backgroundColor: '#1E293B', borderRadius: 8 },
            UI.Text('Đơn hoàn tất', { fontSize: 10, color: '#94A3B8' }),
            UI.Text('1,420 đơn', { fontSize: 14, fontWeight: 'bold', color: '#34D399' })
          )
        ),
        UI.Toggle('Duyệt báo cáo doanh thu tuần', {
          actionId: 'toggle:kpi_approve',
          style: 'checkbox',
          tintColor: '#38BDF8',
          textColor: '#F8FAFC',
          checkedTextColor: '#64748B',
          fontSize: 12,
        }),
        UI.Toggle('Tự động gửi cảnh báo vượt ngưỡng', {
          actionId: 'toggle:kpi_auto_alert',
          style: 'switch',
          checked: true,
          tintColor: '#10B981',
          textColor: '#E2E8F0',
          checkedTextColor: '#E2E8F0',
          fontSize: 12,
          strikethroughOnCheck: false,
        })
      ),
    };
  },
  buildLiveActivity: () => {
    return {
      lockScreen: UI.VStack(
        { padding: 14, spacing: 8 },
        UI.HStack(
          UI.Text('KPI Quý 4: Đạt 86% mục tiêu', { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Spacer(),
          UI.Badge('+18%', { backgroundColor: '#064E3B', textColor: '#34D399', fontSize: 10 })
        ),
        UI.Chart([42, 58, 51, 74, 68, 92, 108], {
          style: 'bar',
          labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
          tintColor: '#38BDF8',
          height: 40,
        })
      ),
      dynamicIsland: {
        compactLeading: UI.Text('KPI Q4', { fontSize: 12, fontWeight: 'bold', color: '#38BDF8' }),
        compactTrailing: UI.Text('86%', { fontSize: 12, fontWeight: 'bold', color: '#34D399' }),
        minimal: UI.Text('86%', { fontSize: 11, fontWeight: 'bold', color: '#34D399' }),
        expanded: {
          leading: UI.VStack(
            { spacing: 2, alignment: 'leading' },
            UI.Text('BẢNG ĐIỀU HÀNH KPI', { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' }),
            UI.Text('Mục tiêu Q4/2026', { fontSize: 13, fontWeight: 'bold', color: '#38BDF8' })
          ),
          trailing: UI.VStack(
            { spacing: 2, alignment: 'trailing' },
            UI.Text('TIẾN ĐỘ', { fontSize: 10, color: '#94A3B8' }),
            UI.Text('86% Hoàn thành', { fontSize: 13, fontWeight: 'bold', color: '#34D399' })
          ),
          bottom: UI.VStack(
            { spacing: 4 },
            UI.Progress(0.86, {
              tintColor: '#34D399',
              trackColor: '#334155',
              height: 6,
            }),
            UI.Text('Doanh số 12.8 tỷ / 15 tỷ VNĐ • Tăng trưởng +22%', { fontSize: 11, color: '#94A3B8' })
          ),
        },
      },
    };
  },
};

