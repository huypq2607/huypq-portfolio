// Mũi tên chỉ chiều của một thay đổi.
//
// Ba hình, ba nghĩa khác nhau, và không hình nào tô màu theo tốt xấu: cả tám
// con số trên trang đều là thay đổi tốt, nên tô đỏ xanh theo dấu cộng trừ chỉ
// làm người đọc tưởng có cái đang xấu đi.
//
//   giam  đường đi xuống, ví dụ bớt giờ làm tay
//   tang  đường đi lên, ví dụ tăng tỷ lệ tái tục
//   rut   hai mũi tên chụm vào nhau, tức khoảng cách co lại

const HINH: Record<string, string> = {
  giam: 'M4 7l6 6 4-4 6 6M20 15h-5M20 15v-5',
  tang: 'M4 17l6-6 4 4 6-6M20 9h-5M20 9v5',
  rut: 'M3 12h7M10 12l-3-3M10 12l-3 3M21 12h-7M14 12l3-3M14 12l3 3',
}

export function MuiTenChieu({ chieu, className }: { chieu: string; className?: string }) {
  const d = HINH[chieu]
  if (d === undefined) return null

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
      <path d={d} />
    </svg>
  )
}
