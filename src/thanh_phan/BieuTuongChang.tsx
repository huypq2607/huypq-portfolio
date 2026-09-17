// Biểu tượng cho từng chặng của dây chuyền dữ liệu.
//
// Vẽ tay bằng nét chứ không lấy từ bộ biểu tượng có sẵn, vì cả bộ chỉ có sáu
// hình và mỗi hình phải nói đúng việc của chặng đó: khối trụ là kho dữ liệu,
// phễu là lọc, cột là dựng chỉ số, lưới là bảng phẳng, phong bì là thư, chuông
// là cảnh báo. Kéo cả một thư viện biểu tượng về cho sáu hình là đổi vài chục
// kilobyte lấy thứ mình vẽ trong hai mươi dòng.
//
// Nét mảnh và dùng currentColor, nên biểu tượng nhận đúng màu bậc của chặng mà
// không phải truyền màu vào.

const HINH: Record<string, string> = {
  // Khối trụ, tức kho dữ liệu nguồn.
  lay: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  // Phễu lọc.
  sach: 'M3 4h18l-7 8v7l-4 2v-9L3 4Z',
  // Ba cột cao dần, tức chỉ số dựng xong.
  'chi-so': 'M5 20V13M12 20V7M19 20V10M3 20h18',
  // Lưới, tức bảng phẳng.
  'phuc-vu': 'M3 5h18v14H3V5Zm0 5h18M3 15h18M9 5v14M15 5v14',
  // Phong bì.
  'bao-cao': 'M3 6h18v12H3V6Zm0 0 9 7 9-7',
  // Chuông.
  'canh-bao': 'M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0',
}

export function BieuTuongChang({ ma, className }: { ma: string; className?: string }) {
  const d = HINH[ma]
  if (d === undefined) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
