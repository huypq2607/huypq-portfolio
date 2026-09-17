// Kỹ năng chuyên môn.
//
// Ba nhóm đầu là tên công nghệ, hiện thành chip. Tên công nghệ vốn là danh từ
// riêng: đọc "Apache Iceberg" là biết, gói nó vào một câu chỉ thêm chữ mà không
// thêm nghĩa. Nhóm cuối là những điều không quy về một cái tên được, nên giữ
// nguyên dạng câu.
//
// Cố ý không có thanh phần trăm hay số sao tự chấm: không ai đọc được "Spark
// 80 phần trăm" mà biết thêm điều gì, và tự cho mình điểm trên trang giới
// thiệu là thứ người phỏng vấn sẽ vặn lại đầu tiên.

import { KY_NANG } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function KyNang() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="space-y-8">
      {KY_NANG.map((nhom, thu_tu) => (
        <section
          key={nhom.ten.vi}
          className="cho-hien grid gap-x-8 gap-y-3 border-t border-vien pt-5 lg:grid-cols-[13rem_1fr]"
          style={{ transitionDelay: `${thu_tu * 70}ms` }}
        >
          <h3 className="hien text-[1rem] leading-snug font-semibold">{chu(nhom.ten)}</h3>

          {nhom.cong_cu !== undefined && (
            <ul className="flex min-w-0 flex-wrap gap-2">
              {nhom.cong_cu.map((ten) => (
                <li
                  key={ten}
                  className="ma rounded-md border border-vien bg-be-mat px-2.5 py-1 text-[0.78rem] text-chu-mo transition-colors hover:border-vien-ro hover:text-nhan"
                >
                  {ten}
                </li>
              ))}
            </ul>
          )}

          {nhom.y !== undefined && (
            <ul className="min-w-0 space-y-2">
              {nhom.y.map((muc, i) => (
                <li key={i} className="gach-dau-dong max-w-[72ch] leading-relaxed text-chu-mo">
                  {chu(muc)}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
