// Trang sửa chữ, chỉ có khi chạy npm run dev.
//
// Hai bản Việt và Anh đặt cạnh nhau trên cùng một hàng, vì việc dễ sai nhất
// khi sửa một trang song ngữ là sửa một bên rồi quên bên kia. Đặt cạnh nhau
// thì chỗ quên lộ ra ngay lúc đang gõ chứ không phải lúc cổng canh gác chạy.
//
// Lưu khi rời con trỏ khỏi ô, không có nút Lưu cho từng ô. Sửa chữ là việc gõ
// liên tục qua nhiều ô, và một nút phải bấm sau mỗi ô là thứ chắc chắn sẽ có
// lần bị quên.

import { useEffect, useMemo, useState } from 'react'
import { ghi_vao_nguon, lay_chi_muc, type Muc_sua } from './chi_muc.ts'

type Trang_thai_ghi = 'yen' | 'dang_ghi' | 'da_ghi' | 'hong'

interface Dong_sua extends Muc_sua {
  readonly khoa: string
}

function O_chu({
  gia_tri,
  nhan,
  khi_luu,
}: {
  gia_tri: string
  nhan: string
  khi_luu: (moi: string) => Promise<void>
}) {
  const [dang_go, dat_dang_go] = useState(gia_tri)
  const [trang_thai, dat_trang_thai] = useState<Trang_thai_ghi>('yen')
  const [loi, dat_loi] = useState('')

  // Tệp nguồn đổi thì Vite nạp lại module và chỉ mục dựng lại, nên phải đồng
  // bộ ô về giá trị mới. Bỏ bước này thì ô giữ mãi bản cũ sau lần lưu đầu.
  useEffect(() => {
    dat_dang_go(gia_tri)
  }, [gia_tri])

  const luu = async () => {
    if (dang_go === gia_tri) return
    dat_trang_thai('dang_ghi')
    try {
      await khi_luu(dang_go)
      dat_trang_thai('da_ghi')
      dat_loi('')
      window.setTimeout(() => dat_trang_thai('yen'), 1400)
    } catch (e) {
      dat_trang_thai('hong')
      dat_loi(e instanceof Error ? e.message : String(e))
    }
  }

  const so_dong = Math.min(Math.max(Math.ceil(dang_go.length / 52), 1), 10)

  return (
    <label className="block">
      <span className="ma flex items-center gap-2 text-[0.68rem] text-chu-mo">
        {nhan}
        {trang_thai === 'dang_ghi' && <span>đang ghi</span>}
        {trang_thai === 'da_ghi' && <span style={{ color: 'var(--bd-4)' }}>đã ghi</span>}
        {trang_thai === 'hong' && <span style={{ color: 'var(--canh-bao)' }}>{loi}</span>}
      </span>
      <textarea
        value={dang_go}
        rows={so_dong}
        onChange={(e) => dat_dang_go(e.target.value)}
        onBlur={() => void luu()}
        spellCheck={false}
        className="mt-1 w-full resize-y rounded-md border border-vien bg-nen px-3 py-2 text-[0.88rem] leading-snug"
        style={{
          borderColor:
            trang_thai === 'hong'
              ? 'var(--canh-bao)'
              : dang_go !== gia_tri
                ? 'var(--bd-2)'
                : undefined,
        }}
      />
    </label>
  )
}

export function TrangSua() {
  const [chi_muc, dat_chi_muc] = useState<Dong_sua[] | null>(null)
  const [tim, dat_tim] = useState('')

  useEffect(() => {
    let con_gan = true
    void lay_chi_muc().then((ds) => {
      if (!con_gan) return
      dat_chi_muc(ds.map((m) => ({ ...m, khoa: `${m.tep}#${m.nhan}` })))
    })
    return () => {
      con_gan = false
    }
  }, [])

  const da_loc = useMemo(() => {
    if (chi_muc === null) return []
    const tu = tim.trim().toLowerCase()
    if (tu === '') return chi_muc
    return chi_muc.filter(
      (m) =>
        m.nhan.toLowerCase().includes(tu) ||
        m.vi.toLowerCase().includes(tu),
    )
  }, [chi_muc, tim])

  const theo_nhom = useMemo(() => {
    const ban_do = new Map<string, Dong_sua[]>()
    for (const m of da_loc) {
      const cu = ban_do.get(m.nhom)
      if (cu === undefined) ban_do.set(m.nhom, [m])
      else cu.push(m)
    }
    return [...ban_do.entries()]
  }, [da_loc])

  return (
    <div className="mx-auto max-w-[62rem] px-5 py-10 sm:px-8">
      <header className="sticky top-0 z-10 -mx-5 border-b border-vien bg-nen/95 px-5 pb-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3 pt-2">
          <h1 className="hien text-[1.3rem] font-bold">Sửa chữ</h1>
          <a href="/" className="lien-ket text-[0.88rem]">
            Về trang chính
          </a>
        </div>

        <p className="mt-1 text-[0.82rem] text-chu-mo">
          Rời con trỏ khỏi ô là ghi thẳng vào tệp nguồn. Chỉ chạy được khi đang{' '}
          <span className="ma">npm run dev</span>.
        </p>

        <input
          type="search"
          value={tim}
          onChange={(e) => dat_tim(e.target.value)}
          placeholder="Tìm theo chữ hoặc theo đường dẫn khoá"
          className="mt-3 w-full rounded-md border border-vien bg-nen px-3 py-2 text-[0.9rem]"
        />

        <p className="ma mt-2 text-[0.7rem] text-chu-mo">
          {chi_muc === null ? 'đang nạp' : `${da_loc.length} trên ${chi_muc.length} chuỗi`}
        </p>
      </header>

      {theo_nhom.map(([nhom, cac_muc]) => (
        <section key={nhom} className="mt-10">
          <h2 className="ma text-[0.8rem] font-medium" style={{ color: 'var(--nhan)' }}>
            {nhom}
          </h2>

          <ul className="mt-3 space-y-3">
            {cac_muc.map((muc) => (
              <li key={muc.khoa} className="the-noi rounded-lg p-4">
                <p className="ma text-[0.68rem] text-chu-mo">{muc.nhan}</p>

                <div className="mt-3">
                  <O_chu
                    gia_tri={muc.vi}
                    nhan="vi"
                    khi_luu={(moi) => ghi_vao_nguon(muc, 'vi', moi)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
