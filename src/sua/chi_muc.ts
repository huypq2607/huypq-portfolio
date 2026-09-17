// Dựng danh sách mọi chuỗi sửa được, kèm đường dẫn khoá dẫn tới đúng nút của
// nó trong tệp nguồn.
//
// Cùng phép nhận dạng cặp song ngữ với cổng canh gác nội dung: một đối tượng
// có đúng hai khoá vi và en, cả hai là chuỗi. Hai nơi phải hiểu giống nhau,
// nếu không sẽ có chuỗi cổng canh gác kiểm mà trang sửa không thấy, hoặc
// ngược lại.

import { ghi_chuoi } from './ban_do.ts'

export type Doan = string | number

export interface Muc_sua {
  /** Tệp nguồn chứa chuỗi này, tính từ gốc dự án. */
  readonly tep: string
  /** Đường dẫn khoá tới nút, ví dụ ['DU_AN', 0, 'ten', 'vi']. */
  readonly duong_dan: readonly Doan[]
  /** Đường dẫn ở dạng người đọc được, ví dụ DU_AN[0].ten */
  readonly nhan: string
  /** Khoá cấp một, dùng để gom nhóm trong giao diện. */
  readonly nhom: string
  readonly vi: string
}

function la_song(gia_tri: unknown): gia_tri is { vi: string } {
  if (typeof gia_tri !== 'object' || gia_tri === null) return false
  const khoa = Object.keys(gia_tri)
  if (khoa.length !== 1 || khoa[0] !== 'vi') return false
  return typeof (gia_tri as Record<string, unknown>).vi === 'string'
}

function ve_nhan(duong_dan: readonly Doan[]): string {
  return duong_dan
    .map((d, i) => (typeof d === 'number' ? `[${d}]` : i === 0 ? d : `.${d}`))
    .join('')
}

function duyet(
  gia_tri: unknown,
  duong_dan: Doan[],
  tep: string,
  thu: Muc_sua[],
): void {
  if (la_song(gia_tri)) {
    const doan_dau = duong_dan[0]
    thu.push({
      tep,
      duong_dan: [...duong_dan],
      nhan: ve_nhan(duong_dan),
      nhom: typeof doan_dau === 'string' ? doan_dau : '(khác)',
      vi: gia_tri.vi,
    })
    return
  }

  if (typeof gia_tri === 'string') {
    // Chuỗi đơn: địa chỉ thư, tên công cụ, mã tầng, nhãn tháng. Vẫn sửa được,
    // chỉ là không có bản thứ hai để đối chiếu.
    const doan_dau = duong_dan[0]
    thu.push({
      tep,
      duong_dan: [...duong_dan],
      nhan: ve_nhan(duong_dan),
      nhom: typeof doan_dau === 'string' ? doan_dau : '(khác)',
      vi: gia_tri,
    })
    return
  }

  if (Array.isArray(gia_tri)) {
    gia_tri.forEach((con, thu_tu) => duyet(con, [...duong_dan, thu_tu], tep, thu))
    return
  }

  if (typeof gia_tri === 'object' && gia_tri !== null) {
    for (const [khoa, con] of Object.entries(gia_tri)) {
      duyet(con, [...duong_dan, khoa], tep, thu)
    }
  }
}

export async function lay_chi_muc(): Promise<Muc_sua[]> {
  // Nạp động để hai tệp nội dung không bị kéo vào gói của trang sửa lúc dựng
  // bản phát hành. Bản phát hành không có trang sửa, nhưng giữ đường nạp tách
  // hẳn ra là cách chắc chắn nhất để nó không bao giờ lẫn vào.
  const noi_dung = await import('../../noi_dung/noi_dung.ts')

  const thu: Muc_sua[] = []
  for (const [ten, gia_tri] of Object.entries(noi_dung)) {
    duyet(gia_tri, [ten], 'noi_dung/noi_dung.ts', thu)
  }
  return thu
}

/** Gửi một thay đổi về máy chủ phát triển để ghi vào tệp nguồn.
 *
 *  truong là tên trường bên trong câu chữ, hiện chỉ có 'vi'. Để null với những
 *  chuỗi trần nằm thẳng trong mảng, ví dụ tên công nghệ trong ngăn xếp. */
export async function ghi_vao_nguon(
  muc: Muc_sua,
  truong: 'vi' | null,
  gia_tri: string,
): Promise<void> {
  const duong_dan = truong === null ? muc.duong_dan : [...muc.duong_dan, truong]
  await ghi_chuoi(muc.tep, duong_dan, gia_tri)
}
