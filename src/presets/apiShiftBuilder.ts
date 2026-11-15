import { UI, WidgetLayoutConfig } from 'react-native-live-widgets';
import { ShiftApiResponse } from '../types/preset';

const styles = UI.StyleSheet.create({
  cardSmall: {
    padding: 12,
    spacing: 6,
    backgroundColor: '#FFFFFF',
  },
  cardMedium: {
    padding: 14,
    spacing: 8,
    backgroundColor: '#FFFFFF',
  },
  cardLarge: {
    padding: 16,
    spacing: 10,
    backgroundColor: '#FFFFFF',
  },
  brandTag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#059669',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  titleMedium: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  titleLarge: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  caption: {
    fontSize: 11,
    color: '#64748B',
  },
  bodySecondary: {
    fontSize: 12,
    color: '#64748B',
  },
  bodyMuted: {
    fontSize: 13,
    color: '#475569',
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748B',
  },
  taskContainer: {
    padding: 10,
    spacing: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
  },
});

export function buildWidgetFromApi(data: ShiftApiResponse): WidgetLayoutConfig {
  const ratio = Math.min(1, Math.max(0, data.completedHours / data.totalHours));

  return {
    small: UI.VStack(
      styles.cardSmall,
      UI.HStack(
        UI.Text('API SYNC', styles.brandTag),
        UI.Spacer(),
        UI.Text(`${Math.round(ratio * 100)}%`, [styles.brandTag, { fontSize: 11 }])
      ),
      UI.Text(data.employeeName, styles.title),
      UI.Text(data.shiftName, styles.caption),
      UI.Progress(ratio, {
        style: 'bar',
        tintColor: '#059669',
        trackColor: '#E2E8F0',
        height: 6,
      }),
      UI.HStack(
        UI.Text('Tan ca:', { fontSize: 10, color: '#64748B' }),
        UI.Spacer(),
        UI.Timer(data.endTimestamp, { mode: 'countdown', fontSize: 11, fontWeight: 'bold', color: '#059669' })
      )
    ),

    medium: UI.VStack(
      styles.cardMedium,
      UI.HStack(
        UI.Text(`${data.employeeName.toUpperCase()} • ${data.department}`, styles.brandTag),
        UI.Spacer(),
        UI.Text(`Check-in: ${data.checkInTime}`, [styles.caption, { fontWeight: 'semibold', color: '#475569' }])
      ),
      UI.HStack(
        UI.VStack(
          { spacing: 2 },
          UI.Text(data.shiftName, styles.titleMedium),
          UI.Text(`Đã làm ${data.completedHours}h / ${data.totalHours}h`, styles.bodySecondary)
        ),
        UI.Spacer(),
        UI.Timer(data.endTimestamp, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#059669' })
      ),
      UI.Progress(ratio, {
        style: 'segmented',
        segments: 4,
        tintColor: '#059669',
        trackColor: '#E2E8F0',
        showPercentage: true,
        height: 7,
      })
    ),

    large: UI.VStack(
      styles.cardLarge,
      UI.HStack(
        UI.Text('DỮ LIỆU ĐỒNG BỘ TỪ API', styles.brandTag),
        UI.Spacer(),
        UI.Text(`Check-in: ${data.checkInTime}`, [styles.caption, { fontWeight: 'bold', color: '#475569' }])
      ),
      UI.Text(`${data.employeeName} (${data.department})`, styles.titleLarge),
      UI.HStack(
        UI.Text(`${data.shiftName} • ${data.completedHours}/${data.totalHours} giờ`, styles.bodyMuted),
        UI.Spacer(),
        UI.Timer(data.endTimestamp, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#059669' })
      ),
      UI.Progress(ratio, {
        style: 'segmented',
        segments: 4,
        tintColor: '#059669',
        trackColor: '#E2E8F0',
        showPercentage: true,
        height: 8,
      }),
      UI.Spacer(4),
      UI.Text('DANH SÁCH CÔNG VIỆC:', styles.sectionHeader),
      UI.VStack(
        styles.taskContainer,
        ...data.tasks.map((task) =>
          UI.HStack(
            UI.Text(task.title, [
              styles.bodySecondary,
              task.done ? { color: '#64748B' } : { color: '#0F172A', fontWeight: 'bold' },
            ]),
            UI.Spacer(),
            UI.Text(task.time, [styles.caption, { color: '#059669', fontWeight: 'semibold' }])
          )
        )
      )
    ),

    accessoryRectangular: UI.VStack(
      { spacing: 2 },
      UI.HStack(
        UI.Text(data.employeeName, { fontSize: 11, fontWeight: 'bold' }),
        UI.Spacer(),
        UI.Text(`${Math.round(ratio * 100)}%`, { fontSize: 11, fontWeight: 'bold' })
      ),
      UI.Text(data.shiftName, { fontSize: 10 }),
      UI.Progress(ratio, { style: 'bar', height: 4 })
    ),
    accessoryCircular: UI.Gauge(ratio, {
      size: 52,
      valueText: `${Math.round(ratio * 100)}%`,
      label: 'Ca làm',
    }),
    accessoryInline: UI.Text(`${data.employeeName} • ${Math.round(ratio * 100)}%`, {
      fontSize: 12,
      fontWeight: 'semibold',
    }),
  };
}

