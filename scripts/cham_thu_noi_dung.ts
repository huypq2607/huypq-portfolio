// Cổng canh gác nội dung, chạy trước mỗi lần dựng bản phát hành.
//
// Trang song ngữ hỏng theo một kiểu rất lặng lẽ: người sửa một câu tiếng Anh
// quên câu tiếng Việt tương ứng, trang vẫn dựng được, vẫn chạy được, và chỉ
// người bấm sang bản còn lại mới thấy một ô trống. Đó đúng là kiểu hỏng báo
// thành công, nên nó phải có một phép kiểm chuyển đỏ.

import * as noi_dung from '../noi_dung/noi_dung.ts'

/** Ngưỡng độ dài để coi hai bản giống hệt nhau là quên dịch chứ không phải cố
 *  ý. Chuỗi ngắn như "534" hay "set local role" giống nhau là bình thường. */
const NGUONG_NGHI_QUEN_DICH = 40

const loi: string[] = []

function la_song(gia_tri: unknown): gia_tri is { vi: unknown; en: unknown } {
  if (typeof gia_tri !== 'object' || gia_tri === null) return false
  const khoa = Object.keys(gia_tri)
  return khoa.length === 2 && khoa.includes('vi') && khoa.includes('en')
}

function duyet(gia_tri: unknown, duong_dan: string): void {
  if (la_song(gia_tri)) {
    const { vi, en } = gia_tri

    if (typeof vi !== 'string' || typeof en !== 'string') {
      loi.push(`${duong_dan}: cặp song ngữ phải là hai chuỗi`)
      return
    }
    if (vi.trim() === '') loi.push(`${duong_dan}: thiếu bản tiếng Việt`)
    if (en.trim() === '') loi.push(`${duong_dan}: thiếu bản tiếng Anh`)
    if (vi === en && vi.length > NGUONG_NGHI_QUEN_DICH) {
      loi.push(`${duong_dan}: hai bản giống hệt nhau, nhiều khả năng quên dịch`)
    }
    return
  }

  if (Array.isArray(gia_tri)) {
    gia_tri.forEach((phan_tu, thu_tu) => duyet(phan_tu, `${duong_dan}[${thu_tu}]`))
    return
  }

  if (typeof gia_tri === 'object' && gia_tri !== null) {
    for (const [khoa, con] of Object.entries(gia_tri)) {
      duyet(con, `${duong_dan}.${khoa}`)
    }
  }
}

for (const [ten, gia_tri] of Object.entries(noi_dung)) {
  duyet(gia_tri, ten)
}

// ---------------------------------------------------------------------------
// Các phép kiểm riêng, không suy ra được từ việc duyệt cây
// ---------------------------------------------------------------------------

// Hai dự án bắt buộc phải còn đó, vì main.tsx lấy chúng theo mã và ném lỗi
// ngay khi nạp trang nếu thiếu. Bắt ở đây thì người sửa biết trước lúc dựng.
for (const ma_bat_buoc of ['vetc', 'dapractice']) {
  if (!noi_dung.DU_AN.some((d) => d.ma === ma_bat_buoc)) {
    loi.push(`DU_AN: thiếu dự án có mã ${ma_bat_buoc}`)
  }
}

// Khối số liệu là lưới bốn cột. Thừa hay thiếu một ô là hàng cuối lệch hẳn,
// và đó là thứ nhìn ảnh chụp mới thấy chứ đọc mã thì không.
for (const du_an of noi_dung.DU_AN) {
  if (du_an.so_lieu.length !== 4) {
    loi.push(`DU_AN[${du_an.ma}].so_lieu: phải đúng 4 ô, đang có ${du_an.so_lieu.length}`)
  }
}

// Số model âm hoặc bằng không làm cột trong sơ đồ biến mất mà không có lỗi nào.
for (const tang of noi_dung.TANG_DU_LIEU) {
  if (!Number.isInteger(tang.so_model) || tang.so_model <= 0) {
    loi.push(`TANG_DU_LIEU[${tang.ma}]: số model phải là số nguyên dương`)
  }
}

// Bảy lớp hộp cát phải đánh số liền mạch từ 1, vì nấc thụt vào của mỗi hàng
// tính theo thứ tự trong mảng chứ không theo trường so.
noi_dung.LOP_HOP_CAT.forEach((lop, thu_tu) => {
  if (lop.so !== thu_tu + 1) {
    loi.push(`LOP_HOP_CAT[${thu_tu}]: số lớp là ${lop.so}, phải là ${thu_tu + 1}`)
  }
})

// Địa chỉ liên hệ là thứ duy nhất trang này muốn người xem dùng. Sai một ký tự
// ở đây thì mọi công sức còn lại thành vô nghĩa.
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(noi_dung.LIEN_HE.email)) {
  loi.push(`LIEN_HE.email: không đúng dạng địa chỉ thư (${noi_dung.LIEN_HE.email})`)
}
for (const khoa of ['github', 'san_pham'] as const) {
  if (!noi_dung.LIEN_HE[khoa].startsWith('https://')) {
    loi.push(`LIEN_HE.${khoa}: phải là địa chỉ https`)
  }
}

// ---------------------------------------------------------------------------
// Kết quả
// ---------------------------------------------------------------------------

if (loi.length > 0) {
  console.error(`Nội dung chưa đạt, ${loi.length} lỗi:\n`)
  for (const dong of loi) console.error(`  - ${dong}`)
  process.exit(1)
}

console.log('Nội dung đạt: mọi chuỗi có đủ hai bản, các phép kiểm riêng đều qua.')
