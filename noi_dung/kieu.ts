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

/** Một ý có tiêu đề riêng, hiện thành một hàng hai cột trong danh sách. Dùng
 *  cho phần cách làm việc và cho các quyết định trong mỗi dự án. */
export interface Nang_luc {
  readonly tieu_de: Song
  readonly than: Song
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
  readonly lien_ket?: { readonly nhan: Song; readonly dia_chi: string }
}

/** Một nhóm công cụ trong bảng kỹ năng. */
export interface Nhom_ky_nang {
  readonly ten: Song
  readonly muc: readonly string[]
}
