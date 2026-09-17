// Học vấn và chứng chỉ. Hai cột trên màn rộng, xếp dọc trên điện thoại.

import { CHUNG_CHI, HOC_VAN, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function HocVan() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="cho-hien grid gap-10 sm:grid-cols-2">
      <section>
        <h3 className="ma text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_hoc_van)}</h3>
        <div className="mt-3 border-t border-vien pt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="text-[1.02rem] font-semibold">{chu(HOC_VAN.truong)}</p>
            <p className="ma text-[0.78rem] text-chu-mo">{HOC_VAN.thoi_gian}</p>
          </div>
          <p className="mt-1 text-chu-mo">
            {chu(HOC_VAN.nganh)} · {chu(HOC_VAN.ghi_chu)}
          </p>
        </div>
      </section>

      <section>
        <h3 className="ma text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_chung_chi)}</h3>
        <div className="mt-3 space-y-3">
          {CHUNG_CHI.map((muc) => (
            <div key={muc.ten.en} className="border-t border-vien pt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-[1.02rem] font-semibold">{chu(muc.ten)}</p>
                <p className="ma text-[0.78rem] text-chu-mo">{muc.nam}</p>
              </div>
              <p className="mt-1 text-chu-mo">{chu(muc.ghi_chu)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
