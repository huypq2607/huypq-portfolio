// Tầng màu nằm dưới toàn bộ trang, để những bề mặt kính có thứ mà khúc xạ.
//
// Đây là thứ quyết định cả lối trình bày kính, chứ không phải bản thân lớp mờ.
// Một panel trong suốt đặt trên nền phẳng chỉ ra một hình chữ nhật mờ, và đó
// đúng là chỗ các trang bắt chước hỏng. Phải có màu chuyển động phía sau thì
// lớp kính mới đọc ra là thuỷ tinh.
//
// Năm khối màu lấy từ chính dải sáu bậc của trang, làm nhoè rất mạnh rồi hạ độ
// đậm xuống rất thấp. Độ đậm là chỗ dễ quá tay nhất: để cao thì tầng màu át cả
// trang, chữ tụt tương phản và panel biến thành hộp tối. Để thấp thì nó lùi hẳn
// về sau, chỉ còn là cái để kính bắt lấy.
//
// Cố định theo khung nhìn chứ không cuộn theo trang, nên màu sau panel đổi dần
// khi người đọc cuộn. Đó là lý do lớp kính trông sống chứ không trông dán.

/** Vị trí và cỡ của từng khối, tính theo phần trăm khung nhìn. */
const KHOI = [
  { bac: 1, canh: 46, trai: 2, tren: 4 },
  { bac: 3, canh: 38, trai: 42, tren: -4 },
  { bac: 5, canh: 42, trai: 66, tren: 22 },
  { bac: 6, canh: 40, trai: 12, tren: 48 },
  { bac: 2, canh: 34, trai: 52, tren: 62 },
] as const

export function TruongMau() {
  return (
    <div className="truong-mau" aria-hidden="true">
      {KHOI.map((k) => (
        <span
          key={k.bac}
          style={{
            width: `${k.canh}vw`,
            height: `${k.canh}vw`,
            left: `${k.trai}%`,
            top: `${k.tren}%`,
            backgroundColor: `var(--tang-${k.bac})`,
          }}
        />
      ))}
    </div>
  )
}
