// Cổng canh tương phản chữ trên nền kính.
//
// Nền kính không phải một màu cố định. Nó là màu của tầng phía sau trộn qua lớp
// mờ, mà tầng phía sau lại đổi màu dần khi cuộn. Nên đo bằng cách chụp một kiểu
// màn hình rồi lấy mẫu điểm ảnh chỉ nói được đúng một thời điểm, và lần sửa sau
// làm tụt tương phản thì không có gì báo.
//
// Ở đây tính thay vì chụp. Dựng lại đúng phép trộn mà trình duyệt làm, chạy qua
// cả sáu bậc màu của tầng nền, rồi lấy hai đầu sáng nhất và tối nhất làm trường
// hợp xấu nhất. Chữ phải đạt ngưỡng ở CẢ HAI đầu thì mới qua.
//
// Không cần trình duyệt, chạy trong vài mili giây, và bắt được chỗ hỏng trước
// khi nó lên trang.

import { readFileSync } from 'node:fs'

const TEP_CSS = new URL('../src/giao_dien.css', import.meta.url)

// ---------------------------------------------------------------------------
// Màu
// ---------------------------------------------------------------------------

type Mau = readonly [number, number, number]

/** Chuyển một kênh màu sang không gian tuyến tính để tính độ sáng. */
function tuyen_tinh(c: number): number {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

function do_sang(m: Mau): number {
  const [r, g, b] = m
  return 0.2126 * tuyen_tinh(r) + 0.7152 * tuyen_tinh(g) + 0.0722 * tuyen_tinh(b)
}

function tuong_phan(a: Mau, b: Mau): number {
  const x = do_sang(a)
  const y = do_sang(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

function doc_hex(chuoi: string): Mau {
  const s = chuoi.trim().replace('#', '')
  const n = s.length === 3 ? s.split('').map((k) => k + k) : [s.slice(0, 2), s.slice(2, 4), s.slice(4, 6)]
  return [parseInt(n[0]!, 16), parseInt(n[1]!, 16), parseInt(n[2]!, 16)] as const
}

/** Bóc dạng rgb(a b c / d) mà trang dùng cho chữ mờ và nền kính. */
function doc_rgb(chuoi: string): { mau: Mau; alpha: number } | null {
  const khop = chuoi.match(/rgb\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)/)
  if (khop === null) return null
  return {
    mau: [Number(khop[1]), Number(khop[2]), Number(khop[3])] as const,
    alpha: khop[4] === undefined ? 1 : Number(khop[4]),
  }
}

/** Đặt lớp trên có alpha lên lớp dưới đục. */
function chong(tren: Mau, alpha: number, duoi: Mau): Mau {
  return [0, 1, 2].map((i) => alpha * tren[i]! + (1 - alpha) * duoi[i]!) as unknown as Mau
}

/** Hai phép trộn mà tầng màu dùng: cộng sáng trên nền tối, nhân đậm trên nền sáng. */
function tron(kieu: 'screen' | 'multiply', a: Mau, b: Mau): Mau {
  return [0, 1, 2].map((i) => {
    const x = a[i]! / 255
    const y = b[i]! / 255
    const z = kieu === 'screen' ? x + y - x * y : x * y
    return z * 255
  }) as unknown as Mau
}

// ---------------------------------------------------------------------------
// Đọc token ra khỏi tệp CSS
// ---------------------------------------------------------------------------

const css = readFileSync(TEP_CSS, 'utf8')

/** Lấy giá trị một biến trong đúng một khối, tính từ vị trí khối bắt đầu. */
function lay_bien(ten: string, tu: number, den: number): string {
  const doan = css.slice(tu, den)
  const khop = doan.match(new RegExp(`--${ten}\\s*:\\s*([^;]+);`))
  if (khop === null) throw new Error(`Không tìm thấy biến --${ten} trong khối đang xét`)
  return khop[1]!.trim()
}

const dau_toi = css.indexOf(':root {')
const dau_sang = css.indexOf("[data-giao-dien='sang'] {")
const het_sang = css.indexOf('@theme inline', dau_sang)
if (dau_toi < 0 || dau_sang < 0) throw new Error('Không tách được hai khối bảng màu trong giao_dien.css')

interface Che_do {
  readonly ten: string
  readonly tu: number
  readonly den: number
  readonly kieu_tron: 'screen' | 'multiply'
}

const CHE_DO: readonly Che_do[] = [
  { ten: 'nền tối', tu: dau_toi, den: dau_sang, kieu_tron: 'screen' },
  { ten: 'nền sáng', tu: dau_sang, den: het_sang, kieu_tron: 'multiply' },
]

// ---------------------------------------------------------------------------
// Tính dải nền kính có thể xảy ra, rồi đo chữ lên đó
// ---------------------------------------------------------------------------

/** Ngưỡng theo WCAG AA cho chữ thường.
 *
 *  Không dùng ngưỡng 3 dành cho chữ lớn, kể cả với những con số cỡ lớn: cùng
 *  một bậc màu ấy còn được dùng cho nhãn cỡ nhỏ, nên chỉ cần một chỗ dùng nhỏ
 *  là cả bậc phải đạt mức của chữ thường. */
const NGUONG_THUONG = 4.5

const loi: string[] = []

for (const che_do of CHE_DO) {
  const nen = doc_hex(lay_bien('nen', che_do.tu, che_do.den))
  const kinh = doc_rgb(lay_bien('kinh-nen', che_do.tu, che_do.den))
  if (kinh === null) throw new Error(`--kinh-nen của ${che_do.ten} không đúng dạng rgb()`)
  const do_dam_truong = Number(lay_bien('kinh-do-dam-truong', che_do.tu, che_do.den))

  // Mọi nền kính có thể có: tầng màu chạy qua sáu bậc, cộng trường hợp không có
  // khối màu nào phía sau.
  const nen_co_the: Mau[] = [chong(kinh.mau, kinh.alpha, nen)]
  for (let bac = 1; bac <= 6; bac += 1) {
    const mau_bac = doc_hex(lay_bien(`tang-${bac}`, che_do.tu, che_do.den))
    const sau_tron = tron(che_do.kieu_tron, nen, mau_bac)
    const sau_mo = chong(sau_tron, do_dam_truong, nen)
    nen_co_the.push(chong(kinh.mau, kinh.alpha, sau_mo))
  }

  const sang_nhat = nen_co_the.reduce((a, b) => (do_sang(a) > do_sang(b) ? a : b))
  const toi_nhat = nen_co_the.reduce((a, b) => (do_sang(a) < do_sang(b) ? a : b))

  // Những màu chữ thật sự nằm trên kính.
  const chu_can_do: { ten: string; mau: Mau; nguong: number }[] = []

  const chu = doc_hex(lay_bien('chu', che_do.tu, che_do.den))
  chu_can_do.push({ ten: 'chữ chính', mau: chu, nguong: NGUONG_THUONG })

  const chu_mo_raw = lay_bien('chu-mo', che_do.tu, che_do.den)
  const chu_mo_rgb = doc_rgb(chu_mo_raw)
  const chu_mo = chu_mo_rgb === null ? doc_hex(chu_mo_raw) : chong(chu_mo_rgb.mau, chu_mo_rgb.alpha, sang_nhat)
  chu_can_do.push({ ten: 'chữ mờ', mau: chu_mo, nguong: NGUONG_THUONG })

  for (let bac = 1; bac <= 6; bac += 1) {
    // Bậc màu dùng cho con số cỡ lớn và nhãn cỡ nhỏ, nên phải đạt ngưỡng chữ
    // thường chứ không được dựa vào ngoại lệ dành cho chữ lớn.
    chu_can_do.push({
      ten: `bậc màu ${bac}`,
      mau: doc_hex(lay_bien(`tang-${bac}`, che_do.tu, che_do.den)),
      nguong: NGUONG_THUONG,
    })
  }

  console.log(`\n${che_do.ten}`)
  console.log(
    `  dải nền kính: tối nhất ${hien(toi_nhat)} tới sáng nhất ${hien(sang_nhat)}`,
  )
  for (const c of chu_can_do) {
    const a = tuong_phan(c.mau, sang_nhat)
    const b = tuong_phan(c.mau, toi_nhat)
    const xau = Math.min(a, b)
    const dat = xau >= c.nguong
    console.log(
      `  ${c.ten.padEnd(12)} ${xau.toFixed(2).padStart(6)}  (sáng ${a.toFixed(2)} / tối ${b.toFixed(2)})` +
        (dat ? '' : `  THIẾU, cần ${c.nguong}`),
    )
    if (!dat) {
      loi.push(
        `${che_do.ten}: ${c.ten} chỉ đạt ${xau.toFixed(2)} ở trường hợp xấu nhất, cần ${c.nguong}`,
      )
    }
  }
}

function hien(m: Mau): string {
  return '#' + m.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')
}

console.log()
if (loi.length > 0) {
  console.error(`Tương phản chưa đạt, ${loi.length} lỗi:\n`)
  for (const d of loi) console.error(`  - ${d}`)
  console.error(
    '\nChữa bằng cách hạ --kinh-do-dam-truong, tăng alpha của --kinh-nen, hoặc\nhạ độ sáng của bậc màu bị thiếu.',
  )
  process.exit(1)
}
console.log('Tương phản đạt ở cả hai đầu của dải nền kính.')
