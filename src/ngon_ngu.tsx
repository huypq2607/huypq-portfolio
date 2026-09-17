// Quản lý ngôn ngữ đang hiển thị.
//
// Mặc định là tiếng Anh, vì người đọc chính của trang là nhà tuyển dụng nước
// ngoài. Lựa chọn của người xem được nhớ trong localStorage, và mọi lần đọc
// ghi đều bọc try catch: ở cửa sổ ẩn danh hoặc khi người dùng chặn dữ liệu
// trang, các lời gọi này ném lỗi chứ không trả về giá trị rỗng, và một trang
// giới thiệu không được phép trắng vì chuyện đó.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Ngon_ngu, Song } from '../noi_dung/kieu.ts'
import { NHAN } from '../noi_dung/noi_dung.ts'

const KHOA_NHO = 'ngon_ngu_v1'
const MAC_DINH: Ngon_ngu = 'en'

interface Gia_tri_boi_canh {
  readonly ngon_ngu: Ngon_ngu
  /** Lấy đúng bản ngôn ngữ đang hiển thị của một chuỗi song ngữ. */
  readonly chu: (song: Song) => string
  readonly doi_ngon_ngu: () => void
}

const Boi_canh = createContext<Gia_tri_boi_canh | null>(null)

function doc_lua_chon_da_nho(): Ngon_ngu {
  try {
    const da_nho = window.localStorage.getItem(KHOA_NHO)
    if (da_nho === 'vi' || da_nho === 'en') return da_nho
  } catch {
    // Không đọc được thì dùng mặc định, không có gì phải báo cho người xem.
  }
  return MAC_DINH
}

export function Cung_cap_ngon_ngu({ children }: { children: ReactNode }) {
  const [ngon_ngu, dat_ngon_ngu] = useState<Ngon_ngu>(doc_lua_chon_da_nho)

  // Ba thứ ngoài phần thân trang cũng phải đổi theo ngôn ngữ.
  //
  // Thuộc tính lang là thứ trình đọc màn hình dùng để chọn giọng đọc. Sai nó
  // thì người dùng trình đọc nghe tiếng Việt phát âm bằng bộ đọc tiếng Anh,
  // gần như không hiểu được.
  //
  // Tiêu đề và mô tả thì đổi vì người xem hay mở nhiều tab khi so sánh ứng
  // viên, và tiêu đề tab là thứ duy nhất họ thấy khi trang không ở trước mặt.
  useEffect(() => {
    document.documentElement.lang = ngon_ngu
    document.title = NHAN.tieu_de_trang[ngon_ngu]

    const the_mo_ta = document.querySelector('meta[name="description"]')
    if (the_mo_ta !== null) {
      the_mo_ta.setAttribute('content', NHAN.mo_ta_trang[ngon_ngu])
    }
  }, [ngon_ngu])

  const doi_ngon_ngu = useCallback(() => {
    dat_ngon_ngu((cu) => {
      const moi: Ngon_ngu = cu === 'en' ? 'vi' : 'en'
      try {
        window.localStorage.setItem(KHOA_NHO, moi)
      } catch {
        // Không ghi nhớ được thì lần sau mở lại về mặc định, chấp nhận được.
      }
      return moi
    })
  }, [])

  const gia_tri = useMemo<Gia_tri_boi_canh>(
    () => ({
      ngon_ngu,
      chu: (song: Song) => song[ngon_ngu],
      doi_ngon_ngu,
    }),
    [ngon_ngu, doi_ngon_ngu],
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
