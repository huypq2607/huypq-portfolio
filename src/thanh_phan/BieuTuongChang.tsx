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

const HINH: Record<string, readonly string[]> = {
  // Khối trụ hai vành, tức kho dữ liệu nguồn. Hai chứ không phải ba: ở cỡ hai
  // mươi điểm ảnh, vành thứ ba dính vào thân thành một vệt.
  lay: [
    'M12 3.6c-4 0-7.2 1.1-7.2 2.5s3.2 2.5 7.2 2.5 7.2-1.1 7.2-2.5S16 3.6 12 3.6Z',
    'M4.8 6.1v11.8c0 1.4 3.2 2.5 7.2 2.5s7.2-1.1 7.2-2.5V6.1',
    'M4.8 12c0 1.4 3.2 2.5 7.2 2.5s7.2-1.1 7.2-2.5',
  ],
  // Phễu lọc, miệng hẹp lại cho cân với thân.
  sach: ['M4.6 5.4h14.8L13.6 12.5v5.3l-3.2 1.8v-7.1L4.6 5.4Z'],
  // Ba cột CAO DẦN, tức chỉ số dựng xong.
  //
  // Bản trước ghi lời chú là cao dần nhưng vẽ ba cột cao 7, 13 rồi 10, tức cột
  // giữa cao nhất: hình nói khác lời chú của chính nó. Không vẽ đường chân cột,
  // vì bộ ký hiệu hệ thống không vẽ chân cho biểu đồ cột.
  'chi-so': ['M6.6 19.2v-4.6', 'M12 19.2v-7.6', 'M17.4 19.2v-10.6'],
  // Bảng phẳng, có hàng tiêu đề. Lưới chia ô đều nhau thì đọc ra cửa sổ chứ
  // không ra bảng; đúng một hàng tiêu đề là đủ để phân biệt.
  'phuc-vu': [
    'M5 5.2h14a1.4 1.4 0 0 1 1.4 1.4v10.8A1.4 1.4 0 0 1 19 18.8H5a1.4 1.4 0 0 1-1.4-1.4V6.6A1.4 1.4 0 0 1 5 5.2Z',
    'M3.6 9.8h16.8',
    'M9.4 9.8v9M14.6 9.8v9',
  ],
  // Phong bì bo góc, nếp gấp không chạm mép.
  'bao-cao': [
    'M4.6 6.2h14.8a1.4 1.4 0 0 1 1.4 1.4v8.8a1.4 1.4 0 0 1-1.4 1.4H4.6a1.4 1.4 0 0 1-1.4-1.4V7.6a1.4 1.4 0 0 1 1.4-1.4Z',
    'm3.5 7.4 8.5 5.7 8.5-5.7',
  ],
  // Chuông, quai bo tròn.
  'canh-bao': [
    'M17.6 10a5.6 5.6 0 1 0-11.2 0c0 4.3-1.9 5.3-1.9 5.3h15s-1.9-1-1.9-5.3Z',
    'M13.6 18.6a1.9 1.9 0 0 1-3.2 0',
  ],
  // Ba phiến chồng lên nhau, tức kho dữ liệu đã dựng thành tầng. Khác khối trụ
  // của chặng lấy dữ liệu: khối trụ là hệ nguồn của người khác, chồng phiến là
  // kho mình dựng ra.
  kho: ['M12 3.6 4.2 7.5 12 11.4l7.8-3.9L12 3.6Z', 'M4.2 11.8 12 15.7l7.8-3.9', 'M4.2 16.1 12 20l7.8-3.9'],
  // Bong bóng tin nhắn có đuôi, tức gửi vào một ứng dụng trò chuyện. Không
  // dùng lại phong bì của chặng gửi mail: thư và tin nhắn là hai kênh khác
  // nhau, mà hai chặng khác nhau đeo chung một hình thì cột biểu tượng hết
  // phân biệt được.
  'nhan-tin': [
    'M5 4.8h14a1.4 1.4 0 0 1 1.4 1.4v8.6a1.4 1.4 0 0 1-1.4 1.4H9.6l-4.3 3.4v-3.4H5a1.4 1.4 0 0 1-1.4-1.4V6.2A1.4 1.4 0 0 1 5 4.8Z',
  ],
  // Khung màn hình có ba cột bên trong, tức dashboard. Không dùng lại hình ba
  // cột trần của chặng dựng chỉ số, vì chỉ số và nơi người ta xem chỉ số là hai
  // chặng khác nhau và hai hình giống nhau sẽ xoá mất ranh giới đó.
  dashboard: [
    'M4.6 4.8h14.8a1.4 1.4 0 0 1 1.4 1.4v9.2a1.4 1.4 0 0 1-1.4 1.4H4.6a1.4 1.4 0 0 1-1.4-1.4V6.2a1.4 1.4 0 0 1 1.4-1.4Z',
    'M8.4 13.4v-2.6M12 13.4V8.6M15.6 13.4v-1.6',
    'M9.6 20.4h4.8',
  ],
}

/** Những mã chặng đã có hình. Cổng cham-thu-noi-dung đối chiếu danh sách này
 *  với các chặng khai trong tệp nội dung, vì chặng thiếu hình thì vòng tròn
 *  hiện ra rỗng trong khi trang vẫn dựng xong và không có gì báo. */
export const MA_CO_HINH: readonly string[] = Object.keys(HINH)

export function BieuTuongChang({ ma, className }: { ma: string; className?: string }) {
  const net = HINH[ma]
  if (net === undefined) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      /* Nét 1,75 chứ không phải 1,6. Luật thật của bộ ký hiệu hệ thống là độ
         đậm nét icon phải khớp độ đậm chữ nằm cạnh nó; nét mảnh hơn chữ thì
         icon trông nhạt đi một nấc so với nhãn của chính nó. */
      strokeWidth="1.75"
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
