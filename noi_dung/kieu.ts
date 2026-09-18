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
 * Một việc đã làm, tách làm ba phần.
 *
 * lam là việc mình làm, ket_qua là thứ nó đổi được cho doanh nghiệp, so là con
 * số của chính kết quả ấy. Tách ra chứ không viết liền một câu, vì nhà tuyển
 * dụng lướt mắt tìm đúng con số, và con số phải bắt được mắt mà không cần đọc
 * chữ nào.
 *
 * so đứng riêng một cột nên ket_qua KHÔNG lặp lại con số nữa: viết "−30%" ở cột
 * rồi lại viết "Giảm 30% thời gian làm báo cáo" ở câu là nói hai lần một điều.
 * Câu vì thế thành một mệnh đề đọc nối vào con số, ví dụ "thời gian làm báo cáo
 * mỗi tuần". Việc nào không đo được thành một con số thì bỏ trống so, và câu
 * ket_qua quay về dạng câu đầy đủ.
 *
 * Việc nào chưa đo được kết quả thì bỏ trống cả ket_qua lẫn so, đừng bịa ra một
 * mệnh đề nghe cho kêu.
 */
export interface Viec {
  readonly lam: Song
  readonly ket_qua?: Song
  /** Con số của kết quả, hiện thành cột riêng cỡ chữ lớn. */
  readonly so?: Song
  /**
   * Mã hình vẽ kèm việc này, tra trong BieuTuongViec.
   *
   * Hình vẽ theo NGHĨA của câu chứ không theo hướng tăng giảm: câu nói về tiền
   * thì vẽ ví, câu nói về người thì vẽ người. Bỏ trống thì việc ấy không có
   * hình, và trang vẽ một chấm tròn mờ vào chỗ đó.
   */
  readonly hinh?: string
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
 *
 * Dây chuyền thuộc về một nơi làm việc cụ thể chứ không phải của cả trang, nên
 * nó nằm trong Kinh_nghiem. Mỗi nơi một dây chuyền riêng, số chặng khác nhau
 * cũng được: màu trải theo số chặng thật chứ không gán cứng một tới sáu.
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
/** Chiều của thay đổi, quyết định hình mũi tên vẽ kèm con số. */
export type Chieu_doi = 'giam' | 'tang' | 'rut'

export interface Chuyen_bien {
  readonly nhan: Song
  readonly truoc?: Song
  readonly sau: Song
  /** Nơi làm ra con số này. Không dịch, nên để chuỗi trần. */
  readonly noi: string
  /**
   * Khai thẳng chứ không suy từ dấu cộng trừ trong chuỗi. Suy từ chuỗi thì
   * ngày nào đó có người gõ dấu trừ dài thay vì dấu gạch nối là mũi tên lặng
   * lẽ biến mất, mà không có gì báo.
   */
  readonly chieu: Chieu_doi
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
  /** Dây chuyền dữ liệu của nơi này. Bỏ trống khi nơi ấy không có dây chuyền
   *  nào đáng vẽ, và khi đó trang không in ra một sơ đồ rỗng. */
  readonly quy_trinh?: readonly Chang[]
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
 * Một nhóm kỹ năng.
 *
 * Hai dạng nội dung, và một nhóm chỉ nên dùng một dạng:
 *
 *   cong_cu  tên công nghệ, hiện thành chip. Đây là dạng gọn nhất và đúng nhất
 *            cho những thứ vốn là danh từ riêng: đọc "Apache Iceberg" là biết,
 *            gói nó vào một câu chỉ thêm chữ mà không thêm nghĩa.
 *   y        những điều không quy về một cái tên được, ví dụ "định nghĩa chỉ số
 *            và chuẩn hoá giữa các bộ phận". Ép thành chip thì mất nghĩa.
 */
export interface Nhom_ky_nang {
  readonly ten: Song
  /** Tên công nghệ. Không dịch, nên để chuỗi trần. */
  readonly cong_cu?: readonly string[]
  readonly y?: readonly Song[]
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
