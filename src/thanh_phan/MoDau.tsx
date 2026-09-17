// Phần mở đầu.
//
// Hai lớp nền nằm dưới cùng: một lưới mảnh bị che mờ dần về phía dưới, và một
// quầng sáng đi theo con trỏ. Quầng sáng tắt hẳn ở nền sáng và trên thiết bị
// cảm ứng, vì trên nền trắng nó chỉ thành vệt xám bẩn, còn trên màn cảm ứng nó
// nhảy giật theo ngón tay đang cuộn.
//
// Chuỗi mở màn chạy một lần lúc tải: từng khối dựng lên lần lượt theo đúng thứ
// tự người ta đọc. Không khối nào lộ ra lần thứ hai khi cuộn ngược lại.
//
// Thứ tự khối ĐỔI theo khổ màn hình, và đó là lựa chọn chứ không phải hệ quả
// của lưới. Trên màn rộng, ảnh và hồ sơ đứng thành một cột bên phải, ngang tầm
// mắt với tiêu đề. Trên điện thoại, nếu giữ nguyên thứ tự ấy thì khuôn mặt bị
// đẩy xuống dưới hai đoạn văn, tức người xem phải cuộn qua gần một màn hình
// mới thấy mình đang đọc về ai. Nên ở màn hẹp, ảnh và hồ sơ chen lên ngay sau
// câu định vị, trước phần giới thiệu dài.

import { useEffect, useRef } from 'react'
import {
  CHUC_DANH,
  DAN_GIAI,
  HO_SO,
  KHAU_HIEU,
  NHAN,
} from '../../noi_dung/noi_dung.ts'
import { theo_doi_con_tro } from '../hieu_ung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

/** Độ trễ của từng khối trong chuỗi mở màn, tính bằng mili giây. */
const TRE = {
  chuc_danh: 0,
  khau_hieu: 90,
  anh: 150,
  dan_giai: 230,
  gioi_thieu: 320,
  ho_so: 400,
} as const

export function MoDau() {
  const { chu, chu_tho } = dung_ngon_ngu()
  const vung = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (vung.current === null) return
    return theo_doi_con_tro(vung.current)
  }, [])

  return (
    <section id="dau-trang" ref={vung} className="relative overflow-hidden">
      <div className="luoi-nen pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="quang-theo-con-tro pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[78rem] px-5 pt-12 pb-10 sm:px-8 sm:pt-20 sm:pb-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <p
              className="ma mo-man text-[0.78rem] tracking-wide text-nhan"
              style={{ animationDelay: `${TRE.chuc_danh}ms` }}
            >
              {chu(CHUC_DANH)}
            </p>

            <h1
              className="hien-lon mo-man mt-5 text-[clamp(2.4rem,7.4vw,5.4rem)] text-balance"
              style={{ animationDelay: `${TRE.khau_hieu}ms` }}
            >
              {chu(KHAU_HIEU)}
            </h1>

            <p
              className="mo-man mt-6 max-w-[34ch] text-[clamp(1.08rem,2vw,1.45rem)] leading-[1.5]"
              style={{ animationDelay: `${TRE.dan_giai}ms` }}
            >
              {chu(DAN_GIAI)}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:justify-self-end">
            {/* Viền ảnh tô bằng chính dải sáu tầng, nên khung ảnh cũng là một
                lần nhắc lại bảng màu chứ không phải một đường viền bất kỳ. */}
            <div
              className="mo-man w-full max-w-[15rem] rounded-2xl p-px lg:w-72 lg:max-w-none"
              style={{
                animationDelay: `${TRE.anh}ms`,
                background:
                  'linear-gradient(150deg, var(--tang-1), var(--tang-3) 45%, var(--tang-6))',
              }}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet="/chan_dung_400.webp 400w, /chan_dung_800.webp 800w"
                  sizes="(min-width: 1024px) 18rem, 15rem"
                />
                <img
                  src="/chan_dung_400.jpg"
                  srcSet="/chan_dung_400.jpg 400w, /chan_dung_800.jpg 800w"
                  sizes="(min-width: 1024px) 18rem, 15rem"
                  width={400}
                  height={400}
                  alt={chu_tho(NHAN.anh_chan_dung)}
                  className="block w-full rounded-2xl"
                />
              </picture>
            </div>

            <dl className="mo-man mt-7 w-full lg:w-72" style={{ animationDelay: `${TRE.ho_so}ms` }}>
              {HO_SO.map((dong, thu_tu) => (
                <div
                  key={dong.nhan.en}
                  className="border-t border-vien py-3 first:border-t-0 first:pt-0"
                >
                  <dt className="ma text-[0.7rem] text-chu-mo">{chu(dong.nhan)}</dt>
                  <dd className="mt-1 flex items-start gap-2 text-[0.94rem] leading-snug">
                    {/* Chấm nhịp chỉ gắn cho dòng cuối, dòng nói về việc sẵn
                        sàng nhận vị trí mới. Đó là dòng duy nhất mô tả một
                        trạng thái đang diễn ra. */}
                    {thu_tu === HO_SO.length - 1 && (
                      <span
                        className="nhip-song mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: 'var(--tang-3)' }}
                        aria-hidden="true"
                      />
                    )}
                    <span>{chu(dong.gia_tri)}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
