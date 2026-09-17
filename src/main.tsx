// Điểm vào của trang. Trang chỉ có một màn duy nhất nên không cần bộ định
// tuyến, và bỏ được bộ định tuyến là bỏ luôn một thư viện khỏi gói tải về.

import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'

import './giao_dien.css'
import type { Du_an } from '../noi_dung/kieu.ts'
import { CACH_LAM, DU_AN, NHAN } from '../noi_dung/noi_dung.ts'
import { theo_doi_hien_ra } from './hieu_ung.ts'
import { Cung_cap_ngon_ngu, dung_ngon_ngu } from './ngon_ngu.tsx'
import { Cung_cap_nen } from './nen.tsx'
import { BangHopCat } from './thanh_phan/BangHopCat.tsx'
import { DanhSachY } from './thanh_phan/DanhSachY.tsx'
import { DashboardMau } from './thanh_phan/DashboardMau.tsx'
import { DuAn } from './thanh_phan/DuAn.tsx'
import { KhungMuc } from './thanh_phan/KhungMuc.tsx'
import { KyNang } from './thanh_phan/KyNang.tsx'
import { LienHe } from './thanh_phan/LienHe.tsx'
import { MoDau } from './thanh_phan/MoDau.tsx'
import { QuyTrinh } from './thanh_phan/QuyTrinh.tsx'
import { SoDoTang } from './thanh_phan/SoDoTang.tsx'
import { ThanhTren } from './thanh_phan/ThanhTren.tsx'

/** Lấy dự án theo mã chứ không theo chỉ số, để đổi thứ tự trong tệp nội dung
 *  không làm sơ đồ hộp cát gắn nhầm sang dự án kia. Ném lỗi ngay khi nạp trang
 *  thay vì vẽ ra một khoảng trống: thiếu một dự án là lỗi soạn nội dung, và nó
 *  phải lộ ra ở lần mở đầu tiên chứ không phải khi có người cuộn tới đó. */
function lay_du_an(ma: string): Du_an {
  const tim_thay = DU_AN.find((d) => d.ma === ma)
  if (tim_thay === undefined) {
    throw new Error(`Thiếu dự án ${ma} trong noi_dung/noi_dung.ts`)
  }
  return tim_thay
}

const DU_AN_VETC = lay_du_an('vetc')
const DU_AN_DAPRACTICE = lay_du_an('dapractice')

