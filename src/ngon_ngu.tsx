// Lấy chữ ra khỏi tệp nội dung, và chế độ sửa chữ ngay trên trang.
//
// Trang từng có hai bản Việt và Anh kèm nút chuyển. Nay chỉ còn tiếng Việt,
// nên phần chọn ngôn ngữ đã gỡ hẳn, còn lại đúng hai việc: lấy chữ ra, và cho
// sửa chữ tại chỗ lúc phát triển.
//
// CHẾ ĐỘ SỬA TẠI CHỖ chỉ tồn tại khi chạy npm run dev. Bật lên thì mọi câu chữ
// trên trang thành ô gõ được, rời con trỏ là ghi thẳng vào tệp nguồn.
//
// Có hai hàm lấy chữ, và phải dùng đúng hàm:
//
//   chu()      trả về phần tử, dùng cho chữ HIỂN THỊ trong thân trang
//   chu_tho()  trả về chuỗi trần, dùng cho THUỘC TÍNH như aria-label hay title
//
// Dùng nhầm chu() cho thuộc tính thì TypeScript báo lỗi ngay, nên không có
// đường nào lọt ra tới lúc chạy.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Song } from '../noi_dung/kieu.ts'
import { NHAN } from '../noi_dung/noi_dung.ts'
import { ghi_chuoi, vi_tri_cua } from './sua/ban_do.ts'

const KHOA_SUA = 'sua_tai_cho_v1'

/** Chỉ có trang chạy lúc phát triển mới sửa được chữ. */
const CHO_PHEP_SUA = import.meta.env.DEV

interface Gia_tri_boi_canh {
  /** Chữ hiển thị. Thành ô gõ được khi đang bật chế độ sửa tại chỗ. */
  readonly chu: (song: Song) => ReactNode
  /** Chuỗi trần, dùng cho thuộc tính. Không bao giờ thành ô gõ được. */
  readonly chu_tho: (song: Song) => string
  readonly cho_phep_sua: boolean
  readonly dang_sua: boolean
  readonly bat_tat_sua: () => void
}

const Boi_canh = createContext<Gia_tri_boi_canh | null>(null)

function doc_dang_sua(): boolean {
  if (!CHO_PHEP_SUA) return false
  try {
    return window.sessionStorage.getItem(KHOA_SUA) === '1'
  } catch {
    return false
  }
}

/**
 * Một câu chữ đang ở chế độ sửa được.
 *
 * Giữ nguyên thẻ span bọc ngoài và không đụng vào cách trình bày, vì ô gõ phải
 * nằm đúng chỗ câu chữ vốn nằm. Thay bằng một ô nhập thật thì kích thước đổi
 * và người sửa không còn thấy câu chữ trong đúng bối cảnh của nó nữa, mà bối
 * cảnh mới là lý do người ta muốn sửa tại chỗ thay vì sửa trong bảng.
 */
