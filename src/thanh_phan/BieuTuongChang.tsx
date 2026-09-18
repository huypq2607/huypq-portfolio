// Biểu tượng cho từng chặng của dây chuyền dữ liệu.
//
// Vẽ tay bằng nét chứ không lấy từ bộ biểu tượng có sẵn, vì mỗi hình phải nói
// đúng việc của chặng đó: khối trụ là kho dữ liệu nguồn, phễu là lọc, cột là
// dựng chỉ số, lưới là bảng phẳng, phong bì là thư, chuông là cảnh báo, chồng
// phiến là kho dữ liệu đã dựng, và khung có cột bên trong là dashboard. Kéo cả
// một thư viện biểu tượng về cho tám hình là đổi vài chục kilobyte lấy thứ
// mình vẽ trong hai mươi dòng.
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
  // Ba phiến chồng lên nhau, tức kho dữ liệu đã dựng thành tầng. Khác khối trụ
  // của chặng lấy dữ liệu: khối trụ là hệ nguồn của người khác, chồng phiến là
  // kho mình dựng ra.
  kho: 'M12 3 3 7.5 12 12l9-4.5L12 3ZM3 12l9 4.5L21 12M3 16.5 12 21l9-4.5',
  // Khung màn hình có ba cột bên trong, tức dashboard. Không dùng lại hình ba
  // cột trần của chặng dựng chỉ số, vì chỉ số và nơi người ta xem chỉ số là hai
  // chặng khác nhau và hai hình giống nhau sẽ xoá mất ranh giới đó.
  dashboard: 'M3 4.5h18v13H3v-13ZM8 14v-3.5M12 14V8M16 14v-2M9 21h6',
}

/** Những mã chặng đã có hình. Cổng cham-thu-noi-dung đối chiếu danh sách này
 *  với các chặng khai trong tệp nội dung, vì chặng thiếu hình thì vòng tròn
 *  hiện ra rỗng trong khi trang vẫn dựng xong và không có gì báo. */
export const MA_CO_HINH: readonly string[] = Object.keys(HINH)

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
