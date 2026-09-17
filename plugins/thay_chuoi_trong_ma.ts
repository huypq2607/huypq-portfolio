// Thay đúng một chuỗi trong tệp nguồn TypeScript, không đụng gì khác.
//
// Vì sao phải đi qua cây cú pháp thay vì tìm và thay chuỗi:
//
// Trong hai tệp nội dung có 49 chuỗi bị lặp, ví dụ "Trino", "Telesales",
// "Mỗi giờ". Tìm và thay chuỗi thì không biết phải đổi chỗ nào, và đổi nhầm
// chỗ là hỏng lặng lẽ: tệp vẫn biên dịch được, trang vẫn chạy, chỉ có một câu
// ở đâu đó đổi theo mà không ai để ý.
//
// Đi theo đường dẫn khoá trên cây cú pháp thì luôn tới đúng một nút. Và vì chỉ
// cắt đổi đúng đoạn byte của nút đó, mọi chú thích và định dạng của tệp giữ
// nguyên. Đây là điều mà chuyển nội dung sang JSON sẽ làm mất: JSON không có
// chú thích, mà phần lớn giá trị của hai tệp ấy nằm ở lý do viết trong chú
// thích chứ không ở bản thân câu chữ.

import ts from 'typescript'

/** Một đoạn của đường dẫn: tên thuộc tính, hoặc chỉ số trong mảng. */
export type Doan_duong_dan = string | number

/** Bóc các lớp bọc không đổi giá trị, ví dụ as const hay satisfies Song. */
function boc_lop(nut: ts.Expression): ts.Expression {
  let hien_tai = nut
  for (;;) {
    if (
      ts.isAsExpression(hien_tai) ||
      ts.isSatisfiesExpression(hien_tai) ||
      ts.isParenthesizedExpression(hien_tai)
    ) {
      hien_tai = hien_tai.expression
      continue
    }
    return hien_tai
  }
}

/** Tìm giá trị khởi tạo của một hằng xuất ra ở cấp cao nhất của tệp. */
function tim_hang_xuat(tep: ts.SourceFile, ten: string): ts.Expression | null {
  for (const cau_lenh of tep.statements) {
    if (!ts.isVariableStatement(cau_lenh)) continue
    const co_xuat = cau_lenh.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (co_xuat !== true) continue

    for (const khai_bao of cau_lenh.declarationList.declarations) {
      if (!ts.isIdentifier(khai_bao.name) || khai_bao.name.text !== ten) continue
      if (khai_bao.initializer === undefined) continue
      return boc_lop(khai_bao.initializer)
    }
  }
  return null
}

/** Đi một đoạn đường dẫn, từ một nút sang nút con của nó. */
function di_mot_doan(nut: ts.Expression, doan: Doan_duong_dan): ts.Expression | null {
  if (typeof doan === 'number') {
    if (!ts.isArrayLiteralExpression(nut)) return null
    const phan_tu = nut.elements[doan]
    return phan_tu === undefined ? null : boc_lop(phan_tu)
  }

  if (!ts.isObjectLiteralExpression(nut)) return null
  for (const thuoc_tinh of nut.properties) {
    if (!ts.isPropertyAssignment(thuoc_tinh)) continue

    const ten_khoa = ts.isIdentifier(thuoc_tinh.name)
      ? thuoc_tinh.name.text
      : ts.isStringLiteral(thuoc_tinh.name)
        ? thuoc_tinh.name.text
        : null

    if (ten_khoa === doan) return boc_lop(thuoc_tinh.initializer)
  }
  return null
}

/** Dựng một chuỗi TypeScript nháy đơn từ giá trị thật. */
export function dung_chuoi_ts(gia_tri: string): string {
  const da_thoat = gia_tri
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
  return `'${da_thoat}'`
}

export interface Ket_qua_thay {
  readonly van_ban: string
  readonly gia_tri_cu: string
}

/**
 * Trả về nội dung tệp sau khi thay, hoặc ném lỗi nói rõ hỏng ở đâu.
 *
 * Ném lỗi chứ không trả về null, vì mọi nhánh hỏng ở đây đều là lỗi lập trình
 * hoặc đường dẫn sai, và cả hai đều phải hiện ngay ra màn hình người đang sửa
 * chứ không được nuốt đi rồi báo lưu thành công.
 */
export function thay_chuoi_trong_ma(
  van_ban: string,
  ten_tep: string,
  duong_dan: readonly Doan_duong_dan[],
  gia_tri_moi: string,
): Ket_qua_thay {
  if (duong_dan.length === 0) throw new Error('Đường dẫn rỗng')

  const tep = ts.createSourceFile(ten_tep, van_ban, ts.ScriptTarget.ES2022, true)

  const [ten_hang, ...con_lai] = duong_dan
  if (typeof ten_hang !== 'string') throw new Error('Đoạn đầu của đường dẫn phải là tên hằng')

  let nut = tim_hang_xuat(tep, ten_hang)
  if (nut === null) throw new Error(`Không tìm thấy hằng xuất ra tên ${ten_hang}`)

  for (const doan of con_lai) {
    const con = di_mot_doan(nut, doan)
    if (con === null) throw new Error(`Không đi được tới đoạn ${String(doan)} trong ${ten_hang}`)
    nut = con
  }

  if (!ts.isStringLiteral(nut) && !ts.isNoSubstitutionTemplateLiteral(nut)) {
    throw new Error('Đích của đường dẫn không phải một chuỗi')
  }

  const bat_dau = nut.getStart(tep)
  const ket_thuc = nut.getEnd()

  return {
    van_ban: van_ban.slice(0, bat_dau) + dung_chuoi_ts(gia_tri_moi) + van_ban.slice(ket_thuc),
    gia_tri_cu: nut.text,
  }
}
