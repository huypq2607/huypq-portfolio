# Trang giới thiệu cá nhân

Một trang tĩnh song ngữ Việt và Anh, giới thiệu Phạm Quang Huy và hai dự án:
lakehouse Iceberg quy mô tập đoàn tại VETC, và dapractice, nền tảng luyện SQL
tự dựng và tự vận hành.

Người đọc chính là nhà tuyển dụng nước ngoài và các vị trí remote, nên bản
tiếng Anh là bản mặc định. Bản tiếng Việt bật bằng nút trên thanh đầu trang.

- Địa chỉ công khai dự kiến: `https://huypq.dapractice.site`
- Phát hành: GitHub Actions đẩy thẳng bản dựng lên GitHub Pages

---

## Chạy nhanh

```bash
cp .env.example .env     # chỉ có một biến, không có bí mật nào
npm install
npm run dev              # mở http://localhost:5173
```

Dựng bản phát hành và chạy toàn bộ cổng canh gác:

```bash
npm run build
npm run preview          # xem đúng thứ sẽ ra máy thật
```

---

## Kiến trúc

Không có máy chủ, không có cơ sở dữ liệu, không có API. Toàn bộ sản phẩm là
một thư mục tệp tĩnh.

```
noi_dung/        Toàn bộ chữ nghĩa, song ngữ, gom một chỗ
  kieu.ts        Kiểu dữ liệu, trong đó Song là cặp { vi, en }
  noi_dung.ts    Nội dung thật: hồ sơ, sáu tầng, hai dự án, kỹ năng

src/
  ngon_ngu.tsx   Ngôn ngữ đang hiển thị, nhớ trong localStorage
  giao_dien.css  Bảng màu, phông chữ, chuyển động
  main.tsx       Ráp trang
  thanh_phan/    Các khối giao diện

scripts/
  kiem_tra_moi_truong.ts   Cổng 1, chạy trước khi dev và build
  cham_thu_noi_dung.ts     Cổng 2, kiểm nội dung song ngữ
  do_kich_thuoc.ts         Cổng 3, đo dung lượng và canh rò rỉ sau khi dựng

cong_khai/       Tệp tĩnh chép nguyên sang dist: ảnh, biểu tượng, CNAME
docker/          Dockerfile và Caddyfile cho đường lui về VPS
```

### Vì sao mọi chữ nghĩa nằm trong một tệp

Trang song ngữ, và mỗi lần sửa một câu là phải sửa cả hai bản. Nếu chữ nằm lẫn
trong JSX thì việc đó thành lần mò, và bản tiếng Việt sẽ dần tụt lại sau bản
tiếng Anh mà không ai nhận ra.

Hai bản nằm **cạnh nhau** trong cùng một đối tượng chứ không phải hai tệp song
song, vì hai tệp song song chắc chắn sẽ lệch: người sửa một câu tiếng Anh
không có gì nhắc rằng câu tiếng Việt tương ứng đang ở đâu.

### Vì sao không có bộ định tuyến

Trang chỉ có một màn duy nhất. Bỏ được bộ định tuyến là bỏ luôn một thư viện
khỏi gói tải về, và bỏ luôn việc phải giữ bảng đường dẫn đồng bộ với cấu hình
máy chủ.

---

## Ba cổng canh gác

Cả ba nhắm vào cùng một loại lỗi: loại vẫn cho trang chạy đúng như thường nên
không ai phát hiện ra.

| Cổng | Lệnh | Bắt được gì |
|---|---|---|
| Môi trường | `npm run kiem-tra-moi-truong` | Thiếu `VITE_DIA_CHI_TRANG`, hoặc địa chỉ không phải https, hoặc thừa dấu gạch chéo cuối |
| Nội dung | `npm run cham-thu-noi-dung` | Chuỗi thiếu một bản ngôn ngữ; hai bản dài giống hệt nhau, tức quên dịch; khối số liệu không đủ bốn ô; bảy lớp hộp cát đánh số đứt quãng; địa chỉ thư sai dạng |
| Dung lượng | `npm run do-kich-thuoc` | Gói vượt 110 KB sau khi nén; ảnh nào đó vượt 120 KB; ảnh gốc chưa xử lý lọt vào bản dựng; `index.html` mất thẻ canonical hoặc còn chuỗi `%VITE_...%` chưa điền |

`npm run build` gọi cả ba theo đúng thứ tự, nên lệnh chạy trên máy phát triển
và lệnh chạy trên CI không bao giờ lệch nhau.

Hai chỗ đáng nói:

