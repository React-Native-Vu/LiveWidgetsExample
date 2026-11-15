import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const sprintTasksPreset: UIPreset = {
  id: 'todolist',
  name: 'Kế hoạch công việc & OKRs',
  badge: 'Checklist',
  description:
    'Bảng theo dõi danh sách việc cần làm trong ngày, trạng thái các đầu việc và tỷ lệ hoàn thành.',
  accentColor: '#6D28D9',
  bgPreview: '#F5F3FF',
  buildWidgetLayouts: () => {
    return {
      small: UI.VStack(
        { padding: 12, spacing: 6, backgroundColor: '#FFFFFF' },
        UI.Text('CÔNG VIỆC', { fontSize: 10, fontWeight: 'bold', color: '#6D28D9' }),
        UI.Text('4 / 5 việc', { fontSize: 18, fontWeight: 'bold', color: '#0F172A' }),
        UI.Text('Đã hoàn thành 80%', { fontSize: 11, color: '#64748B' }),
        UI.Progress(0.8, {
          style: 'segmented',
          segments: 5,
          tintColor: '#6D28D9',
          trackColor: '#E2E8F0',
          height: 6,
        })
      ),

      medium: UI.VStack(
        { padding: 14, spacing: 6, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Text('KẾ HOẠCH HÔM NAY (4/5)', { fontSize: 10, fontWeight: 'bold', color: '#6D28D9' }),
          UI.Spacer(),
          UI.Text('Đạt 80%', { fontSize: 11, fontWeight: 'bold', color: '#15803D' })
        ),
        UI.Text('1. Hoàn thiện bộ thư viện react-native-live-widgets', {
          fontSize: 13,
          fontWeight: 'medium',
          color: '#64748B',
        }),
        UI.Text('2. Kiểm thử tương tác đa trang trên iOS & Android', {
          fontSize: 13,
          fontWeight: 'bold',
          color: '#0F172A',
        }),
        UI.Progress(0.8, {
          style: 'segmented',
          segments: 5,
          tintColor: '#6D28D9',
          trackColor: '#E2E8F0',
          showPercentage: true,
          height: 7,
        })
      ),

      large: UI.VStack(
        { padding: 16, spacing: 10, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Text('KẾ HOẠCH CÔNG VIỆC HÔM NAY', { fontSize: 11, fontWeight: 'bold', color: '#6D28D9' }),
          UI.Spacer(),
          UI.Text('4/5 Hoàn thành', { fontSize: 12, fontWeight: 'bold', color: '#15803D' })
        ),
        UI.Progress(0.8, {
          style: 'segmented',
          segments: 5,
          tintColor: '#6D28D9',
          trackColor: '#E2E8F0',
          showPercentage: true,
          height: 8,
        }),
        UI.VStack(
          { padding: 12, spacing: 8, backgroundColor: '#F8FAFC', borderRadius: 10 },
          UI.Toggle('1. Khởi tạo cấu trúc thư viện react-native-live-widgets', {
            actionId: 'toggle:sprint_1',
            checked: true,
            tintColor: '#6D28D9',
            fontSize: 12,
          }),
          UI.Toggle('2. Hỗ trợ UI.Progress, UI.Gauge và UI.Chart', {
            actionId: 'toggle:sprint_2',
            checked: true,
            tintColor: '#6D28D9',
            fontSize: 12,
          }),
          UI.Toggle('3. Tương thích iOS 27 & Android 16 Live Updates', {
            actionId: 'toggle:sprint_3',
            checked: true,
            tintColor: '#6D28D9',
            fontSize: 12,
          }),
          UI.Toggle('4. Đồng bộ dữ liệu ngầm khi đóng ứng dụng', {
            actionId: 'toggle:sprint_4',
             tintColor: '#6D28D9',
            fontSize: 12,
          })
        ),
        UI.Spacer(),
        UI.Text('Trạng thái: Đúng tiến độ đề ra', { fontSize: 11, fontWeight: 'semibold', color: '#64748B' })
      ),
    };
  },
  buildLiveActivity: () => {
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    return {
      lockScreen: UI.VStack(
        { padding: 14, spacing: 8 },
        UI.HStack(
          UI.Text('Kế hoạch ngày: Hoàn thành 4/5 việc', { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Spacer(),
          UI.Timer(deadline, { mode: 'countdown', fontSize: 13, color: '#C4B5FD' })
        ),
        UI.Progress(0.8, {
          style: 'segmented',
          segments: 5,
          tintColor: '#8B5CF6',
          showPercentage: true,
          height: 8,
        }),
        UI.Text('Đang thực hiện: Kiểm thử giao diện trên thiết bị', { fontSize: 12, color: '#CBD5E1' })
      ),
      dynamicIsland: {
        compactLeading: UI.Text('4/5 việc', { fontSize: 12, fontWeight: 'bold', color: '#C4B5FD' }),
        compactTrailing: UI.Text('80%', { fontSize: 12, fontWeight: 'bold', color: '#C4B5FD' }),
        minimal: UI.Text('80%', { fontSize: 11, fontWeight: 'bold', color: '#C4B5FD' }),
        expanded: {
          leading: UI.VStack(
            { spacing: 2, alignment: 'leading' },
            UI.Text('SPRINT HIỆN TẠI', { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' }),
            UI.Text('Sprint #42 • Fastdo', { fontSize: 13, fontWeight: 'bold', color: '#C4B5FD' })
          ),
          trailing: UI.VStack(
            { spacing: 2, alignment: 'trailing' },
            UI.Text('TIẾN ĐỘ', { fontSize: 10, color: '#94A3B8' }),
            UI.Text('4/5 việc (80%)', { fontSize: 13, fontWeight: 'bold', color: '#C4B5FD' })
          ),
          bottom: UI.VStack(
            { spacing: 4 },
            UI.Progress(0.8, {
              tintColor: '#C4B5FD',
              trackColor: '#334155',
              height: 6,
            }),
            UI.Text('Đang thực hiện: Kiểm thử giao diện trên thiết bị', { fontSize: 11, color: '#94A3B8' })
          ),
        },
      },
    };
  },
};

