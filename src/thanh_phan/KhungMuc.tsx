// Khung chung cho mỗi mục lớn: một đường kẻ ngang, tiêu đề, rồi nội dung.
//
// Đường kẻ mang thông tin chứ không trang trí: nó là chỗ một phần kết thúc và
// phần sau bắt đầu, nên trang không cần thêm nhãn nào để báo điều đó.

import type { ReactNode } from 'react'
import type { Song } from '../../noi_dung/kieu.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

interface Tham_so {
  readonly ma: string
  readonly tieu_de: Song
  readonly children: ReactNode
  /** Nền dịu hơn, dùng để tách hai mục liền nhau mà không phải đóng khung. */
  readonly nen_diu?: boolean
}

export function KhungMuc({ ma, tieu_de, children, nen_diu = false }: Tham_so) {
  const { chu } = dung_ngon_ngu()

  return (
    <section id={ma} className={nen_diu ? 'bg-nen-diu' : undefined}>
      <div className="mx-auto max-w-[78rem] px-5 py-16 sm:px-8 sm:py-24">
        <div className="cho-hien border-t border-vien pt-6">
          <h2 className="hien-lon text-[clamp(1.7rem,3.6vw,2.5rem)]">{chu(tieu_de)}</h2>
        </div>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}
