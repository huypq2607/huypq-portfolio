// Dòng thời gian nghề nghiệp.
//
// Dùng lại đúng ngôn ngữ hình của sơ đồ dây chuyền: chấm trên dải màu sáu bậc,
// lạnh ở đầu và ấm ở cuối. Trang chỉ có một quy ước hình duy nhất, và quy ước
// ấy là "vị trí trong một chuỗi có thứ tự". Học vấn rồi chứng chỉ rồi hai nơi
// làm việc cũng là một chuỗi như thế.
//
// Mốc dựng lại từ chính HOC_VAN, CHUNG_CHI và KINH_NGHIEM chứ không chép tay.
// Chép tay thì sang năm sửa một nơi, dòng thời gian đứng yên, và không có gì
// báo cho ai biết.

import type { Song } from '../../noi_dung/kieu.ts'
import { CHUNG_CHI, HOC_VAN, KINH_NGHIEM } from '../../noi_dung/noi_dung.ts'
import { bac_mau } from '../mau.ts'
import { dung_ngon_ngu } from '../ngon_ngu.tsx'

interface Moc {
  readonly khoa: string
  readonly thoi_gian: Song
  readonly ten: Song
  readonly phu: Song
}

function dung_moc(): readonly Moc[] {
  const hoc = {
    khoa: 'hoc-van',
    thoi_gian: { vi: HOC_VAN.thoi_gian, en: HOC_VAN.thoi_gian },
    ten: HOC_VAN.truong,
    phu: HOC_VAN.nganh,
  }

  const chung = CHUNG_CHI.map((c) => ({
    khoa: `chung-chi-${c.nam}`,
    thoi_gian: { vi: c.nam, en: c.nam },
    ten: c.ten,
    phu: c.ghi_chu,
  }))

  // KINH_NGHIEM xếp mới nhất trước, còn dòng thời gian đi từ cũ tới mới.
  const lam = [...KINH_NGHIEM].reverse().map((n) => ({
    khoa: n.ma,
    thoi_gian: n.thoi_gian,
    ten: n.cong_ty,
    phu: n.chuc_danh,
  }))

  return [hoc, ...chung, ...lam]
}

const MOC = dung_moc()

export function DongThoiGian() {
  const { chu } = dung_ngon_ngu()

  return (
    <ol className="relative">
      {MOC.map((moc, thu_tu) => {
        const mau = `var(--tang-${bac_mau(thu_tu, MOC.length)})`
        const cuoi = thu_tu === MOC.length - 1
        return (
          <li key={moc.khoa} className="relative pb-6 pl-6 last:pb-0">
            {/* Đoạn nối xuống mốc sau. Mốc cuối không có, vì sau nó là hiện tại. */}
            {!cuoi && (
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-0 left-[0.19rem] w-px"
                style={{
                  background: `linear-gradient(180deg, ${mau}, var(--tang-${bac_mau(thu_tu + 1, MOC.length)}))`,
                  opacity: 0.5,
                }}
              />
            )}
            <span
              aria-hidden="true"
              className="absolute top-[0.36rem] left-0 block h-[0.5rem] w-[0.5rem] rounded-full"
              style={{ backgroundColor: mau, boxShadow: `0 0 12px -2px ${mau}` }}
            />
            <p className="ma text-[0.7rem] text-chu-mo">{chu(moc.thoi_gian)}</p>
            <p className="mt-0.5 text-[0.95rem] leading-snug font-medium">{chu(moc.ten)}</p>
            <p className="text-[0.85rem] leading-snug text-chu-mo">{chu(moc.phu)}</p>
          </li>
        )
      })}
    </ol>
  )
}
