// Danh sách các ý có tiêu đề riêng, dùng cho phần năng lực và phần cách làm
// việc. Tiêu đề nằm cột trái, phần giải thích nằm cột phải, ngăn nhau bằng
// một đường kẻ mảnh.
//
// Cố ý không đánh số các ý. Đánh số ngụ ý một trình tự, mà bốn nguyên tắc làm
// việc thì không có thứ tự nào cả: bỏ ý thứ ba không làm ý thứ tư vô nghĩa.

import type { Nang_luc } from '../../noi_dung/kieu.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function DanhSachY({ muc }: { muc: readonly Nang_luc[] }) {
  const { chu } = dung_ngon_ngu()

  return (
    <ul>
      {muc.map((y) => (
        <li
          key={y.tieu_de.en}
          className="grid gap-x-10 gap-y-3 border-t border-duong py-7 first:border-t-0 first:pt-0 lg:grid-cols-12"
        >
          <h3 className="hien text-[1.15rem] leading-snug font-semibold lg:col-span-4">
            {chu(y.tieu_de)}
          </h3>
          <p className="max-w-[68ch] text-[1.02rem] text-muc-mo lg:col-span-8">{chu(y.than)}</p>
        </li>
      ))}
    </ul>
  )
}
