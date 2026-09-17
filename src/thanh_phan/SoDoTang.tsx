// Sơ đồ sáu tầng của lakehouse. Đây là hình đầu tiên người xem gặp.
//
// Cố ý không phải một con số to kèm nhãn nhỏ như mọi trang giới thiệu khác.
// Thứ đặc trưng nhất trong công việc này là dữ liệu chảy qua các tầng, nên
// trang mở bằng đúng hình đó, và bảng màu của cả trang sinh ra từ nó: dải
// chạy từ xanh băng ở tầng dữ liệu thô tới hổ phách ở tầng phục vụ nghiệp vụ.
//
// Chiều cao cột tỷ lệ THẲNG với số model. Tầng landing chỉ có 3 model nên cột
// của nó gần như một vạch, và đó là sự thật đáng thấy chứ không phải khuyết
// điểm của hình: tầng ấy hầu hết chỉ khai báo nguồn.
//
// Hai bố cục cho hai khổ màn hình. Màn rộng vẽ cột đứng chạy từ trái sang
// phải. Màn hẹp chuyển thành danh sách dọc với thanh ngang, vì sáu cột nhồi
// vào ba trăm điểm ảnh thì nhãn tầng nào cũng vỡ chữ. Ép người xem cuộn ngang
// để đọc một sơ đồ là cách chắc chắn khiến họ bỏ qua nó.

import type { CSSProperties } from 'react'
import { NHAN, TANG_DU_LIEU } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

const SO_MODEL_LON_NHAT = Math.max(...TANG_DU_LIEU.map((tang) => tang.so_model))

/** Phần trăm chiều dài của cột, có sàn để tầng nhỏ nhất vẫn nhìn thấy được. */
function ti_le(so_model: number): string {
  return `${Math.max((so_model / SO_MODEL_LON_NHAT) * 100, 1.8)}%`
}

/** Màu của tầng, lấy từ dải sáu bậc khai trong giao_dien.css. */
function mau_tang(thu_tu: number): string {
  return `var(--tang-${thu_tu + 1})`
}

/** Độ trễ để các tầng dựng lên lần lượt theo hướng dữ liệu chảy. */
function do_tre(thu_tu: number): string {
  return `${420 + thu_tu * 160}ms`
}

export function SoDoTang() {
  const { chu } = dung_ngon_ngu()

  return (
    <section className="mx-auto max-w-[78rem] px-5 pb-4 sm:px-8 sm:pb-6">
      <div className="the-noi rounded-2xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 className="hien text-[0.95rem] font-medium">{chu(NHAN.so_do_tang)}</h2>
          <p className="ma text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_truc_model)}</p>
        </div>

        {/* Bố cục màn rộng: cột đứng, dữ liệu chảy từ trái sang phải */}
        <div className="mt-8 hidden md:block">
          <div className="grid h-32 grid-cols-6 items-end gap-x-5">
            {TANG_DU_LIEU.map((tang, thu_tu) => (
              <div
                key={tang.ma}
                className="cot-tang w-[72%] rounded-t-[3px]"
                style={
                  {
                    height: ti_le(tang.so_model),
                    backgroundColor: mau_tang(thu_tu),
                    '--mau-tang': mau_tang(thu_tu),
                    animationDelay: do_tre(thu_tu),
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div className="relative h-px bg-vien">
            <div
              className="duong-chay absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, var(--tang-1), var(--tang-2), var(--tang-3), var(--tang-4), var(--tang-5), var(--tang-6))',
              }}
            />
          </div>

          <div className="grid grid-cols-6 gap-x-5">
            {TANG_DU_LIEU.map((tang, thu_tu) => (
              <div key={tang.ma}>
                <div
                  className="nut-tang -mt-[4px] h-2 w-2 rounded-full"
                  style={{ backgroundColor: mau_tang(thu_tu), animationDelay: do_tre(thu_tu) }}
                />
                <p
                  className="so-lieu mt-4 text-[1.7rem] leading-none"
                  style={{ color: mau_tang(thu_tu) }}
                >
                  {tang.so_model}
                </p>
                <p className="ma mt-2 text-[0.82rem] font-medium">{tang.ma}</p>
                <p className="mt-1.5 text-[0.78rem] leading-snug text-chu-mo">{chu(tang.vai_tro)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bố cục màn hẹp: danh sách dọc, dữ liệu chảy từ trên xuống */}
        <ul className="mt-7 space-y-5 border-l border-vien pl-5 md:hidden">
          {TANG_DU_LIEU.map((tang, thu_tu) => (
            <li key={tang.ma} className="relative">
              <div
                className="nut-tang absolute top-[0.5rem] -left-[1.45rem] h-2 w-2 rounded-full"
                style={{ backgroundColor: mau_tang(thu_tu), animationDelay: do_tre(thu_tu) }}
              />
              <div className="flex items-baseline gap-3">
                <span className="ma text-[0.85rem] font-medium">{tang.ma}</span>
                <span className="so-lieu text-[1.05rem]" style={{ color: mau_tang(thu_tu) }}>
                  {tang.so_model}
                </span>
                <span className="text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_model)}</span>
              </div>
              <div className="mt-2 h-[7px] w-full overflow-hidden rounded-full bg-be-mat-cao">
                <div
                  className="thanh-tang h-full rounded-full"
                  style={
                    {
                      width: ti_le(tang.so_model),
                      backgroundColor: mau_tang(thu_tu),
                      '--mau-tang': mau_tang(thu_tu),
                      animationDelay: do_tre(thu_tu),
                    } as CSSProperties
                  }
                />
              </div>
              <p className="mt-2 text-[0.85rem] leading-snug text-chu-mo">{chu(tang.vai_tro)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
