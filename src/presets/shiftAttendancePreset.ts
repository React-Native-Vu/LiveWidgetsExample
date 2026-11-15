import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const shiftAttendancePreset: UIPreset = {
  id: 'timekeeping',
  name: 'Chấm công & Ca làm việc',
  badge: 'Segmented',
  description:
    'Theo dõi thời gian làm việc trong ca, giờ check-in, thanh tiến trình 4 chặng và đồng hồ đếm ngược đến giờ tan ca.',
  accentColor: '#2563EB',
  bgPreview: '#EFF6FF',
  buildWidgetLayouts: () => {
    const endShift = Math.floor(Date.now() / 1000) + 5400;
    return {
      small: UI.VStack(
        { padding: 12, spacing: 6, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Text('CHẤM CÔNG', { fontSize: 10, fontWeight: 'bold', color: '#2563EB' }),
          UI.Spacer(),
          UI.Text('Đang làm', { fontSize: 10, fontWeight: 'semibold', color: '#15803D' })
        ),
        UI.Text('Ca hành chính', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
        UI.Text('08:00 - 17:30', { fontSize: 12, color: '#64748B' }),
        UI.Spacer(4),
        UI.Progress(0.75, {
          style: 'segmented',
          segments: 4,
          tintColor: '#2563EB',
          trackColor: '#E2E8F0',
          height: 6,
        }),
        UI.HStack(
          UI.Text('Tan ca:', { fontSize: 11, color: '#64748B' }),
          UI.Spacer(),
          UI.Timer(endShift, { mode: 'countdown', fontSize: 12, fontWeight: 'bold', color: '#2563EB' })
        )
      ),

      medium: UI.VStack(
        { padding: 14, spacing: 8, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Text('CHẤM CÔNG HÔM NAY', { fontSize: 10, fontWeight: 'bold', color: '#2563EB' }),
          UI.Spacer(),
          UI.Text('Check-in: 07:54', { fontSize: 11, fontWeight: 'semibold', color: '#15803D' })
        ),
        UI.HStack(
          UI.VStack(
            { spacing: 2 },
            UI.Text('Ca hành chính (08:00 - 17:30)', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
            UI.Text('Văn phòng trụ sở chính • Hợp lệ', { fontSize: 12, color: '#64748B' })
          ),
          UI.Spacer(),
          UI.Timer(endShift, { mode: 'countdown', fontSize: 15, fontWeight: 'bold', color: '#2563EB' })
        ),
        UI.Progress(0.75, {
          style: 'segmented',
          segments: 4,
          tintColor: '#2563EB',
          trackColor: '#E2E8F0',
          showPercentage: true,
          height: 7,
        })
      ),

      large: UI.VStack(
        { padding: 16, spacing: 10, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Text('CHẤM CÔNG HÔM NAY', { fontSize: 11, fontWeight: 'bold', color: '#2563EB' }),
          UI.Spacer(),
          UI.Badge('14 ngày đúng giờ', { backgroundColor: '#EFF6FF', textColor: '#2563EB', fontSize: 10 })
        ),
        UI.Text('Ca hành chính (08:00 - 17:30)', { fontSize: 18, fontWeight: 'bold', color: '#0F172A' }),
        UI.HStack(
          UI.Text('Thời gian còn lại của ca:', { fontSize: 13, color: '#475569' }),
          UI.Spacer(),
          UI.Timer(endShift, { mode: 'countdown', fontSize: 15, fontWeight: 'bold', color: '#2563EB' })
        ),
        UI.Progress(0.75, {
          style: 'segmented',
          segments: 4,
          tintColor: '#2563EB',
          trackColor: '#E2E8F0',
          showPercentage: true,
          height: 8,
        }),
        UI.Spacer(4),
        UI.Text('LỊCH SỬ GHI NHẬN TRONG NGÀY', { fontSize: 10, fontWeight: 'bold', color: '#64748B' }),
        UI.VStack(
          { padding: 10, spacing: 6, backgroundColor: '#F8FAFC', borderRadius: 10 },
          UI.HStack(
            UI.Text('Vào ca sáng', { fontSize: 13, fontWeight: 'semibold', color: '#0F172A' }),
            UI.Spacer(),
            UI.Text('07:54 (Đúng giờ)', { fontSize: 12, fontWeight: 'bold', color: '#15803D' })
          ),
          UI.HStack(
            UI.Text('Nghỉ trưa', { fontSize: 13, fontWeight: 'semibold', color: '#0F172A' }),
            UI.Spacer(),
            UI.Text('12:00 - 13:30', { fontSize: 12, color: '#64748B' })
          ),
          UI.HStack(
            UI.Text('Tan ca chiều', { fontSize: 13, fontWeight: 'semibold', color: '#0F172A' }),
            UI.Spacer(),
            UI.Text('Dự kiến 17:30', { fontSize: 12, color: '#2563EB' })
          )
        ),
        UI.Spacer(),
        UI.HStack(
          UI.Text('Toà nhà Innovation, Quận 1', { fontSize: 11, color: '#64748B' }),
          UI.Spacer(),
          UI.Text('Bán kính 150m', { fontSize: 11, fontWeight: 'semibold', color: '#2563EB' })
        )
      ),

      // Màn hình khóa iOS 16+ (Lock Screen Widgets)
      accessoryRectangular: UI.VStack(
        { spacing: 3 },
        UI.HStack(
          UI.Text('CA HÀNH CHÍNH', { fontSize: 10, fontWeight: 'bold' }),
          UI.Spacer(),
          UI.Timer(endShift, { mode: 'countdown', fontSize: 11, fontWeight: 'bold' })
        ),
        UI.Text('Đã check-in: 07:54 (Hợp lệ)', { fontSize: 11 }),
        UI.Progress(0.75, { style: 'bar', height: 4 })
      ),

      accessoryCircular: UI.Gauge(0.75, {
        size: 52,
        valueText: '75%',
        label: 'Ca làm',
      }),

      accessoryInline: UI.Text('Ca làm việc • Tan ca 17:30', { fontSize: 12, fontWeight: 'semibold' }),
    };
  },
  buildLiveActivity: () => {
    const endShift = Math.floor(Date.now() / 1000) + 5400;
    return {
      lockScreen: UI.VStack(
        { padding: 14, spacing: 8 },
        UI.HStack(
          UI.Text('Ca hành chính (08:00 - 17:30)', { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Spacer(),
          UI.Timer(endShift, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#60A5FA' })
        ),
        UI.Progress(0.75, {
          style: 'segmented',
          segments: 4,
          tintColor: '#3B82F6',
          trackColor: '#334155',
          showPercentage: true,
          height: 8,
        }),
        UI.Text('Đã check-in lúc 07:54 • Dự kiến tan ca lúc 17:30', { fontSize: 12, color: '#CBD5E1' })
      ),
      dynamicIsland: {
        compactLeading: UI.Text('Ca sáng', { fontSize: 12, fontWeight: 'bold', color: '#60A5FA' }),
        compactTrailing: UI.Timer(endShift, { mode: 'countdown', fontSize: 12, color: '#60A5FA' }),
        minimal: UI.Text('75%', { fontSize: 11, fontWeight: 'bold', color: '#60A5FA' }),
        expanded: {
          leading: UI.VStack(
            { spacing: 2, alignment: 'leading' },
            UI.Text('CA HÀNH CHÍNH', { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' }),
            UI.Text('08:00 - 17:30', { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' })
          ),
          trailing: UI.VStack(
            { spacing: 2, alignment: 'trailing' },
            UI.Text('TAN CA SAU', { fontSize: 10, color: '#94A3B8' }),
            UI.Timer(endShift, { mode: 'countdown', fontSize: 13, fontWeight: 'bold', color: '#60A5FA' })
          ),
          bottom: UI.VStack(
            { paddingHorizontal: 4, spacing: 2 },
            UI.Progress(0.75, {
              style: 'segmented',
              segments: 4,
              tintColor: '#3B82F6',
              showPercentage: true,
              height: 7,
            })
          ),
        },
      },
    };
  },
};