**Biến `VITE_` nhúng lúc dựng, không đọc lúc chạy.** Quên khai một biến không
làm lệnh build thất bại, nó chỉ để nguyên chuỗi `%VITE_DIA_CHI_TRANG%` trong
`index.html`, và trang vẫn lên bình thường với một thẻ địa chỉ chuẩn vô nghĩa.
Cổng 1 chặn trước khi dựng, cổng 3 kiểm lại sau khi dựng.

**Ảnh gốc nặng hơn một megabyte** và tên tệp có dấu cách lẫn dấu tiếng Việt.
Nó chỉ cần lọt vào `cong_khai/` một lần là trang nặng gấp mười. Cổng 3 bắt cả
hai chuyện đó.

---

## Ảnh chân dung

Ảnh gốc `Huy đút túi.JPG` (2163 × 2733, khoảng 1 MB) nằm ở gốc kho và **không**
đi vào bản dựng. Bản dùng trên trang là khung vuông đã cắt, xuất ra bốn tệp:

```
cong_khai/chan_dung_400.webp   13 KB
cong_khai/chan_dung_400.jpg    25 KB
cong_khai/chan_dung_800.webp   36 KB
cong_khai/chan_dung_800.jpg    73 KB
```

Bản webp nhẹ hơn khoảng một nửa, bản jpg ở lại để trình duyệt cũ không nhận
được ô trống, và bản 800 dành cho màn hình mật độ cao.

Muốn đổi ảnh thì cắt lại bằng đoạn Python dưới đây, sửa toạ độ khung cho khớp
ảnh mới:

```python
from PIL import Image, ImageOps

goc = ImageOps.exif_transpose(Image.open('ten_anh_moi.JPG'))
khung = goc.crop((521, 247, 521 + 1164, 247 + 1164))   # trái, trên, phải, dưới

for canh in (400, 800):
    anh = khung.resize((canh, canh), Image.LANCZOS)
    anh.save(f'cong_khai/chan_dung_{canh}.webp', 'WEBP', quality=82, method=6)
    anh.save(f'cong_khai/chan_dung_{canh}.jpg', 'JPEG', quality=84,
             optimize=True, progressive=True)
```

`ImageOps.exif_transpose` là bước dễ quên nhất: ảnh chụp bằng điện thoại mang
thẻ hướng trong EXIF, bỏ bước này thì ảnh cắt ra bị xoay ngang.

---

## Thiết kế

Nền giấy xanh lạnh như bản vẽ kỹ thuật, mực xanh navy, và **đúng một** màu nhấn
là xanh mòng két chỉ dùng cho thứ đang chảy hoặc đang sống: đường dữ liệu, các
nút trên sơ đồ, liên kết, địa chỉ thư.

Phông chữ: **Archivo** cho tiêu đề, đặt ở trục chiều rộng giãn nên đọc như chữ
trên bản vẽ; **Be Vietnam Pro** cho nội dung, vì trang song ngữ và phông này
được thiết kế riêng cho dấu tiếng Việt, thứ mà phần lớn phông sans dựng dấu
chồng lên nhau khi chữ có cả dấu mũ lẫn dấu thanh.

Hai hình mang toàn bộ phần táo bạo của trang, mọi thứ còn lại giữ im lặng:

- **Sơ đồ sáu tầng** ngay dưới phần mở đầu. Chiều cao cột tỷ lệ **thẳng** với
  số model, không lấy căn bậc hai cho dễ nhìn. Tầng landing chỉ có 3 model nên
  cột của nó gần như một vạch, và đó là sự thật đáng thấy chứ không phải khuyết
  điểm của hình.
- **Bảng bảy lớp hộp cát** trong dự án thứ hai. Mỗi hàng thụt vào sâu hơn hàng
  trên một nấc, nên bảng tự nói ra rằng đây là bảy lớp bọc lấy nhau.

Cả trang có **đúng một** chuyển động: lúc tải, đường dữ liệu chạy từ trái sang
phải một lần và các cột dựng lên theo khi đường đi qua. Không lặp lại, không có
hiệu ứng nào khi cuộn, và tắt hẳn khi trình duyệt báo `prefers-reduced-motion`.

Màn hẹp đổi hẳn bố cục sơ đồ thành danh sách dọc thay vì bắt cuộn ngang. Ép
người xem cuộn ngang để đọc một sơ đồ là cách chắc chắn khiến họ bỏ qua nó.

---

## Phát hành

### GitHub Pages, đường chính

