// Danh sách các ý có tiêu đề riêng, dùng cho phần năng lực, phần cách làm việc
// và phần quyết định trong mỗi dự án.
//
// Cố ý không đánh số. Đánh số ngụ ý một trình tự, mà bốn nguyên tắc làm việc
// thì không có thứ tự nào: bỏ ý thứ ba không làm ý thứ tư vô nghĩa.

import type { Nang_luc } from '../../noi_dung/kieu.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function DanhSachY({ muc }: { muc: readonly Nang_luc[] }) {
  const { chu } = dung_ngon_ngu()

  return (
    <ul>
      {muc.map((y, thu_tu) => (
        <li
          key={y.tieu_de.en}
          className="cho-hien grid gap-x-10 gap-y-3 border-t border-vien py-8 first:border-t-0 first:pt-0 lg:grid-cols-12"
          style={{ transitionDelay: `${thu_tu * 90}ms` }}
        >
          <h3 className="hien text-[1.2rem] leading-snug font-semibold lg:col-span-4">
            {chu(y.tieu_de)}
          </h3>
          <p className="max-w-[68ch] text-[1.01rem] text-chu-mo lg:col-span-8">{chu(y.than)}</p>
        </li>
      ))}
    </ul>
  )
}
