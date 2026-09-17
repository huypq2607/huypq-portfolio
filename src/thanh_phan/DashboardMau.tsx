// Ba khối dashboard minh hoạ: cột, tròn, đường.
//
// SỐ LIỆU LÀ SỐ MÔ PHỎNG. Dữ liệu thật của các dự án đều là dữ liệu nội bộ.
// Nhãn nói điều đó nằm ngay trên từng thẻ: một người đọc lướt mà tưởng đây là
// số thật rồi sau mới biết là số bịa thì mất niềm tin vào cả trang.
//
// Thành phần này nhận BỘ dữ liệu qua tham số chứ không đọc thẳng từ một tệp
// nội dung. Nhờ vậy mỗi dự án có bộ dashboard riêng mà vẫn chạy trên cùng một
// bộ mã vẽ. Nhân bản thành phần cho từng dự án thì lần sửa nào cũng phải nhớ
// sửa ở mấy nơi, và sẽ có lần quên.
//
// Ba thể loại hình ứng với ba việc khác nhau của dữ liệu:
//
//   Cột   một dãy giá trị              -> một sắc duy nhất, không tô theo thứ hạng
//   Tròn  các phần của một tổng        -> bảng phân loại bốn sắc, thứ tự cố định
//   Đường chuỗi thời gian có dải       -> một sắc, cộng màu trạng thái cho cảnh báo
//
// Mọi giá trị đều được ghi ra chữ bên cạnh hình, nên người dùng trình đọc màn
// hình và người in trang ra giấy vẫn đọc đủ số.

import type { ReactNode } from 'react'
import type { Bo_dashboard, Ngon_ngu } from '../../noi_dung/kieu.ts'
import { NHAN_QUY_TRINH } from '../../noi_dung/quy_trinh.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

function bo_dinh_dang(ngon_ngu: Ngon_ngu, so_le = 0): Intl.NumberFormat {
  return new Intl.NumberFormat(ngon_ngu === 'vi' ? 'vi-VN' : 'en-US', {
    minimumFractionDigits: so_le,
    maximumFractionDigits: so_le,
  })
}

