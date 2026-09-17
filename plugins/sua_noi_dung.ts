// Plugin Vite chỉ chạy lúc phát triển, mở một tuyến để trang /sua ghi chữ
// ngược lại vào tệp nguồn.
//
// apply: 'serve' là điều quan trọng nhất ở đây. Tuyến này ghi tệp trên đĩa,
// nên nó tuyệt đối không được có mặt trong bản phát hành. Không phải vì bản
// phát hành là tệp tĩnh nên không chạy được plugin, mà vì một tuyến ghi tệp
// không bao giờ nên tồn tại ở nơi nó không cần tồn tại.
//
// Danh sách tệp được phép sửa là danh sách trắng cố định. Nhận tên tệp từ
// trình duyệt rồi ghi thẳng là đường để ai đó ghi đè bất kỳ tệp nào trên máy,
// kể cả khi máy chủ chỉ chạy trên localhost.

import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { thay_chuoi_trong_ma, type Doan_duong_dan } from './thay_chuoi_trong_ma.ts'

const DUONG_DAN_TUYEN = '/__sua-text'

/** Chỉ hai tệp này được phép sửa. Mọi tên khác đều bị từ chối. */
const TEP_CHO_PHEP = new Set(['noi_dung/noi_dung.ts'])

interface Yeu_cau_sua {
  readonly tep: string
  readonly duong_dan: readonly Doan_duong_dan[]
  readonly gia_tri: string
}

function la_yeu_cau_hop_le(than: unknown): than is Yeu_cau_sua {
  if (typeof than !== 'object' || than === null) return false
  const y = than as Record<string, unknown>
  return (
    typeof y.tep === 'string' &&
    Array.isArray(y.duong_dan) &&
    y.duong_dan.every((d) => typeof d === 'string' || typeof d === 'number') &&
    typeof y.gia_tri === 'string'
  )
}

export function sua_noi_dung(): Plugin {
  return {
    name: 'sua-noi-dung',
    apply: 'serve',

    configureServer(may_chu) {
      may_chu.middlewares.use(DUONG_DAN_TUYEN, (yeu_cau, tra_loi) => {
        void (async () => {
          const ket = (ma: number, than: unknown) => {
            tra_loi.statusCode = ma
            tra_loi.setHeader('Content-Type', 'application/json; charset=utf-8')
            tra_loi.end(JSON.stringify(than))
          }

          if (yeu_cau.method !== 'POST') {
            ket(405, { loi: 'Chỉ nhận POST' })
            return
          }

          try {
            const manh: Buffer[] = []
            for await (const m of yeu_cau) manh.push(m as Buffer)
            const than: unknown = JSON.parse(Buffer.concat(manh).toString('utf8'))

            if (!la_yeu_cau_hop_le(than)) {
              ket(400, { loi: 'Thân yêu cầu không đúng dạng' })
              return
            }
            if (!TEP_CHO_PHEP.has(than.tep)) {
              ket(403, { loi: `Không được phép sửa tệp ${than.tep}` })
              return
            }

            const duong_dan_that = resolve(may_chu.config.root, than.tep)
            const van_ban = await readFile(duong_dan_that, 'utf8')
            const { van_ban: moi, gia_tri_cu } = thay_chuoi_trong_ma(
              van_ban,
              than.tep,
              than.duong_dan,
              than.gia_tri,
            )

            // Giá trị không đổi thì không ghi. Ghi lại y nguyên vẫn làm Vite
            // nạp lại module và trang nhấp một cái, đủ khó chịu khi người ta
            // đang rà soát nhiều ô liền nhau.
            if (gia_tri_cu === than.gia_tri) {
              ket(200, { da_ghi: false })
              return
            }

            await writeFile(duong_dan_that, moi, 'utf8')
            ket(200, { da_ghi: true })
          } catch (loi) {
            may_chu.config.logger.error(`[sua-noi-dung] ${String(loi)}`)
            ket(500, { loi: loi instanceof Error ? loi.message : String(loi) })
          }
        })()
      })
    },
  }
}
