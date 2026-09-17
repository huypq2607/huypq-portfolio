// Dải kết quả, đặt ngay dưới phần mở đầu và trước mọi đoạn chữ.
//
// Đây là tầng đọc nông nhất của trang. Người lướt dừng ở đây là đã nắm được
// toàn bộ câu chuyện bốn năm mà không phải đọc câu nào: con số to, nhãn nhỏ
// bên dưới, và tên nơi làm ra nó. Muốn biết làm thế nào thì cuộn tiếp.
//
// Con số đếm lên khi lọt vào tầm mắt. Đó là chuyển động có việc chứ không phải
// để cho vui: mắt bắt được thứ đang đổi trước thứ đứng yên, nên nó kéo người
// đọc tới đúng chỗ đáng đọc nhất trang.
//
// Hai dạng nằm chung: cặp trước và sau khi đo được cả hai đầu, và một mức chênh
// khi chỉ đo được phần thay đổi. Cầu nối giữa cũ và mới là một vạch kẻ thật chứ
// không phải ký tự mũi tên, vì mũi tên rời trong chữ là dấu hiệu quen thuộc của
// trang dựng vội.

import { CHUYEN_BIEN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { DemSo } from './DemSo.tsx'

export function ChuyenBien() {
  const { chu, chu_tho } = dung_ngon_ngu()

  return (
    <dl className="cho-hien grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {CHUYEN_BIEN.map((muc) => (
        <div key={muc.nhan.vi} className="min-w-0 border-t border-vien pt-4">
          {/* items-end cộng chiều cao tối thiểu: ô nào cặp trước và sau phải
              xuống hai dòng thì con số vẫn tì xuống cùng một đáy với ô một
              dòng, nên hàng nhãn bên dưới thẳng nhau suốt cả lưới. */}
          <dd className="flex min-h-[4.2rem] flex-wrap items-end gap-x-2.5 gap-y-1">
            {muc.truoc !== undefined && (
              <>
                <span className="so-lieu text-[1rem] text-chu-mo opacity-55">
                  {chu(muc.truoc)}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-5 shrink-0 self-center"
                  style={{ background: 'linear-gradient(90deg, var(--chu-mo), var(--nhan))' }}
                />
              </>
            )}
            {/* Chỉ đếm những con số thuần chữ số. "Trong ngày" hay "Giây" thì
                hiện thẳng, vì không có gì để đếm lên. */}
            <DemSo
              dich={chu_tho(muc.sau)}
              className="so-lieu block text-[clamp(1.6rem,3.4vw,2.2rem)] leading-none font-semibold text-nhan"
            />
          </dd>
          <dt className="mt-2.5 text-[0.85rem] leading-snug text-chu-mo">{chu(muc.nhan)}</dt>
          <p className="ma mt-1 text-[0.68rem] text-chu-mo opacity-70">{muc.noi}</p>
        </div>
      ))}
    </dl>
  )
}
