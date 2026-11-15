import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const deliveryTrackingPreset: UIPreset = {
  id: 'delivery',
  name: 'Theo dõi vận chuyển đơn hàng',
  badge: 'Progress + Timer',
  description:
    'Hiển thị trạng thái giao hàng theo thời gian thực với thanh tiến trình và thời gian dự kiến đến nơi.',
  accentColor: '#EA580C',
  bgPreview: '#FFF7ED',
  buildWidgetLayouts: () => {
    const eta = Math.floor(Date.now() / 1000) + 720;
    return {
      small: UI.VStack(
        { padding: 12, spacing: 6, backgroundColor: '#FFFFFF' },
        UI.Text('ĐANG GIAO HÀNG', { fontSize: 10, fontWeight: 'bold', color: '#EA580C' }),
        UI.Text('Phúc Long Tea', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
        UI.Text('Cách bạn 800m', { fontSize: 12, color: '#64748B' }),
        UI.Spacer(4),
        UI.Progress(0.8, {
          style: 'bar',
          tintColor: '#EA580C',
          trackColor: '#FFEDD5',
          height: 6,
        }),
        UI.HStack(
          UI.Text('Dự kiến:', { fontSize: 11, color: '#64748B' }),
          UI.Spacer(),
          UI.Timer(eta, { mode: 'countdown', fontSize: 12, fontWeight: 'bold', color: '#EA580C' })
        )
      ),

      medium: UI.VStack(
        { padding: 14, spacing: 8, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Text('ĐƠN HÀNG #FD-9920', { fontSize: 10, fontWeight: 'bold', color: '#EA580C' }),
          UI.Spacer(),
          UI.Timer(eta, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#EA580C' })
        ),
        UI.Text('Tài xế đang trên đường giao đến bạn', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
        UI.Text('Nguyễn Văn Hải • 59-X3 889.12 (Honda AirBlade)', { fontSize: 12, color: '#64748B' }),
        UI.Progress(0.8, {
          style: 'bar',
          tintColor: '#EA580C',
          trackColor: '#FFEDD5',
          showPercentage: true,
          height: 7,
        })
      ),

      large: UI.VStack(
        { padding: 14, spacing: 8, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Text('THEO DÕI ĐƠN HÀNG TRỰC TIẾP', { fontSize: 10, fontWeight: 'bold', color: '#EA580C' }),
          UI.Spacer(),
          UI.Text('#FD-9920', { fontSize: 11, fontWeight: 'bold', color: '#64748B' })
        ),
        UI.Text('Tài xế cách bạn 800m', { fontSize: 17, fontWeight: 'bold', color: '#0F172A' }),
        UI.HStack(
          UI.Text('Dự kiến giao tới trong:', { fontSize: 12, color: '#475569' }),
          UI.Spacer(),
          UI.Timer(eta, { mode: 'countdown', fontSize: 15, fontWeight: 'bold', color: '#EA580C' })
        ),
        UI.Progress(0.75, {
          style: 'segmented',
          segments: 4,
          tintColor: '#EA580C',
          trackColor: '#FFEDD5',
          showPercentage: true,
          height: 7,
        }),
        UI.VStack(
          { padding: 10, spacing: 4, backgroundColor: '#F8FAFC', borderRadius: 10 },
          UI.Text('Tài xế: Nguyễn Văn Hải (5.0)', { fontSize: 12, fontWeight: 'bold', color: '#0F172A' }),
          UI.Text('Biển số: 59-X3 889.12 • Honda AirBlade', { fontSize: 11, color: '#64748B' }),
          UI.Text('2x Trà Ô Long Sữa, 1x Bánh Croissant', { fontSize: 11, color: '#475569' })
        ),
        UI.Spacer(2),
        UI.Text('Giao tại: Sảnh A - Toà nhà Innovation', { fontSize: 11, fontWeight: 'semibold', color: '#64748B' })
      ),
    };
  },
  buildLiveActivity: () => {
    const eta = Math.floor(Date.now() / 1000) + 720;
    return {
      lockScreen: UI.VStack(
        { padding: 14, spacing: 8 },
        UI.HStack(
          UI.Text('Đơn #FD-9920 đang giao tới', { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }),
          UI.Spacer(),
          UI.Timer(eta, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#FB923C' })
        ),
        UI.Progress(0.8, {
          style: 'bar',
          tintColor: '#F97316',
          showPercentage: true,
          height: 8,
        }),
        UI.Text('Tài xế Nguyễn Văn Hải • 59-X3 889.12 (Cách 800m)', { fontSize: 12, color: '#CBD5E1' })
      ),
      dynamicIsland: {
        compactLeading: UI.Text('FD-9920', { fontSize: 12, fontWeight: 'bold', color: '#FB923C' }),
        compactTrailing: UI.Timer(eta, { mode: 'countdown', fontSize: 12, color: '#FB923C' }),
        minimal: UI.Text('80%', { fontSize: 11, fontWeight: 'bold', color: '#FB923C' }),
        expanded: {
          leading: UI.VStack(
            { spacing: 2, alignment: 'leading' },
            UI.Text('GIAO HÀNG HỎA TỐC', { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' }),
            UI.Text('Đơn hàng FD-9920', { fontSize: 13, fontWeight: 'bold', color: '#FB923C' })
          ),
          trailing: UI.VStack(
            { spacing: 2, alignment: 'trailing' },
            UI.Text('DỰ KIẾN ĐẾN', { fontSize: 10, color: '#94A3B8' }),
            UI.Timer(eta, { mode: 'countdown', fontSize: 13, fontWeight: 'bold', color: '#FB923C' })
          ),
          bottom: UI.VStack(
            { spacing: 4 },
            UI.Progress(0.8, {
              tintColor: '#FB923C',
              trackColor: '#334155',
              height: 6,
            }),
            UI.Text('Tài xế Nguyễn Văn Hải • Cách 800m', { fontSize: 11, color: '#94A3B8' })
          ),
        },
      },
    };
  },
};

