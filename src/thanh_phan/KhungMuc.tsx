// Khung chung cho mỗi mục lớn của trang: một đường kẻ ngang, tiêu đề, rồi nội
// dung. Đường kẻ ở đây mang thông tin chứ không trang trí, nó là chỗ một phần
// kết thúc và phần sau bắt đầu, nên trang không cần thêm nhãn nào để báo điều
// đó.

import type { ReactNode } from 'react'
import type { Song } from '../../noi_dung/kieu.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

interface Tham_so {
  readonly ma: string
  readonly tieu_de: Song
  readonly children: ReactNode
  /** Nền sâu hơn, dùng để tách hai dự án khỏi nhau mà không cần đóng khung thẻ. */
  readonly nen_sau?: boolean
}

export function KhungMuc({ ma, tieu_de, children, nen_sau = false }: Tham_so) {
  const { chu } = dung_ngon_ngu()

  return (
    <section id={ma} className={nen_sau ? 'bg-giay-sau' : undefined}>
      <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-20">
        <div className="border-t border-muc pt-5">
          <h2 className="hien text-[clamp(1.4rem,3vw,1.9rem)] font-semibold">{chu(tieu_de)}</h2>
        </div>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}
