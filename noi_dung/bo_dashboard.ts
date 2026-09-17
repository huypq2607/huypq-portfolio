// Hai bộ dashboard minh hoạ, một cho mỗi dự án đi làm.
//
// SỐ LIỆU LÀ SỐ MÔ PHỎNG. Dữ liệu thật của cả hai nơi đều là dữ liệu nội bộ.
// Nhãn nói điều đó nằm ngay trên từng khối và trên từng thẻ.
//
// Bộ của VETC lắp lại từ các hằng đã có trong quy_trinh.ts chứ không chép lại,
// nên sửa số ở đó là đổi luôn ở đây, và tệp kia không phải động tới.

import type { Bo_dashboard } from './kieu.ts'
import {
  CHUOI_CANH_BAO,
  DOANH_THU_THANG,
  KENH_DOANH_THU,
  NHAN_QUY_TRINH,
} from './quy_trinh.ts'

export const BO_VETC: Bo_dashboard = {
  ma: 'vetc',
  tieu_de: NHAN_QUY_TRINH.tieu_de_dashboard,
  ghi_chu: NHAN_QUY_TRINH.giai_thich_mo_phong,

  cot: {
    ten: NHAN_QUY_TRINH.bd_cot_ten,
    nhan_so: NHAN_QUY_TRINH.bd_cot_nhan,
    don_vi: NHAN_QUY_TRINH.bd_cot_don_vi,
    so_le: 2,
    // Một chuỗi theo thời gian thì con số đáng nói là kỳ gần nhất.
    so_noi_bat: 'cuoi',
    muc: DOANH_THU_THANG.map((c) => ({
      nhan: { vi: c.thang, en: c.thang },
      gia_tri: c.ty_dong,
    })),
  },

  tron: {
    ten: NHAN_QUY_TRINH.bd_tron_ten,
    nhan_so: NHAN_QUY_TRINH.bd_tron_nhan,
    phan: KENH_DOANH_THU,
  },

  duong: {
    ten: NHAN_QUY_TRINH.bd_duong_ten,
    nhan_so: NHAN_QUY_TRINH.bd_duong_nhan,
    nhan_truc: NHAN_QUY_TRINH.bd_duong_truc,
    nhan_dai: NHAN_QUY_TRINH.bd_duong_dai,
    trang_thai: NHAN_QUY_TRINH.bd_duong_trang_thai,
    mo_ta: NHAN_QUY_TRINH.bd_duong_mo_ta,
    so_le: 0,
    truc_y: { day: 200, dinh: 500 },
    gia_tri: CHUOI_CANH_BAO.gia_tri,
    duoi: CHUOI_CANH_BAO.duoi,
    tren: CHUOI_CANH_BAO.tren,
    diem_canh_bao: CHUOI_CANH_BAO.diem_canh_bao,
  },
}

export const BO_SHINE: Bo_dashboard = {
  ma: 'shine',
  tieu_de: {
    vi: 'Dashboard dựng cho quản lý chuỗi',
    en: 'The dashboards the chain runs on',
  },
  ghi_chu: {
    vi: 'Số liệu mô phỏng, không phải số thật của chuỗi.',
    en: 'Synthetic figures, not the chain’s real data.',
  },

  cot: {
    ten: { vi: 'Doanh thu theo vùng', en: 'Revenue by region' },
    nhan_so: { vi: 'Cả chuỗi, mỗi tháng', en: 'Whole chain, per month' },
    don_vi: { vi: 'tỷ đồng', en: 'bn VND' },
    so_le: 1,
    // Năm vùng là năm thực thể song song, không phải một chuỗi thời gian, nên
    // con số đáng nói là tổng chứ không phải giá trị cuối.
    so_noi_bat: 'tong',
    muc: [
      { nhan: { vi: 'Hà Nội', en: 'Hanoi' }, gia_tri: 22.4 },
      { nhan: { vi: 'TP.HCM', en: 'HCMC' }, gia_tri: 18.7 },
      { nhan: { vi: 'Đà Nẵng', en: 'Da Nang' }, gia_tri: 6.9 },
      { nhan: { vi: 'Bắc khác', en: 'North' }, gia_tri: 9.3 },
      { nhan: { vi: 'Nam khác', en: 'South' }, gia_tri: 7.8 },
    ],
  },

  tron: {
    ten: { vi: 'Cơ cấu doanh thu theo dịch vụ', en: 'Revenue mix by service' },
    nhan_so: { vi: 'Dịch vụ dẫn đầu', en: 'Top service' },
    phan: [
      { ten: { vi: 'Cắt tóc', en: 'Haircut' }, phan_tram: 46 },
      { ten: { vi: 'Gội và massage', en: 'Wash and massage' }, phan_tram: 24 },
      { ten: { vi: 'Uốn nhuộm', en: 'Perm and colour' }, phan_tram: 19 },
      { ten: { vi: 'Mỹ phẩm', en: 'Grooming products' }, phan_tram: 11 },
    ],
  },

  duong: {
    ten: { vi: 'Cảnh báo chi phí vật tư', en: 'Materials cost alert' },
    nhan_so: { vi: 'Tỷ lệ tuần này', en: 'This week’s ratio' },
    don_vi: { vi: 'phần trăm', en: 'per cent' },
    nhan_truc: { vi: 'Chi phí vật tư trên doanh thu, 14 tuần', en: 'Materials cost over revenue, 14 weeks' },
    nhan_dai: { vi: 'Ngưỡng cho phép', en: 'Allowed range' },
    trang_thai: { vi: 'Vượt ngưỡng', en: 'Over the ceiling' },
    mo_ta: {
      vi: 'Tuần này 11,6 phần trăm, vượt trần cho phép 9,5. Cảnh báo bắn ngay khi số tuần được chốt.',
      en: 'This week 11.6 per cent, over the 9.5 ceiling. The alert fires as soon as the week closes.',
    },
    so_le: 1,
    truc_y: { day: 6, dinh: 13 },
    gia_tri: [8.2, 8, 8.4, 8.1, 7.9, 8.3, 8.6, 8.2, 8, 8.5, 8.3, 8.7, 8.4, 11.6],
    duoi: 7,
    tren: 9.5,
    diem_canh_bao: 13,
  },
}

/** Cả hai bộ, để cổng canh gác kiểm một lượt. */
export const MOI_BO_DASHBOARD: readonly Bo_dashboard[] = [BO_VETC, BO_SHINE]
