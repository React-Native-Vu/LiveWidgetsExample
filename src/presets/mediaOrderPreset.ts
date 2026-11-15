import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const mediaOrderPreset: UIPreset = {
  id: 'media_gallery',
  name: 'Đơn hàng kèm hình ảnh (URL & Avatar)',
  badge: 'UI.Image',
  description:
    'Tải trực tiếp ảnh sản phẩm và ảnh đại diện từ URL https:// xuống Widget và Dynamic Island kèm cơ chế tự động nén tối ưu bộ nhớ.',
  accentColor: '#BE185D',
  bgPreview: '#FDF2F8',
  buildWidgetLayouts: () => {
    const eta = Math.floor(Date.now() / 1000) + 900;
    const avatarUrl = 'https://i.pravatar.cc/150?img=32';
    const driverAvatarUrl = 'https://i.pravatar.cc/150?img=12';
    const drinkPhotoUrl = 'https://picsum.photos/id/425/300/200';
    const pastryPhotoUrl = 'https://picsum.photos/id/431/300/200';

    return {
      small: UI.VStack(
        { padding: 12, spacing: 6, backgroundColor: '#FFFFFF' },
        UI.HStack(
          UI.Image(avatarUrl, {
            width: 34,
            height: 34,
            borderRadius: 17,
            borderWidth: 1.5,
            borderColor: '#BE185D',
            fallbackSystemName: 'person.crop.circle.fill',
            tintColor: '#BE185D',
          }),
          UI.Spacer(),
          UI.Badge('Active', {
            backgroundColor: '#FCE7F3',
            textColor: '#BE185D',
            fontSize: 9,
          })
        ),
        UI.Text('Nguyễn Thảo Nhi', { fontSize: 14, fontWeight: 'bold', color: '#0F172A' }),
        UI.Text('Product Designer', { fontSize: 11, color: '#64748B' }),
        UI.Progress(0.88, { style: 'bar', tintColor: '#BE185D', height: 6 })
      ),

      medium: UI.HStack(
        { padding: 12, spacing: 12, backgroundColor: '#FFFFFF' },
        UI.Image(drinkPhotoUrl, {
          width: 82,
          height: 82,
          borderRadius: 12,
          contentMode: 'fill',
          fallbackSystemName: 'cup.and.saucer.fill',
          tintColor: '#BE185D',
        }),
        UI.VStack(
          { spacing: 5 },
          UI.HStack(
            UI.Image(driverAvatarUrl, {
              width: 20,
              height: 20,
              borderRadius: 10,
              fallbackSystemName: 'person.circle.fill',
            }),
            UI.Text('Lê Hoàng • 4.9', { fontSize: 11, fontWeight: 'semibold', color: '#475569' }),
            UI.Spacer(),
            UI.Timer(eta, { mode: 'countdown', fontSize: 12, fontWeight: 'bold', color: '#BE185D' })
          ),
          UI.Text('Combo Cold Brew & Croissant', { fontSize: 14, fontWeight: 'bold', color: '#0F172A' }),
          UI.Text('Đang giao đến toà nhà Innovation', { fontSize: 11, color: '#64748B' }),
          UI.Progress(0.82, {
            style: 'segmented',
            segments: 4,
            tintColor: '#BE185D',
            trackColor: '#FBCFE8',
            showPercentage: true,
            height: 6,
          })
        )
      ),

      large: UI.VStack(
        { padding: 14, spacing: 10, backgroundColor: '#FFFFFF' },
        UI.HStack(
          { spacing: 10 },
          UI.Image(avatarUrl, {
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 1.5,
            borderColor: '#BE185D',
            fallbackSystemName: 'person.crop.circle.fill',
            tintColor: '#BE185D',
          }),
          UI.VStack(
            { spacing: 2 },
            UI.Text('Nguyễn Thảo Nhi', { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }),
            UI.Text('Đơn hàng #CF-204 • 2 sản phẩm', { fontSize: 12, color: '#64748B' })
          ),
          UI.Spacer(),
          UI.Timer(eta, { mode: 'countdown', fontSize: 14, fontWeight: 'bold', color: '#BE185D' })
        ),
        UI.VStack(
          { padding: 10, spacing: 8, backgroundColor: '#F8FAFC', borderRadius: 10 },
          UI.Text('CHI TIẾT SẢN PHẨM', { fontSize: 10, fontWeight: 'bold', color: '#64748B' }),
          UI.HStack(
            { spacing: 10 },
            UI.Image(drinkPhotoUrl, {
              width: 50,
              height: 50,
              borderRadius: 8,
              contentMode: 'fill',
              fallbackSystemName: 'photo.fill',
            }),
            UI.VStack(
              { spacing: 2 },
              UI.Text('Cold Brew Cam Sả', { fontSize: 13, fontWeight: 'bold', color: '#0F172A' }),
              UI.Text('Size L • Ít đá', { fontSize: 11, color: '#64748B' })
            ),
            UI.Spacer(),
            UI.Text('65.000đ', { fontSize: 12, fontWeight: 'bold', color: '#0F172A' })
          ),
          UI.HStack(
            { spacing: 10 },
            UI.Image(pastryPhotoUrl, {
              width: 50,
              height: 50,
              borderRadius: 8,
              contentMode: 'fill',
              fallbackSystemName: 'photo.fill',
            }),
            UI.VStack(
              { spacing: 2 },
              UI.Text('Croissant Bơ Pháp', { fontSize: 13, fontWeight: 'bold', color: '#0F172A' }),
              UI.Text('Nướng nóng', { fontSize: 11, color: '#64748B' })
            ),
            UI.Spacer(),
            UI.Text('49.000đ', { fontSize: 12, fontWeight: 'bold', color: '#0F172A' })
          )
        ),
        UI.Spacer(),
        UI.HStack(
          UI.Text('Tổng thanh toán', { fontSize: 12, color: '#64748B' }),
          UI.Spacer(),
          UI.Text('114.000đ • Đã thanh toán', { fontSize: 12, fontWeight: 'bold', color: '#BE185D' })
        )
      ),
    };
  },
  buildLiveActivity: () => {
    const eta = Math.floor(Date.now() / 1000) + 900;
    const avatarUrl = 'https://i.pravatar.cc/150?img=32';
    const drinkPhotoUrl = 'https://picsum.photos/id/425/300/200';
    return {
      lockScreen: UI.HStack(
        { padding: 14, spacing: 12 },
        UI.Image(drinkPhotoUrl, {
          width: 50,
          height: 50,
          borderRadius: 10,
          contentMode: 'fill',
          fallbackSystemName: 'cup.and.saucer.fill',
          tintColor: '#F472B6',
        }),
        UI.VStack(
          { spacing: 4 },
          UI.HStack(
            UI.Text('Đơn hàng #CF-204', { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }),
            UI.Spacer(),
            UI.Timer(eta, { mode: 'countdown', fontSize: 13, fontWeight: 'bold', color: '#F472B6' })
          ),
          UI.Progress(0.82, { style: 'bar', tintColor: '#EC4899', showPercentage: true, height: 6 })
        )
      ),
      dynamicIsland: {
        compactLeading: UI.HStack(
          { spacing: 4 },
          UI.Image(avatarUrl, {
            width: 18,
            height: 18,
            borderRadius: 9,
            fallbackSystemName: 'person.circle.fill',
          }),
          UI.Text('CF-204', { fontSize: 12, fontWeight: 'bold', color: '#F472B6' })
        ),
        compactTrailing: UI.Timer(eta, { mode: 'countdown', fontSize: 12, color: '#F472B6' }),
        minimal: UI.Image(avatarUrl, {
          width: 20,
          height: 20,
          borderRadius: 10,
          fallbackSystemName: 'person.circle.fill',
        }),
      },
    };
  },
};

