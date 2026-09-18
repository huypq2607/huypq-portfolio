// Cổng canh gác nội dung, chạy trước mỗi lần dựng bản phát hành.
//
// Nội dung hỏng theo kiểu rất lặng lẽ: một câu bị xoá trắng, một chỗ trống
// chưa điền số, một dự án không nói được nó đổi gì. Cả ba đều dựng được, chạy
// được, và chỉ lộ ra khi có người lạ đọc trang. Đó đúng là kiểu hỏng báo thành
// công, nên phải có một phép kiểm chuyển đỏ.
//
// Nội dung trang bám theo bản CV, nên các phép kiểm ở đây cũng canh đúng những
// chỗ hai bên dễ lệch nhau nhất: thiếu một nơi làm việc, một dự án không nói
// được nó đổi gì cho doanh nghiệp, hay một chỗ trống chưa điền số.

import * as noi_dung from '../noi_dung/noi_dung.ts'
import { MA_CO_HINH } from '../src/thanh_phan/BieuTuongChang.tsx'
import { MA_HINH_VIEC } from '../src/thanh_phan/BieuTuongViec.tsx'

const loi: string[] = []

function la_song(gia_tri: unknown): gia_tri is { vi: unknown } {
  if (typeof gia_tri !== 'object' || gia_tri === null) return false
  const khoa = Object.keys(gia_tri)
  return khoa.length === 1 && khoa[0] === 'vi'
}

