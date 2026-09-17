// Kỹ năng chuyên môn, bốn nhóm.
//
// Cố ý không có thanh phần trăm hay số sao tự chấm: không ai đọc được "Spark
// 80 phần trăm" mà biết thêm điều gì, và tự cho mình điểm trên trang giới
// thiệu là thứ người phỏng vấn sẽ vặn lại đầu tiên.
//
// Mỗi dòng có thể có nhãn hoặc không. Nhóm công cụ thì nhãn là tên công nghệ
// và phần sau nói dùng nó làm gì; nhóm kỹ năng phân tích thì cả dòng là một
// câu trọn vẹn, thêm nhãn vào chỉ tổ cắt câu làm đôi.

import { KY_NANG } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function KyNang() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {KY_NANG.map((nhom, thu_tu) => (
        <div
          key={nhom.ten.vi}
          className="the-noi cho-hien min-w-0 rounded-xl p-5 sm:p-6"
          style={{ transitionDelay: `${thu_tu * 80}ms` }}
        >
          <h3 className="hien text-[1.02rem] font-semibold">{chu(nhom.ten)}</h3>
          <ul className="mt-4 space-y-2.5">
            {nhom.dong.map((dong, i) => (
              <li key={i} className="gach-dau-dong leading-relaxed text-chu-mo">
                {dong.nhan !== undefined && (
                  <>
                    <b className="font-semibold text-chu">{chu(dong.nhan)}</b>{' '}
                  </>
                )}
                {chu(dong.mo_ta)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
