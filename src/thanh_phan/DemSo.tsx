// Con số đếm lên khi lọt vào tầm mắt.
//
// Chuỗi đích là chuỗi đã định dạng sẵn, ví dụ "12.027". Ở đây bóc lấy phần
// số, đếm lên, rồi định dạng lại bằng Intl theo vùng tiếng Việt, nên dấu phân
// cách hàng nghìn trong lúc đếm không bao giờ lệch với chuỗi đích.
//
// Phần đuôi không phải chữ số, ví dụ dấu nhân trong "22×", được giữ nguyên và
// gắn lại ở cuối.

import { useEffect, useRef, useState } from 'react'
import { giam_chuyen_dong } from '../hieu_ung.ts'

const THOI_LUONG_MS = 1100

interface Tham_so {
  readonly dich: string
  readonly className?: string
}

/** Tách "12,027" thành số 12027, và "22×" thành số 22 kèm đuôi "×". */
function boc_so(chuoi: string): { so: number | null; duoi: string } {
  const khop = chuoi.match(/^([\d.,\s]+)(.*)$/)
  if (khop === null) return { so: null, duoi: '' }

  // Dấu cách ở cuối phần số phải trả về cho phần đuôi, không được nuốt mất.
  // Chuỗi "10 triệu" mà nuốt dấu cách thì lúc đếm nó hiện ra "10triệu".
  const phan_so_tho = khop[1] ?? ''
  const phan_so = phan_so_tho.replace(/\s+$/, '')
  const duoi = phan_so_tho.slice(phan_so.length) + (khop[2] ?? '')

  const chi_chu_so = phan_so.replace(/\D/g, '')
  if (chi_chu_so === '') return { so: null, duoi: '' }

  return { so: Number(chi_chu_so), duoi }
}

export function DemSo({ dich, className }: Tham_so) {
  const tham_chieu = useRef<HTMLSpanElement | null>(null)
  const [dang_hien, dat_dang_hien] = useState(dich)

  useEffect(() => {
    const phan_tu = tham_chieu.current
    const { so, duoi } = boc_so(dich)

    // Đổi ngôn ngữ là chuỗi đích đổi theo, nên đặt lại ngay chuỗi đang hiện.
    // Thiếu dòng này thì con số nằm ngoài tầm mắt không có lần đếm nào chạy để
    // cập nhật, và nó đứng nguyên bản tiếng Việt giữa trang tiếng Anh.
    dat_dang_hien(dich)

    // Chuỗi không bóc được số, hoặc người dùng đã xin giảm chuyển động: hiện
    // thẳng chuỗi đích, không đếm.
    if (phan_tu === null || so === null || giam_chuyen_dong()) return

    const dinh_dang = new Intl.NumberFormat('vi-VN')
    let ma_khung = 0

    const theo_doi = new IntersectionObserver(
      (cac_muc) => {
        if (!cac_muc.some((m) => m.isIntersecting)) return
        theo_doi.disconnect()

        const bat_dau = performance.now()
        const chay = (bay_gio: number) => {
          const tien = Math.min((bay_gio - bat_dau) / THOI_LUONG_MS, 1)
          // Chậm dần về cuối, để con số dừng lại chứ không phanh gấp.
          const diu = 1 - Math.pow(1 - tien, 3)
          dat_dang_hien(dinh_dang.format(Math.round(so * diu)) + duoi)
          if (tien < 1) ma_khung = requestAnimationFrame(chay)
        }
        ma_khung = requestAnimationFrame(chay)
      },
      { threshold: 0.4 },
    )

    theo_doi.observe(phan_tu)
    return () => {
      theo_doi.disconnect()
      if (ma_khung !== 0) cancelAnimationFrame(ma_khung)
    }
  }, [dich])

  // aria-label giữ chuỗi đích đầy đủ, vì trình đọc màn hình không nên phải
  // nghe một con số đang nhảy.
  return (
    <span ref={tham_chieu} className={className} aria-label={dich}>
      <span aria-hidden="true">{dang_hien}</span>
    </span>
  )
}
