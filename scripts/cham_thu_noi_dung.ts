// Cổng canh gác nội dung, chạy trước mỗi lần dựng bản phát hành.
//
// Trang song ngữ hỏng theo một kiểu rất lặng lẽ: người sửa một câu tiếng Anh
// quên câu tiếng Việt tương ứng, trang vẫn dựng được, vẫn chạy được, và chỉ
// người bấm sang bản còn lại mới thấy một ô trống. Đó đúng là kiểu hỏng báo
// thành công, nên nó phải có một phép kiểm chuyển đỏ.

import * as noi_dung from '../noi_dung/noi_dung.ts'
import * as quy_trinh from '../noi_dung/quy_trinh.ts'
import { MOI_BO_DASHBOARD } from '../noi_dung/bo_dashboard.ts'

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

// Nội dung của dây chuyền và ba dashboard nằm ở tệp riêng, nhưng chịu đúng một
// luật song ngữ như phần còn lại, nên duyệt luôn ở đây.
for (const [ten, gia_tri] of Object.entries(quy_trinh)) {
  duyet(gia_tri, `quy_trinh.${ten}`)
}

// Bộ dashboard của VETC lắp lại từ chính các hằng trong quy_trinh, nên chuỗi
// của nó bị duyệt hai lượt. Không sao, danh sách lỗi được lọc trùng ở cuối.
for (const bo of MOI_BO_DASHBOARD) {
  duyet(bo, `bo_dashboard.${bo.ma}`)
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

// Chỗ trống trong phần giá trị mang lại phải được điền trước khi phát hành.
//
// Đây là loại hỏng tệ nhất trong cả tệp nội dung: trang vẫn dựng được, vẫn chạy
// được, chỉ là nó khoe với người tuyển dụng một con số chưa ai điền. Cổng này
// chặn thẳng lệnh dựng, vì nhắc bằng cảnh báo thì sẽ có lần bị lướt qua.
for (const du_an of noi_dung.DU_AN) {
  if (du_an.dong_gop === undefined) continue
  du_an.dong_gop.forEach((muc, thu_tu) => {
    for (const [ten_truong, cap] of Object.entries(muc)) {
      for (const [ma_ngon_ngu, van] of Object.entries(cap as Record<string, string>)) {
        if (van.includes('__')) {
          loi.push(
            `DU_AN[${du_an.ma}].dong_gop[${thu_tu}].${ten_truong}.${ma_ngon_ngu}: còn chỗ trống chưa điền số thật`,
          )
        }
      }
    }
  })
}

// Kiểm từng bộ dashboard. Đây là nhóm phép kiểm chỉ nhìn ảnh chụp mới thấy,
// còn mã thì vẫn chạy trơn tru với dữ liệu sai.
for (const bo of MOI_BO_DASHBOARD) {
  const ten = `bo_dashboard.${bo.ma}`

  // Các phần của biểu đồ tròn phải cộng lại đúng 100, nếu không hình vẽ ra một
  // tỷ lệ không có thật.
  const tong_phan = bo.tron.phan.reduce((tong, p) => tong + p.phan_tram, 0)
  if (tong_phan !== 100) {
    loi.push(`${ten}.tron: tổng phần trăm là ${tong_phan}, phải là 100`)
  }

  // Biểu đồ cột cần đủ cột, và không cột nào âm hay bằng không, vì chiều cao
  // tính theo tỷ lệ với cột cao nhất.
  if (bo.cot.muc.length < 2) {
    loi.push(`${ten}.cot: cần ít nhất 2 cột`)
  }
  for (const muc of bo.cot.muc) {
    if (!(muc.gia_tri > 0)) {
      loi.push(`${ten}.cot[${muc.nhan.en}]: giá trị phải lớn hơn 0`)
    }
  }

  // Dải kỳ vọng phải có đáy thấp hơn trần, và điểm được đánh dấu cảnh báo phải
  // thật sự nằm ngoài dải. Đánh dấu một điểm bình thường là cả khối thành sai.
  const { duong } = bo
  if (!(duong.duoi < duong.tren)) {
    loi.push(`${ten}.duong: đáy dải ${duong.duoi} phải nhỏ hơn trần ${duong.tren}`)
  }
  const diem = duong.gia_tri[duong.diem_canh_bao]
  if (diem === undefined) {
    loi.push(`${ten}.duong: diem_canh_bao ${duong.diem_canh_bao} nằm ngoài chuỗi`)
  } else if (diem >= duong.duoi && diem <= duong.tren) {
    loi.push(`${ten}.duong: điểm ${diem} vẫn nằm trong dải ${duong.duoi} tới ${duong.tren}`)
  }

  // Trục dọc phải bao hết dữ liệu VÀ cả dải kỳ vọng. Thiếu là đường hoặc dải
  // bị vẽ tràn ra ngoài khung, thứ trông như một lỗi hiển thị chứ không ai đoán
  // ra là do khoảng trục đặt hẹp.
  const thap_nhat = Math.min(...duong.gia_tri, duong.duoi)
  const cao_nhat = Math.max(...duong.gia_tri, duong.tren)
  if (duong.truc_y.day > thap_nhat || duong.truc_y.dinh < cao_nhat) {
    loi.push(
      `${ten}.duong.truc_y: khoảng ${duong.truc_y.day} tới ${duong.truc_y.dinh} không bao hết dữ liệu ${thap_nhat} tới ${cao_nhat}`,
    )
  }
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

// ---------------------------------------------------------------------------
// Kết quả
// ---------------------------------------------------------------------------

const loi_rieng = [...new Set(loi)]

if (loi_rieng.length > 0) {
  console.error(`Nội dung chưa đạt, ${loi_rieng.length} lỗi:\n`)
  for (const dong of loi_rieng) console.error(`  - ${dong}`)
  process.exit(1)
}

console.log('Nội dung đạt: mọi chuỗi có đủ hai bản, các phép kiểm riêng đều qua.')
