// Những con số đã đổi được.
//
// Hai dạng nằm chung: cặp trước và sau khi đo được cả hai đầu, và một mức chênh
// khi chỉ đo được phần thay đổi. Dạng cặp vẽ mức cũ mờ đi rồi tới mức mới sáng
// lên, vì khoảng cách giữa hai bên mới là điều đáng nói, chứ không phải bản
// thân con số mới.
//
// Cố ý không dùng ký tự mũi tên làm cầu nối. Mũi tên rời trong chữ là dấu hiệu
// quen thuộc của trang dựng vội; ở đây cầu nối là một vạch kẻ thật, mảnh, tô
// chuyển từ màu chữ mờ sang màu nhấn, tức là chính nó đã kể chuyện đi từ cũ
// sang mới.

import { CHUYEN_BIEN, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function ChuyenBien() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="the-noi min-w-0 rounded-xl p-5 sm:p-6">
      <p className="ma text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_chuyen_bien)}</p>

      {/* Dải ô ngang chứ không phải danh sách dọc: ở bề ngang trọn trang, một
          danh sách dọc đẩy nhãn và con số ra hai đầu xa nhau tới mức mắt phải
          đi hết chiều ngang mới nối được cặp. */}
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
        {CHUYEN_BIEN.map((muc) => (
          <div key={muc.nhan.en} className="min-w-0">
            <dt className="text-[0.78rem] leading-snug text-chu-mo">{chu(muc.nhan)}</dt>
            <dd className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {muc.truoc !== undefined && (
                <>
                  <span className="so-lieu text-[0.9rem] text-chu-mo opacity-60">
                    {chu(muc.truoc)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-5 shrink-0 self-center"
                    style={{ background: 'linear-gradient(90deg, var(--chu-mo), var(--nhan))' }}
                  />
                </>
              )}
              <span
                className="so-lieu text-[1.2rem] leading-none font-semibold"
                style={{ color: 'var(--nhan)' }}
              >
                {chu(muc.sau)}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
