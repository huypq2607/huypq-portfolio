// Ba khối dashboard minh hoạ cho dự án VETC: cột, tròn, đường.
//
// SỐ LIỆU LÀ SỐ MÔ PHỎNG. Dữ liệu thật là dữ liệu nội bộ và có thông tin cá
// nhân. Nhãn nói điều đó nằm ngay trên từng khối: một người đọc lướt mà tưởng
// đây là số thật rồi sau mới biết là số bịa thì mất niềm tin vào cả trang.
//
// Ba thể loại hình ứng với ba việc khác nhau của dữ liệu:
//
//   Cột   một chuỗi theo thời gian   -> một sắc duy nhất, không tô theo thứ hạng
//   Tròn  bốn phần của một tổng      -> bảng phân loại bốn sắc, thứ tự cố định
//   Đường chuỗi thời gian có dải     -> một sắc, cộng màu trạng thái cho cảnh báo
//
// Mọi giá trị đều được ghi ra chữ bên cạnh hình, nên người dùng trình đọc màn
// hình và người in trang ra giấy vẫn đọc đủ số.

import type { ReactNode } from 'react'
import type { Ngon_ngu } from '../../noi_dung/kieu.ts'
import {
  CHUOI_CANH_BAO,
  DOANH_THU_THANG,
  KENH_DOANH_THU,
  NHAN_QUY_TRINH,
} from '../../noi_dung/quy_trinh.ts'
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

  return (
    <div className="the-noi flex flex-col rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <h5 className="hien text-[0.98rem] leading-snug font-semibold">{ten}</h5>
        <span className="ma shrink-0 rounded-md border border-vien px-2 py-0.5 text-[0.65rem] text-chu-mo">
          {chu(NHAN_QUY_TRINH.canh_bao_mo_phong)}
        </span>
      </div>

      <p className="ma mt-5 text-[0.7rem] text-chu-mo">{nhan_so}</p>
      <p className="so-lieu mt-1 text-[2rem] leading-none" style={mau_so ? { color: mau_so } : undefined}>
        {gia_tri_so}
      </p>

      <div className="mt-6 flex-1">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Biểu đồ cột: doanh thu theo tháng
// ---------------------------------------------------------------------------

function BieuDoCot() {
  const { ngon_ngu, chu } = dung_ngon_ngu()
  const dinh_dang = bo_dinh_dang(ngon_ngu, 2)

  const cao_nhat = Math.max(...DOANH_THU_THANG.map((c) => c.ty_dong))
  const moi_nhat = DOANH_THU_THANG[DOANH_THU_THANG.length - 1]
  if (moi_nhat === undefined) return null

  return (
    <Khung
      ten={chu(NHAN_QUY_TRINH.bd_cot_ten)}
      nhan_so={chu(NHAN_QUY_TRINH.bd_cot_nhan)}
      gia_tri_so={
        <>
          {dinh_dang.format(moi_nhat.ty_dong)}{' '}
          <span className="text-[0.95rem] font-medium text-chu-mo">
            {chu(NHAN_QUY_TRINH.bd_cot_don_vi)}
          </span>
        </>
      }
    >
      {/* Sáu cột là MỘT chuỗi duy nhất nên cùng một sắc. Tô cột cao thành màu
          khác là tô theo thứ hạng, và khi dữ liệu đổi thì màu nhảy chỗ. */}
      <ul className="flex h-full min-h-44 items-end gap-2">
        {DOANH_THU_THANG.map((cot) => (
          <li
            key={cot.thang}
            className="flex h-full flex-1 flex-col justify-end"
            title={`${cot.thang}: ${dinh_dang.format(cot.ty_dong)}`}
          >
            <span className="so-lieu mb-1.5 text-center text-[0.72rem] text-chu-mo">
              {dinh_dang.format(cot.ty_dong)}
            </span>
            <div
              className="w-full rounded-t-[4px]"
              style={{
                height: `${(cot.ty_dong / cao_nhat) * 100}%`,
                backgroundColor: 'var(--bd-1)',
              }}
            />
            <span className="ma mt-2 text-center text-[0.68rem] text-chu-mo">{cot.thang}</span>
          </li>
        ))}
      </ul>
    </Khung>
  )
}

// ---------------------------------------------------------------------------
// Biểu đồ tròn: cơ cấu theo kênh
// ---------------------------------------------------------------------------

const BAN_KINH = 38
const DAY_VONG = 15
const CHU_VI = 2 * Math.PI * BAN_KINH
/** Khe hở giữa hai cung, tính theo đơn vị chu vi. Hai sắc kề nhau không dính
 *  vào nhau thành một mảng, và đó cũng là lớp mã hoá phụ cho người khó phân
 *  biệt màu. */
const KHE_HO = 3

function BieuDoTron() {
  const { ngon_ngu, chu } = dung_ngon_ngu()
  const dinh_dang = bo_dinh_dang(ngon_ngu)

  const dan_dau = KENH_DOANH_THU[0]
  if (dan_dau === undefined) return null

  let da_di = 0

  return (
    <Khung
      ten={chu(NHAN_QUY_TRINH.bd_tron_ten)}
      nhan_so={chu(NHAN_QUY_TRINH.bd_tron_nhan)}
      gia_tri_so={chu(dan_dau.ten)}
    >
      <div className="flex h-full items-center gap-5">
        <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0" role="img" aria-hidden="true">
          <g transform="rotate(-90 50 50)">
            {KENH_DOANH_THU.map((kenh, thu_tu) => {
              const dai = (kenh.phan_tram / 100) * CHU_VI
              const ve = Math.max(dai - KHE_HO, 1)
              const cung = (
                <circle
                  key={kenh.ten.en}
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

        <ul className="min-w-0 flex-1 space-y-2">
          {KENH_DOANH_THU.map((kenh, thu_tu) => (
            <li key={kenh.ten.en} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: `var(--bd-${thu_tu + 1})` }}
                aria-hidden="true"
              />
              <span className="truncate text-[0.82rem]">{chu(kenh.ten)}</span>
              <span className="so-lieu ml-auto text-[0.82rem] text-chu-mo">
                {dinh_dang.format(kenh.phan_tram)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Khung>
  )
}

// ---------------------------------------------------------------------------
// Biểu đồ đường: theo dõi bất thường
// ---------------------------------------------------------------------------

// Lề phải rộng hơn lề trái vì điểm cảnh báo nằm ở giá trị cuối cùng. Để lề bằng
// nhau thì bán kính của nó cộng viền tràn ra ngoài khung và bị cắt mất một nửa.
const KHUNG_VE = { rong: 300, cao: 110, trai: 4, phai: 12, tren: 10, duoi: 10 }
const TRUC_Y = { day: 200, dinh: 500 }

function toa_do_x(thu_tu: number, tong: number): number {
  return KHUNG_VE.trai + (thu_tu * (KHUNG_VE.rong - KHUNG_VE.trai - KHUNG_VE.phai)) / (tong - 1)
}

function toa_do_y(gia_tri: number): number {
  const ti_le = (TRUC_Y.dinh - gia_tri) / (TRUC_Y.dinh - TRUC_Y.day)
  return KHUNG_VE.tren + ti_le * (KHUNG_VE.cao - KHUNG_VE.tren - KHUNG_VE.duoi)
}

function BieuDoDuong() {
  const { ngon_ngu, chu, chu_tho } = dung_ngon_ngu()
  const dinh_dang = bo_dinh_dang(ngon_ngu)

  const { gia_tri, duoi, tren, diem_canh_bao } = CHUOI_CANH_BAO
  const tong = gia_tri.length
  const diem = gia_tri[diem_canh_bao]

  const duong = gia_tri
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toa_do_x(i, tong).toFixed(2)} ${toa_do_y(v).toFixed(2)}`)
    .join(' ')

  return (
    <Khung
      ten={chu(NHAN_QUY_TRINH.bd_duong_ten)}
      nhan_so={chu(NHAN_QUY_TRINH.bd_duong_nhan)}
      gia_tri_so={diem === undefined ? '' : dinh_dang.format(diem)}
      mau_so="var(--canh-bao)"
    >
      <svg
        viewBox={`0 0 ${KHUNG_VE.rong} ${KHUNG_VE.cao}`}
        className="block w-full"
        role="img"
        aria-label={chu_tho(NHAN_QUY_TRINH.bd_duong_mo_ta)}
      >
        <rect
          x={KHUNG_VE.trai}
          y={toa_do_y(tren)}
          width={KHUNG_VE.rong - KHUNG_VE.trai - KHUNG_VE.phai}
          height={toa_do_y(duoi) - toa_do_y(tren)}
          fill="currentColor"
          className="text-chu-mo"
          opacity="0.14"
        />
        <line
          x1={KHUNG_VE.trai}
          y1={toa_do_y(duoi)}
          x2={KHUNG_VE.rong - KHUNG_VE.phai}
          y2={toa_do_y(duoi)}
          stroke="currentColor"
          className="text-chu-mo"
          strokeWidth="1"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
        <path
          d={duong}
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
            cx={toa_do_x(diem_canh_bao, tong)}
            cy={toa_do_y(diem)}
            r="5"
            fill="var(--canh-bao)"
            stroke="var(--be-mat)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.74rem] text-chu-mo">
        <span className="ma">{chu(NHAN_QUY_TRINH.bd_duong_truc)}</span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-sm bg-current opacity-25" aria-hidden="true" />
          {chu(NHAN_QUY_TRINH.bd_duong_dai)}
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
          {chu(NHAN_QUY_TRINH.bd_duong_trang_thai)}
        </span>
      </div>

      <p className="mt-3 text-[0.82rem] leading-snug text-chu-mo">
        {chu(NHAN_QUY_TRINH.bd_duong_mo_ta)}
      </p>
    </Khung>
  )
}

// ---------------------------------------------------------------------------

export function DashboardMau() {
  const { chu } = dung_ngon_ngu()

  return (
    <div className="mt-16">
      <h4 className="hien cho-hien text-[1.1rem] font-semibold">
        {chu(NHAN_QUY_TRINH.tieu_de_dashboard)}
      </h4>
      <p
        className="cho-hien mt-3 max-w-[62ch] border-l-2 pl-4 text-[0.88rem] text-chu-mo"
        style={{ borderColor: 'var(--canh-bao)' }}
      >
        {chu(NHAN_QUY_TRINH.giai_thich_mo_phong)}
      </p>

      <div className="cho-hien mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <BieuDoCot />
        <BieuDoTron />
        <BieuDoDuong />
      </div>
    </div>
  )
}
