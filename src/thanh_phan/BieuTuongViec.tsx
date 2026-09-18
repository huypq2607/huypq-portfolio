// Biểu tượng cho từng việc trong phần kinh nghiệm.
//
// Khác BieuTuongChang ở chỗ bộ kia vẽ CHẶNG của dây chuyền, còn bộ này vẽ NGHĨA
// của một câu kết quả. Vì thế hình chọn theo thứ câu đang nói tới chứ không
// theo hướng tăng giảm: câu nói về tiền thì vẽ ví, câu nói về người thì vẽ
// người, câu nói về thời gian thì vẽ đồng hồ. Vẽ theo hướng tăng giảm thì mười
// lăm câu chỉ còn ba hình, và ba hình lặp lại năm lần mỗi hình thì cột biểu
// tượng không nói thêm được gì so với việc đọc chính câu chữ.
//
// Vẽ tay cùng một lối với bộ chặng: lưới 24, nét mảnh, mỗi hình nhiều nhất ba
// nét. Giới hạn ba nét không phải để tiết kiệm mà vì hình hiện ở cỡ 26 điểm
// ảnh; quá ba nét là các nét dính vào nhau thành một vệt nhoè, và một vệt nhoè
// thì thà không vẽ còn hơn.
//
// Dùng currentColor nên hình nhận màu từ nơi gọi. Mặc định là chữ mờ và chỉ
// sáng lên màu nhấn khi con trỏ đi tới, đúng cách dải chỉ số đầu trang đang
// làm: dải sáu bậc của trang mã hoá vị trí trong một chuỗi có thứ tự, mượn nó
// làm bảng màu phân loại cho mười lăm cái hình là phá mất nghĩa ấy.

const HINH: Record<string, readonly string[]> = {
  // Con trỏ chuột bị gạch bỏ: thao tác tay không còn nữa.
  'bo-thu-cong': [
    'M7.5 4.2l8.3 6.4-3.9.8 2.2 4.4-1.9.9-2.2-4.4-2.5 2.7V4.2Z',
    'M17.2 16.4l4.4 4.4M21.6 16.4l-4.4 4.4',
  ],
  // Đồng hồ cát: chuyện của thời gian.
  'thoi-gian': [
    'M7 3h10M7 21h10',
    'M17 3c0 4.2-10 5.8-10 9s10 4.8 10 9',
    'M7 3c0 4.2 10 5.8 10 9s-10 4.8-10 9',
  ],
  // Đường số liệu có một điểm bật lên, kèm dấu chấm than: bắt được bất thường.
  'phat-hien': ['M2.6 17.6l4.6-4.6 3 3 3.4-3.8', 'M18.6 5.2v5.6', 'M18.6 14.8v.1'],
  // Hai nhánh chụm về một mũi: nhiều nguồn về một mối.
  'gop-mot-moi': [
    'M2.6 5.4h3c4.6 0 5.4 6.6 10 6.6h5',
    'M2.6 18.6h3c4.6 0 5.4-6.6 10-6.6',
    'M21.4 12l-3.4-3.4M21.4 12l-3.4 3.4',
  ],
  // Mũi tên xoay vòng: hợp đồng quay lại, tức tái tục.
  'tai-tuc': ['M20.5 12a8.5 8.5 0 1 1-2.6-6.1', 'M20.8 3.2v4.6h-4.6'],
  // Tia chớp: nhanh lên hẳn một bậc.
  'toc-do': ['M13.4 2.2 4.2 14.2h6.6l-1.2 7.6 9.2-12.2h-6.6l1.2-7.4Z'],
  // Khiên có dấu tích: dữ liệu cá nhân được che chắn.
  'che-chan': [
    'M12 2.8 4.4 5.7v6.1c0 4.9 3.3 7.9 7.6 9 4.3-1.1 7.6-4.1 7.6-9V5.7L12 2.8Z',
    'M9.3 12.1l1.9 1.9 3.5-3.9',
  ],
  // Dấu nhân bị một cổng dựng chặn lại: lỗi không qua được CI.
  'chan-loi': ['M16.5 3.5v17', 'M4.2 8.6l4.6 4.6M8.8 8.6l-4.6 4.6', 'M11.2 12h3.4'],
  // Mũi tên leo bậc: hiệu quả đi lên.
  'leo-bac': ['M3 18.5l5-5 3.6 3.6L20 8.4', 'M20.4 13.2V8h-5.2'],
  // Chồng dòng dữ liệu với mũi tên xuống: khối việc tay vơi đi.
  'bot-viec': ['M3.6 7h11M3.6 12h11M3.6 17h7.5', 'M20 7.4v9.2', 'M20 16.6l-2.2-2.2M20 16.6l2.2-2.2'],
  // Ví tiền: chuyện của ngân sách.
  'ngan-sach': [
    'M3 8.2a1.8 1.8 0 0 1 1.8-1.8h13.4A1.8 1.8 0 0 1 20 8.2v8.6a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 16.8V8.2Z',
    'M3 8.2V6.4a1.4 1.4 0 0 1 1.4-1.4h11.4',
    'M16.4 12.5h1.9',
  ],
  // Hai người: chuyện của nhân sự.
  'nhan-su': [
    'M9.2 11.4a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z',
    'M2.8 20.4c0-3.5 2.9-5.7 6.4-5.7s6.4 2.2 6.4 5.7',
    'M16 5.3a3.3 3.3 0 0 1 0 6.2M17.4 15.2c2.2.7 3.8 2.5 3.8 5.2',
  ],
  // La bàn: chọn hướng, tức ra quyết định.
  'quyet-dinh': [
    'M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6Z',
    'M15.6 8.4 13.9 14l-5.5 1.8 1.8-5.6 5.4-1.8Z',
  ],
  // Đồng hồ đo: độ trễ nằm ở mức nào.
  'do-tre': ['M3.6 18.4a8.4 8.4 0 1 1 16.8 0', 'M12 18.4l4.3-5.4'],
  // Tờ tài liệu: đặc tả và bản vẽ.
  'tai-lieu': [
    'M13.6 3H7.4A2.2 2.2 0 0 0 5.2 5.2v13.6A2.2 2.2 0 0 0 7.4 21h9.2a2.2 2.2 0 0 0 2.2-2.2V8.4L13.6 3Z',
    'M13.6 3v5.4h5.2',
    'M8.8 13.2h6.4M8.8 17h4.2',
  ],
}

/** Những mã hình đã vẽ. Cổng cham-thu-noi-dung đối chiếu với các mã khai trong
 *  tệp nội dung, vì khai một mã chưa vẽ thì chỗ ấy lặng lẽ trống trơn. */
export const MA_HINH_VIEC: readonly string[] = Object.keys(HINH)

export function BieuTuongViec({ ma, className }: { ma: string; className?: string }) {
  const net = HINH[ma]
  if (net === undefined) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {net.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