function O_sua({ song }: { song: Song }) {
  const tham_chieu = useRef<HTMLSpanElement | null>(null)
  const [hong, dat_hong] = useState('')
  const van = song.vi
  const vi_tri = vi_tri_cua(song)

  // Thẻ span này cố ý KHÔNG có con trong JSX, và chữ được đặt bằng tay ở đây.
  //
  // Đó là điểm mấu chốt. Nếu để React dựng nút chữ bên trong, thì lúc người ta
  // gõ, trình duyệt thay nút ấy bằng nút khác, và lần vẽ lại kế tiếp React đi
  // gỡ đúng nút cũ đã không còn nữa rồi vỡ với NotFoundError removeChild. Lỗi
  // này đã xảy ra thật ở bản trước và làm sập cả cây giao diện.
  //
  // Không đặt lại chữ khi ô đang được gõ, vì gán textContent sẽ đẩy con trỏ về
  // đầu ô ngay giữa lúc người ta đang viết.
  useEffect(() => {
    const o = tham_chieu.current
    if (o === null || o === document.activeElement) return
    if (o.textContent !== van) o.textContent = van
  }, [van])

  // Không tra được đường dẫn thì hiện chữ thường, không giả vờ sửa được.
  if (vi_tri === null) return <>{van}</>

  const luu = (phan_tu: HTMLElement) => {
    const moi = (phan_tu.textContent ?? '').replace(/\s+/g, ' ').trim()
    if (moi === van) return
    if (moi === '') {
      phan_tu.textContent = van
      return
    }
    void ghi_chuoi(vi_tri.tep, [...vi_tri.duong_dan, 'vi'], moi)
      .then(() => dat_hong(''))
      .catch((loi: unknown) => {
        phan_tu.textContent = van
        dat_hong(loi instanceof Error ? loi.message : String(loi))
      })
  }

  return (
    <span
      ref={(o) => {
        tham_chieu.current = o
        // Đặt chữ ngay lúc gắn vào cây, vì hiệu ứng ở trên chạy sau lần vẽ đầu
        // và nếu chờ tới đó thì ô nháy một cái trống rỗng.
        if (o !== null && o.textContent !== van) o.textContent = van
      }}
      className="o-sua"
      data-hong={hong === '' ? undefined : hong}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      role="textbox"
      tabIndex={0}
      // Nhiều câu chữ nằm trong thẻ liên kết, ví dụ địa chỉ thư hay các mục
      // điều hướng. Không chặn thì bấm vào để đặt con trỏ là trang nhảy đi mất.
      onClick={(su_kien) => {
        su_kien.preventDefault()
        su_kien.stopPropagation()
      }}
      onBlur={(su_kien) => luu(su_kien.currentTarget)}
      onKeyDown={(su_kien) => {
        if (su_kien.key === 'Escape') {
          su_kien.currentTarget.textContent = van
          su_kien.currentTarget.blur()
          return
        }
        // Enter lưu rồi thoát. Xuống dòng thật phải giữ Shift, vì mọi chuỗi
        // trong tệp nội dung đều nằm trên một dòng.
        if (su_kien.key === 'Enter' && !su_kien.shiftKey) {
          su_kien.preventDefault()
          su_kien.currentTarget.blur()
        }
      }}
      onPaste={(su_kien) => {
        // Dán từ nơi khác hay kéo theo cả thẻ HTML. Chỉ lấy chữ trần.
        su_kien.preventDefault()
        const van_dan = su_kien.clipboardData.getData('text/plain').replace(/\s+/g, ' ')
        su_kien.currentTarget.ownerDocument.execCommand('insertText', false, van_dan)
      }}
    />
  )
}

export function Cung_cap_ngon_ngu({ children }: { children: ReactNode }) {
  const [dang_sua, dat_dang_sua] = useState<boolean>(doc_dang_sua)

  // Tiêu đề và mô tả đã nằm sẵn trong tệp HTML tĩnh, nhưng vẫn đặt lại từ tệp
  // nội dung ở đây, để sửa chúng tại chỗ lúc phát triển là thấy đổi ngay chứ
  // không phải mở tệp HTML ra sửa thêm một lần nữa.
  useEffect(() => {
    document.title = NHAN.tieu_de_trang.vi
    const the_mo_ta = document.querySelector('meta[name="description"]')
    if (the_mo_ta !== null) the_mo_ta.setAttribute('content', NHAN.mo_ta_trang.vi)
  }, [])

  // Cờ trên thẻ html, để CSS tô viền cho mọi ô sửa được bằng một luật duy nhất
  // thay vì mỗi ô tự mang lớp riêng.
  useEffect(() => {
    if (dang_sua) document.documentElement.dataset.dangSua = '1'
    else delete document.documentElement.dataset.dangSua
  }, [dang_sua])

  const bat_tat_sua = useCallback(() => {
    dat_dang_sua((cu) => {
      const moi = !cu
      try {
        window.sessionStorage.setItem(KHOA_SUA, moi ? '1' : '0')
      } catch {
        // Không nhớ được thì mở lại tab là tắt, chấp nhận được.
      }
      return moi
    })
  }, [])

  const gia_tri = useMemo<Gia_tri_boi_canh>(
    () => ({
      chu: (song: Song) => (CHO_PHEP_SUA && dang_sua ? <O_sua song={song} /> : song.vi),
      chu_tho: (song: Song) => song.vi,
      cho_phep_sua: CHO_PHEP_SUA,
      dang_sua,
      bat_tat_sua,
    }),
    [dang_sua, bat_tat_sua],
  )

  return <Boi_canh.Provider value={gia_tri}>{children}</Boi_canh.Provider>
}

export function dung_ngon_ngu(): Gia_tri_boi_canh {
  const gia_tri = useContext(Boi_canh)
  if (gia_tri === null) {
    throw new Error('dung_ngon_ngu phải nằm bên trong Cung_cap_ngon_ngu')
  }
  return gia_tri
}
