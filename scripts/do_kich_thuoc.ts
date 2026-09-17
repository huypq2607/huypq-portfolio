// Đo dung lượng bản dựng và canh vài thứ hỏng mà không kêu.
//
// Phần đo dung lượng chỉ là nửa công việc. Nửa còn lại quan trọng hơn: nó bắt
// những thứ vẫn cho trang chạy đúng như thường nên không kiểm thử nào khác
// thấy được, ví dụ ảnh gốc một megabyte lọt vào thư mục phát hành, hay thẻ địa
// chỉ chuẩn biến mất khỏi index.html sau một lần sửa.

import { gzipSync } from 'node:zlib'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const THU_MUC = 'dist'

/** Trần dung lượng cho phần bắt buộc tải về khi mở trang, tính sau khi nén. */
const TRAN_GOI_KB = 110

/** Trần cho một tệp ảnh. Ảnh chân dung gốc nặng hơn một megabyte, và nó chỉ
 *  cần lọt vào thư mục phát hành một lần là trang nặng gấp mười. */
const TRAN_ANH_KB = 120

const DUOI_ANH = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])

const loi: string[] = []

function liet_ke(thu_muc: string): string[] {
  const ket_qua: string[] = []
  for (const muc of readdirSync(thu_muc, { withFileTypes: true })) {
    const duong_dan = join(thu_muc, muc.name)
    if (muc.isDirectory()) ket_qua.push(...liet_ke(duong_dan))
    else ket_qua.push(duong_dan)
  }
  return ket_qua
}

function kb(so_byte: number): string {
  return `${(so_byte / 1024).toFixed(1)} KB`
}

let tep: string[]
try {
  tep = liet_ke(THU_MUC)
} catch {
  console.error(`Không đọc được thư mục ${THU_MUC}. Chạy npm run build trước.`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Dung lượng phần bắt buộc tải về
// ---------------------------------------------------------------------------

const tep_goi = tep.filter((t) => t.endsWith('.html') || t.endsWith('.js') || t.endsWith('.css'))

let tong_nen = 0
console.log('Phần bắt buộc tải về khi mở trang:')
for (const t of tep_goi.sort()) {
  const noi_dung = readFileSync(t)
  const da_nen = gzipSync(noi_dung).length
  tong_nen += da_nen
  console.log(`  ${t.padEnd(38)} ${kb(noi_dung.length).padStart(10)}  nén ${kb(da_nen).padStart(9)}`)
}
console.log(`  ${'tổng sau khi nén'.padEnd(38)} ${kb(tong_nen).padStart(10)}`)

if (tong_nen / 1024 > TRAN_GOI_KB) {
  loi.push(`Gói vượt trần: ${kb(tong_nen)} sau khi nén, trần là ${TRAN_GOI_KB} KB`)
}

// ---------------------------------------------------------------------------
// Ảnh
// ---------------------------------------------------------------------------

for (const t of tep) {
  if (!DUOI_ANH.has(extname(t).toLowerCase())) continue
  const co = statSync(t).size
  if (co / 1024 > TRAN_ANH_KB) {
    loi.push(`Ảnh vượt trần: ${t} nặng ${kb(co)}, trần là ${TRAN_ANH_KB} KB`)
  }
}

// Ảnh gốc chụp bằng điện thoại có dấu cách và dấu tiếng Việt trong tên. Nếu nó
// lọt vào bản dựng thì địa chỉ tệp sinh ra sẽ hỏng ở một số máy chủ, và không
// có thông báo nào chỉ ra nguyên nhân.
if (tep.some((t) => t.includes('Huy đút túi'))) {
  loi.push('Ảnh gốc chưa xử lý đã lọt vào bản dựng')
}

// ---------------------------------------------------------------------------
// Tệp thừa và thẻ bắt buộc
// ---------------------------------------------------------------------------

const tep_ban_do = tep.filter((t) => t.endsWith('.map'))
if (tep_ban_do.length > 0) {
  loi.push(`Bản dựng còn tệp bản đồ nguồn: ${tep_ban_do.join(', ')}`)
}

const trang_chinh = readFileSync(join(THU_MUC, 'index.html'), 'utf8')

// Vite để nguyên chuỗi %VITE_...% khi biến không được khai, và trang vẫn lên
// bình thường với một thẻ địa chỉ chuẩn vô nghĩa. Không bắt ở đây thì không ai
// bắt được nữa.
const con_sot = trang_chinh.match(/%VITE_[A-Z0-9_]+%/g)
if (con_sot !== null) {
  loi.push(`index.html còn chuỗi thay thế chưa được điền: ${[...new Set(con_sot)].join(', ')}`)
}
for (const the of ['rel="canonical"', 'og:image', 'name="description"']) {
  if (!trang_chinh.includes(the)) {
    loi.push(`index.html thiếu thẻ ${the}`)
  }
}

// ---------------------------------------------------------------------------
// Kết quả
// ---------------------------------------------------------------------------

if (loi.length > 0) {
  console.error(`\nBản dựng chưa đạt, ${loi.length} lỗi:\n`)
  for (const dong of loi) console.error(`  - ${dong}`)
  process.exit(1)
}

console.log('\nBản dựng đạt.')
