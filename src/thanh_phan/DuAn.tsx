// Một dự án, trình bày theo lối bối cảnh, con số, rồi các quyết định.
//
// Không có ảnh chụp màn hình và không có danh sách tính năng. Người đọc là
// người tuyển kỹ sư dữ liệu, thứ họ cần biết là người này quyết định thế nào
// khi có đánh đổi, chứ không phải sản phẩm trông ra sao.

import type { ReactNode } from 'react'
import type { Du_an } from '../../noi_dung/kieu.ts'
import { NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { DemSo } from './DemSo.tsx'

interface Tham_so {
  readonly du_an: Du_an
  /** Nội dung xen giữa phần ngăn xếp và phần quyết định, ví dụ sơ đồ hộp cát. */
  readonly children?: ReactNode
}

export function DuAn({ du_an, children }: Tham_so) {
  const { ngon_ngu, chu, chu_tho } = dung_ngon_ngu()

  return (
    <article>
      <div className="cho-hien">
        <h3 className="hien-lon max-w-[20ch] text-[clamp(2rem,4.6vw,3.1rem)]">{chu(du_an.ten)}</h3>
        <p className="ma mt-5 text-[0.82rem] text-nhan">{chu(du_an.vai_tro)}</p>
        <p className="mt-7 max-w-[64ch] text-[1.1rem] leading-relaxed">{chu(du_an.tom_tat)}</p>
      </div>

      {/* Bốn con số đếm lên khi lọt vào tầm mắt. Mỗi ô lấy một bậc của dải sáu
          tầng, nên bốn ô đứng cạnh nhau vẫn thuộc cùng một hệ màu. */}
      <dl className="the-noi cho-hien mt-10 grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-4">
        {du_an.so_lieu.map((o, thu_tu) => (
          <div
            key={o.nhan.en}
            className={[
              'px-5 py-6',
              'border-vien',
              thu_tu % 2 === 1 ? 'border-l' : '',
              thu_tu >= 2 ? 'border-t' : '',
              'sm:border-t-0',
              thu_tu === 0 ? 'sm:border-l-0' : 'sm:border-l',
            ].join(' ')}
          >
            <dt
              className="so-lieu text-[clamp(1.6rem,3.4vw,2.3rem)] leading-none"
              style={{ color: `var(--tang-${thu_tu + 2})` }}
            >
              <DemSo dich={chu_tho(o.so)} ngon_ngu={ngon_ngu} />
            </dt>
            <dd className="mt-2.5 text-[0.8rem] leading-snug text-chu-mo">{chu(o.nhan)}</dd>
          </div>
        ))}
      </dl>

      <div className="cho-hien mt-10">
        <h4 className="ma text-[0.75rem] text-chu-mo">{chu(NHAN.nhan_ngan_xep)}</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {du_an.ngan_xep.map((ten) => (
            <li
              key={ten}
              className="ma rounded-md border border-vien bg-be-mat px-2.5 py-1 text-[0.76rem] text-chu-mo"
            >
              {ten}
            </li>
          ))}
        </ul>
      </div>

      {children}

      {du_an.dong_gop !== undefined && (
        <div className="mt-14">
          <h4 className="hien cho-hien text-[1.1rem] font-semibold">{chu(NHAN.nhan_dong_gop)}</h4>

          {/* Bày thành hàng chứ không thành lưới thẻ như bốn ô số liệu phía
              trên. Hai khối đều là con số, nhưng đo hai thứ khác hẳn nhau: trên
              là quy mô của hệ thống, dưới là thứ đã đổi nhờ nó. Cùng một hình
              thì người đọc lướt qua sẽ tưởng là một. */}
          <ul className="mt-6">
            {du_an.dong_gop.map((muc, thu_tu) => (
              <li
                key={muc.nhan.en}
                className="cho-hien grid gap-x-10 gap-y-2 border-t border-vien py-6 first:border-t-0 first:pt-0 lg:grid-cols-12"
                style={{ transitionDelay: `${thu_tu * 90}ms` }}
              >
                <p
                  className="so-lieu text-[clamp(1.5rem,3.2vw,2.1rem)] leading-none lg:col-span-4"
                  style={{ color: `var(--tang-${thu_tu + 2})` }}
                >
                  {chu(muc.so)}
                </p>
                <div className="lg:col-span-8">
                  <p className="text-[1.02rem]">{chu(muc.nhan)}</p>
                  <p className="mt-1.5 max-w-[62ch] text-[0.9rem] text-chu-mo">{chu(muc.boi_canh)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}


      <p
        className="cho-hien mt-10 max-w-[68ch] border-l-2 pl-5 text-[0.92rem] text-chu-mo"
        style={{ borderColor: 'var(--tang-5)' }}
      >
        {chu(du_an.ghi_chu)}
      </p>

      {du_an.lien_ket !== undefined && (
        <p className="cho-hien mt-8">
          <a
            href={du_an.lien_ket.dia_chi}
            target="_blank"
            rel="noreferrer"
            className="lien-ket hien -my-2 inline-block py-2 text-[1.05rem] font-semibold"
          >
            {chu(du_an.lien_ket.nhan)}
          </a>
        </p>
      )}
    </article>
  )
}
