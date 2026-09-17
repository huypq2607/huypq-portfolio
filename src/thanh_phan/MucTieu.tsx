// Mục tiêu nghề nghiệp. Ba câu, đặt ngay sau phần mở đầu.
//
// Cỡ chữ lớn hơn chữ thường một bậc và bề ngang giới hạn dưới 62 ký tự: đây là
// đoạn duy nhất trên trang người đọc sẽ đọc trọn từ đầu tới cuối, nên nó phải
// dễ đọc hơn mọi đoạn khác chứ không chỉ dài hơn.

import { MUC_TIEU } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function MucTieu() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="cho-hien max-w-[62ch] space-y-5 text-[1.05rem] leading-relaxed text-chu-mo">
      {MUC_TIEU.map((cau, thu_tu) => (
        // Thứ tự là khoá ổn định vì danh sách này tĩnh và không bao giờ đảo.
        <p key={thu_tu}>{chu(cau)}</p>
      ))}
    </div>
  )
}
