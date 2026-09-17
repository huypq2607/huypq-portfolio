// Ba nhóm công cụ. Cố ý không có thanh phần trăm hay số sao đánh giá: không ai
// đọc được "Spark 80 phần trăm" mà biết thêm điều gì, và tự chấm điểm mình
// trên trang giới thiệu là thứ người phỏng vấn sẽ vặn lại đầu tiên.

import { KY_NANG } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function KyNang() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-8">
      {KY_NANG.map((nhom) => (
        <div key={nhom.ten.en}>
          <h3 className="hien text-[1.05rem] font-semibold">{chu(nhom.ten)}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {nhom.muc.map((ten) => (
              <li
                key={ten}
                className="hien rounded-[2px] border border-duong px-2.5 py-1 text-[0.82rem]"
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
