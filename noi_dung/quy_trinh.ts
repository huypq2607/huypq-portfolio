// Dây chuyền tự động của dự án VETC, và ba dashboard minh hoạ.
//
// SỐ LIỆU LÀ SỐ MÔ PHỎNG, KHÔNG PHẢI SỐ THẬT CỦA VETC. Dữ liệu thật là dữ liệu
// nội bộ và có thông tin cá nhân. Giao diện phải nói rõ điều đó ngay trên khối
// chứ không giấu xuống chân trang.

import type { Song } from './kieu.ts'

/** Một chặng trong dây chuyền. */
export interface Chang {
  readonly ma: string
  readonly ten: Song
  readonly viec: Song
  readonly nhip: Song
}

/** Một cột trong biểu đồ doanh thu theo tháng. */
export interface Cot_thang {
  readonly thang: string
  readonly ty_dong: number
}

/** Một kênh trong biểu đồ tròn. */
export interface Kenh_doanh_thu {
  readonly ten: Song
  readonly phan_tram: number
}

export const QUY_TRINH: readonly Chang[] = [
  {
    ma: 'lay',
    ten: { vi: 'Lấy dữ liệu', en: 'Ingest' },
    viec: { vi: 'CDC từ cơ sở dữ liệu nghiệp vụ về tầng landing.', en: 'CDC from the operational databases into the landing tier.' },
    nhip: { vi: 'Mỗi giờ', en: 'Hourly' },
  },
  {
    ma: 'lam_sach',
    ten: { vi: 'Làm sạch', en: 'Clean' },
    viec: { vi: 'Khử trùng, ép kiểu, chuẩn hoá, che dữ liệu cá nhân.', en: 'Deduplicate, cast, normalise, mask personal data.' },
    nhip: { vi: 'Mỗi giờ', en: 'Hourly' },
  },
  {
    ma: 'nau',
    ten: { vi: 'Nấu chỉ số', en: 'Cook' },
    viec: { vi: 'Join nhiều nguồn, dựng chỉ số theo định nghĩa nghiệp vụ.', en: 'Join sources, build metrics to the business definition.' },
    nhip: { vi: 'Hằng ngày', en: 'Daily' },
  },
  {
    ma: 'phuc_vu',
    ten: { vi: 'Bảng phục vụ', en: 'Serving table' },
    viec: { vi: 'Bảng phẳng cho Superset và API, không join lúc đọc.', en: 'A flat table for Superset and the API, no join at read time.' },
    nhip: { vi: 'Hằng ngày', en: 'Daily' },
  },
  {
    ma: 'bao_cao',
    ten: { vi: 'Báo cáo qua Outlook', en: 'Report to Outlook' },
    viec: { vi: 'Bản tổng hợp sáng gửi tới danh sách nhận.', en: 'The morning summary goes to the distribution list.' },
    nhip: { vi: '7:00 hằng ngày', en: '07:00 daily' },
  },
  {
    ma: 'canh_bao',
    ten: { vi: 'Cảnh báo bất thường', en: 'Anomaly alert' },
    viec: { vi: 'Chỉ số lệch khỏi dải kỳ vọng thì bắn cảnh báo ngay.', en: 'A metric outside its expected band fires an alert at once.' },
    nhip: { vi: 'Sau mỗi lần chạy', en: 'After every run' },
  },
]

/** Doanh thu phí bảo hiểm sáu tháng, đơn vị tỷ đồng. Một chuỗi duy nhất. */
export const DOANH_THU_THANG: readonly Cot_thang[] = [
  { thang: 'T4', ty_dong: 3.42 },
  { thang: 'T5', ty_dong: 3.78 },
  { thang: 'T6', ty_dong: 4.11 },
  { thang: 'T7', ty_dong: 3.96 },
  { thang: 'T8', ty_dong: 4.4 },
  { thang: 'T9', ty_dong: 4.86 },
]

/** Cơ cấu doanh thu theo kênh. Thứ tự cố định, không bao giờ xoay vòng. */
export const KENH_DOANH_THU: readonly Kenh_doanh_thu[] = [
  { ten: { vi: 'Telesales', en: 'Telesales' }, phan_tram: 38 },
  { ten: { vi: 'Ứng dụng VETC', en: 'VETC app' }, phan_tram: 27 },
  { ten: { vi: 'Đại lý', en: 'Agency' }, phan_tram: 21 },
  { ten: { vi: 'Bancassurance', en: 'Bancassurance' }, phan_tram: 14 },
]

/** Hợp đồng chốt mỗi ngày, mười bốn ngày, kèm dải kỳ vọng. Điểm cuối vượt dải. */
export const CHUOI_CANH_BAO = {
  gia_tri: [412, 398, 435, 421, 440, 408, 388, 425, 447, 431, 419, 402, 436, 228],
  duoi: 372,
  tren: 468,
  diem_canh_bao: 13,
} as const

export const NHAN_QUY_TRINH = {
  tieu_de: { vi: 'Dây chuyền tự động, sáu chặng', en: 'The automated chain, six stages' } satisfies Song,
  dan_nhap: {
    vi: 'Chạy theo lịch, không chặng nào cần người chạm tay vào.',
    en: 'Runs on a schedule. No stage needs a human hand.',
  } satisfies Song,

  tieu_de_dashboard: { vi: 'Dashboard dựng từ bảng phục vụ', en: 'Dashboards built on the serving table' } satisfies Song,
  canh_bao_mo_phong: { vi: 'Số mô phỏng', en: 'Synthetic' } satisfies Song,
  giai_thich_mo_phong: {
    vi: 'Số liệu mô phỏng, không phải số thật của VETC. Dữ liệu thật là dữ liệu nội bộ và có thông tin cá nhân.',
    en: 'Synthetic figures, not real VETC data. The real data is internal and carries personal information.',
  } satisfies Song,

  bd_cot_ten: { vi: 'Doanh thu bảo hiểm theo tháng', en: 'Insurance revenue by month' } satisfies Song,
  bd_cot_nhan: { vi: 'Tháng 9', en: 'September' } satisfies Song,
  bd_cot_don_vi: { vi: 'tỷ đồng', en: 'bn VND' } satisfies Song,

  bd_tron_ten: { vi: 'Cơ cấu theo kênh khai thác', en: 'Mix by acquisition channel' } satisfies Song,
  bd_tron_nhan: { vi: 'Kênh dẫn đầu', en: 'Top channel' } satisfies Song,

  bd_duong_ten: { vi: 'Cảnh báo bất thường', en: 'Anomaly alert' } satisfies Song,
  bd_duong_nhan: { vi: 'Hợp đồng chốt hôm nay', en: 'Contracts closed today' } satisfies Song,
  bd_duong_truc: { vi: '14 ngày gần nhất', en: 'Last 14 days' } satisfies Song,
  bd_duong_dai: { vi: 'Dải kỳ vọng', en: 'Expected band' } satisfies Song,
  bd_duong_trang_thai: { vi: 'Vượt ngưỡng', en: 'Outside band' } satisfies Song,
  bd_duong_mo_ta: {
    vi: 'Thấp hơn đáy dải kỳ vọng 39 phần trăm. Cảnh báo đi ngay sau lần chạy.',
    en: '39 per cent below the floor of the band. The alert fires right after the run.',
  } satisfies Song,
}
