// Kiểm tra biến môi trường trước khi chạy hoặc dựng.
//
// Biến VITE_ được nhúng vào gói ngay lúc dựng chứ không đọc lúc chạy, nên
// quên khai một biến không làm lệnh build thất bại: nó chỉ để nguyên chuỗi
// thay thế trong index.html, và trang vẫn lên bình thường với một thẻ địa chỉ
// chuẩn vô nghĩa. Đây là chỗ bắt điều đó trước khi nó ra tới máy thật.

const BAT_BUOC = [
  {
    ten: 'VITE_DIA_CHI_TRANG',
    mo_ta: 'địa chỉ công khai của trang, dùng cho thẻ canonical và thẻ chia sẻ liên kết',
  },
] as const

const thieu: string[] = []
const sai: string[] = []

for (const bien of BAT_BUOC) {
  const gia_tri = process.env[bien.ten]

  if (gia_tri === undefined || gia_tri.trim() === '') {
    thieu.push(`${bien.ten} — ${bien.mo_ta}`)
    continue
  }
  if (!gia_tri.startsWith('https://')) {
    sai.push(`${bien.ten} phải bắt đầu bằng https://, đang là "${gia_tri}"`)
  }
  if (gia_tri.endsWith('/')) {
    sai.push(`${bien.ten} không được có dấu gạch chéo ở cuối, đang là "${gia_tri}"`)
  }
}

if (thieu.length > 0 || sai.length > 0) {
  console.error('Môi trường chưa sẵn sàng.\n')
  if (thieu.length > 0) {
    console.error('Thiếu biến:')
    for (const dong of thieu) console.error(`  - ${dong}`)
    console.error('\nSao chép tệp mẫu rồi sửa giá trị:  cp .env.example .env')
  }
  if (sai.length > 0) {
    console.error(sai.length > 0 && thieu.length > 0 ? '\nGiá trị không hợp lệ:' : 'Giá trị không hợp lệ:')
    for (const dong of sai) console.error(`  - ${dong}`)
  }
  process.exit(1)
}

console.log('Môi trường đạt.')