function Trang() {
  const { chu, dang_sua, bat_tat_sua } = dung_ngon_ngu()

  // Gắn bộ theo dõi sau khi cây đã dựng xong, vì nó tìm phần tử bằng bộ chọn
  // trên DOM thật. Nội dung của trang là tĩnh nên một lượt quét là đủ.
  useEffect(() => theo_doi_hien_ra(), [])

  return (
    <>
      {/* Liên kết bỏ qua, chỉ hiện khi bắt được phím. Nó nói việc nó làm chứ
          không mang tên của mục đích, vì người dùng bàn phím nghe thấy nó
          trước khi biết trang có những mục nào. */}
      <a
        href="#dau-trang"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:rounded-md focus:bg-nhan focus:px-3 focus:py-2 focus:text-nen"
      >
        {chu(NHAN.bo_qua_dau_trang)}
      </a>

      <ThanhTren />

      <main>
        <MoDau />
        <SoDoTang />

        <KhungMuc ma="du-an" tieu_de={NHAN.muc_du_an}>
          <DuAn du_an={DU_AN_VETC}>
            <QuyTrinh />
            <DashboardMau />
          </DuAn>
        </KhungMuc>

        <section className="bg-nen-diu">
          <div className="mx-auto max-w-[78rem] px-5 py-16 sm:px-8 sm:py-24">
            <DuAn du_an={DU_AN_DAPRACTICE}>
              <BangHopCat />
            </DuAn>
          </div>
        </section>

        <KhungMuc ma="cach-lam" tieu_de={NHAN.muc_cach_lam}>
          <DanhSachY muc={CACH_LAM} />
        </KhungMuc>

        <KhungMuc ma="cong-cu" tieu_de={NHAN.muc_ky_nang} nen_diu>
          <KyNang />
        </KhungMuc>

        <KhungMuc ma="lien-he" tieu_de={NHAN.muc_lien_he}>
          <LienHe />
        </KhungMuc>
      </main>

      {/* Thanh công cụ chỉ hiện lúc phát triển. Hai lối sửa chữ, dùng chung
          một đường ghi vào tệp nguồn: bấm thẳng vào chữ trên trang, hoặc mở
          bảng liệt kê toàn bộ chuỗi khi cần rà soát một lượt. */}
      {/* Điều kiện phải là import.meta.env.DEV viết thẳng ra ở đây, không được
          lấy cờ tương đương từ ngữ cảnh. Vite thay hằng này bằng false lúc
          dựng nên cả khối thành mã chết và bị loại; lấy qua ngữ cảnh thì đó là
          giá trị lúc chạy, Rollup không gấp được, và chuỗi chữ của thanh công
          cụ vẫn nằm trong gói phát hành. Cổng do_kich_thuoc canh đúng điều này. */}
      {import.meta.env.DEV && (
        <div className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-lg border border-vien bg-be-mat p-1.5 shadow-lg">
          <button
            type="button"
            onClick={bat_tat_sua}
            className="ma rounded-md px-2.5 py-1.5 text-[0.72rem] transition-colors"
            style={
              dang_sua
                ? { backgroundColor: 'var(--nhan)', color: 'var(--nen)' }
                : { color: 'var(--chu-mo)' }
            }
          >
            {dang_sua ? 'Đang sửa chữ' : 'Sửa chữ tại chỗ'}
          </button>
          <a href="/sua" className="ma px-2 py-1.5 text-[0.72rem] text-chu-mo">
            Bảng
          </a>
        </div>
      )}

      <footer className="border-t border-vien">
        <div className="mx-auto max-w-[78rem] px-5 py-8 text-[0.8rem] text-chu-mo sm:px-8">
          {chu(NHAN.chan_trang)}
        </div>
      </footer>
    </>
  )
}

const goc = document.getElementById('goc')
if (goc === null) throw new Error('Không tìm thấy phần tử gốc để gắn giao diện')

// Giữ lại gốc React qua các lần nạp nóng.
//
// createRoot chỉ được gọi MỘT lần cho một phần tử. Mỗi lần Vite nạp nóng tệp
// này, cả module chạy lại; gọi createRoot lần nữa trên cùng phần tử thì React
// mất dấu cây cũ, rồi mọi lần vẽ sau đó vỡ với NotFoundError removeChild và
// sập trắng trang. Lỗi này lộ ra rõ nhất khi đang sửa chữ tại chỗ, vì đó là
// lúc tệp bị ghi lại liên tục.
//
// import.meta.hot.data sống qua các lần cập nhật của chính module này, nên nó
// là chỗ đúng để cất gốc. Lúc dựng bản phát hành thì import.meta.hot không tồn
// tại, nhánh này thành createRoot bình thường.
const bo_nho = import.meta.hot?.data as { goc_react?: Root } | undefined
const re: Root = bo_nho?.goc_react ?? createRoot(goc)
if (bo_nho !== undefined) bo_nho.goc_react = re

// Trang sửa chữ chỉ tồn tại lúc phát triển.
//
// import.meta.env.DEV là hằng, Vite thay nó bằng false lúc dựng bản phát hành,
// nên cả nhánh này thành mã chết và bị loại khỏi gói cùng với lời nạp động bên
// trong. Cổng do_kich_thuoc kiểm lại điều đó trên chính thư mục dist, vì đây
// đúng là kiểu hỏng không kêu: gói phình thêm mà trang vẫn chạy y như cũ.
if (import.meta.env.DEV && window.location.pathname === '/sua') {
  void import('./sua/TrangSua.tsx').then(({ TrangSua }) => {
    re.render(
      <StrictMode>
        <TrangSua />
      </StrictMode>,
    )
  })
} else {
  re.render(
    <StrictMode>
      <Cung_cap_nen>
        <Cung_cap_ngon_ngu>
          <Trang />
        </Cung_cap_ngon_ngu>
      </Cung_cap_nen>
    </StrictMode>,
  )
}
