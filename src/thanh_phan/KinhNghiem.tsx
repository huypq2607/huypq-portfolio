// Kinh nghiệm làm việc. Mỗi nơi một khối, trong khối có thể có nhiều vai trò.
//
// Vai trò tách riêng vì ở VETC là hai vai trò song song, phân tích và kỹ thuật
// dữ liệu, và hai bên kể hai loại việc khác hẳn nhau. Gộp thành một danh sách
// dài thì người đọc mất ranh giới đó, mà chính ranh giới ấy là điều đáng nói.
//
// Mỗi việc in làm ba cột: hình vẽ theo nghĩa của việc, con số của kết quả, rồi
// chữ. Nhà tuyển dụng lướt mắt dọc cột con số là đọc được toàn bộ phần kết quả
// mà không phải đọc câu nào; cột chữ chỉ đọc khi họ muốn biết làm thế nào.
//
// Con số đứng riêng một cột nên câu kết quả KHÔNG lặp lại nó nữa, mà thành một
// mệnh đề đọc nối vào con số: "−30%" rồi "thời gian làm báo cáo mỗi tuần".
// Việc nào không đo được thành con số thì cột ấy để trống, không đặt dấu gạch,
// vì dấu gạch đọc ra thành "chỗ này chưa điền".
//
// Cả khối một nơi làm việc được một sống dọc ở lề trái ôm lấy, chạy từ dòng tên
// công ty xuống hết gạch cuối cùng. Không có nó thì tên công ty cách thẻ của
// chính nó xa hơn cách khối phía trên, và mắt gom nhầm tên vào khối trên.

import type { Kinh_nghiem } from '../../noi_dung/kieu.ts'
import { KINH_NGHIEM, NHAN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'
import { BieuTuongViec } from './BieuTuongViec.tsx'
import { DemSo } from './DemSo.tsx'
import { SoDoQuyTrinh } from './SoDoQuyTrinh.tsx'

function MotNoi({ noi }: { noi: Kinh_nghiem }) {
  const { chu, chu_tho } = dung_ngon_ngu()

  return (
    <article className="cho-hien song-khoi relative pl-5 sm:pl-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="hien-lon text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold">
          {chu(noi.cong_ty)}
        </h3>
        <p className="ma text-[0.78rem] text-chu-mo">{chu(noi.thoi_gian)}</p>
      </div>
      <p className="ma mt-1 text-[0.85rem]" style={{ color: 'var(--nhan)' }}>
        {chu(noi.chuc_danh)}
      </p>

      {noi.so_lieu !== undefined && (
        <dl className="the-noi mt-6 grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-3">
          {noi.so_lieu.map((muc) => (
            <div key={muc.nhan.vi} className="border-vien px-4 py-4 not-last:border-r odd:border-r">
              <dt className="sr-only">{chu_tho(muc.nhan)}</dt>
              <dd>
                <DemSo dich={chu_tho(muc.so)} className="so-lieu block text-[1.7rem] leading-none" />
                <span className="mt-1.5 block text-[0.78rem] leading-snug text-chu-mo">
                  {chu(muc.nhan)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Nơi nào khai dây chuyền thì vẽ dây chuyền của chính nơi ấy. Hỏi dữ
          liệu chứ không hỏi mã nơi làm việc: thêm một nơi mới có dây chuyền
          thì hình tự hiện, không phải nhớ quay lại sửa một điều kiện ở đây. */}
      {noi.quy_trinh !== undefined && (
        <div className="mt-5">
          <SoDoQuyTrinh chang={noi.quy_trinh} />
        </div>
      )}

      <div className="mt-7 space-y-7">
        {noi.vai_tro.map((vai, thu_tu) => (
          <div key={vai.ten?.vi ?? thu_tu}>
            {vai.ten !== undefined && (
              <h4 className="ma mb-3 text-[0.78rem] tracking-wide text-chu-mo">{chu(vai.ten)}</h4>
            )}
            {/* Kết quả đứng TRÊN, việc làm đứng dưới.
                Người lướt đọc dòng đầu của mỗi gạch rồi đi tiếp, nên dòng đầu
                phải là thứ đáng đọc nhất. Để việc làm lên trước thì họ đọc mất
                năm dòng mô tả kỹ thuật rồi mới tới chỗ nói nó đổi được gì, và
                phần lớn sẽ bỏ đi trước khi tới đó. */}
            {/* Ba cột từ sm trở lên: hình, con số, chữ. Dưới sm chỉ còn hai,
                vì cột con số rộng 5rem cộng cột hình thì phần chữ chỉ còn hơn
                một trăm điểm ảnh, không đủ cho một dòng tiếng Việt nào. Khi ấy
                con số tụt xuống nằm ngay trên câu kết quả của chính nó. */}
            <ul>
              {vai.viec.map((viec, i) => (
                <li
                  key={i}
                  className="o-viec group grid grid-cols-[2.1rem_minmax(0,1fr)] items-start gap-x-3 border-t border-vien py-4 first:border-t-0 sm:grid-cols-[2.1rem_5rem_minmax(0,1fr)] sm:gap-x-4"
                >
                  {viec.hinh === undefined ? (
                    <span aria-hidden="true" className="mt-1.5 ml-2 block h-1.5 w-1.5 rounded-full bg-chu-mo opacity-60" />
                  ) : (
                    <BieuTuongViec
                      ma={viec.hinh}
                      className="mt-0.5 h-[1.6rem] w-[1.6rem] text-chu-mo opacity-90 transition-colors duration-200 group-hover:text-nhan"
                    />
                  )}

                  {/* Con số chỉ chiếm cột riêng từ sm. Dưới sm nó nằm trong cùng
                      ô với chữ, ngay phía trên câu kết quả. */}
                  {viec.so !== undefined && (
                    <p className="col-start-2 text-[1.15rem] leading-tight font-semibold text-nhan sm:col-start-auto sm:text-right sm:text-[1.2rem]">
                      {chu(viec.so)}
                    </p>
                  )}
                  {viec.so === undefined && <span className="hidden sm:block" />}

                  <div className="col-start-2 min-w-0 sm:col-start-auto">
                    {viec.ket_qua !== undefined && (
                      <p className="text-[1rem] leading-snug font-semibold">{chu(viec.ket_qua)}</p>
                    )}
                    <p
                      className={
                        viec.ket_qua === undefined
                          ? 'max-w-[68ch] leading-relaxed'
                          : 'mt-1.5 max-w-[68ch] text-[0.88rem] leading-relaxed text-chu-mo'
                      }
                    >
                      {chu(viec.lam)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {noi.ngan_xep !== undefined && (
        <div className="mt-7">
          <p className="ma text-[0.72rem] text-chu-mo">{chu(NHAN.nhan_ngan_xep)}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {noi.ngan_xep.map((ten) => (
              <li
                key={ten}
                className="ma rounded-md border border-vien px-2 py-0.5 text-[0.72rem] text-chu-mo"
              >
                {ten}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

export function KinhNghiem() {
  return (
    <div className="space-y-14 sm:space-y-20">
      {KINH_NGHIEM.map((noi) => (
        <MotNoi key={noi.ma} noi={noi} />
      ))}
    </div>
  )
}
