// Kiểu dữ liệu cho toàn bộ nội dung của trang.
//
// Mọi chuỗi hiển thị đều là một cặp Việt và Anh nằm cạnh nhau trong cùng một
// đối tượng, thay vì hai tệp nội dung song song. Hai tệp song song chắc chắn
// sẽ lệch nhau: người sửa một câu tiếng Anh không có gì nhắc rằng câu tiếng
// Việt tương ứng đang ở đâu. Nằm cạnh nhau thì chỗ thiếu lộ ra ngay khi đọc,
// và cổng canh gác trong scripts/cham_thu_noi_dung.ts bắt được phần còn lại.

/** Hai ngôn ngữ trang phục vụ. Mặc định là tiếng Anh vì người đọc chính là
 *  nhà tuyển dụng nước ngoài. */
export type Ngon_ngu = 'en' | 'vi'

/** Một chuỗi có đủ hai bản. Không cho phép thiếu bản nào. */
export interface Song {
  readonly vi: string
  readonly en: string
}

/** Một dòng trong khối thông tin tóm tắt ở đầu trang. */
export interface Dong_ho_so {
  readonly nhan: Song
  readonly gia_tri: Song
}

/** Một tầng trong sơ đồ kiến trúc dữ liệu ở đầu trang. */
export interface Tang_du_lieu {
  readonly ma: string
  readonly so_model: number
  readonly vai_tro: Song
}

/** Một lớp của hộp cát SQL, dùng cho sơ đồ trong dự án thứ hai. */
export interface Lop_hop_cat {
  readonly so: number
  readonly cach: Song
  readonly chan: Song
  readonly ma_loi: string
}

/** Một dự án trình bày theo lối vấn đề, quyết định, kết quả. */
export interface Du_an {
  readonly ma: string
  readonly ten: Song
  readonly vai_tro: Song
  readonly tom_tat: Song
  readonly so_lieu: readonly { readonly so: Song; readonly nhan: Song }[]
  readonly ngan_xep: readonly string[]
  readonly ghi_chu: Song
  /** Giá trị đóng góp đã định lượng. Bỏ trống khi chưa có số đáng tin. */
  readonly dong_gop?: readonly Dong_gop[]
  readonly lien_ket?: { readonly nhan: Song; readonly dia_chi: string }
}

/**
 * Một giá trị đóng góp đã định lượng được.
 *
 * Ba phần, và thiếu phần nào thì con số cũng mất nghĩa:
 *
 *   so        con số, dạng đã định dạng sẵn theo từng ngôn ngữ
 *   nhan      con số ấy đo cái gì
 *   boi_canh  so với cái gì, vì "giảm bốn giờ" không nói lên điều gì nếu
 *             người đọc không biết trước đó là bao nhiêu giờ
 */
export interface Dong_gop {
  readonly so: Song
  readonly nhan: Song
  readonly boi_canh: Song
}

/** Một nhóm công cụ trong bảng kỹ năng. */
export interface Nhom_ky_nang {
  readonly ten: Song
  readonly muc: readonly string[]
}

// ---------------------------------------------------------------------------
// Bộ dashboard minh hoạ
// ---------------------------------------------------------------------------
//
// Một bộ gồm ba biểu đồ, và ba thể loại hình ứng với ba việc khác nhau của dữ
// liệu: cột cho một dãy giá trị, tròn cho các phần của một tổng, đường cho
// chuỗi thời gian có dải kỳ vọng.
//
// Tách thành kiểu dùng chung để mỗi dự án có bộ dashboard riêng mà vẫn chạy
// trên cùng một bộ mã vẽ. Nhân bản thành phần vẽ cho từng dự án thì lần sửa
// nào cũng phải nhớ sửa ở cả mấy nơi, và sẽ có lần quên.

/** Một cột trong biểu đồ cột. */
export interface Muc_cot {
  readonly nhan: Song
  readonly gia_tri: number
}

/** Một phần trong biểu đồ tròn. */
export interface Phan_tron {
  readonly ten: Song
  readonly phan_tram: number
}

/** Cách tính con số nổi bật của biểu đồ cột: lấy cột cuối, hay cộng tất cả. */
export type Kieu_so_noi_bat = 'cuoi' | 'tong'

export interface Bo_dashboard {
  readonly ma: string
  readonly tieu_de: Song
  readonly ghi_chu: Song

  readonly cot: {
    readonly ten: Song
    readonly nhan_so: Song
    readonly don_vi: Song
    /** Số chữ số thập phân khi hiện giá trị. */
    readonly so_le: number
    readonly so_noi_bat: Kieu_so_noi_bat
    readonly muc: readonly Muc_cot[]
  }

  readonly tron: {
    readonly ten: Song
    readonly nhan_so: Song
    /** Các phần phải cộng lại đúng 100, cổng canh gác kiểm điều này. */
    readonly phan: readonly Phan_tron[]
  }

  readonly duong: {
    readonly ten: Song
    readonly nhan_so: Song
    /** Đơn vị đứng sau con số nổi bật. Bỏ trống khi con số tự nói đủ, ví dụ
     *  một lượng đếm được; khai khi không, ví dụ một tỷ lệ phần trăm. */
    readonly don_vi?: Song
    readonly nhan_truc: Song
    readonly nhan_dai: Song
    readonly trang_thai: Song
    readonly mo_ta: Song
    readonly so_le: number
    /** Khoảng giá trị của trục dọc. Phải rộng hơn dữ liệu, nếu không đường
     *  chạm mép khung và dải kỳ vọng không còn chỗ để thấy. */
    readonly truc_y: { readonly day: number; readonly dinh: number }
    readonly gia_tri: readonly number[]
    readonly duoi: number
    readonly tren: number
    /** Chỉ số của điểm bị đánh dấu, tính từ 0. Phải nằm ngoài dải kỳ vọng. */
    readonly diem_canh_bao: number
  }
}