function Khung({
  ten,
  nhan_so,
  gia_tri_so,
  mau_so,
  children,
}: {
  // Tiêu đề và nhãn nhận ReactNode chứ không phải chuỗi, để chúng vẫn sửa tại
  // chỗ được. Chỉ những chỗ đi vào THUỘC TÍNH mới cần chuỗi trần.
  ten: ReactNode
  nhan_so: ReactNode
  gia_tri_so: ReactNode
  mau_so?: string
  children: ReactNode
}) {
  const { chu } = dung_ngon_ngu()

  // min-w-0 vì thẻ này là một ô của lưới, mà ô lưới mặc định không được phép
  // hẹp hơn nội dung bên trong. Thiếu nó thì ở màn hình 320px, thẻ nào có nhãn
  // dài sẽ nong ô rộng ra và đẩy cả trang tràn ngang.
  return (
    <div className="the-noi flex min-w-0 flex-col rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <h5 className="hien text-[0.98rem] leading-snug font-semibold">{ten}</h5>
        <span className="ma shrink-0 rounded-md border border-vien px-2 py-0.5 text-[0.65rem] text-chu-mo">
          {chu(NHAN_QUY_TRINH.canh_bao_mo_phong)}
        </span>
      </div>

      <p className="ma mt-5 text-[0.7rem] text-chu-mo">{nhan_so}</p>
      <p
        className="so-lieu mt-1 text-[2rem] leading-none"
        style={mau_so === undefined ? undefined : { color: mau_so }}
      >
        {gia_tri_so}
      </p>

      {/* @container: bề rộng thẻ không đi theo bề rộng màn hình, vì lưới đổi từ
          một cột sang hai rồi ba cột. Biểu đồ bên trong phải xếp lại theo bề
          rộng của chính thẻ này chứ không theo điểm ngắt của trang. */}
      <div className="@container mt-6 flex-1">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Biểu đồ cột
// ---------------------------------------------------------------------------

function BieuDoCot({ cot }: { cot: Bo_dashboard['cot'] }) {
  const { ngon_ngu, chu } = dung_ngon_ngu()
  const dinh_dang = bo_dinh_dang(ngon_ngu, cot.so_le)

  const cao_nhat = Math.max(...cot.muc.map((m) => m.gia_tri))
  const cuoi = cot.muc[cot.muc.length - 1]
  if (cuoi === undefined) return null

  // Chuỗi theo thời gian thì con số đáng nói là kỳ gần nhất; các thực thể song
  // song thì là tổng. Lấy nhầm cái kia là con số nổi bật nói sai chuyện.
  const so_noi_bat =
    cot.so_noi_bat === 'tong' ? cot.muc.reduce((tong, m) => tong + m.gia_tri, 0) : cuoi.gia_tri

  return (
    <Khung
      ten={chu(cot.ten)}
      nhan_so={chu(cot.nhan_so)}
      gia_tri_so={
        <>
          {dinh_dang.format(so_noi_bat)}{' '}
          <span className="text-[0.95rem] font-medium text-chu-mo">{chu(cot.don_vi)}</span>
        </>
      }
    >
      {/* Các cột là MỘT dãy giá trị nên cùng một sắc. Tô cột cao thành màu khác
          là tô theo thứ hạng, và khi dữ liệu đổi thì màu nhảy chỗ. */}
      <ul className="flex h-full min-h-44 items-end gap-2">
        {cot.muc.map((muc) => (
          <li
            key={muc.nhan.en}
            className="flex h-full min-w-0 flex-1 flex-col justify-end"
            title={`${chu(muc.nhan)}: ${dinh_dang.format(muc.gia_tri)}`}
          >
            <span className="so-lieu mb-1.5 text-center text-[0.72rem] text-chu-mo">
              {dinh_dang.format(muc.gia_tri)}
            </span>
            <div
              className="w-full rounded-t-[4px]"
              style={{
                height: `${(muc.gia_tri / cao_nhat) * 100}%`,
                backgroundColor: 'var(--bd-1)',
              }}
            />
            {/* Nhãn chân cột xuống hai dòng chứ không cắt cụt: thẻ hẹp thì
                "Bắc khác" cắt thành "Bắc k..." là biểu đồ hết đọc được. Chiều cao
                chốt cứng để chân mọi cột vẫn thẳng hàng nhau, và chỉ chừa chỗ cho
                dòng thứ hai khi thẻ hẹp, để thẻ rộng không thừa một khoảng trống. */}
            <span className="ma mt-2 block h-[1.2em] overflow-hidden text-center text-[0.68rem] leading-[1.2] break-words text-chu-mo @max-[19rem]:h-[2.4em]">
              {chu(muc.nhan)}
            </span>
          </li>
        ))}
      </ul>
    </Khung>
  )
}

// ---------------------------------------------------------------------------
// Biểu đồ tròn
// ---------------------------------------------------------------------------

const BAN_KINH = 38
const DAY_VONG = 15
const CHU_VI = 2 * Math.PI * BAN_KINH
/** Khe hở giữa hai cung, tính theo đơn vị chu vi. Hai sắc kề nhau không dính
 *  vào nhau thành một mảng, và đó cũng là lớp mã hoá phụ cho người khó phân
 *  biệt màu. */
const KHE_HO = 3

function BieuDoTron({ tron }: { tron: Bo_dashboard['tron'] }) {
  const { ngon_ngu, chu } = dung_ngon_ngu()
  const dinh_dang = bo_dinh_dang(ngon_ngu)

  const dan_dau = tron.phan[0]
  if (dan_dau === undefined) return null

  let da_di = 0

  return (
    <Khung ten={chu(tron.ten)} nhan_so={chu(tron.nhan_so)} gia_tri_so={chu(dan_dau.ten)}>
      {/* Dưới 19rem thì chú giải nằm cạnh vòng tròn chỉ còn chừng 40px, đủ cắt
          mọi nhãn thành "Cha..." và biểu đồ hết đọc được. Hẹp thì xếp dọc. */}
      <div className="flex h-full flex-col items-center justify-center gap-4 @min-[19rem]:flex-row @min-[19rem]:gap-5">
        <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0" role="img" aria-hidden="true">
          <g transform="rotate(-90 50 50)">
            {tron.phan.map((phan, thu_tu) => {
              const dai = (phan.phan_tram / 100) * CHU_VI
              const ve = Math.max(dai - KHE_HO, 1)
              const cung = (
                <circle
                  key={phan.ten.en}
                  cx="50"
                  cy="50"
                  r={BAN_KINH}
                  fill="none"
                  stroke={`var(--bd-${thu_tu + 1})`}
                  strokeWidth={DAY_VONG}
                  strokeDasharray={`${ve} ${CHU_VI - ve}`}
                  strokeDashoffset={-da_di}
                />
              )
              da_di += dai
              return cung
            })}
          </g>
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="18"
            fontWeight="700"
            fill="currentColor"
          >
            {dinh_dang.format(dan_dau.phan_tram)}%
          </text>
        </svg>

        <ul className="w-full min-w-0 space-y-2 @min-[19rem]:w-auto @min-[19rem]:flex-1">
          {tron.phan.map((phan, thu_tu) => (
            <li key={phan.ten.en} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: `var(--bd-${thu_tu + 1})` }}
                aria-hidden="true"
              />
              <span className="truncate text-[0.82rem]">{chu(phan.ten)}</span>
              <span className="so-lieu ml-auto text-[0.82rem] text-chu-mo">
                {dinh_dang.format(phan.phan_tram)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Khung>
  )
}

// ---------------------------------------------------------------------------
// Biểu đồ đường
// ---------------------------------------------------------------------------

// Lề phải rộng hơn lề trái vì điểm cảnh báo nằm ở giá trị cuối cùng. Để lề bằng
// nhau thì bán kính của nó cộng viền tràn ra ngoài khung và bị cắt mất một nửa.
const KHUNG_VE = { rong: 300, cao: 110, trai: 4, phai: 12, tren: 10, duoi: 10 }

function toa_do_x(thu_tu: number, tong: number): number {
  return KHUNG_VE.trai + (thu_tu * (KHUNG_VE.rong - KHUNG_VE.trai - KHUNG_VE.phai)) / (tong - 1)
}

function toa_do_y(gia_tri: number, truc: { day: number; dinh: number }): number {
  const ti_le = (truc.dinh - gia_tri) / (truc.dinh - truc.day)
  return KHUNG_VE.tren + ti_le * (KHUNG_VE.cao - KHUNG_VE.tren - KHUNG_VE.duoi)
}

function BieuDoDuong({ duong }: { duong: Bo_dashboard['duong'] }) {
  const { ngon_ngu, chu, chu_tho } = dung_ngon_ngu()
  const dinh_dang = bo_dinh_dang(ngon_ngu, duong.so_le)

  const tong = duong.gia_tri.length
  const diem = duong.gia_tri[duong.diem_canh_bao]
  const truc = duong.truc_y

  const net = duong.gia_tri
    .map(
      (v, i) =>
        `${i === 0 ? 'M' : 'L'} ${toa_do_x(i, tong).toFixed(2)} ${toa_do_y(v, truc).toFixed(2)}`,
    )
    .join(' ')

  return (
    <Khung
      ten={chu(duong.ten)}
      nhan_so={chu(duong.nhan_so)}
      gia_tri_so={
        diem === undefined ? (
          ''
        ) : (
          <>
            {dinh_dang.format(diem)}
            {duong.don_vi !== undefined && (
              <span className="ml-1.5 text-[0.95rem] font-medium text-chu-mo">
                {chu(duong.don_vi)}
              </span>
            )}
          </>
        )
      }
      mau_so="var(--canh-bao)"
    >
      <svg
        viewBox={`0 0 ${KHUNG_VE.rong} ${KHUNG_VE.cao}`}
        className="block w-full"
        role="img"
        aria-label={chu_tho(duong.mo_ta)}
      >
        <rect
          x={KHUNG_VE.trai}
          y={toa_do_y(duong.tren, truc)}
          width={KHUNG_VE.rong - KHUNG_VE.trai - KHUNG_VE.phai}
          height={toa_do_y(duong.duoi, truc) - toa_do_y(duong.tren, truc)}
          fill="currentColor"
          className="text-chu-mo"
          opacity="0.14"
        />
        <line
          x1={KHUNG_VE.trai}
          y1={toa_do_y(duong.tren, truc)}
          x2={KHUNG_VE.rong - KHUNG_VE.phai}
          y2={toa_do_y(duong.tren, truc)}
          stroke="currentColor"
          className="text-chu-mo"
          strokeWidth="1"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
        <path
          d={net}
          fill="none"
          stroke="var(--bd-1)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {diem !== undefined && (
          // Vòng theo màu nền quanh điểm cảnh báo, để nó tách hẳn khỏi đường
          // thay vì chìm vào đó.
          <circle
            cx={toa_do_x(duong.diem_canh_bao, tong)}
            cy={toa_do_y(diem, truc)}
            r="5"
            fill="var(--canh-bao)"
            stroke="var(--be-mat)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.74rem] text-chu-mo">
        <span className="ma">{chu(duong.nhan_truc)}</span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-sm bg-current opacity-25" aria-hidden="true" />
          {chu(duong.nhan_dai)}
        </span>
        {/* Trạng thái không bao giờ chỉ nói bằng màu: luôn kèm biểu tượng và
            chữ, để người không phân biệt được sắc đỏ vẫn đọc ra đây là cảnh
            báo chứ không phải một điểm dữ liệu bình thường. */}
        <span
          className="ma flex items-center gap-1.5 rounded-md px-2 py-0.5 font-medium"
          style={{
            color: 'var(--canh-bao)',
            backgroundColor: 'color-mix(in oklab, var(--canh-bao) 14%, transparent)',
          }}
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
            <path d="M8 1.6 15.2 14H0.8L8 1.6Zm0 4.1a.85.85 0 0 0-.85.9l.2 3.1a.65.65 0 0 0 1.3 0l.2-3.1A.85.85 0 0 0 8 5.7Zm0 5.3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
          </svg>
          {chu(duong.trang_thai)}
        </span>
      </div>

      <p className="mt-3 text-[0.82rem] leading-snug text-chu-mo">{chu(duong.mo_ta)}</p>
    </Khung>
  )
}

// ---------------------------------------------------------------------------

export function DashboardMau({ bo }: { bo: Bo_dashboard }) {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="mt-16">
      <h4 className="hien cho-hien text-[1.1rem] font-semibold">{chu(bo.tieu_de)}</h4>
      <p
        className="cho-hien mt-3 max-w-[62ch] border-l-2 pl-4 text-[0.88rem] text-chu-mo"
        style={{ borderColor: 'var(--canh-bao)' }}
      >
        {chu(bo.ghi_chu)}
      </p>

      <div className="cho-hien mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <BieuDoCot cot={bo.cot} />
        <BieuDoTron tron={bo.tron} />
        <BieuDoDuong duong={bo.duong} />
      </div>
    </div>
  )
}
