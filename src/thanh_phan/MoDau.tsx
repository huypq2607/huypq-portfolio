// Phần mở đầu: câu định vị đặt rất lớn, ảnh chân dung, và bốn dòng hồ sơ.
//
// Ảnh dùng thẻ picture với hai định dạng và hai kích thước. Bản webp nhẹ hơn
// bản jpg khoảng một nửa, còn bản jpg ở lại để trình duyệt cũ không nhận được
// ô trống. Khai sẵn width và height để trình duyệt chừa đúng chỗ trước khi
// ảnh về, nếu không thì cả khối chữ bên cạnh bị đẩy một nhịp khi ảnh tải xong.

import { CHUC_DANH, DAN_GIAI, GIOI_THIEU, HO_SO, KHAU_HIEU, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function MoDau() {
  const { chu } = dung_ngon_ngu()

  return (
    <section id="dau-trang" className="mx-auto max-w-[76rem] px-5 pt-14 pb-4 sm:px-8 sm:pt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="hien text-[0.95rem] tracking-wide text-dong">{chu(CHUC_DANH)}</p>

          <h1 className="hien-lon mt-5 text-[clamp(2.7rem,7.2vw,5.1rem)] text-balance">
            {chu(KHAU_HIEU)}
          </h1>

          <p className="mt-7 max-w-[34ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.45] text-muc">
            {chu(DAN_GIAI)}
          </p>

          <div className="mt-9 max-w-[60ch] space-y-4 text-[1.02rem] text-muc-mo">
            {GIOI_THIEU.map((doan) => (
              <p key={doan.en}>{chu(doan)}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:justify-self-end">
          <picture>
            <source
              type="image/webp"
              srcSet="/chan_dung_400.webp 400w, /chan_dung_800.webp 800w"
              sizes="(min-width: 1024px) 17rem, 11rem"
            />
            <img
              src="/chan_dung_400.jpg"
              srcSet="/chan_dung_400.jpg 400w, /chan_dung_800.jpg 800w"
              sizes="(min-width: 1024px) 17rem, 11rem"
              width={400}
              height={400}
              alt={chu(NHAN.anh_chan_dung)}
              className="w-44 rounded-[2px] border border-duong lg:w-68"
            />
          </picture>

          <dl className="mt-8 w-44 lg:w-68">
            {HO_SO.map((dong) => (
              <div key={dong.nhan.en} className="border-t border-duong py-3 first:border-t-0 first:pt-0">
                <dt className="text-[0.82rem] text-muc-mo">{chu(dong.nhan)}</dt>
                <dd className="mt-0.5 text-[0.95rem] leading-snug text-muc">{chu(dong.gia_tri)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
