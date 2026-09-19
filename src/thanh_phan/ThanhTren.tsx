// Thanh đầu trang: tên, các mục nhảy nhanh, nút đổi nền, và một vạch tiến độ
// cuộn tô bằng chính dải sáu tầng.
//
// Đây là bề mặt kính DUY NHẤT của cả trang, và HIG chỉ cho phép kính ở đúng
// tầng điều khiển như thanh này. Nội dung trôi bên dưới nó chứ không dừng lại ở
// mép thanh, nên phần chữ đi qua được nhìn thấy mờ qua lớp kính.
//
// Vạch tiến độ vừa cho biết đang ở đâu trong trang, vừa nhắc lại bảng màu mà
// không phải thêm một mảng trang trí nào. Nó chỉ tồn tại được vì dải màu ấy
// mang thông tin thật chứ không phải một dải gradient bắt mắt gắn vào cho vui.

import { useEffect, useRef } from 'react'
import { NHAN, TEN } from '../../noi_dung/noi_dung.ts'
import { theo_doi_tien_do_cuon } from '../hieu_ung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { dung_nen } from '../nen.tsx'

const MUC_NHAY = [
  { dia_chi: '#kinh-nghiem', nhan: NHAN.dieu_huong_kinh_nghiem },
  { dia_chi: '#du-an', nhan: NHAN.dieu_huong_du_an },
  { dia_chi: '#lien-he', nhan: NHAN.muc_lien_he },
] as const

function BieuTuongMatTroi() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path strokeLinecap="round" d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
    </svg>
  )
}

function BieuTuongTrang() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinejoin="round" d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
    </svg>
  )
}

export function ThanhTren() {
  const { chu, chu_tho } = dung_ngon_ngu()
  const { nen, doi_nen } = dung_nen()
  const vach = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (vach.current === null) return
    return theo_doi_tien_do_cuon(vach.current)
  }, [])

  return (
    <header className="kinh sticky top-0 z-50">
      <div className="mx-auto flex max-w-[78rem] items-center gap-4 px-5 py-3 sm:px-8">
        <a
          href="#dau-trang"
          className="hien cham-du nhan-duoc rounded-md text-[0.95rem] font-semibold whitespace-nowrap"
        >
          {TEN}
        </a>

        <nav className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {MUC_NHAY.map((muc) => (
              <li key={muc.dia_chi}>
                <a
                  href={muc.dia_chi}
                  className="cham-du nhan-duoc -my-2 inline-block rounded-md py-2 text-[0.88rem] text-chu-mo transition-colors hover:text-nhan"
                >
                  {chu(muc.nhan)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-6">
          <button
            type="button"
            onClick={doi_nen}
            aria-label={chu_tho(nen === 'toi' ? NHAN.doi_sang_nen_sang : NHAN.doi_sang_nen_toi)}
            className="cham-du nhan-duoc flex h-11 w-11 items-center justify-center rounded-full border-[0.5px] border-vien bg-be-mat text-chu-mo transition-colors hover:border-vien-ro hover:text-nhan sm:h-9 sm:w-9"
          >
            {nen === 'toi' ? <BieuTuongMatTroi /> : <BieuTuongTrang />}
          </button>
        </div>
      </div>

      <div
        ref={vach}
        className="vach-tien-do absolute inset-x-0 bottom-0 h-px"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
    </header>
  )
}
