// Ba nhóm công cụ.
//
// Cố ý không có thanh phần trăm hay số sao tự chấm: không ai đọc được "Spark
// 80 phần trăm" mà biết thêm điều gì, và tự cho mình điểm trên trang giới
// thiệu là thứ người phỏng vấn sẽ vặn lại đầu tiên.

import { KY_NANG } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function KyNang() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {KY_NANG.map((nhom, thu_tu) => (
        <div
          key={nhom.ten.en}
          className="the-noi cho-hien rounded-xl p-6"
          style={{ transitionDelay: `${thu_tu * 90}ms` }}
        >
          <h3 className="hien text-[1.05rem] font-semibold">{chu(nhom.ten)}</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {nhom.muc.map((ten) => (
              <li
                key={ten}
                className="ma rounded-md border border-vien bg-be-mat-cao px-2.5 py-1 text-[0.76rem] text-chu-mo"
              >
                {ten}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
