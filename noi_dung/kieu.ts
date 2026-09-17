// Kiểu dữ liệu cho toàn bộ nội dung của trang.
//
// Mọi chuỗi hiển thị đều là một cặp Việt và Anh nằm cạnh nhau trong cùng một
// đối tượng, thay vì hai tệp nội dung song song. Hai tệp song song chắc chắn
// sẽ lệch nhau: người sửa một câu tiếng Anh không có gì nhắc rằng câu tiếng
// Việt tương ứng đang ở đâu. Nằm cạnh nhau thì chỗ thiếu lộ ra ngay khi đọc,
// và cổng canh gác trong scripts/cham_thu_noi_dung.ts bắt được phần còn lại.
//
// Các mục của trang bám theo các mục của CV: mục tiêu, kinh nghiệm, kỹ năng,
// dự án, học vấn. Ai đọc CV rồi mở trang sẽ thấy đúng thứ tự ấy, và ngược lại.

/** Hai ngôn ngữ trang phục vụ. */
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

// ---------------------------------------------------------------------------
// Kinh nghiệm làm việc
// ---------------------------------------------------------------------------

/**
 * Một vai trò trong một nơi làm việc.
 *
 * Tách ra khỏi Kinh_nghiem vì một nơi có thể mang hai vai trò cùng lúc: ở VETC
 * là vừa phân tích vừa kỹ thuật dữ liệu, và hai vai trò ấy kể hai loại việc
 * khác hẳn nhau. Gộp chung thành một danh sách gạch đầu dòng thì người đọc
 * không thấy được ranh giới đó.
 */
export interface Vai_tro {
  /** Bỏ trống khi nơi làm việc chỉ có một vai trò, để trang không in ra một
   *  cái nhãn thừa ngay phía trên danh sách duy nhất. */
  readonly ten?: Song
  readonly viec: readonly Song[]
}

/** Một con số đáng nói của một nơi làm việc, hiện dưới dạng chữ số lớn. */
export interface So_lieu {
  readonly so: Song
  readonly nhan: Song
}

export interface Kinh_nghiem {
  readonly ma: string
  readonly cong_ty: Song
  readonly chuc_danh: Song
  readonly thoi_gian: Song
  readonly vai_tro: readonly Vai_tro[]
  readonly so_lieu?: readonly So_lieu[]
  /** Tên công nghệ giữ nguyên ở cả hai ngôn ngữ nên là chuỗi trần. */
  readonly ngan_xep?: readonly string[]
}

// ---------------------------------------------------------------------------
// Dự án nổi bật
// ---------------------------------------------------------------------------

/**
 * Một dự án, trình bày theo đúng lối CV: làm bằng gì, trên dữ liệu nào, quy mô
 * bao nhiêu, làm gì, và đổi được điều gì cho doanh nghiệp.
 *
 * gia_tri là một danh sách chứ không phải một câu, vì trang in đậm từng mệnh
 * đề giá trị. Dự án nào không có giá trị định lượng được thì không nên nằm ở
 * mục này, và cổng cham-thu-noi-dung chặn lệnh dựng khi danh sách ấy rỗng.
 */
export interface Du_an_noi_bat {
  readonly ma: string
  readonly ten: Song
  /** Tên nơi làm dự án. Không dịch, nên để chuỗi trần. */
  readonly noi: string
  readonly cong_cu: readonly string[]
  readonly nguon: Song
  readonly quy_mo: Song
  readonly viec: Song
  readonly gia_tri: readonly Song[]
}

// ---------------------------------------------------------------------------
// Kỹ năng, học vấn, chứng chỉ
// ---------------------------------------------------------------------------

/**
 * Một dòng kỹ năng.
 *
 * nhan là phần in đậm đứng đầu, ví dụ "Lakehouse" hay "CDC". Bỏ trống với
 * những dòng là một câu trọn vẹn chứ không phải một cặp nhãn và nội dung.
 */
export interface Dong_ky_nang {
  readonly nhan?: Song
  readonly mo_ta: Song
}

export interface Nhom_ky_nang {
  readonly ten: Song
  readonly dong: readonly Dong_ky_nang[]
}

export interface Hoc_van {
  readonly truong: Song
  readonly nganh: Song
  /** Khoảng thời gian viết bằng chữ số nên không phải dịch. */
  readonly thoi_gian: string
  readonly ghi_chu: Song
}

export interface Chung_chi {
  readonly ten: Song
  readonly nam: string
  readonly ghi_chu: Song
}

/** Khối phụ ở cuối phần dự án, dùng cho sản phẩm cá nhân. */
export interface Khoi_phu {
  readonly ten: Song
  readonly mo_ta: Song
  readonly lien_ket: { readonly nhan: Song; readonly dia_chi: string }
}
