// Mục tiêu nghề nghiệp. Ba câu, đặt ngay sau phần mở đầu.
//
// Cỡ chữ lớn hơn chữ thường một bậc và bề ngang giới hạn dưới 62 ký tự: đây là
// đoạn duy nhất trên trang người đọc sẽ đọc trọn từ đầu tới cuối, nên nó phải
// dễ đọc hơn mọi đoạn khác chứ không chỉ dài hơn.

import { MUC_TIEU, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { DongThoiGian } from './DongThoiGian.tsx'

export function MucTieu() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="cho-hien grid gap-10 lg:grid-cols-[minmax(0,62ch)_1fr] lg:gap-16">
      <div className="space-y-5 text-[1.05rem] leading-relaxed text-chu-mo">
        {MUC_TIEU.map((cau, thu_tu) => (
          // Thứ tự là khoá ổn định vì danh sách này tĩnh và không bao giờ đảo.
          <p key={thu_tu}>{chu(cau)}</p>
        ))}
      </div>

      {/* Dòng thời gian đặt cạnh đoạn mục tiêu chứ không thành một mục riêng:
          bề ngang còn thừa ở đây vì đoạn chữ phải giữ dưới 62 ký tự một dòng,
          và bốn mốc nghề nghiệp vừa đúng chỗ trống ấy. */}
      <div className="lg:pt-1">
        <p className="ma mb-4 text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_dong_thoi_gian)}</p>
        <DongThoiGian />
      </div>
    </div>
  )
}
