import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

function buildWorkspaceTabBar(activePage: 'shift' | 'todo' | 'okr') {
  return UI.HStack(
    { spacing: 6 },
    UI.Button('Ca làm', {
      actionId: 'page:shift',
      backgroundColor: activePage === 'shift' ? '#0F172A' : '#E2E8F0',
      textColor: activePage === 'shift' ? '#FFFFFF' : '#475569',
      fontSize: 11,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }),
    UI.Button('Công việc', {
      actionId: 'page:todo',
      backgroundColor: activePage === 'todo' ? '#0F172A' : '#E2E8F0',
      textColor: activePage === 'todo' ? '#FFFFFF' : '#475569',
      fontSize: 11,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }),
    UI.Button('OKRs', {
      actionId: 'page:okr',
      backgroundColor: activePage === 'okr' ? '#0F172A' : '#E2E8F0',
      textColor: activePage === 'okr' ? '#FFFFFF' : '#475569',
      fontSize: 11,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }),
    UI.Spacer(),
    UI.Button('Tiếp', {
      actionId: 'page:next',
      backgroundColor: '#2563EB',
      textColor: '#FFFFFF',
      fontSize: 10,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 5,
    })
  );
}

export const interactiveWorkspacePreset: UIPreset = {
  id: 'interactive_workspace',
  name: 'Không gian làm việc đa trang',
  badge: 'Multi-Page',
  description:
    'Chuyển đổi qua lại giữa 3 tab (Ca làm, Công việc, OKRs) và đánh dấu hoàn thành trực tiếp trên mặt Widget không cần mở ứng dụng.',
  accentColor: '#0F172A',
  bgPreview: '#F1F5F9',
  buildWidgetLayouts: () => {
    const endShift = Math.floor(Date.now() / 1000) + 5400;
    return {
      initialPage: 'shift',
      pageOrder: ['shift', 'todo', 'okr'],
      pages: {
        shift: {
          small: UI.VStack(
            { padding: 12, spacing: 6, backgroundColor: '#F8FAFC' },
            UI.HStack(
              UI.Text('TRANG 1/3', { fontSize: 10, fontWeight: 'bold', color: '#2563EB' }),
              UI.Spacer(),
              UI.Button('Tiếp', {
                actionId: 'page:todo',
                backgroundColor: '#0F172A',
                textColor: '#FFFFFF',
                fontSize: 10,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
              })
            ),
            UI.Text('Ca hành chính', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
            UI.Progress(0.75, { style: 'segmented', segments: 4, tintColor: '#2563EB', height: 6 }),
            UI.Timer(endShift, { mode: 'countdown', fontSize: 12, fontWeight: 'bold', color: '#2563EB' })
          ),
          medium: UI.VStack(
            { padding: 12, spacing: 7, backgroundColor: '#F8FAFC' },
            buildWorkspaceTabBar('shift'),
            UI.HStack(
              UI.VStack(
                { spacing: 2 },
                UI.Text('Ca hành chính (08:00 - 17:30)', { fontSize: 14, fontWeight: 'bold', color: '#0F172A' }),
                UI.Text('Check-in: 07:54 • Đúng giờ', { fontSize: 11, color: '#15803D', fontWeight: 'semibold' })
              ),
              UI.Spacer(),
              UI.Timer(endShift, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#2563EB' })
            ),
            UI.Progress(0.75, {
              style: 'segmented',
              segments: 4,
              tintColor: '#2563EB',
              trackColor: '#CBD5E1',
              showPercentage: true,
              height: 7,
            })
          ),
          large: UI.VStack(
            { padding: 14, spacing: 9, backgroundColor: '#F8FAFC' },
            buildWorkspaceTabBar('shift'),
            UI.HStack(
              { spacing: 10 },
              UI.Image('https://i.pravatar.cc/150?img=11', {
                width: 42,
                height: 42,
                borderRadius: 21,
                borderWidth: 1.5,
                borderColor: '#2563EB',
                fallbackSystemName: 'person.crop.circle.fill',
                tintColor: '#2563EB',
              }),
              UI.VStack(
                { spacing: 2 },
                UI.Text('Trần Tuấn Vũ • Mobile Team', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
                UI.Text('Ca hành chính (08:00 - 17:30)', { fontSize: 12, color: '#475569', fontWeight: 'medium' })
              ),
              UI.Spacer(),
              UI.Timer(endShift, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#2563EB' })
            ),
            UI.Progress(0.75, {
              style: 'segmented',
              segments: 4,
              tintColor: '#2563EB',
              trackColor: '#CBD5E1',
              showPercentage: true,
              height: 8,
            }),
            UI.VStack(
              { padding: 10, spacing: 6, backgroundColor: '#FFFFFF', borderRadius: 10 },
              UI.HStack(
                UI.Text('Vào ca sáng', { fontSize: 12, fontWeight: 'semibold', color: '#0F172A' }),
                UI.Spacer(),
                UI.Text('07:54 (Hợp lệ)', { fontSize: 12, fontWeight: 'bold', color: '#15803D' })
              ),
              UI.HStack(
                UI.Text('Đồng bộ lúc: {{_lastSyncTime}}', { fontSize: 11, fontWeight: 'medium', color: '#475569' }),
                UI.Spacer(),
                UI.Text('Mã #{{id}}', { fontSize: 11, fontWeight: 'bold', color: '#2563EB' })
              ),
              UI.Text('Ghi chú: {{title}}', { fontSize: 11, color: '#64748B' })
            ),
            UI.Spacer(),
            UI.Button('Làm mới dữ liệu ngầm', {
              actionId: 'refresh',
              backgroundColor: '#0F172A',
              textColor: '#FFFFFF',
              fontSize: 11,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
              fullWidth: true,
            })
          ),
          accessoryRectangular: UI.VStack(
            { spacing: 2 },
            UI.HStack(
              UI.Text('CA HÀNH CHÍNH', { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' }),
              UI.Spacer(),
              UI.Timer(endShift, { mode: 'countdown', fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' })
            ),
            UI.Text('Check-in: 07:54 • Đúng giờ', { fontSize: 11, color: '#E2E8F0' }),
            UI.Progress(0.75, { style: 'bar', height: 4, tintColor: '#FFFFFF' })
          ),
          accessoryCircular: UI.Gauge(0.75, {
            size: 50,
            strokeWidth: 4,
            tintColor: '#FFFFFF',
            trackColor: '#64748B',
            textColor: '#FFFFFF',
            valueText: '75%',
            label: 'Ca làm',
          }),
          accessoryInline: UI.Text('Ca làm: 08:00 - 17:30 • 75%', { fontSize: 12, fontWeight: 'semibold' }),
        },

        todo: {
          small: UI.VStack(
            { padding: 12, spacing: 6, backgroundColor: '#F8FAFC' },
            UI.HStack(
              UI.Text('TRANG 2/3', { fontSize: 10, fontWeight: 'bold', color: '#4F46E5' }),
              UI.Spacer(),
              UI.Button('Tiếp', {
                actionId: 'page:okr',
                backgroundColor: '#0F172A',
                textColor: '#FFFFFF',
                fontSize: 10,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
              })
            ),
            UI.Text('Việc cần làm', { fontSize: 14, fontWeight: 'bold', color: '#0F172A' }),
            UI.Toggle('Duyệt kế hoạch tuần', {
              actionId: 'toggle:todo_1',
              style: 'checkbox',
              tintColor: '#4F46E5',
              textColor: '#0F172A',
              fontSize: 11,
            })
          ),
          medium: UI.VStack(
            { padding: 12, spacing: 6, backgroundColor: '#F8FAFC' },
            buildWorkspaceTabBar('todo'),
            UI.Toggle('1. Thiết kế kiến trúc Widget đa trang', {
              actionId: 'toggle:todo_1',
              style: 'checkbox',
              tintColor: '#4F46E5',
              textColor: '#0F172A',
              fontSize: 12,
            }),
            UI.Toggle('2. Bấm trực tiếp vào dòng này để đánh dấu xong', {
              actionId: 'toggle:todo_2',
              style: 'checkbox',
              tintColor: '#4F46E5',
              textColor: '#0F172A',
              fontSize: 12,
            })
          ),
          large: UI.VStack(
            { padding: 14, spacing: 8, backgroundColor: '#F8FAFC' },
            buildWorkspaceTabBar('todo'),
            UI.Text('DANH SÁCH CÔNG VIỆC TRONG NGÀY', {
              fontSize: 11,
              fontWeight: 'bold',
              color: '#475569',
            }),
            UI.Toggle('1. Chuyển đổi qua lại giữa các trang trên Widget', {
              actionId: 'toggle:todo_1',
              style: 'checkbox',
              tintColor: '#4F46E5',
              textColor: '#0F172A',
              fontSize: 12,
            }),
            UI.Toggle('2. Đánh dấu hoàn thành không cần mở ứng dụng', {
              actionId: 'toggle:todo_2',
              style: 'checkbox',
              tintColor: '#4F46E5',
              textColor: '#0F172A',
              fontSize: 12,
            }),
            UI.Toggle('3. Đồng bộ trạng thái hai chiều với React Native', {
              actionId: 'toggle:todo_3',
              style: 'checkbox',
              tintColor: '#4F46E5',
              textColor: '#0F172A',
              fontSize: 12,
            }),
            UI.Spacer(),
            UI.HStack(
              UI.Button('Trước', {
                actionId: 'page:shift',
                backgroundColor: '#E2E8F0',
                textColor: '#0F172A',
                fontSize: 11,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 6,
              }),
              UI.Spacer(),
              UI.Button('Xem OKRs', {
                actionId: 'page:okr',
                backgroundColor: '#0F172A',
                textColor: '#FFFFFF',
                fontSize: 11,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 6,
              })
            )
          ),
          accessoryRectangular: UI.VStack(
            { spacing: 2 },
            UI.HStack(
              UI.Text('CA HÀNH CHÍNH', { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' }),
              UI.Spacer(),
              UI.Timer(endShift, { mode: 'countdown', fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' })
            ),
            UI.Text('Check-in: 07:54 • Đúng giờ', { fontSize: 11, color: '#E2E8F0' }),
            UI.Progress(0.75, { style: 'bar', height: 4, tintColor: '#FFFFFF' })
          ),
          accessoryCircular: UI.Gauge(0.75, {
            size: 50,
            strokeWidth: 4,
            tintColor: '#FFFFFF',
            trackColor: '#64748B',
            textColor: '#FFFFFF',
            valueText: '75%',
            label: 'Ca làm',
          }),
          accessoryInline: UI.Text('Ca làm: 08:00 - 17:30 • 75%', { fontSize: 12, fontWeight: 'semibold' }),
        },

        okr: {
          small: UI.VStack(
            { padding: 12, spacing: 6, backgroundColor: '#F8FAFC' },
            UI.HStack(
              UI.Text('TRANG 3/3', { fontSize: 10, fontWeight: 'bold', color: '#059669' }),
              UI.Spacer(),
              UI.Button('Đầu', {
                actionId: 'page:shift',
                backgroundColor: '#0F172A',
                textColor: '#FFFFFF',
                fontSize: 10,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
              })
            ),
            UI.Text('OKRs Quý 4', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
            UI.Progress(0.85, {
              style: 'circular',
              tintColor: '#059669',
              showPercentage: true,
              height: 44,
            })
          ),
          medium: UI.VStack(
            { padding: 12, spacing: 7, backgroundColor: '#F8FAFC' },
            buildWorkspaceTabBar('okr'),
            UI.HStack(
              { spacing: 12 },
              UI.Progress(0.85, {
                style: 'circular',
                tintColor: '#059669',
                trackColor: '#CBD5E1',
                showPercentage: true,
                percentageColor: '#059669',
                height: 52,
              }),
              UI.VStack(
                { spacing: 3 },
                UI.Text('Mục tiêu OKRs Quý 4', { fontSize: 14, fontWeight: 'bold', color: '#0F172A' }),
                UI.Text('KR1: Hoàn thiện SDK Live Widgets (100%)', { fontSize: 11, color: '#475569' }),
                UI.Text('KR2: Tối ưu hiệu năng hiển thị (85%)', { fontSize: 11, color: '#475569' })
              )
            )
          ),
          large: UI.VStack(
            { padding: 14, spacing: 9, backgroundColor: '#F8FAFC' },
            buildWorkspaceTabBar('okr'),
            UI.HStack(
              { spacing: 14 },
              UI.Progress(0.85, {
                style: 'circular',
                tintColor: '#059669',
                trackColor: '#CBD5E1',
                showPercentage: true,
                percentageColor: '#059669',
                height: 64,
              }),
              UI.VStack(
                { spacing: 4 },
                UI.Text('OKRs Quý 4 / 2026', { fontSize: 16, fontWeight: 'bold', color: '#0F172A' }),
                UI.Text('Tiến độ tổng thể: 85%', { fontSize: 12, fontWeight: 'bold', color: '#059669' }),
                UI.Text('Bộ phận: Product & Engineering', { fontSize: 11, color: '#475569' })
              )
            ),
            UI.VStack(
              { padding: 10, spacing: 6, backgroundColor: '#FFFFFF', borderRadius: 10 },
              UI.Text('KR1: Xây dựng DSL UI React Native sang Native Widget', {
                fontSize: 12,
                fontWeight: 'semibold',
                color: '#0F172A',
              }),
              UI.Progress(1.0, { style: 'bar', tintColor: '#059669', showPercentage: true, height: 6 }),
              UI.Text('KR2: Hỗ trợ chuyển trang và thao tác trực tiếp', {
                fontSize: 12,
                fontWeight: 'semibold',
                color: '#0F172A',
              }),
              UI.Progress(0.85, { style: 'bar', tintColor: '#059669', showPercentage: true, height: 6 })
            ),
            UI.Spacer(),
            UI.HStack(
              UI.Button('Quay lại Công việc', {
                actionId: 'page:todo',
                backgroundColor: '#E2E8F0',
                textColor: '#0F172A',
                fontSize: 11,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 6,
              }),
              UI.Spacer(),
              UI.Button('Về trang Ca làm', {
                actionId: 'page:shift',
                backgroundColor: '#0F172A',
                textColor: '#FFFFFF',
                fontSize: 11,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 6,
              })
            )
          ),
          accessoryRectangular: UI.VStack(
            { spacing: 2 },
            UI.HStack(
              UI.Text('CA HÀNH CHÍNH', { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' }),
              UI.Spacer(),
              UI.Timer(endShift, { mode: 'countdown', fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' })
            ),
            UI.Text('Check-in: 07:54 • Đúng giờ', { fontSize: 11, color: '#E2E8F0' }),
            UI.Progress(0.75, { style: 'bar', height: 4, tintColor: '#FFFFFF' })
          ),
          accessoryCircular: UI.Gauge(0.75, {
            size: 50,
            strokeWidth: 4,
            tintColor: '#FFFFFF',
            trackColor: '#64748B',
            textColor: '#FFFFFF',
            valueText: '75%',
            label: 'Ca làm',
          }),
          accessoryInline: UI.Text('Ca làm: 08:00 - 17:30 • 75%', { fontSize: 12, fontWeight: 'semibold' }),
        },
      },
      accessoryRectangular: UI.VStack(
        { spacing: 2 },
        UI.HStack(
          UI.Text('CA HÀNH CHÍNH', { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Spacer(),
          UI.Timer(endShift, { mode: 'countdown', fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' })
        ),
        UI.Text('Check-in: 07:54 • Đúng giờ', { fontSize: 11, color: '#E2E8F0' }),
        UI.Progress(0.75, { style: 'bar', height: 4, tintColor: '#FFFFFF' })
      ),
      accessoryCircular: UI.Gauge(0.75, {
        size: 50,
        strokeWidth: 4,
        tintColor: '#FFFFFF',
        trackColor: '#64748B',
        textColor: '#FFFFFF',
        valueText: '75%',
        label: 'Ca làm',
      }),
      accessoryInline: UI.Text('Ca làm: 08:00 - 17:30 • 75%', { fontSize: 12, fontWeight: 'semibold' }),
    };
  },
  buildLiveActivity: () => {
    const endShift = Math.floor(Date.now() / 1000) + 5400;
    return {
      lockScreen: UI.VStack(
        { padding: 14, spacing: 8 },
        UI.HStack(
          UI.Text('Không gian làm việc • Ca hành chính', { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Spacer(),
          UI.Timer(endShift, { mode: 'countdown', fontSize: 13, fontWeight: 'bold', color: '#60A5FA' })
        ),
        UI.Progress(0.75, { style: 'segmented', segments: 4, tintColor: '#3B82F6', showPercentage: true, height: 8 })
      ),
      dynamicIsland: {
        compactLeading: UI.Text('Ca làm', { fontSize: 12, fontWeight: 'bold', color: '#60A5FA' }),
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
            { spacing: 4 },
            UI.Progress(0.75, {
              style: 'segmented',
              segments: 4,
              tintColor: '#3B82F6',
              showPercentage: true,
              height: 7,
            }),
            UI.Text('Không gian làm việc đa trang • Tiến độ 75%', { fontSize: 11, color: '#94A3B8' })
          ),
        },
      },
    };
  },
};

