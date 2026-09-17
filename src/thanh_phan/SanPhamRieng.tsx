// Khối nhỏ cho sản phẩm cá nhân, đặt cuối mục dự án.
//
// Nó không nằm trong CV nên không được chiếm chỗ ngang một dự án đi làm, nhưng
// cũng không bỏ được: đây là thứ duy nhất trên trang mà người đọc bấm vào là
// dùng thử được ngay, thay vì chỉ đọc lời kể.

import { DAPRACTICE, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function SanPhamRieng() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="cho-hien the-noi mt-6 rounded-xl p-5 sm:p-6">
      <p className="ma text-[0.7rem] text-chu-mo">{chu(NHAN.nhan_san_pham_rieng)}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="text-[1.15rem] font-semibold">{chu(DAPRACTICE.ten)}</h3>
        <a
          href={DAPRACTICE.lien_ket.dia_chi}
          target="_blank"
          rel="noreferrer"
          className="ma text-[0.8rem] underline underline-offset-4"
          style={{ color: 'var(--nhan)' }}
        >
          {chu(DAPRACTICE.lien_ket.nhan)}
        </a>
      </div>
      <p className="mt-2 max-w-[72ch] leading-relaxed text-chu-mo">{chu(DAPRACTICE.mo_ta)}</p>
    </div>
  )
}
