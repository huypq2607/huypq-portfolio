// Dự án nổi bật. Mỗi dự án là một thẻ: làm bằng gì, trên dữ liệu nào, quy mô
// bao nhiêu, làm gì, và đổi được điều gì.
//
// Phần giá trị nằm dưới cùng và tách hẳn bằng một đường kẻ, vì đó là dòng nhà
// tuyển dụng tìm. Để nó lẫn trong đoạn mô tả thì họ phải đọc hết mới thấy.

import type { Du_an_noi_bat } from '../../noi_dung/kieu.ts'
import { DU_AN_NOI_BAT, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

function MotDuAn({ du_an }: { du_an: Du_an_noi_bat }) {
  const { chu } = dung_ngon_ngu()

  return (
    <article className="the-noi flex min-w-0 flex-col rounded-xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="hien text-[1.02rem] leading-snug font-semibold">{chu(du_an.ten)}</h3>
        <span
          className="ma shrink-0 rounded-md border border-vien px-2 py-0.5 text-[0.68rem] text-chu-mo"
        >
          {du_an.noi}
        </span>
      </div>

      <p className="mt-3 leading-relaxed text-chu-mo">{chu(du_an.viec)}</p>

      <dl className="ma mt-4 space-y-1 text-[0.74rem] text-chu-mo">
        <div className="flex gap-2">
          <dt className="w-[5.9rem] shrink-0">{chu(NHAN.nhan_cong_cu)}</dt>
          <dd className="min-w-0">{du_an.cong_cu.join(', ')}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-[5.9rem] shrink-0">{chu(NHAN.nhan_nguon)}</dt>
          <dd className="min-w-0">{chu(du_an.nguon)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-[5.9rem] shrink-0">{chu(NHAN.nhan_quy_mo)}</dt>
          <dd className="min-w-0">{chu(du_an.quy_mo)}</dd>
        </div>
      </dl>

      {/* mt-auto đẩy khối giá trị xuống đáy thẻ, để các thẻ cùng hàng có đường
          kẻ nằm ngang nhau dù đoạn mô tả dài ngắn khác nhau. */}
      <div className="mt-auto border-t border-vien pt-4">
        <p className="ma text-[0.7rem] text-chu-mo">{chu(NHAN.nhan_gia_tri)}</p>
        <ul className="mt-2 space-y-1.5">
          {du_an.gia_tri.map((muc, i) => (
            <li key={i} className="gach-dau-dong text-[0.92rem] leading-snug font-medium">
              {chu(muc)}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function DuAnNoiBat() {
  return (
    <div className="cho-hien grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {DU_AN_NOI_BAT.map((du_an) => (
        <MotDuAn key={du_an.ma} du_an={du_an} />
      ))}
    </div>
  )
}
