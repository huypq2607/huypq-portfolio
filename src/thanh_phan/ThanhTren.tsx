// Thanh trên dính theo trang: tên, các mục nhảy nhanh, và nút đổi ngôn ngữ.
//
// Nút đổi ngôn ngữ hiện cả hai mã chứ không chỉ mã của ngôn ngữ kia. Một nút
// chỉ hiện "VI" mơ hồ ở chỗ quan trọng nhất: người xem không biết đó là ngôn
// ngữ đang dùng hay ngôn ngữ sẽ chuyển sang. Hiện cả hai và tô đậm bản đang
// dùng thì không còn chỗ nào để đoán.

import { NHAN, TEN } from '../../noi_dung/noi_dung.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

const MUC_NHAY = [
  { dia_chi: '#nang-luc', nhan: NHAN.muc_nang_luc },
  { dia_chi: '#du-an', nhan: NHAN.dieu_huong_du_an },
  { dia_chi: '#cach-lam', nhan: NHAN.muc_cach_lam },
  { dia_chi: '#lien-he', nhan: NHAN.muc_lien_he },
] as const

export function ThanhTren() {
  const { ngon_ngu, chu, doi_ngon_ngu } = dung_ngon_ngu()

  return (
    <header className="sticky top-0 z-50 border-b border-duong bg-giay/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[76rem] items-center gap-6 px-5 py-3 sm:px-8">
        <a href="#dau-trang" className="hien text-[0.95rem] font-semibold whitespace-nowrap">
          {TEN}
        </a>

        <nav className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {MUC_NHAY.map((muc) => (
              <li key={muc.dia_chi}>
                <a
                  href={muc.dia_chi}
                  className="text-[0.9rem] text-muc-mo transition-colors hover:text-dong"
                >
                  {chu(muc.nhan)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={doi_ngon_ngu}
          aria-label={chu(NHAN.doi_ngon_ngu)}
          className="hien ml-auto flex items-center rounded-[2px] border border-duong text-[0.78rem] font-semibold lg:ml-0"
        >
          <span
            className={`px-2 py-1 ${ngon_ngu === 'en' ? 'bg-muc text-giay-noi' : 'text-muc-mo'}`}
          >
            EN
          </span>
          <span
            className={`px-2 py-1 ${ngon_ngu === 'vi' ? 'bg-muc text-giay-noi' : 'text-muc-mo'}`}
          >
            VI
          </span>
        </button>
      </div>
    </header>
  )
}
