import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AudioPlayer, LiveActivity, Widget } from 'react-native-live-widgets';
import { musicPlayerPreset } from '../presets/musicPlayerPreset';

interface MusicPlayerSectionProps {
  onLog: (msg: string) => void;
  onActivityChanged?: (activityId: string | null) => void;
  onApplyWidget?: () => void;
}

const SAMPLE_TRACK_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const APP_GROUP = 'group.com.livewidgetsexample';

export const MusicPlayerSection: React.FC<MusicPlayerSectionProps> = ({
  onLog,
  onActivityChanged,
  onApplyWidget,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlayMusic = async () => {
    try {
      setLoading(true);
      onLog('Đang phát nhạc & kích hoạt iOS Now Playing (MediaRemote)...');

      // 1. Cập nhật giao diện Widget màn hình chính sang mẫu Âm nhạc
      const widgetLayouts = musicPlayerPreset.buildWidgetLayouts();
      await Widget.setLayout('main', widgetLayouts, APP_GROUP);
      await Widget.reload('DynamicHomeScreenWidget');
      onApplyWidget?.();

      // 2. Đóng Live Activity tùy biến để nhường Dynamic Island cho iOS Now Playing hệ thống
      await LiveActivity.endAll();
      onActivityChanged?.(null);

      // 3. Phát bài nhạc thực tế qua AVPlayer & đăng ký Now Playing (MediaRemote)
      await AudioPlayer.play(SAMPLE_TRACK_URL, {
        title: 'Starboy (feat. Daft Punk)',
        artist: 'The Weeknd',
        artworkUrl: 'https://picsum.photos/id/1025/300/300',
        duration: 230,
      });

      setIsPlaying(true);
      setHasStarted(true);
      onLog('🎵 Đang phát nhạc: Hệ thống Now Playing (MediaRemote) đã kích hoạt!');
    } catch (e: any) {
      onLog(`Lỗi phát nhạc: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePauseMusic = async () => {
    try {
      setLoading(true);
      await AudioPlayer.pause();
      setIsPlaying(false);
      onLog('Đã tạm dừng âm thanh (Now Playing paused)');
    } catch (e: any) {
      onLog(`Lỗi tạm dừng nhạc: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStopMusic = async () => {
    try {
      setLoading(true);
      await AudioPlayer.stop();
      setIsPlaying(false);
      setHasStarted(false);

      await LiveActivity.end('music_activity');
      onActivityChanged?.(null);
      onLog('Đã dừng phát nhạc và đóng Live Activity');
    } catch (e: any) {
      onLog(`Lỗi dừng nhạc: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleCol}>
          <Text style={styles.title}>Trình phát nhạc Test (Audio & Equalizer)</Text>
          <Text style={styles.subtitle}>
            Phát bài nhạc MP3 thực tế qua loa máy, đồng thời đồng bộ sóng nhạc Equalizer hoạt họa ra
            Dynamic Island & Màn hình khóa.
          </Text>
        </View>
        <View style={[styles.badge, isPlaying ? styles.badgePlaying : styles.badgePaused]}>
          <Text style={[styles.badgeText, isPlaying ? styles.badgeTextPlaying : styles.badgeTextPaused]}>
            {isPlaying ? 'ĐANG PHÁT' : 'TẠM DỪNG'}
          </Text>
        </View>
      </View>

      <View style={styles.trackInfoBox}>
        <Text style={styles.trackTitle}>SoundHelix Song 1 (Acoustic & Synth)</Text>
        <Text style={styles.trackArtist}>T. Schürger • Sample MP3 Stream</Text>
      </View>

      <View style={styles.buttonsRow}>
        {!isPlaying ? (
          <TouchableOpacity
            style={[styles.btn, styles.btnPlay, loading && styles.btnDisabled]}
            disabled={loading}
            onPress={handlePlayMusic}
          >
            <Text style={styles.btnPlayText}>▶ {hasStarted ? 'Tiếp tục phát' : 'Phát nhạc & Bật Equalizer'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, styles.btnPause, loading && styles.btnDisabled]}
            disabled={loading}
            onPress={handlePauseMusic}
          >
            <Text style={styles.btnPauseText}>⏸ Tạm dừng</Text>
          </TouchableOpacity>
        )}

        {hasStarted && (
          <TouchableOpacity
            style={[styles.btn, styles.btnStop, loading && styles.btnDisabled]}
            disabled={loading}
            onPress={handleStopMusic}
          >
            <Text style={styles.btnStopText}>⏹ Dừng</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleCol: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgePlaying: {
    backgroundColor: '#DCFCE7',
  },
  badgePaused: {
    backgroundColor: '#F1F5F9',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextPlaying: {
    color: '#15803D',
  },
  badgeTextPaused: {
    color: '#64748B',
  },
  trackInfoBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 11,
    color: '#94A3B8',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlay: {
    backgroundColor: '#10B981',
  },
  btnPlayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnPause: {
    backgroundColor: '#F59E0B',
  },
  btnPauseText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnStop: {
    flex: 0.4,
    backgroundColor: '#F1F5F9',
  },
  btnStopText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  btnDisabled: {
    opacity: 0.6,
  },
});
