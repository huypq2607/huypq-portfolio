// Bảy lớp của hộp cát SQL trong dapractice.
//
// Mỗi hàng thụt vào sâu hơn hàng trên một nấc, nên bảng tự nói ra rằng đây là
// bảy lớp bọc lấy nhau chứ không phải bảy mục ngang hàng. Hàng tiêu đề cột
// đứng yên phía trên, và chính việc các hàng trôi dần sang phải dưới nó là thứ
// diễn đạt chiều sâu mà một bảng kẻ ô vuông vắn không nói được.
//
// Màu viền trái của mỗi hàng nội suy trên chính dải sáu tầng của trang. Dải ấy
// mang một ý nghĩa duy nhất ở mọi nơi nó xuất hiện: vị trí trong một chuỗi có
// thứ tự. Ở sơ đồ đầu trang thứ tự ấy là tầng dữ liệu, ở đây là độ sâu của lớp
// bảo vệ.

import type { CSSProperties } from 'react'
import { LOP_HOP_CAT, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

const LUOI_COT = 'sm:grid-cols-[2.5rem_11rem_1fr_4.5rem]'

/** Nội suy màu của lớp trên dải sáu bậc, từ bậc đầu tới bậc cuối. */
function mau_lop(thu_tu: number, tong_so: number): string {
  const ti_le = tong_so > 1 ? (thu_tu / (tong_so - 1)) * 100 : 0
  return `color-mix(in oklab, var(--tang-6) ${ti_le}%, var(--tang-1))`
}

export function BangHopCat() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="mt-16 max-w-[60rem]">
      <h4 className="hien cho-hien max-w-[46ch] text-[1.1rem] font-semibold">
        {chu(NHAN.nhan_hop_cat)}
      </h4>

      <div
        className={`ma mt-6 hidden gap-x-5 pb-2 text-[0.7rem] text-chu-mo sm:grid ${LUOI_COT}`}
      >
        <span>{chu(NHAN.cot_lop)}</span>
        <span>{chu(NHAN.cot_cach)}</span>
        <span>{chu(NHAN.cot_chan)}</span>
        <span className="sm:text-right">{chu(NHAN.cot_ma)}</span>
      </div>

      <ol className="space-y-1.5">
        {LOP_HOP_CAT.map((lop, thu_tu) => (
          <li
            key={lop.so}
            className="hang-lop cho-hien rounded-r-md bg-be-mat py-3 pl-4"
            style={
              {
                '--muc-thut': thu_tu,
                '--mau-lop': mau_lop(thu_tu, LOP_HOP_CAT.length),
                transitionDelay: `${thu_tu * 70}ms`,
              } as CSSProperties
            }
          >
            <div className={`grid gap-x-5 gap-y-1 sm:items-baseline ${LUOI_COT}`}>
              <span
                className="so-lieu text-[0.95rem]"
                style={{ color: mau_lop(thu_tu, LOP_HOP_CAT.length) }}
              >
                {lop.so}
              </span>
              <span className="ma text-[0.82rem] font-medium">{chu(lop.cach)}</span>
              <span className="text-[0.9rem] leading-snug text-chu-mo">{chu(lop.chan)}</span>
              <span className="ma text-[0.76rem] text-chu-mo sm:text-right">{lop.ma_loi}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
