// Sơ đồ sáu tầng của lakehouse, đặt ngay dưới phần mở đầu.
//
// Đây là hình đầu tiên người xem gặp, và nó cố ý không phải một con số to kèm
// nhãn nhỏ như mọi trang giới thiệu khác. Thứ đặc trưng nhất trong công việc
// này là dữ liệu chảy qua các tầng, nên trang mở bằng đúng hình đó.
//
// Chiều cao cột tỷ lệ THẲNG với số model. Tầng landing chỉ có 3 model nên cột
// của nó gần như một vạch, và đó là sự thật đáng thấy chứ không phải khuyết
// điểm của hình: tầng ấy hầu hết chỉ khai báo nguồn.
//
// Hai bố cục cho hai khổ màn hình. Màn rộng vẽ cột đứng chạy từ trái sang
// phải. Màn hẹp chuyển thành danh sách dọc với thanh ngang, vì sáu cột nhồi
// vào ba trăm điểm ảnh thì nhãn tầng nào cũng vỡ chữ. Ép người xem cuộn ngang
// để đọc một sơ đồ là cách chắc chắn khiến họ bỏ qua nó.

import { NHAN, TANG_DU_LIEU } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

const SO_MODEL_LON_NHAT = Math.max(...TANG_DU_LIEU.map((tang) => tang.so_model))

/** Phần trăm chiều dài của thanh, có sàn để tầng nhỏ nhất vẫn nhìn thấy được. */
function ti_le_thanh(so_model: number): string {
  return `${Math.max((so_model / SO_MODEL_LON_NHAT) * 100, 1.6)}%`
}

/** Độ trễ để các tầng dựng lên lần lượt theo hướng dữ liệu chảy. */
function do_tre(thu_tu: number): string {
  return `${260 + thu_tu * 170}ms`
}

export function SoDoTang() {
  const { chu } = dung_ngon_ngu()

  return (
    <section className="mx-auto max-w-[76rem] px-5 pt-10 pb-6 sm:px-8 sm:pt-12 sm:pb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-duong pb-2">
        <h2 className="hien text-[0.95rem] text-muc-mo">{chu(NHAN.so_do_tang)}</h2>
        <p className="hien text-[0.78rem] text-muc-mo">{chu(NHAN.nhan_truc_model)}</p>
      </div>

      {/* Bố cục màn rộng: cột đứng, dữ liệu chảy từ trái sang phải */}
      <div className="mt-7 hidden md:block">
        <div className="grid grid-cols-6 items-end gap-x-4 h-28">
          {TANG_DU_LIEU.map((tang, thu_tu) => (
            <div
              key={tang.ma}
              className="cot-tang w-[66%]"
              style={{ height: ti_le_thanh(tang.so_model), animationDelay: do_tre(thu_tu) }}
            />
          ))}
        </div>

        <div className="relative h-px bg-duong">
          <div className="duong-chay absolute inset-0 bg-dong" />
        </div>

        <div className="grid grid-cols-6 gap-x-4">
          {TANG_DU_LIEU.map((tang, thu_tu) => (
            <div key={tang.ma}>
              <div
                className="nut-tang -mt-[3px] h-[7px] w-[7px] rounded-full bg-dong"
                style={{ animationDelay: do_tre(thu_tu) }}
              />
              <p className="so-lieu mt-3 text-[1.5rem] leading-none">{tang.so_model}</p>
              <p className="hien mt-1.5 text-[0.9rem] font-semibold">{tang.ma}</p>
              <p className="mt-1 text-[0.78rem] leading-snug text-muc-mo">{chu(tang.vai_tro)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bố cục màn hẹp: danh sách dọc, dữ liệu chảy từ trên xuống */}
      <ul className="relative mt-7 space-y-5 border-l border-duong pl-5 md:hidden">
        {TANG_DU_LIEU.map((tang, thu_tu) => (
          <li key={tang.ma} className="relative">
            <div
              className="nut-tang absolute top-[0.55rem] -left-[1.4rem] h-[7px] w-[7px] rounded-full bg-dong"
              style={{ animationDelay: do_tre(thu_tu) }}
            />
            <div className="flex items-baseline gap-3">
              <span className="hien text-[0.95rem] font-semibold">{tang.ma}</span>
              <span className="so-lieu text-[1.05rem] text-muc-mo">{tang.so_model}</span>
              <span className="text-[0.75rem] text-muc-mo">{chu(NHAN.nhan_model)}</span>
            </div>
            <div className="mt-2 h-[6px] w-full bg-giay-sau">
              <div
                className="cot-tang h-full origin-left"
                style={{
                  width: ti_le_thanh(tang.so_model),
                  animationDelay: do_tre(thu_tu),
                  animationName: 'chay-duong',
                }}
              />
            </div>
            <p className="mt-2 text-[0.85rem] leading-snug text-muc-mo">{chu(tang.vai_tro)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