Đẩy vào nhánh `main` là workflow chạy: cài phụ thuộc, dựng, chạy cả ba cổng,
rồi đưa thư mục `dist` lên Pages. Bản dựng đi thẳng ra máy phục vụ dưới dạng
một hiện vật, **không** qua nhánh `gh-pages`, nên tệp sinh ra không nằm trong
lịch sử kho.

Bốn việc phải làm một lần trước lần phát hành đầu tiên:

1. **Kho phải công khai.** GitHub Pages cho kho riêng tư cần tài khoản trả phí.
   Trang này không có gì phải giấu, nhưng đây là điều cần biết trước.
2. **Settings → Pages → Source** đặt thành **GitHub Actions**, không phải
   Deploy from a branch.
3. **Settings → Pages → Custom domain** điền `huypq.dapractice.site`. Tệp
   `cong_khai/CNAME` đã có sẵn giá trị đó nên mỗi lần dựng lại không mất.
4. **Bản ghi DNS** của `dapractice.site`, thêm một bản ghi CNAME:

   ```
   huypq   CNAME   huypq2607.github.io.
   ```

   Chứng chỉ HTTPS do GitHub tự xin sau khi DNS đã trỏ đúng, thường trong vài
   phút tới một giờ.

Biến `VITE_DIA_CHI_TRANG` khai ở **Settings → Secrets and variables → Actions →
Variables**, không phải Secrets, vì đó là địa chỉ công khai của chính trang.
Quên khai thì workflow dùng giá trị dự phòng đã ghi sẵn.

### Docker, đường lui

Dùng khi muốn chạy thử đúng thứ sẽ ra máy thật, hoặc khi sau này chuyển trang
về VPS nằm sau Caddy của dapractice.

```bash
docker compose up --build        # mở http://localhost:8080
```

Ảnh hai tầng: tầng một dựng, tầng hai chỉ có Caddy và thư mục `dist`. Ảnh cuối
không mang theo Node, `node_modules` hay mã nguồn nào.

Nếu đưa lên VPS thì **không** dựng thêm một Caddy thứ hai, vì cổng 443 đã có
Caddy của dapractice giữ. Cách đúng là thêm một khối site vào Caddyfile của
dapractice rồi chuyển tiếp tên miền con sang container này.

---

## Ngăn xếp

| Thành phần | Lựa chọn |
|---|---|
| Khung dựng | Vite 7 |
| Giao diện | React 19, Tailwind CSS 4 |
| Ngôn ngữ | TypeScript, chế độ nghiêm ngặt |
| Chạy script | tsx, không có bước biên dịch riêng |
| Máy chủ tĩnh | GitHub Pages, hoặc Caddy 2 khi chạy bằng Docker |

Dung lượng phải tải về khi mở trang: khoảng **87 KB sau khi nén**, trong đó
phần lớn là React. Trần đặt ở 110 KB.

---

## Sửa nội dung

Gần như mọi thay đổi chỉ động tới `noi_dung/noi_dung.ts`. Sửa xong chạy:

```bash
npm run cham-thu-noi-dung
```

Vài điều dễ quên:

- **Con số cũng phải có hai bản.** Dấu phân cách hàng nghìn khác nhau giữa hai
  ngôn ngữ: viết `12.027` cho người đọc tiếng Anh là mười hai phẩy không hai
  bảy, tức sai đi một nghìn lần.
- **Khối số liệu của mỗi dự án phải đúng bốn ô**, vì nó là lưới bốn cột. Thừa
  hay thiếu một ô là hàng cuối lệch hẳn.
- **Hai dự án phải giữ mã `vetc` và `dapractice`**, vì `main.tsx` lấy chúng
  theo mã để gắn sơ đồ hộp cát vào đúng dự án.
- **Đừng làm tròn số lên cho đẹp.** Một con số sai trên trang giới thiệu làm
  hỏng niềm tin vào mọi con số còn lại.

---

## Việc còn để ngỏ

- **Chưa có LinkedIn** trong phần liên hệ. Thêm vào `LIEN_HE` trong
  `noi_dung/noi_dung.ts` khi có địa chỉ.
- **Chưa có bản CV tải về.** Nội dung trên trang đã đủ dựng một tệp PDF một
  trang, chỉ thiếu phần dựng và một nút.
- **Chưa có đo lường.** Nếu muốn biết người xem dừng ở mục nào thì thêm Umami
  như dapractice đang dùng, nhớ khai cả hai miền của nó vào
  `Content-Security-Policy` trong `docker/Caddyfile`.
