// Kiểu dữ liệu cho toàn bộ nội dung của trang.
//
// Các mục của trang bám theo các mục của CV: mục tiêu, kinh nghiệm, kỹ năng,
// dự án, học vấn. Ai đọc CV rồi mở trang sẽ thấy đúng thứ tự ấy, và ngược lại.

/**
 * Một câu chữ trên trang.
 *
 * Là một đối tượng chứ không phải chuỗi trần, dù bên trong chỉ có đúng một
 * trường. Lý do là chế độ sửa tại chỗ: nó tra ngược từ chính đối tượng này ra
 * đường dẫn khoá của nó trong tệp nguồn, mà tra ngược theo danh tính đối tượng
 * thì chỉ làm được với đối tượng. Chuỗi trần thì hai câu giống hệt nhau ở hai
 * chỗ khác nhau là cùng một giá trị, và không cách nào biết người ta đang sửa
 * câu nào.
 */
export interface Song {
  readonly vi: string
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
 * Một việc đã làm, tách làm hai nửa.
 *
 * lam là việc mình làm, ket_qua là thứ nó đổi được cho doanh nghiệp. Tách ra
 * chứ không viết liền một câu, vì nhà tuyển dụng lướt mắt tìm đúng nửa sau, và
 * nửa sau phải bắt được mắt mà không cần đọc hết nửa trước. Việc nào chưa đo
 * được kết quả thì bỏ trống ket_qua, đừng bịa ra một mệnh đề nghe cho kêu.
 */
export interface Viec {
  readonly lam: Song
  readonly ket_qua?: Song
}

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
  readonly viec: readonly Viec[]
}

/**
 * Một chặng của dây chuyền dữ liệu.
 *
 * Thứ tự trong mảng là thứ tự chạy thật, và sơ đồ lấy đúng thứ tự ấy để chọn
 * bậc màu. Đảo hai phần tử trong mảng là đảo luôn màu trên hình, nên sơ đồ
 * không bao giờ nói khác dữ liệu.
 */
export interface Chang {
  readonly ma: string
  readonly ten: Song
  readonly nhip: Song
}

/**
 * Một con số đã đổi được.
 *
 * truoc bỏ trống với những con số vốn là một mức chênh, ví dụ giảm 30 phần
 * trăm: viết "trước: 100%" ở đó là bịa ra một mốc không ai đo.
 */
export interface Chuyen_bien {
  readonly nhan: Song
  readonly truoc?: Song
  readonly sau: Song
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
