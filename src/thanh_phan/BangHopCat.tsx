// Bảy lớp của hộp cát SQL trong dapractice.
//
// Mỗi hàng thụt vào sâu hơn hàng trên một nấc, nên bảng tự nói ra rằng đây là
// bảy lớp bọc lấy nhau chứ không phải bảy mục ngang hàng. Hàng tiêu đề cột
// đứng yên phía trên, và chính việc các hàng trôi dần sang phải dưới nó là
// thứ diễn đạt chiều sâu mà một bảng kẻ ô vuông vắn không nói được.

import type { CSSProperties } from 'react'
import { LOP_HOP_CAT, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

const LUOI_COT = 'sm:grid-cols-[2.5rem_9.5rem_1fr_4.5rem]'

export function BangHopCat() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="mt-14 max-w-[58rem]">
      <h4 className="hien max-w-[46ch] text-[1.05rem] font-semibold">{chu(NHAN.nhan_hop_cat)}</h4>

      <div className={`mt-6 hidden gap-x-5 pb-2 text-[0.78rem] text-muc-mo sm:grid ${LUOI_COT}`}>
        <span>{chu(NHAN.cot_lop)}</span>
        <span>{chu(NHAN.cot_cach)}</span>
        <span>{chu(NHAN.cot_chan)}</span>
        <span className="sm:text-right">{chu(NHAN.cot_ma)}</span>
      </div>

      <ol className="space-y-1.5">
        {LOP_HOP_CAT.map((lop, thu_tu) => (
          <li
            key={lop.so}
            className="hang-lop py-2.5 pl-4"
            style={{ '--muc-thut': thu_tu } as CSSProperties}
          >
            <div className={`grid gap-x-5 gap-y-1 sm:items-baseline ${LUOI_COT}`}>
              <span className="so-lieu text-[0.95rem]">{lop.so}</span>
              <span className="hien text-[0.9rem] font-semibold">{chu(lop.cach)}</span>
              <span className="text-[0.92rem] leading-snug text-muc-mo">{chu(lop.chan)}</span>
              <span className="so-lieu text-[0.82rem] text-muc-mo sm:text-right">{lop.ma_loi}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
