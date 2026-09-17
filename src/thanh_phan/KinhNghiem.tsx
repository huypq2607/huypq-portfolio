// Kinh nghiệm làm việc. Mỗi nơi một khối, trong khối có thể có nhiều vai trò.
//
// Vai trò tách riêng vì ở VETC là hai vai trò song song, phân tích và kỹ thuật
// dữ liệu, và hai bên kể hai loại việc khác hẳn nhau. Gộp thành một danh sách
// dài thì người đọc mất ranh giới đó, mà chính ranh giới ấy là điều đáng nói.

import type { Kinh_nghiem } from '../../noi_dung/kieu.ts'
import { KINH_NGHIEM, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { DemSo } from './DemSo.tsx'

function MotNoi({ noi }: { noi: Kinh_nghiem }) {
  const { ngon_ngu, chu, chu_tho } = dung_ngon_ngu()

  return (
    <article className="cho-hien">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="hien-lon text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold">
          {chu(noi.cong_ty)}
        </h3>
        <p className="ma text-[0.78rem] text-chu-mo">{chu(noi.thoi_gian)}</p>
      </div>
      <p className="ma mt-1 text-[0.85rem]" style={{ color: 'var(--nhan)' }}>
        {chu(noi.chuc_danh)}
      </p>

      {noi.so_lieu !== undefined && (
        <dl className="the-noi mt-6 grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-3">
          {noi.so_lieu.map((muc) => (
            <div key={muc.nhan.en} className="border-vien px-4 py-4 not-last:border-r odd:border-r">
              <dt className="sr-only">{chu_tho(muc.nhan)}</dt>
              <dd>
                <DemSo
                  dich={chu_tho(muc.so)}
                  ngon_ngu={ngon_ngu}
                  className="so-lieu block text-[1.7rem] leading-none"
                />
                <span className="mt-1.5 block text-[0.78rem] leading-snug text-chu-mo">
                  {chu(muc.nhan)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-7 space-y-7">
        {noi.vai_tro.map((vai, thu_tu) => (
          <div key={vai.ten?.en ?? thu_tu}>
            {vai.ten !== undefined && (
              <h4 className="ma mb-3 text-[0.78rem] tracking-wide text-chu-mo">{chu(vai.ten)}</h4>
            )}
            {/* Dấu đầu dòng vẽ bằng pseudo-element trong CSS để nó nhận màu
                nhấn, còn chữ thì thụt vào thẳng cột. */}
            <ul className="space-y-3">
              {vai.viec.map((viec, i) => (
                <li key={i} className="gach-dau-dong max-w-[72ch] leading-relaxed text-chu-mo">
                  {chu(viec)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {noi.ngan_xep !== undefined && (
        <div className="mt-7">
          <p className="ma text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_ngan_xep)}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {noi.ngan_xep.map((ten) => (
              <li
                key={ten}
                className="ma rounded-md border border-vien px-2 py-0.5 text-[0.72rem] text-chu-mo"
              >
                {ten}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

export function KinhNghiem() {
  return (
    <div className="space-y-14 sm:space-y-20">
      {KINH_NGHIEM.map((noi) => (
        <MotNoi key={noi.ma} noi={noi} />
      ))}
    </div>
  )
}
