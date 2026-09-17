// Dây chuyền sáu chặng của dự án VETC, từ bản ghi thô tới hộp thư lúc bảy giờ
// sáng và tới cảnh báo bất thường.
//
// Ở đây ĐÁNH SỐ là đúng, khác với bốn nguyên tắc làm việc ở phần dưới trang.
// Đánh số ngụ ý một trình tự, và dây chuyền này đúng là một trình tự: bỏ chặng
// làm sạch thì chặng nấu chỉ số không còn nghĩa gì. Sáu nút lấy màu từ dải sáu
// bậc của trang, vì dải ấy mang đúng một nghĩa ở mọi nơi nó xuất hiện là vị
// trí trong một chuỗi có thứ tự.
//
// Hình này cố ý KHÁC hình ở đầu trang về thể loại. Đầu trang là biểu đồ cột,
// nói về lượng. Đây là chuỗi mắt xích, nói về trình tự. Cùng bảng màu nhưng
// khác thể loại thì hai hình bổ sung cho nhau; cùng thể loại thì hình thứ hai
// chỉ làm người đọc tưởng mình đã xem rồi.

import type { CSSProperties } from 'react'
import { NHAN_QUY_TRINH, QUY_TRINH } from '../../noi_dung/quy_trinh.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

export function QuyTrinh() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="mt-16">
      <h4 className="hien cho-hien max-w-[34ch] text-[1.1rem] font-semibold">
        {chu(NHAN_QUY_TRINH.tieu_de)}
      </h4>
      <p className="cho-hien mt-4 max-w-[64ch] text-[1rem] text-chu-mo">
        {chu(NHAN_QUY_TRINH.dan_nhap)}
      </p>

      <ol className="mt-9">
        {QUY_TRINH.map((chang, thu_tu) => {
          const mau = `var(--tang-${thu_tu + 1})`
          const la_chang_cuoi = thu_tu === QUY_TRINH.length - 1

          return (
            <li
              key={chang.ma}
              className="cho-hien relative grid gap-x-6 gap-y-2 pb-9 pl-12 lg:grid-cols-12"
              style={{ transitionDelay: `${thu_tu * 80}ms` }}
            >
              {/* Sợi dây nối các nút. Chặng cuối không có dây, vì dây chạy tiếp
                  xuống khoảng trống bên dưới trông như còn chặng nữa bị cắt. */}
              {!la_chang_cuoi && (
                <span
                  className="absolute top-8 bottom-0 left-[0.9rem] w-px bg-vien"
                  aria-hidden="true"
                />
              )}

              <span
                className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full text-[0.82rem] font-bold text-nen"
                style={{ backgroundColor: mau } as CSSProperties}
                aria-hidden="true"
              >
                {thu_tu + 1}
              </span>

              <div className="lg:col-span-4">
                <h5 className="hien text-[1.05rem] leading-snug font-semibold">
                  {chu(chang.ten)}
                </h5>
                <p className="ma mt-2 inline-block rounded-md border border-vien px-2 py-0.5 text-[0.7rem] text-chu-mo">
                  {chu(chang.nhip)}
                </p>
              </div>

              <p className="max-w-[64ch] text-[0.98rem] text-chu-mo lg:col-span-8">
                {chu(chang.viec)}
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
