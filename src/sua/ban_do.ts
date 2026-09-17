// Bản đồ từ một cặp song ngữ tới vị trí của nó trong tệp nguồn.
//
// Đây là mảnh ghép làm cho việc sửa tại chỗ chạy được. Hàm dịch nhận vào chính
// đối tượng { vi, en } lấy từ tệp nội dung, chứ không nhận một chuỗi rời, nên
// tra ngược theo danh tính đối tượng là ra đúng đường dẫn khoá của nó. Không
// phải đoán theo nội dung chữ, tức không vướng chuyện 49 chuỗi bị lặp.
//
// Bản đồ dựng một lần rồi nhớ lại. Khi tệp nội dung đổi, Vite nạp lại cả chuỗi
// module nên module này chạy lại từ đầu và bản đồ tự mới.

import * as noi_dung from '../../noi_dung/noi_dung.ts'

export type Doan = string | number

export interface Vi_tri {
  readonly tep: string
  readonly duong_dan: readonly Doan[]
}

function la_song(gia_tri: unknown): gia_tri is { vi: string; en: string } {
  if (typeof gia_tri !== 'object' || gia_tri === null) return false
  const khoa = Object.keys(gia_tri)
  if (khoa.length !== 2 || !khoa.includes('vi') || !khoa.includes('en')) return false
  const o = gia_tri as Record<string, unknown>
  return typeof o.vi === 'string' && typeof o.en === 'string'
}

function duyet(gia_tri: unknown, duong_dan: Doan[], tep: string, ban_do: Map<object, Vi_tri>): void {
  if (la_song(gia_tri)) {
    ban_do.set(gia_tri, { tep, duong_dan: [...duong_dan] })
    return
  }
  if (Array.isArray(gia_tri)) {
    gia_tri.forEach((con, i) => duyet(con, [...duong_dan, i], tep, ban_do))
    return
  }
  if (typeof gia_tri === 'object' && gia_tri !== null) {
    for (const [khoa, con] of Object.entries(gia_tri)) {
      duyet(con, [...duong_dan, khoa], tep, ban_do)
    }
  }
}

let ban_do: Map<object, Vi_tri> | null = null

function dung_ban_do(): Map<object, Vi_tri> {
  const moi = new Map<object, Vi_tri>()
  for (const [ten, gia_tri] of Object.entries(noi_dung)) {
    duyet(gia_tri, [ten], 'noi_dung/noi_dung.ts', moi)
  }
  return moi
}

export function vi_tri_cua(song: object): Vi_tri | null {
  ban_do ??= dung_ban_do()
  return ban_do.get(song) ?? null
}

/** Gửi một chuỗi về máy chủ phát triển để ghi vào tệp nguồn. */
export async function ghi_chuoi(
  tep: string,
  duong_dan: readonly Doan[],
  gia_tri: string,
): Promise<void> {
  const tra_loi = await fetch('/__sua-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tep, duong_dan, gia_tri }),
  })

  if (!tra_loi.ok) {
    const than: unknown = await tra_loi.json().catch(() => null)
    const mo_ta =
      typeof than === 'object' && than !== null && 'loi' in than
        ? String((than as { loi: unknown }).loi)
        : `mã ${tra_loi.status}`
    throw new Error(mo_ta)
  }
}
