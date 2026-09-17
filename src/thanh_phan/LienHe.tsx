// Phần liên hệ.
//
// Địa chỉ thư đặt cỡ lớn vì đó là hành động duy nhất trang này muốn người xem
// thực hiện. Không có biểu mẫu: một biểu mẫu liên hệ trên trang cá nhân chỉ
// thêm một chặng có thể hỏng, trong khi người tuyển dụng nào cũng đã có sẵn
// hộp thư mở trước mặt.

import { LIEN_HE, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function LienHe() {
  const { chu } = dung_ngon_ngu()

  return (
    <div>
      <p className="cho-hien max-w-[52ch] text-[1.15rem] leading-relaxed">{chu(LIEN_HE.loi_moi)}</p>

      <a
        href={`mailto:${LIEN_HE.email}`}
        className="hien-lon lien-ket cho-hien mt-8 inline-block text-[clamp(1.5rem,5vw,3rem)]"
      >
        {LIEN_HE.email}
      </a>

      <h3 className="ma cho-hien mt-14 text-[0.75rem] text-chu-mo">{chu(NHAN.nhan_theo_doi)}</h3>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LIEN_HE.kenh.map((kenh, thu_tu) => (
          <li key={kenh.ten} className="cho-hien" style={{ transitionDelay: `${thu_tu * 80}ms` }}>
            <a
              href={kenh.dia_chi}
              target="_blank"
              rel="noreferrer"
              className="the-noi block rounded-xl px-5 py-4 transition-colors hover:border-vien-ro"
            >
              <span
                className="ma block text-[0.72rem]"
                style={{ color: `var(--tang-${thu_tu + 2})` }}
              >
                {kenh.ten}
              </span>
              <span className="hien mt-1.5 block text-[0.98rem] font-medium">{kenh.nhan}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
