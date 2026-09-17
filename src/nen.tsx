// Chế độ nền sáng và nền tối.
//
// Giá trị ban đầu do cong_khai/giao_dien_som.js đặt vào thuộc tính data của
// thẻ html trước khi trang vẽ khung hình đầu tiên. React đọc lại đúng giá trị
// đó khi khởi tạo, nên không có nháy màu và cũng không có chuyện hai nơi cùng
// quyết định một thứ.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

const KHOA_NHO = 'giao_dien_v1'

export type Che_do_nen = 'toi' | 'sang'

interface Gia_tri_boi_canh {
  readonly nen: Che_do_nen
  readonly doi_nen: () => void
}

const Boi_canh = createContext<Gia_tri_boi_canh | null>(null)

function doc_nen_hien_tai(): Che_do_nen {
  const da_dat = document.documentElement.dataset.giaoDien
  return da_dat === 'sang' ? 'sang' : 'toi'
}

export function Cung_cap_nen({ children }: { children: ReactNode }) {
  const [nen, dat_nen] = useState<Che_do_nen>(doc_nen_hien_tai)

  useEffect(() => {
    document.documentElement.dataset.giaoDien = nen

    // Thanh trạng thái của trình duyệt trên điện thoại lấy màu từ thẻ này. Bỏ
    // qua nó thì nền tối vẫn đội một dải trắng ở đỉnh màn hình.
    const the_mau = document.querySelector('meta[name="theme-color"]')
    if (the_mau !== null) {
      const mau = getComputedStyle(document.documentElement).getPropertyValue('--nen').trim()
      if (mau !== '') the_mau.setAttribute('content', mau)
    }
  }, [nen])

  const doi_nen = useCallback(() => {
    dat_nen((cu) => {
      const moi: Che_do_nen = cu === 'toi' ? 'sang' : 'toi'
      try {
        window.localStorage.setItem(KHOA_NHO, moi)
      } catch {
        // Không ghi nhớ được thì lần sau mở lại theo cài đặt của hệ điều hành.
      }
      return moi
    })
  }, [])

  const gia_tri = useMemo<Gia_tri_boi_canh>(() => ({ nen, doi_nen }), [nen, doi_nen])

  return <Boi_canh.Provider value={gia_tri}>{children}</Boi_canh.Provider>
}

export function dung_nen(): Gia_tri_boi_canh {
  const gia_tri = useContext(Boi_canh)
  if (gia_tri === null) throw new Error('dung_nen phải nằm bên trong Cung_cap_nen')
  return gia_tri
}
