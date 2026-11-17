import { UI } from 'react-native-live-widgets';
import { UIPreset } from '../types/preset';

export const proFeaturesPreset: UIPreset = {
  id: 'pro_features',
  name: 'Bảo mật & Tính năng Pro (Core 2.0)',
  badge: 'iOS 17+ / StandBy',
  description:
    'Biểu diễn 7 tính năng mới của Core: Privacy Sensitive (che số khi khoá máy), Numeric Rolling Animation, SF Symbol Effect, Widget URL DeepLink và Container Gradient StandBy.',
  accentColor: '#38BDF8',
  bgPreview: '#0F172A',

  buildWidgetLayouts: () => {
    return {
      rootDeepLink: 'fastdo://finance/summary',
      containerBackground: {
        backgroundColor: '#0F172A',
        gradientColors: ['#0F172A', '#1E293B'],
      },
      small: UI.VStack(
        {
          padding: 12,
          spacing: 8,
          backgroundColor: '#0F172A',
          privacySensitive: true,
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.Image({
            systemName: 'shield.lefthalf.filled',
            tintColor: '#38BDF8',
            symbolEffect: 'pulse',
            width: 20,
            height: 20,
          }),
          UI.Badge({
            text: 'PRIVATE',
            backgroundColor: '#0369A1',
            textColor: '#E0F2FE',
            fontSize: 9,
          })
        ),
        UI.Text('Số dư ví bí mật', {
          fontSize: 11,
          color: '#94A3B8',
          fontWeight: 'medium',
        }),
        UI.Text('128,450,000 đ', {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#F8FAFC',
          numericAnimation: true,
          privacySensitive: true,
        }),
        UI.Spacer(),
        UI.Text('🔒 Face ID để mở', {
          fontSize: 9,
          color: '#64748B',
        })
      ),

      medium: UI.VStack(
        {
          padding: 14,
          spacing: 10,
          backgroundColor: { light: '#F8FAFC', dark: '#0F172A' },
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.HStack(
            { spacing: 6, alignment: 'center' },
            UI.Image({
              systemName: 'lock.shield.fill',
              tintColor: '#38BDF8',
              symbolEffect: 'bounce',
              width: 22,
              height: 22,
            }),
            UI.VStack(
              { spacing: 2 },
              UI.Text('TÀI CHÍNH & KPI BẢO MẬT', {
                fontSize: 10,
                fontWeight: 'bold',
                color: { light: '#0369A1', dark: '#38BDF8' },
              }),
              UI.Text('Thích ứng Dark Mode & Dynamic Color', {
                fontSize: 9,
                color: { light: '#64748B', dark: '#94A3B8' },
              })
            )
          ),
          UI.Button('Chạy hàm TS', {
            actionId: 'action_demo_checkin',
            backgroundColor: { light: '#0284C7', dark: '#0369A1' },
            textColor: '#FFFFFF',
            fontSize: 10,
            paddingHorizontal: 8,
            paddingVertical: 5,
            onPress: () => {
              console.log('[proFeaturesPreset] Nút TypeScript trên Widget được bấm!');
            },
          })
        ),
        UI.Divider({ color: '#334155', thickness: 1 }),
        UI.HStack(
          { spacing: 12, justifyContent: 'spaceBetween' },
          UI.VStack(
            { spacing: 4, privacySensitive: true },
            UI.Text('Doanh thu cá nhân', {
              fontSize: 11,
              color: '#94A3B8',
            }),
            UI.Text('94,820,000 đ', {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#34D399',
              numericAnimation: true,
              privacySensitive: true,
            })
          ),
          UI.Divider({ color: '#334155', direction: 'vertical', thickness: 1 }),
          UI.VStack(
            { spacing: 4, privacySensitive: true },
            UI.Text('Điểm thưởng / Thưởng nóng', {
              fontSize: 11,
              color: '#94A3B8',
            }),
            UI.Text('4,850 Điểm', {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#FBBF24',
              numericAnimation: true,
              privacySensitive: true,
            })
          )
        ),
        UI.Text('💡 Chạm vào Widget để mở chi tiết qua Root DeepLink', {
          fontSize: 9,
          color: '#64748B',
        })
      ),

      large: UI.VStack(
        {
          padding: 16,
          spacing: 12,
          backgroundColor: '#0F172A',
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.Text('BẢNG ĐIỀU KHIỂN BẢO MẬT PRO', {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#F8FAFC',
          }),
          UI.Badge({
            text: '7 Core Features',
            backgroundColor: '#4338CA',
            textColor: '#E0E7FF',
            fontSize: 10,
          })
        ),
        UI.Divider({ color: '#334155' }),
        UI.HStack(
          { spacing: 12, justifyContent: 'spaceBetween', alignment: 'center' },
          UI.Gauge({
            value: 0.88,
            valueText: '88%',
            label: 'KPI BẢO MẬT',
            tintColor: '#38BDF8',
            size: 80,
            strokeWidth: 9,
            privacySensitive: true,
          }),
          UI.VStack(
            { spacing: 6, privacySensitive: true },
            UI.Text('Dữ liệu nhạy cảm được bảo vệ', {
              fontSize: 11,
              fontWeight: 'semibold',
              color: '#94A3B8',
            }),
            UI.Text('Lương & Thưởng: 32,500,000 đ', {
              fontSize: 13,
              fontWeight: 'bold',
              color: '#34D399',
              numericAnimation: true,
              privacySensitive: true,
            }),
            UI.Text('Số ngày nghỉ phép còn: 11.5 ngày', {
              fontSize: 11,
              color: '#CBD5E1',
              privacySensitive: true,
            })
          )
        )
      ),

      extraLarge: UI.VStack(
        { padding: 20, spacing: 14, backgroundColor: '#020617' },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.Text('PRO SECURITY BOARD • EXTRA LARGE', {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#F8FAFC',
          }),
          UI.Badge({
            text: 'iPadOS XL',
            backgroundColor: '#1E3A8A',
            textColor: '#93C5FD',
            fontSize: 11,
          })
        ),
        UI.Divider({ color: '#1E293B' }),
        UI.HStack(
          { spacing: 18, alignment: 'center', justifyContent: 'spaceBetween' },
          UI.Gauge({
            value: 0.88,
            valueText: '88%',
            label: 'KPI PRO',
            tintColor: '#38BDF8',
            size: 96,
            strokeWidth: 10,
            widgetAccentable: true,
            privacySensitive: true,
          }),
          UI.VStack(
            { spacing: 8 },
            UI.Text('Doanh thu bảo mật (Face ID Guard)', { fontSize: 12, color: '#94A3B8' }),
            UI.Text('94,820,000 đ', {
              fontSize: 22,
              fontWeight: 'bold',
              color: '#34D399',
              numericAnimation: true,
              privacySensitive: true,
              widgetAccentable: true,
            }),
            UI.Progress({
              value: 0.88,
              tintColor: '#38BDF8',
              height: 8,
              widgetAccentable: true,
            })
          )
        )
      ),

      standBy: UI.VStack(
        { padding: 14, spacing: 8, backgroundColor: '#000000', alignment: 'center' },
        UI.Text('DOANH THU STANDBY', {
          fontSize: 11,
          fontWeight: 'bold',
          color: '#94A3B8',
          widgetAccentable: true,
        }),
        UI.Text('94.8M', {
          fontSize: 32,
          fontWeight: 'bold',
          color: '#34D399',
          numericAnimation: true,
          widgetAccentable: true,
        }),
        UI.Progress({
          value: 0.88,
          tintColor: '#38BDF8',
          trackColor: '#1E293B',
          height: 8,
          widgetAccentable: true,
        }),
        UI.Text('KPI 88% • iOS 17+ StandBy', {
          fontSize: 10,
          color: '#CBD5E1',
          widgetAccentable: true,
        })
      ),

      accessoryRectangular: UI.VStack(
        { spacing: 2, privacySensitive: true },
        UI.Text('DOANH THU PRO', { fontSize: 9, fontWeight: 'bold' }),
        UI.Text('94,820,000 đ', {
          fontSize: 13,
          fontWeight: 'bold',
          numericAnimation: true,
          privacySensitive: true,
        }),
        UI.Text('🔒 Chế độ bảo mật', { fontSize: 8 })
      ),
      accessoryCircular: UI.Gauge({
        value: 0.88,
        valueText: '88%',
        size: 40,
        strokeWidth: 4,
        privacySensitive: true,
      }),
      accessoryInline: UI.Text('Doanh thu: 94.8M đ (Private)', {
        fontSize: 10,
        privacySensitive: true,
      }),

      initialPage: 'unlocked',
      pageOrder: ['unlocked', 'locked'],

      pages: {
        unlocked: {
          medium: UI.VStack(
            { padding: 14, spacing: 8, backgroundColor: '#0F172A' },
            UI.HStack(
              { justifyContent: 'spaceBetween', alignment: 'center' },
              UI.HStack(
                { spacing: 6, alignment: 'center' },
                UI.Image({
                  systemName: 'lock.open.fill',
                  tintColor: '#34D399',
                  width: 18,
                  height: 18,
                }),
                UI.Text('ĐÃ MỞ KHÓA (FACE ID)', { fontSize: 10, fontWeight: 'bold', color: '#34D399' })
              ),
              UI.Button('🔒 Thử che số', {
                actionId: 'page:locked',
                backgroundColor: '#334155',
                textColor: '#F8FAFC',
                fontSize: 11,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 6,
              })
            ),
            UI.Divider({ color: '#334155' }),
            UI.HStack(
              { justifyContent: 'spaceBetween' },
              UI.VStack(
                { spacing: 2 },
                UI.Text('Doanh thu cá nhân', { fontSize: 11, color: '#94A3B8' }),
                UI.Text('94,820,000 đ', {
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#34D399',
                  numericAnimation: true,
                })
              ),
              UI.VStack(
                { spacing: 2 },
                UI.Text('Thưởng nóng', { fontSize: 11, color: '#94A3B8' }),
                UI.Text('4,850 Điểm', {
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FBBF24',
                })
              )
            ),
            UI.Text('💡 Bấm nút "🔒 Thử che số" ở trên để xem khi bị khóa', {
              fontSize: 9,
              color: '#64748B',
            })
          ),
        },
        locked: {
          medium: UI.VStack(
            { padding: 14, spacing: 8, backgroundColor: '#0F172A' },
            UI.HStack(
              { justifyContent: 'spaceBetween', alignment: 'center' },
              UI.HStack(
                { spacing: 6, alignment: 'center' },
                UI.Image({
                  systemName: 'lock.fill',
                  tintColor: '#F43F5E',
                  width: 18,
                  height: 18,
                }),
                UI.Text('MÀN HÌNH KHÓA (REDACTED)', { fontSize: 10, fontWeight: 'bold', color: '#F43F5E' })
              ),
              UI.Button('🔓 Mở khóa', {
                actionId: 'page:unlocked',
                backgroundColor: '#0284C7',
                textColor: '#FFFFFF',
                fontSize: 11,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 6,
              })
            ),
            UI.Divider({ color: '#334155' }),
            UI.HStack(
              { justifyContent: 'spaceBetween' },
              UI.VStack(
                { spacing: 2, redacted: true },
                UI.Text('Doanh thu cá nhân', { fontSize: 11, color: '#94A3B8' }),
                UI.Text('94,820,000 đ', {
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#34D399',
                  redacted: true,
                })
              ),
              UI.VStack(
                { spacing: 2, redacted: true },
                UI.Text('Thưởng nóng', { fontSize: 11, color: '#94A3B8' }),
                UI.Text('4,850 Điểm', {
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FBBF24',
                  redacted: true,
                })
              )
            ),
            UI.Text('🔒 Dữ liệu đã bị che mờ. Bấm "🔓 Mở khóa" để xem lại', {
              fontSize: 9,
              color: '#F43F5E',
            })
          ),
        },
      },
    };
  },

  buildLiveActivity: () => {
    return {
      lockScreen: UI.VStack(
        {
          padding: 14,
          spacing: 10,
          backgroundColor: '#0F172A',
        },
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center' },
          UI.HStack(
            { spacing: 6, alignment: 'center' },
            UI.Image({
              systemName: 'shield.checkered',
              tintColor: '#38BDF8',
              symbolEffect: 'pulse',
              width: 22,
              height: 22,
            }),
            UI.Text('Giao dịch chuyển tiền nội bộ', {
              fontSize: 13,
              fontWeight: 'bold',
              color: '#F8FAFC',
            })
          ),
          UI.Badge({
            text: 'Đang xử lý',
            backgroundColor: '#0369A1',
            textColor: '#E0F2FE',
            fontSize: 10,
          })
        ),
        UI.HStack(
          { justifyContent: 'spaceBetween', alignment: 'center', privacySensitive: true },
          UI.VStack(
            { spacing: 2 },
            UI.Text('Số tiền chuyển:', { fontSize: 11, color: '#94A3B8' }),
            UI.Text('25,000,000 đ', {
              fontSize: 17,
              fontWeight: 'bold',
              color: '#34D399',
              numericAnimation: true,
              privacySensitive: true,
            })
          ),
          UI.VStack(
            { spacing: 2, alignment: 'trailing' },
            UI.Text('Người nhận:', { fontSize: 11, color: '#94A3B8' }),
            UI.Text('Nguyễn Văn A (Fastdo)', {
              fontSize: 12,
              fontWeight: 'semibold',
              color: '#F8FAFC',
              privacySensitive: true,
            })
          )
        ),
        UI.Progress({
          value: 0.65,
          tintColor: '#38BDF8',
          trackColor: '#334155',
          height: 6,
        })
      ),

      dynamicIsland: {
        compactLeading: UI.Image({
          systemName: 'shield.lefthalf.filled',
          tintColor: '#38BDF8',
          symbolEffect: 'bounce',
          width: 16,
          height: 16,
        }),
        compactTrailing: UI.Text('25.0M', {
          color: '#34D399',
          fontSize: 12,
          fontWeight: 'bold',
          numericAnimation: true,
          privacySensitive: true,
        }),
        minimal: UI.Image({
          systemName: 'shield.fill',
          tintColor: '#38BDF8',
          width: 14,
          height: 14,
        }),
        expanded: {
          leading: UI.Image({
            systemName: 'lock.shield.fill',
            tintColor: '#38BDF8',
            width: 24,
            height: 24,
          }),
          trailing: UI.Badge({
            text: 'Private',
            backgroundColor: '#0369A1',
            textColor: '#E0F2FE',
            fontSize: 10,
          }),
          bottom: UI.VStack(
            { spacing: 4, privacySensitive: true },
            UI.HStack(
              { justifyContent: 'spaceBetween' },
              UI.Text('Chuyển tiền bảo mật', { fontSize: 11, color: '#94A3B8' }),
              UI.Text('25,000,000 đ', {
                fontSize: 13,
                fontWeight: 'bold',
                color: '#34D399',
                numericAnimation: true,
                privacySensitive: true,
              })
            ),
            UI.Progress({
              value: 0.65,
              tintColor: '#38BDF8',
              height: 5,
            })
          ),
        },
      },
    };
  },
};