function duyet(gia_tri: unknown, duong_dan: string): void {
  if (la_song(gia_tri)) {
    const { vi } = gia_tri

    if (typeof vi !== 'string') {
      loi.push(`${duong_dan}: câu chữ phải là một chuỗi`)
      return
    }
    if (vi.trim() === '') loi.push(`${duong_dan}: câu chữ rỗng`)

    // Dấu gạch dưới đôi là chỗ chờ một con số thật. Một trang giới thiệu ra
    // mắt với "__ giờ mỗi tuần" còn tệ hơn là không có mục ấy.
    if (vi.includes('__')) loi.push(`${duong_dan}: còn chỗ trống chưa điền, dấu __`)
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

// Hai nơi làm việc phải có mặt. Xoá nhầm một nơi thì trang vẫn dựng được và
// vẫn trông bình thường, chỉ là bốn năm kinh nghiệm bỗng còn hai.
const MA_KINH_NGHIEM_BAT_BUOC = ['vetc', 'shine']
for (const ma of MA_KINH_NGHIEM_BAT_BUOC) {
  if (!noi_dung.KINH_NGHIEM.some((n) => n.ma === ma)) {
    loi.push(`KINH_NGHIEM: thiếu nơi làm việc mã "${ma}"`)
  }
}

for (const noi of noi_dung.KINH_NGHIEM) {
  if (noi.vai_tro.length === 0) {
    loi.push(`KINH_NGHIEM[${noi.ma}]: không có vai trò nào`)
  }
  noi.vai_tro.forEach((vai, thu_tu) => {
    if (vai.viec.length === 0) {
      loi.push(`KINH_NGHIEM[${noi.ma}].vai_tro[${thu_tu}]: không có việc nào`)
    }
  })

  // Nơi nào khai số liệu thì phải khai từ hai con số trở lên: một con số đứng
  // lẻ trong lưới ba cột trông như phần còn lại chưa nạp xong.
  if (noi.so_lieu !== undefined && noi.so_lieu.length < 2) {
    loi.push(`KINH_NGHIEM[${noi.ma}].so_lieu: có ${noi.so_lieu.length} con số, cần ít nhất 2`)
  }
}

// Hình vẽ và con số của từng việc.
//
// Ba kiểu hỏng lặng lẽ. Khai một mã hình chưa vẽ thì chỗ ấy trống trơn mà trang
// vẫn dựng xong. Khai con số mà không có câu kết quả thì con số đứng chơ vơ
// không ai biết nó đo cái gì. Và câu kết quả lặp lại ĐÚNG con số đang đứng ở
// cột thì trang nói hai lần một điều, ví dụ cột ghi "−30%" còn câu ghi "Giảm
// 30% thời gian làm báo cáo".
//
// Chỉ so đúng con số ở cột, không cấm mọi chữ số. Một câu kết quả hoàn toàn có
// quyền nhắc tới mốc trước đó, ví dụ "thay vì sau 5 ngày như trước", hoặc kèm
// thêm một chỉ số khác, ví dụ "và giảm 20% yêu cầu báo cáo". Cấm hết chữ số thì
// cổng này chặn nhầm cả hai trường hợp ấy.
for (const noi of noi_dung.KINH_NGHIEM) {
  for (const vai of noi.vai_tro) {
    for (const viec of vai.viec) {
      const dau = `KINH_NGHIEM[${noi.ma}] "${viec.lam.vi.slice(0, 34)}..."`

      if (viec.hinh !== undefined && !MA_HINH_VIEC.includes(viec.hinh)) {
        loi.push(`${dau}: hình "${viec.hinh}" chưa vẽ trong BieuTuongViec`)
      }

      if (viec.so !== undefined && viec.ket_qua === undefined) {
        loi.push(`${dau}: khai con số nhưng không có câu kết quả đi kèm`)
      }

      if (viec.so !== undefined && viec.ket_qua !== undefined) {
        // Bóc phần chữ số của con số ở cột, ví dụ "−30%" thành "30", rồi tìm
        // đúng chuỗi ấy trong câu. Bỏ qua khi con số vốn không có chữ số nào,
        // ví dụ "Phút → giây".
        const chu_so = viec.so.vi.match(/\d+/g) ?? []
        for (const con of chu_so) {
          if (viec.ket_qua.vi.includes(con)) {
            loi.push(
              `${dau}: câu kết quả lặp lại con số "${con}" đã đứng ở cột ("${viec.so.vi}")`,
            )
          }
        }
      }
    }
  }
}

// Dây chuyền dữ liệu của từng nơi làm việc.
//
// Ba kiểu hỏng lặng lẽ được canh ở đây. Một chặng thiếu hình thì vòng tròn hiện
// ra rỗng. Hai chặng trùng mã thì React dựng lại sai phần tử khi danh sách đổi.
// Một dây chuyền chỉ có đúng một chặng thì nó không còn là dây chuyền, mà là
// một cái chấm đứng lẻ giữa thẻ. Cả ba đều dựng được và đều trông gần như bình
// thường.
for (const noi of noi_dung.KINH_NGHIEM) {
  const { quy_trinh } = noi
  if (quy_trinh === undefined) continue

  if (quy_trinh.length < 2) {
    loi.push(
      `KINH_NGHIEM[${noi.ma}].quy_trinh: có ${quy_trinh.length} chặng, một dây chuyền cần ít nhất 2`,
    )
  }

  const ma_chang = new Set<string>()
  for (const chang of quy_trinh) {
    if (ma_chang.has(chang.ma)) {
      loi.push(`KINH_NGHIEM[${noi.ma}].quy_trinh: mã chặng "${chang.ma}" bị trùng`)
    }
    ma_chang.add(chang.ma)

    if (!MA_CO_HINH.includes(chang.ma)) {
      loi.push(
        `KINH_NGHIEM[${noi.ma}].quy_trinh: chặng "${chang.ma}" chưa có hình trong BieuTuongChang`,
      )
    }
  }
}

// Mỗi dự án phải nói được nó đổi gì cho doanh nghiệp. Đây là luật của chính
// mục này: dự án không có giá trị định lượng thì thuộc về phần kinh nghiệm,
// không thuộc về mục dự án nổi bật.
if (noi_dung.DU_AN_NOI_BAT.length === 0) {
  loi.push('DU_AN_NOI_BAT: danh sách rỗng')
}
for (const du_an of noi_dung.DU_AN_NOI_BAT) {
  if (du_an.gia_tri.length === 0) {
    loi.push(`DU_AN_NOI_BAT[${du_an.ma}]: không nêu được giá trị mang lại`)
  }
  if (du_an.cong_cu.length === 0) {
    loi.push(`DU_AN_NOI_BAT[${du_an.ma}]: không khai công cụ`)
  }
  if (du_an.noi.trim() === '') {
    loi.push(`DU_AN_NOI_BAT[${du_an.ma}]: không khai nơi làm dự án`)
  }
}

// Mã dự án phải là duy nhất, vì nó là khoá React và cũng là thứ để tra ngược.
const ma_da_gap = new Set<string>()
for (const du_an of noi_dung.DU_AN_NOI_BAT) {
  if (ma_da_gap.has(du_an.ma)) loi.push(`DU_AN_NOI_BAT: mã "${du_an.ma}" bị trùng`)
  ma_da_gap.add(du_an.ma)
}

// Mục tiêu nghề nghiệp rỗng thì mục ấy vẽ ra một khoảng trắng có tiêu đề.
if (noi_dung.MUC_TIEU.length === 0) {
  loi.push('MUC_TIEU: danh sách rỗng')
}

// Học vấn và chứng chỉ là hai cột đứng cạnh nhau, thiếu một bên thì lệch hẳn.
if (noi_dung.CHUNG_CHI.length === 0) {
  loi.push('CHUNG_CHI: danh sách rỗng')
}

// Địa chỉ liên hệ là thứ duy nhất trang này muốn người xem dùng. Sai một ký tự
// ở đây thì mọi công sức còn lại thành vô nghĩa.
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(noi_dung.LIEN_HE.email)) {
  loi.push(`LIEN_HE.email: không đúng dạng địa chỉ thư (${noi_dung.LIEN_HE.email})`)
}
for (const kenh of noi_dung.LIEN_HE.kenh) {
  if (!kenh.dia_chi.startsWith('https://')) {
    loi.push(`LIEN_HE.kenh[${kenh.ten}]: phải là địa chỉ https, đang là "${kenh.dia_chi}"`)
  }
  if (kenh.nhan.trim() === '') {
    loi.push(`LIEN_HE.kenh[${kenh.ten}]: thiếu nhãn hiển thị`)
  }
}

if (!noi_dung.DAPRACTICE.lien_ket.dia_chi.startsWith('https://')) {
  loi.push('DAPRACTICE.lien_ket: phải là địa chỉ https')
}

// ---------------------------------------------------------------------------
// Kết quả
// ---------------------------------------------------------------------------

const loi_rieng = [...new Set(loi)]

if (loi_rieng.length > 0) {
  console.error(`Nội dung chưa đạt, ${loi_rieng.length} lỗi:\n`)
  for (const dong of loi_rieng) console.error(`  - ${dong}`)
  process.exit(1)
}

console.log('Nội dung đạt: không câu nào rỗng, các phép kiểm riêng đều qua.')
