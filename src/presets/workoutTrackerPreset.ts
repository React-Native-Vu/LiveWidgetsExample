import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const workoutTrackerPreset: UIPreset = {
  id: 'fitness',
  name: 'Theo dõi tập luyện & Sức khỏe',
  badge: 'Circular',
  description:
    'Vòng tròn tiến độ hiển thị phần trăm calo tiêu thụ và đồng hồ đếm ngược hiệp tập.',
  accentColor: '#059669',
  bgPreview: '#ECFDF5',
  buildWidgetLayouts: () => {
    const workoutEnd = Math.floor(Date.now() / 1000) + 1500;
    return {
      small: UI.VStack(
        { padding: 12, spacing: 6, backgroundColor: '#0F172A' },
        UI.HStack(
          UI.Text('HIIT', { fontSize: 11, fontWeight: 'bold', color: '#34D399' }),
          UI.Spacer(),
          UI.Timer(workoutEnd, { mode: 'countdown', fontSize: 11, fontWeight: 'bold', color: '#F8FAFC' })
        ),
        UI.HStack(
          { spacing: 10 },
          UI.Progress(0.68, {
            style: 'circular',
            tintColor: '#10B981',
            trackColor: '#1E293B',
            showPercentage: true,
            percentageColor: '#34D399',
            height: 52,
          }),
          UI.VStack(
            { spacing: 2 },
            UI.Text('420', { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }),
            UI.Text('Kcal', { fontSize: 10, color: '#94A3B8' })
          )
        )
      ),

      medium: UI.HStack(
        { padding: 14, spacing: 14, backgroundColor: '#0F172A' },
        UI.Progress(0.68, {
          style: 'circular',
          tintColor: '#10B981',
          trackColor: '#1E293B',
          showPercentage: true,
          percentageColor: '#34D399',
          height: 70,
        }),
        UI.VStack(
          { spacing: 4 },
          UI.Text('BUỔI TẬP HIIT CHUYÊN SÂU', { fontSize: 10, fontWeight: 'bold', color: '#34D399' }),
          UI.Text('Đã đốt 420 / 600 Kcal', { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.HStack(
            UI.Text('Hiệp tập còn:', { fontSize: 12, color: '#94A3B8' }),
            UI.Spacer(),
            UI.Timer(workoutEnd, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#34D399' })
          )
        )
      ),

      large: UI.VStack(
        { padding: 16, spacing: 12, backgroundColor: '#0F172A' },
        UI.HStack(
          UI.Text('THEO DÕI BUỔI TẬP', { fontSize: 11, fontWeight: 'bold', color: '#34D399' }),
          UI.Spacer(),
          UI.Timer(workoutEnd, { mode: 'countdown', fontSize: 15, fontWeight: 'bold', color: '#34D399' })
        ),
        UI.HStack(
          { spacing: 16 },
          UI.Progress(0.68, {
            style: 'circular',
            tintColor: '#10B981',
            trackColor: '#1E293B',
            showPercentage: true,
            percentageColor: '#34D399',
            height: 82,
          }),
          UI.VStack(
            { spacing: 4 },
            UI.Text('Mục tiêu ngày: 68%', { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }),
            UI.Text('Đã đốt: 420 / 600 Kcal', { fontSize: 13, color: '#CBD5E1' }),
            UI.Text('Nhịp tim: 138 BPM (Zone 3)', { fontSize: 13, color: '#F87171' })
          )
        ),
        UI.Spacer(4),
        UI.VStack(
          { padding: 12, spacing: 8, backgroundColor: '#1E293B', borderRadius: 10 },
          UI.Text('TIẾN ĐỘ BÀI TẬP HÔM NAY', { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' }),
          UI.HStack(
            UI.Text('Chạy bộ khởi động 3km', { fontSize: 13, color: '#FFFFFF' }),
            UI.Spacer(),
            UI.Text('Hoàn thành', { fontSize: 12, fontWeight: 'bold', color: '#34D399' })
          ),
          UI.HStack(
            UI.Text('HIIT toàn thân (Hiệp 3/4)', { fontSize: 13, color: '#FFFFFF' }),
            UI.Spacer(),
            UI.Text('Đang tập', { fontSize: 12, fontWeight: 'bold', color: '#FBBF24' })
          ),
          UI.HStack(
            UI.Text('Giãn cơ & Thở sâu 10p', { fontSize: 13, color: '#94A3B8' }),
            UI.Spacer(),
            UI.Text('Tiếp theo', { fontSize: 12, color: '#64748B' })
          )
        )
      ),
    };
  },
  buildLiveActivity: () => {
    const workoutEnd = Math.floor(Date.now() / 1000) + 1500;
    return {
      lockScreen: UI.HStack(
        { padding: 14, spacing: 14 },
        UI.Progress(0.68, {
          style: 'circular',
          tintColor: '#10B981',
          trackColor: '#334155',
          showPercentage: true,
          percentageColor: '#34D399',
          height: 52,
        }),
        UI.VStack(
          { spacing: 4 },
          UI.Text('HIIT Workout • 420 Kcal', { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.HStack(
            UI.Text('Nhịp tim 138 BPM • Còn:', { fontSize: 12, color: '#94A3B8' }),
            UI.Spacer(),
            UI.Timer(workoutEnd, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#34D399' })
          )
        )
      ),
      dynamicIsland: {
        compactLeading: UI.Text('HIIT 68%', { fontSize: 12, fontWeight: 'bold', color: '#34D399' }),
        compactTrailing: UI.Timer(workoutEnd, { mode: 'countdown', fontSize: 12, color: '#34D399' }),
        minimal: UI.Text('68%', { fontSize: 11, fontWeight: 'bold', color: '#34D399' }),
        expanded: {
          leading: UI.VStack(
            { spacing: 2, alignment: 'leading' },
            UI.Text('LUYỆN TẬP HIIT', { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' }),
            UI.Text('540 / 800 Kcal', { fontSize: 13, fontWeight: 'bold', color: '#34D399' })
          ),
          trailing: UI.VStack(
            { spacing: 2, alignment: 'trailing' },
            UI.Text('THỜI GIAN CÒN', { fontSize: 10, color: '#94A3B8' }),
            UI.Timer(workoutEnd, { mode: 'countdown', fontSize: 13, fontWeight: 'bold', color: '#34D399' })
          ),
          bottom: UI.VStack(
            { spacing: 4 },
            UI.Progress(0.68, {
              tintColor: '#34D399',
              trackColor: '#334155',
              height: 6,
            }),
            UI.Text('Nhịp tim 138 BPM • Đạt 68% mục tiêu', { fontSize: 11, color: '#94A3B8' })
          ),
        },
      },
    };
  },
};

