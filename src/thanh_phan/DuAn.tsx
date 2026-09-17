// Một dự án, trình bày theo lối bối cảnh, con số, rồi các quyết định.
//
// Không có ảnh chụp màn hình và không có danh sách tính năng. Người đọc là
// người tuyển kỹ sư dữ liệu, thứ họ cần biết là người này quyết định thế nào
// khi có đánh đổi, chứ không phải sản phẩm trông ra sao.

import type { ReactNode } from 'react'
import type { Du_an } from '../../noi_dung/kieu.ts'
import { NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { DanhSachY } from './DanhSachY.tsx'

interface Tham_so {
  readonly du_an: Du_an
  /** Nội dung xen giữa phần ngăn xếp và phần quyết định, ví dụ sơ đồ hộp cát. */
  readonly children?: ReactNode
}

export function DuAn({ du_an, children }: Tham_so) {
  const { chu } = dung_ngon_ngu()

  return (
    <article>
      <h3 className="hien-lon max-w-[22ch] text-[clamp(1.75rem,4vw,2.6rem)]">{chu(du_an.ten)}</h3>

      <p className="hien mt-4 text-[0.95rem] text-dong">{chu(du_an.vai_tro)}</p>

      <p className="mt-7 max-w-[66ch] text-[1.1rem] leading-relaxed">{chu(du_an.tom_tat)}</p>

      {/* Đường kẻ dọc thật giữa các ô thay vì mẹo khe hở lộ nền, vì hai dự án
          nằm trên hai màu nền khác nhau. Ô đầu mỗi hàng bỏ kẻ, và số ô trên
          một hàng đổi theo khổ màn hình nên phải tính lại ở mức sm. */}
      <dl className="mt-10 grid grid-cols-2 gap-y-7 sm:grid-cols-4">
        {du_an.so_lieu.map((o, thu_tu) => (
          <div
            key={o.nhan.en}
            className={[
              'border-duong',
              thu_tu % 2 === 0 ? '' : 'border-l pl-5',
              thu_tu === 0 ? 'sm:border-l-0 sm:pl-0' : 'sm:border-l sm:pl-5',
            ].join(' ')}
          >
            <dt className="so-lieu text-[clamp(1.5rem,3.2vw,2.1rem)] leading-none">{chu(o.so)}</dt>
            <dd className="mt-2 pr-3 text-[0.82rem] leading-snug text-muc-mo">{chu(o.nhan)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <h4 className="text-[0.82rem] text-muc-mo">{chu(NHAN.nhan_ngan_xep)}</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {du_an.ngan_xep.map((ten) => (
            <li
              key={ten}
              className="hien rounded-[2px] border border-duong px-2.5 py-1 text-[0.82rem]"
            >
              {ten}
            </li>
          ))}
        </ul>
      </div>

      {children}

      <div className="mt-14">
        <h4 className="hien text-[1.05rem] font-semibold">{chu(NHAN.nhan_quyet_dinh)}</h4>
        <div className="mt-6">
          <DanhSachY muc={du_an.quyet_dinh} />
        </div>
      </div>

      <p className="mt-10 max-w-[68ch] border-l-2 border-dong pl-5 text-[0.92rem] text-muc-mo">
        {chu(du_an.ghi_chu)}
      </p>

      {du_an.lien_ket !== undefined && (
        <p className="mt-8">
          <a
            href={du_an.lien_ket.dia_chi}
            target="_blank"
            rel="noreferrer"
            className="lien-ket hien text-[1rem] font-semibold"
          >
            {chu(du_an.lien_ket.nhan)}
          </a>
        </p>
      )}
    </article>
  )
}
