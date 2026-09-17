// Dải kết quả, đặt ngay dưới phần mở đầu và trước mọi đoạn chữ.
//
// Đây là tầng đọc nông nhất của trang. Người lướt dừng ở đây là đã nắm được
// toàn bộ câu chuyện bốn năm mà không phải đọc câu nào.
//
// Vẽ thành một bảng liền chia ô bằng đường kẻ mảnh, chứ không phải tám cái thẻ
// bo góc rời nhau. Lý do có hai: trang đã dùng thẻ bo góc cho dự án và kỹ năng,
// thêm tám cái nữa là cả trang thành một rổ thẻ giống hệt nhau; và quan trọng
// hơn, một bảng chỉ số chia ô chính là hình dạng của cái dashboard mà người này
// dựng hằng ngày, nên nó nói đúng nghề.
//
// Đường kẻ tạo bằng khe hở một điểm ảnh trên nền màu viền, chứ không phải viền
// từng ô. Cách này tự đúng ở mọi số cột, còn viền từng ô thì cứ đổi điểm ngắt
// là phải ngồi tắt viền thừa ở ô cuối hàng.

import { CHUYEN_BIEN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { DemSo } from './DemSo.tsx'
import { MuiTenChieu } from './MuiTenChieu.tsx'

export function ChuyenBien() {
  const { chu, chu_tho } = dung_ngon_ngu()

  return (
    <div className="the-noi cho-hien overflow-hidden rounded-xl">
      <dl
        className="grid grid-cols-2 gap-px sm:grid-cols-4"
        style={{ backgroundColor: 'var(--vien)' }}
      >
        {CHUYEN_BIEN.map((muc, thu_tu) => (
          <div key={muc.nhan.vi} className="min-w-0 bg-be-mat px-4 py-5 sm:px-5">
            <div className="flex items-center justify-between gap-2">
              <p className="ma text-[0.66rem] text-chu-mo opacity-70">{muc.noi}</p>
              <MuiTenChieu
                chieu={muc.chieu}
                className="h-4 w-4 shrink-0 text-chu-mo opacity-55"
              />
            </div>

            {/* items-end cộng chiều cao tối thiểu: ô nào cặp trước và sau phải
                xuống hai dòng thì con số vẫn tì xuống cùng một đáy với ô một
                dòng, nên hàng nhãn bên dưới thẳng nhau suốt cả lưới. */}
            <dd className="mt-3 flex min-h-[4rem] flex-wrap items-end gap-x-2.5 gap-y-1">
              {/* Mức cũ chiếm trọn một dòng riêng chứ không đứng cùng dòng với
                  mức mới. Để chung dòng thì ô nào chữ ngắn sẽ không xuống dòng,
                  ô nào chữ dài thì xuống, và hai ô cạnh nhau trông lệch hẳn. */}
              {muc.truoc !== undefined && (
                <span className="flex w-full items-center gap-2">
                  <span className="so-lieu text-[0.95rem] text-chu-mo opacity-55">
                    {chu(muc.truoc)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-4 shrink-0"
                    style={{ background: 'linear-gradient(90deg, var(--chu-mo), var(--nhan))' }}
                  />
                </span>
              )}
              {/* Đếm lệch nhau 90ms một ô, nên tám con số chạy thành một đợt
                  sóng từ trái sang. Mắt bắt được thứ đang đổi trước thứ đứng
                  yên, và đợt sóng ấy kéo người đọc đi hết cả dải. */}
              <DemSo
                dich={chu_tho(muc.sau)}
                tre={thu_tu * 90}
                className="so-lieu so-noi-bat block text-[clamp(1.5rem,3.2vw,2.1rem)] leading-none font-semibold text-nhan"
              />
            </dd>

            <dt className="mt-2.5 text-[0.82rem] leading-snug text-chu-mo">{chu(muc.nhan)}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}
