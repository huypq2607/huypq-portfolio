// Phần liên hệ. Địa chỉ thư đặt cỡ lớn vì đó là hành động duy nhất trang này
// muốn người xem thực hiện. Không có biểu mẫu: một biểu mẫu liên hệ trên trang
// cá nhân chỉ thêm một chặng có thể hỏng, trong khi người tuyển dụng nào cũng
// đã có sẵn hộp thư mở trước mặt.

import { LIEN_HE } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function LienHe() {
  const { chu } = dung_ngon_ngu()

  return (
    <div>
      <p className="max-w-[54ch] text-[1.15rem] leading-relaxed">{chu(LIEN_HE.loi_moi)}</p>

      <a
        href={`mailto:${LIEN_HE.email}`}
        className="hien-lon lien-ket mt-8 inline-block text-[clamp(1.4rem,4.4vw,2.6rem)]"
      >
        {LIEN_HE.email}
      </a>

      <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
        <li>
          <a href={LIEN_HE.github} target="_blank" rel="noreferrer" className="lien-ket hien">
            {LIEN_HE.github_nhan}
          </a>
        </li>
        <li>
          <a href={LIEN_HE.san_pham} target="_blank" rel="noreferrer" className="lien-ket hien">
            {LIEN_HE.san_pham_nhan}
          </a>
        </li>
      </ul>
    </div>
  )
}
