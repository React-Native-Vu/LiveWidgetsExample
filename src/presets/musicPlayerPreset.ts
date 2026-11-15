import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const musicPlayerPreset: UIPreset = {
  id: 'music_player',
  name: 'Đang phát nhạc (Equalizer Wave Animation)',
  badge: 'UI.Equalizer',
  description:
    'Sóng nhạc Equalizer chuyển động liên tục nhấp nhô theo thời gian thực trên Dynamic Island và Live Activity màn hình khóa.',
  accentColor: '#10B981',
  bgPreview: '#ECFDF5',
  buildWidgetLayouts: () => {
    const albumArt = 'https://picsum.photos/id/1025/300/300';

    return {
      small: UI.VStack(
        { padding: 12, spacing: 6, backgroundColor: '#0F172A' },
        UI.HStack(
          UI.Image(albumArt, {
            width: 38,
            height: 38,
            borderRadius: 8,
            contentMode: 'fill',
            fallbackSystemName: 'music.note',
          }),
          UI.Spacer(),
          UI.Equalizer({ isPlaying: true, barCount: 4, tintColor: '#10B981', height: 18 })
        ),
        UI.Spacer(),
        UI.Text('Starboy', { fontSize: 14, fontWeight: 'bold', color: '#F8FAFC' }),
        UI.Text('The Weeknd • Daft Punk', { fontSize: 11, color: '#94A3B8' }),
        UI.Progress(0.65, { style: 'bar', tintColor: '#10B981', trackColor: '#1E293B', height: 4 })
      ),

      medium: UI.HStack(
        { padding: 14, spacing: 14, backgroundColor: '#0F172A' },
        UI.Image(albumArt, {
          width: 90,
          height: 90,
          borderRadius: 12,
          contentMode: 'fill',
          fallbackSystemName: 'music.note',
        }),
        UI.VStack(
          { spacing: 6 },
          UI.HStack(
            UI.Badge('SPOTIFY HI-RES', { backgroundColor: '#064E3B', textColor: '#34D399', fontSize: 9 }),
            UI.Spacer(),
            UI.Equalizer({ isPlaying: true, barCount: 5, tintColor: '#10B981', height: 16 })
          ),
          UI.Text('Starboy (feat. Daft Punk)', { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Text('The Weeknd • Starboy Album', { fontSize: 12, color: '#94A3B8' }),
          UI.Spacer(),
          UI.HStack(
            UI.Text('2:14', { fontSize: 10, color: '#94A3B8' }),
            UI.Progress(0.62, { style: 'bar', tintColor: '#10B981', trackColor: '#334155', height: 4 }),
            UI.Text('3:50', { fontSize: 10, color: '#94A3B8' })
          )
        )
      ),

      large: UI.VStack(
        { padding: 16, spacing: 12, backgroundColor: '#0F172A' },
        UI.HStack(
          { spacing: 12 },
          UI.Image(albumArt, {
            width: 52,
            height: 52,
            borderRadius: 10,
            contentMode: 'fill',
            fallbackSystemName: 'music.note',
          }),
          UI.VStack(
            { spacing: 3 },
            UI.Text('Starboy (feat. Daft Punk)', { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }),
            UI.Text('The Weeknd • Starboy (Deluxe)', { fontSize: 12, color: '#94A3B8' })
          ),
          UI.Spacer(),
          UI.Equalizer({ isPlaying: true, barCount: 5, tintColor: '#10B981', height: 22 })
        ),
        UI.VStack(
          { padding: 12, spacing: 8, backgroundColor: '#1E293B', borderRadius: 10 },
          UI.HStack(
            UI.Text('DANH SÁCH CHỜ TIẾP THEO', { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' }),
            UI.Spacer(),
            UI.Text('Auto-play', { fontSize: 10, color: '#10B981' })
          ),
          UI.HStack(
            UI.Text('1. Blinding Lights', { fontSize: 12, fontWeight: 'medium', color: '#E2E8F0' }),
            UI.Spacer(),
            UI.Text('3:20', { fontSize: 11, color: '#64748B' })
          ),
          UI.HStack(
            UI.Text('2. Save Your Tears', { fontSize: 12, fontWeight: 'medium', color: '#E2E8F0' }),
            UI.Spacer(),
            UI.Text('3:35', { fontSize: 11, color: '#64748B' })
          )
        ),
        UI.Spacer(),
        UI.HStack(
          UI.Text('2:14', { fontSize: 11, color: '#94A3B8' }),
          UI.Progress(0.62, { style: 'bar', tintColor: '#10B981', trackColor: '#334155', height: 5 }),
          UI.Text('3:50', { fontSize: 11, color: '#94A3B8' })
        )
      ),

      accessoryRectangular: UI.HStack(
        { spacing: 6 },
        UI.VStack(
          { spacing: 2 },
          UI.Text('Starboy', { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Text('The Weeknd', { fontSize: 11, color: '#CCCCCC' })
        ),
        UI.Spacer(),
        UI.Equalizer({ isPlaying: true, barCount: 4, tintColor: '#FFFFFF', height: 16 })
      ),

      accessoryCircular: UI.VStack(
        { spacing: 2 },
        UI.Equalizer({ isPlaying: true, barCount: 4, tintColor: '#FFFFFF', height: 18 }),
        UI.Text('MUSIC', { fontSize: 8, fontWeight: 'bold', color: '#FFFFFF' })
      ),

      accessoryInline: UI.HStack(
        { spacing: 4 },
        UI.Text('♪ Starboy • The Weeknd', { fontSize: 12, fontWeight: 'medium', color: '#FFFFFF' })
      ),
    };
  },
  buildLiveActivity: (isPlaying: boolean = true, phase?: number) => {
    const albumArt = 'https://picsum.photos/id/1025/300/300';

    return {
      lockScreen: UI.HStack(
        { padding: 12, spacing: 12, backgroundColor: '#0F172A' },
        UI.Image(albumArt, {
          width: 50,
          height: 50,
          borderRadius: 8,
          contentMode: 'fill',
          fallbackSystemName: 'music.note',
        }),
        UI.VStack(
          { spacing: 4 },
          UI.HStack(
            UI.VStack(
              { spacing: 1 },
              UI.Text('Starboy', { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }),
              UI.Text(isPlaying ? 'The Weeknd • Đang phát' : 'The Weeknd • Tạm dừng', {
                fontSize: 11,
                color: isPlaying ? '#10B981' : '#94A3B8',
              })
            ),
            UI.Spacer(),
            UI.Equalizer({ isPlaying, phase, barCount: 5, tintColor: '#10B981', height: 20 })
          ),
          UI.HStack(
            UI.Text('2:14', { fontSize: 10, color: '#94A3B8' }),
            UI.Progress(0.62, { style: 'bar', tintColor: '#10B981', trackColor: '#334155', height: 4 }),
            UI.Text('3:50', { fontSize: 10, color: '#94A3B8' })
          )
        )
      ),
      dynamicIsland: {
        compactLeading: UI.HStack(
          { spacing: 5 },
          UI.Image(albumArt, {
            width: 16,
            height: 16,
            borderRadius: 4,
            fallbackSystemName: 'music.note',
          }),
          UI.Text('Starboy', { fontSize: 12, fontWeight: 'bold', color: '#FFFFFF' })
        ),
        compactTrailing: UI.Equalizer({ isPlaying, phase, barCount: 4, tintColor: '#10B981', height: 13 }),
        minimal: UI.Equalizer({ isPlaying, phase, barCount: 3, tintColor: '#10B981', height: 13 }),
      },
    };
  },
};


