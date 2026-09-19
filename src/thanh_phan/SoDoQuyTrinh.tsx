// Sơ đồ dây chuyền dữ liệu của một nơi làm việc.
//
// Đây là hình thay cho một câu dài. Câu "lấy dữ liệu, làm sạch, dựng chỉ số,
// bảng phục vụ, báo cáo, cảnh báo" phải đọc hết mới hình dung được thứ tự;
// mấy cái chấm nối nhau thì nhìn một cái là xong.
//
// Màu lấy từ dải sáu bậc của trang, đúng thứ tự chặng. Dải ấy có mặt để mã hoá
// vị trí trong một chuỗi, nên gán nó theo thứ tự chạy thật là dùng đúng việc:
// đảo hai chặng trong tệp nội dung là màu trên hình đảo theo, hình không bao
// giờ nói khác dữ liệu.
//
// Dây chuyền truyền vào từ ngoài chứ không đọc một hằng cố định, vì mỗi nơi
// làm việc có dây chuyền riêng và số chặng không bằng nhau. Bậc màu vì thế
// phải TRẢI theo số chặng thật: gán cứng một tới sáu thì dây chuyền năm chặng
// dừng ở giữa dải, đứng cạnh dây chuyền sáu chặng trông như bị cắt cụt.

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Chang } from '../../noi_dung/kieu.ts'
import { NHAN } from '../../noi_dung/noi_dung.ts'
import { BieuTuongChang } from './BieuTuongChang.tsx'
import { giam_chuyen_dong } from '../hieu_ung.ts'
import { bac_mau } from '../mau.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function SoDoQuyTrinh({ chang: cac_chang }: { chang: readonly Chang[] }) {
  const { chu } = dung_ngon_ngu()
  const tham_chieu = useRef<HTMLDivElement | null>(null)
  const [da_chay, dat_da_chay] = useState(false)

  // Vệt sáng chạy đúng một lần, khi sơ đồ lọt vào tầm mắt. Không lặp: một thứ
  // nhấp nháy mãi ở giữa trang là thứ người đọc phải cố lờ đi mới đọc tiếp
  // được, và nó không nói thêm điều gì sau lần chạy đầu.
  useEffect(() => {
    const phan_tu = tham_chieu.current
    if (phan_tu === null) return
    if (giam_chuyen_dong()) {
      dat_da_chay(true)
      return
    }

    const theo_doi = new IntersectionObserver(
      (cac_muc) => {
        if (!cac_muc.some((m) => m.isIntersecting)) return
        theo_doi.disconnect()
        dat_da_chay(true)
      },
      { threshold: 0.35 },
    )
    theo_doi.observe(phan_tu)
    return () => theo_doi.disconnect()
  }, [])

  return (
    <div ref={tham_chieu} className="the-noi min-w-0 p-5 sm:p-6">
      <p className="ma text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_quy_trinh)}</p>

      {/* Trên màn hẹp các chặng xếp dọc, trên màn rộng xếp ngang. Ngang mà nhồi
          năm sáu cột vào 320px thì mỗi cột còn dăm chục điểm ảnh, không đủ cho
          một chữ nào của tiếng Việt. */}
      <ol
        className="mt-5 grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-[repeat(var(--so-chang),minmax(0,1fr))]"
        style={{ '--so-chang': cac_chang.length } as CSSProperties}
      >
        {cac_chang.map((chang, thu_tu) => {
          const mau = `var(--tang-${bac_mau(thu_tu, cac_chang.length)})`
          return (
            <li
              key={chang.ma}
              className="relative grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-3.5 md:block"
            >
              {/* Đường nối chạy từ chấm này sang chấm sau. Chặng cuối không có
                  đường, vì sau nó không còn gì nữa.

                  Hai bản: ngang khi các chặng xếp một hàng, dọc khi chúng xếp
                  chồng trên màn hẹp. Thiếu bản dọc thì trên điện thoại sáu chấm
                  rời nhau trông như một danh sách, mà điều cần thấy là dữ liệu
                  đi theo một chiều.

                  Bản dọc chạy đúng tâm vòng tròn, nên ở màn hẹp chữ phải nằm
                  sang cột bên phải chứ không được nằm ngay dưới vòng tròn.
                  Nằm dưới thì đường kẻ xuyên thẳng qua tên chặng và dòng nhịp. */}
              {thu_tu < cac_chang.length - 1 && (
                <>
                  <span
                    aria-hidden="true"
                    className={`absolute top-[1.12rem] left-10 hidden h-px md:block ${da_chay ? 'duong-chay' : ''}`}
                    style={{
                      right: '-0.75rem',
                      background: `linear-gradient(90deg, ${mau}, var(--tang-${bac_mau(thu_tu + 1, cac_chang.length)}))`,
                      opacity: 0.55,
                      animationDelay: `${thu_tu * 120}ms`,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-10 -bottom-[1.25rem] left-[1.12rem] w-px md:hidden"
                    style={{
                      background: `linear-gradient(180deg, ${mau}, var(--tang-${bac_mau(thu_tu + 1, cac_chang.length)}))`,
                      opacity: 0.5,
                    }}
                  />
                </>
              )}

              {/* Biểu tượng nằm trong một ô tròn có viền cùng màu bậc. Ô tròn
                  giữ vai trò cái chấm cũ, tức điểm neo của đường nối, còn hình
                  bên trong nói chặng này làm gì. */}
              <span
                className={`relative flex h-9 w-9 items-center justify-center rounded-full border ${da_chay ? 'nut-tang' : ''}`}
                style={{
                  color: mau,
                  borderColor: mau,
                  backgroundColor: 'var(--be-mat)',
                  boxShadow: `0 0 18px -6px ${mau}`,
                  animationDelay: `${thu_tu * 120}ms`,
                }}
              >
                <BieuTuongChang ma={chang.ma} className="h-[1.15rem] w-[1.15rem]" />
              </span>

              {/* Chốt cứng chiều cao hai dòng khi xếp ngang, để dòng nhịp chạy
                  bên dưới luôn bắt đầu cùng một độ cao dù tên chặng dài ngắn
                  khác nhau. Xếp dọc thì không cần, và chừa chỗ ở đó chỉ tổ
                  thêm khoảng trắng. */}
              {/* Khoảng cách trên chỉ có ở bố cục chồng dọc. Ở bố cục cạnh
                  nhau, chữ phải bắt đầu ngang đỉnh vòng tròn. */}
              <div className="min-w-0 md:mt-3">
                <p className="text-[0.9rem] leading-snug font-medium md:min-h-[2.75em]">
                  {chu(chang.ten)}
                </p>
                <p className="ma mt-1 text-[0.7rem] text-chu-mo">{chu(chang.nhip)}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
