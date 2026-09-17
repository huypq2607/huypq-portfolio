# Trang giới thiệu cá nhân

Một trang tĩnh giới thiệu Phạm Quang Huy, kỹ sư dữ liệu và phân tích dữ liệu.

Các mục của trang bám theo các mục của CV, cùng thứ tự: mục tiêu nghề nghiệp,
kinh nghiệm làm việc, dự án nổi bật, kỹ năng chuyên môn, học vấn và chứng chỉ.
Nhà tuyển dụng hay đọc CV trước rồi mới mở trang, hoặc ngược lại, và hai bên
nói khác nhau một con số là hỏng niềm tin vào cả hai.

Trang chỉ có tiếng Việt. Bản tiếng Anh từng tồn tại và đã gỡ hẳn.

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
noi_dung/        Toàn bộ chữ nghĩa gom một chỗ
  kieu.ts        Kiểu dữ liệu, trong đó Song là một câu chữ
  noi_dung.ts    Nội dung thật: hồ sơ, mục tiêu, kinh nghiệm, dự án, kỹ năng

src/
  ngon_ngu.tsx   Lấy chữ ra khỏi tệp nội dung, và chế độ sửa chữ tại chỗ
  nen.tsx        Chế độ nền sáng và nền tối
  hieu_ung.ts    Lộ ra khi cuộn, vạch tiến độ, quầng sáng theo con trỏ
  giao_dien.css  Dải màu sáu bậc, phông chữ, chuyển động
  main.tsx       Ráp trang
  thanh_phan/    Các khối giao diện

scripts/
  kiem_tra_moi_truong.ts   Cổng 1, chạy trước khi dev và build
  cham_thu_noi_dung.ts     Cổng 2, kiểm nội dung
  do_kich_thuoc.ts         Cổng 3, đo dung lượng và canh rò rỉ sau khi dựng

plugins/         Chỉ chạy lúc phát triển
  sua_noi_dung.ts          Tuyến ghi chữ ngược vào tệp nguồn
  thay_chuoi_trong_ma.ts   Thay đúng một chuỗi qua cây cú pháp TypeScript

src/sua/         Phần sửa chữ, chỉ có lúc phát triển
  ban_do.ts                Tra từ một câu chữ ra vị trí của nó trong nguồn
  TrangSua.tsx             Bảng liệt kê toàn bộ chuỗi tại /sua

cong_khai/       Tệp tĩnh chép nguyên sang dist
  giao_dien_som.js   Đặt chế độ nền trước khi trang vẽ khung hình đầu tiên
docker/          Dockerfile và Caddyfile cho đường lui về VPS
```

### Vì sao mọi chữ nghĩa nằm trong một tệp

Chữ nằm lẫn trong JSX thì sửa một câu là phải đi lần mò qua các thành phần, và
người sửa không bao giờ đọc được toàn bộ nội dung trang trong một lượt. Gom một
chỗ thì đọc từ trên xuống là thấy hết, kể cả chỗ viết hớ.

Mỗi câu chữ là một **đối tượng** `{ vi }` chứ không phải chuỗi trần, dù bên
trong chỉ có đúng một trường. Đó là điều kiện để chế độ sửa tại chỗ chạy được:
nó tra ngược từ chính đối tượng ấy ra đường dẫn khoá trong tệp nguồn, mà tra
ngược theo danh tính đối tượng thì chỉ làm được với đối tượng. Chuỗi trần thì
hai câu giống hệt nhau ở hai chỗ khác nhau là cùng một giá trị, và không cách
nào biết người ta đang sửa câu nào.

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
| Nội dung | `npm run cham-thu-noi-dung` | Câu chữ rỗng; còn chỗ trống chưa điền số, dấu `__`; thiếu một nơi làm việc; dự án không nêu được giá trị mang lại; mã dự án trùng nhau; địa chỉ thư sai dạng |
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

### Dải màu là thông tin, không phải trang trí

Dây chuyền dữ liệu sáu chặng là một chuỗi **có thứ tự**: đầu này là dữ liệu thô
lạnh ngắt vừa lấy về, đầu kia là lúc một con người nhận được cảnh báo. Nên bảng
màu của trang không phải một màu nhấn cộng xám, mà là một **dải liên tục từ xanh
băng tới hổ phách** trải đúng theo sáu chặng đó. Hai đầu dải trở thành màu nhấn
của cả trang.

Nhờ vậy màu ở đây mang thông tin: nhìn một đốm hổ phách là biết nó thuộc bậc
cuối của một chuỗi, nhìn một đốm xanh băng là biết nó thuộc bậc đầu. Dải ấy
xuất hiện lại ở ba chỗ, và mỗi chỗ vẫn mang đúng một nghĩa là **vị trí trong
một chuỗi có thứ tự**: sơ đồ dây chuyền sáu chặng, dòng thời gian nghề nghiệp,
và vạch tiến độ cuộn.

Đây cũng là cách tô màu đúng cho dữ liệu có thứ tự, giống hệt cách chọn bảng
màu cho một biểu đồ.

### Hai chế độ nền

Nền tối là mặc định. Nó là xanh đen thật, có sắc lam đo được, chứ không phải
đen ngả xám: nền xám trung tính làm mọi màu nhấn trên nó trông bẩn đi một nấc,
và đó là lỗi hay gặp nhất ở các trang nền tối.

Nền sáng dùng **cùng một dải nhưng tối và đậm hơn**, vì màu sáng trên nền trắng
tụt độ tương phản xuống dưới mức đọc được. Thứ tự sắc độ giữ nguyên nên ý nghĩa
của dải không đổi giữa hai chế độ.

Lựa chọn nhớ trong `localStorage` và được đặt vào thẻ `html` bởi
`cong_khai/giao_dien_som.js` **trước khi trang vẽ khung hình đầu tiên**. Không
có bước đó thì người đã chọn nền sáng sẽ thấy một nháy tối mỗi lần mở trang, và
không có cách nào sửa nháy ấy từ React.

Đó là một tệp riêng chứ không phải thẻ `script` nội tuyến, vì
`Content-Security-Policy` khai `script-src 'self'` mà **không** kèm
`'unsafe-inline'`. Giữ được điều đó đáng giá hơn nhiều so với một lần gọi mạng
vài trăm byte.

### Chữ

**Be Vietnam Pro** lo toàn bộ phần chữ nghĩa, từ tiêu đề lớn nhất tới đoạn văn,
vì phông này được dựng riêng cho dấu tiếng Việt. Cá tính của
tiêu đề đến từ độ đậm 800 cộng khoảng chữ âm chứ không đến từ một phông thứ hai.

**Cao dòng của tiêu đề là chỗ dễ hỏng nhất của một trang tiếng Việt.** Chữ có cả
dấu mũ lẫn dấu thanh, ví dụ `ữ`, `ườ`, `ệ`, cần chỗ đứng theo chiều dọc; nén cao
dòng xuống dưới 1 thì dấu của dòng dưới chạm chân dòng trên, và cỡ chữ càng lớn
thì càng lộ. Trang này để 1.04, mức vẫn cho khối chữ đóng lại thành một mảng đặc
mà không ăn vào dấu.

**JetBrains Mono** chỉ dùng cho định danh thật: tên tầng, mã lỗi SQLSTATE, tên
công cụ, câu lệnh. Đó không phải một lựa chọn thẩm mỹ mà là để phân biệt chữ
người viết với chữ máy hiểu. Không dùng cho nhãn thường, vì khi ấy nó chỉ là
một lớp trang trí giả vờ kỹ thuật.

### Hai hình mang toàn bộ phần táo bạo

- **Sơ đồ dây chuyền sáu chặng** trong khối VETC. Màu gán theo thứ tự chặng
  trong tệp nội dung, nên đảo hai chặng là hình đảo theo: hình không bao giờ nói
  khác dữ liệu. Có đúng một khoảnh khắc chuyển động trên cả trang, là vệt sáng
  chạy dọc dây chuyền một lần khi cuộn tới.
- **Dòng thời gian nghề nghiệp** cạnh đoạn mục tiêu. Bốn mốc dựng lại từ chính
  HOC_VAN, CHUNG_CHI và KINH_NGHIEM chứ không chép tay, nên sửa một nơi là nó
  đổi theo.

Màn hẹp đổi hẳn bố cục sơ đồ thành danh sách dọc thay vì bắt cuộn ngang. Ép
người xem cuộn ngang để đọc một sơ đồ là cách chắc chắn khiến họ bỏ qua nó.

### Trên điện thoại

Bốn quyết định riêng cho màn hẹp, và cả bốn đều là thay đổi thật chứ không phải
để mặc lưới tự co:

- **Sơ đồ dây chuyền đổi hẳn bố cục** thành danh sách dọc, kèm đường nối dọc
  riêng cho trạng thái ấy. Sáu cột nhồi vào ba trăm điểm ảnh thì nhãn chặng nào
  cũng vỡ chữ, và ép người xem cuộn ngang để đọc một sơ đồ là cách chắc chắn
  khiến họ bỏ qua nó.
- **Ảnh và hồ sơ chen lên trước phần giới thiệu dài.** Giữ nguyên thứ tự của màn
  rộng thì khuôn mặt bị đẩy xuống dưới hai đoạn văn, tức người xem phải cuộn qua
  gần một màn hình mới thấy mình đang đọc về ai.
- **Hai nút điều khiển cao 40 điểm ảnh** rồi thu về 32 từ mức `sm`. Ngón tay
  không trỏ chính xác được như con trỏ chuột, và đó là hai nút duy nhất luôn
  hiện trên mọi khổ màn hình.
- **Quầng sáng tắt trên thiết bị cảm ứng.** `pointermove` trên màn cảm ứng chỉ
  sinh ra khi người ta đang miết ngón tay để cuộn, nên quầng sáng sẽ nhảy giật
  theo mỗi lần chạm rồi đứng im ở chỗ ngón tay vừa rời đi.

Cỡ chữ của địa chỉ thư có sàn đủ thấp để nó nằm trọn một dòng ở khổ 320 điểm
ảnh, kèm `break-words` làm lưới an toàn. Địa chỉ thư là thứ duy nhất trên trang
vừa dài vừa không ngắt được ở giữa, nên nó là chỗ đầu tiên làm trang tràn ngang.

### Chuyển động

Bốn nhóm, và mỗi nhóm chỉ chạy một lần:

| Nhóm | Khi nào | Làm gì |
|---|---|---|
| Mở màn | Lúc tải trang | Từng khối của phần mở đầu dựng lên lần lượt theo đúng thứ tự người ta đọc |
| Sơ đồ | Lúc tải trang | Đường dữ liệu chạy từ trái sang phải, các cột dựng lên theo khi đường đi qua |
| Lộ ra | Khi cuộn tới | Các khối hiện dần, so le nhau, gắn bằng `IntersectionObserver` nên không chạy lại khi cuộn ngược lên |
| Đếm số | Khi con số lọt vào tầm mắt | Ba ô số liệu của mỗi nơi làm việc đếm lên rồi dừng |

Thêm hai thứ chạy liên tục nhưng rất nhẹ: quầng sáng đi theo con trỏ trong phần
mở đầu, và vạch tiến độ cuộn trên thanh đầu trang.

**Tất cả tắt hẳn khi trình duyệt báo `prefers-reduced-motion`.** Đó không phải
phép lịch sự: với một số người, chuyển động trên màn hình gây chóng mặt thật, và
một trang giới thiệu không đáng để đánh đổi điều đó lấy vẻ đẹp.

Hai chi tiết kỹ thuật đáng nhớ nếu sau này sửa:

- Vạch tiến độ đặt `scaleX` chứ không đặt `width`, vì `scaleX` chạy trên luồng
  hợp thành và không buộc trình duyệt tính lại bố cục ở mỗi khung hình.
- Quầng sáng chỉ ghi hai biến CSS từ sự kiện con trỏ, phần vẽ để CSS lo. Làm
  bằng trạng thái React thì mỗi lần chuột nhúc nhích là một lần vẽ lại cây.

## Hai hình trên trang

Cả hai đều là SVG và CSS thuần, không kéo thêm thư viện vẽ nào, và cả hai đều
dựng lại từ chính tệp nội dung chứ không chép số sang một chỗ riêng.

**Sơ đồ dây chuyền sáu chặng** trong khối VETC. Sáu chấm nối nhau, màu lấy theo
thứ tự chặng trên dải màu của trang. Từ 768px trở lên xếp ngang đủ sáu cột, hẹp
hơn thì xếp dọc, và mỗi trạng thái có đường nối riêng để chiều đi của dữ liệu
luôn nhìn ra được. Ba cột thì không làm, vì đường nối dọc khi ấy sẽ nối xuống ô
cách ba chặng, tức hình nói sai thứ tự.

**Dòng thời gian nghề nghiệp** cạnh đoạn mục tiêu. Bốn mốc dựng lại từ HOC_VAN,
CHUNG_CHI và KINH_NGHIEM, nên sang năm sửa một nơi là nó đổi theo.

Ngoài ra còn **dải những con số đã đổi được**: năm ô, ô nào đo được cả hai đầu
thì vẽ mức cũ mờ rồi một vạch dẫn sang mức mới. Ô nào chỉ đo được phần chênh thì
để nguyên mức chênh, không bịa ra một mốc "trước" mà không ai từng đo.

---

## Sửa chữ mà không mở tệp mã

Chạy `npm run dev` rồi dùng thanh công cụ ở góc dưới phải. Có hai lối, dùng
chung một đường ghi vào tệp nguồn. **Rời con trỏ khỏi ô là ghi thẳng vào tệp
nguồn**, rồi Vite nạp lại trang; vị trí cuộn và chế độ sửa giữ nguyên.

**Sửa chữ tại chỗ** — bấm nút để bật, rồi bấm thẳng vào bất kỳ câu chữ nào trên
trang và gõ. Enter lưu và thoát, Escape huỷ, Shift+Enter xuống dòng. Dùng khi
sửa vài từ và cần thấy câu chữ trong đúng bối cảnh của nó.

**Bảng** tại `/sua` — liệt kê toàn bộ chuỗi thành cặp ô Việt và Anh đặt cạnh
nhau, có tìm kiếm. Dùng khi rà soát một lượt, và vì hai bản cạnh nhau thì chỗ
quên dịch lộ ra ngay lúc đang gõ.

### Ba cái bẫy đã gặp thật khi dựng phần này

- **contentEditable và React đánh nhau.** Nếu để React dựng nút chữ bên trong ô,
  trình duyệt thay nút ấy lúc người ta gõ, rồi lần vẽ lại kế tiếp React đi gỡ
  đúng nút đã không còn và vỡ với `NotFoundError: removeChild`, sập trắng cả
  trang. Cách chữa: thẻ `span` **không có con trong JSX**, chữ đặt bằng tay qua
  tham chiếu, và không đặt lại khi ô đang được gõ.
- **`createRoot` gọi lại mỗi lần nạp nóng.** Sửa chữ thì tệp bị ghi liên tục,
  `main.tsx` chạy lại, `createRoot` gọi lần hai trên cùng phần tử và React mất
  dấu cây cũ. Gốc React cất trong `import.meta.hot.data` để sống qua các lần cập
  nhật.
- **Điều kiện hiện thanh công cụ phải là `import.meta.env.DEV` viết thẳng ra**,
  không được lấy cờ tương đương qua ngữ cảnh. Lấy qua ngữ cảnh là giá trị lúc
  chạy, Rollup không gấp được nhánh, và chuỗi chữ của thanh công cụ vẫn nằm
  trong gói phát hành. Cổng `do_kich_thuoc` canh đúng điều này.

### Vì sao đi qua cây cú pháp chứ không tìm và thay chuỗi

Trong hai tệp nội dung có **49 chuỗi bị lặp**, ví dụ `Trino`, `Telesales`,
`Mỗi giờ`. Tìm và thay chuỗi thì không biết phải đổi chỗ nào, và đổi nhầm là
hỏng lặng lẽ: tệp vẫn biên dịch, trang vẫn chạy, chỉ có một câu ở đâu đó đổi
theo mà không ai để ý.

Đi theo đường dẫn khoá trên cây cú pháp thì luôn tới đúng một nút, và vì chỉ cắt
đổi đúng đoạn byte của nút đó nên **mọi chú thích và định dạng giữ nguyên**. Đây
cũng là lý do nội dung không chuyển sang JSON: JSON không có chú thích, mà phần
lớn giá trị của hai tệp ấy nằm ở lý do viết trong chú thích chứ không ở câu chữ.

### Ba lớp giữ cho nó không ra tới máy thật

- Plugin khai `apply: 'serve'`, không tồn tại trong bản phát hành.
- Danh sách tệp được phép sửa là **danh sách trắng cố định**, hai tệp nội dung.
  Nhận tên tệp từ trình duyệt rồi ghi thẳng là đường để ghi đè bất kỳ tệp nào
  trên máy, kể cả khi máy chủ chỉ chạy trên localhost.
- `npm run do-kich-thuoc` trượt nếu tìm thấy dấu vết trang sửa trong `dist`.
  Đã đo có kiểm soát: bật hay tắt trang sửa thì tệp JS **y hệt nhau**, chỉ CSS
  chênh 0,8 KB do Tailwind quét thêm lớp của nó.

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
| Phông chữ | Be Vietnam Pro, JetBrains Mono |
| Ngôn ngữ | TypeScript, chế độ nghiêm ngặt |
| Chạy script | tsx, không có bước biên dịch riêng |
| Máy chủ tĩnh | GitHub Pages, hoặc Caddy 2 khi chạy bằng Docker |

Dung lượng phải tải về khi mở trang: khoảng **96 KB sau khi nén**, trong đó
phần lớn là React. Trần đặt ở 110 KB. Ba biểu đồ vẽ bằng SVG nội tuyến và CSS,
không kéo thêm thư viện biểu đồ nào.

---

## Sửa nội dung

Gần như mọi thay đổi chỉ động tới `noi_dung/noi_dung.ts`. Sửa xong chạy:

```bash
npm run cham-thu-noi-dung
```

Vài điều dễ quên:

- **Khối số liệu của một nơi làm việc cần từ hai ô trở lên**, vì nó là lưới ba
  cột. Một con số đứng lẻ trông như phần còn lại chưa nạp xong.
- **Hai nơi làm việc phải giữ mã `vetc` và `shine`.** Sơ đồ dây chuyền và dải
  con số gắn vào khối VETC theo mã, nên đổi mã là hình lạc sang nơi khác.
- **Mỗi dự án nổi bật phải nêu được giá trị mang lại.** Dự án không đổi được gì
  cho doanh nghiệp thì thuộc về phần kinh nghiệm, không thuộc mục này, và cổng
  canh gác chặn lệnh dựng khi danh sách ấy rỗng.
- **Đừng làm tròn số lên cho đẹp.** Một con số sai trên trang giới thiệu làm
  hỏng niềm tin vào mọi con số còn lại.

---

## Việc còn để ngỏ

- **Chưa có LinkedIn** trong phần liên hệ. Bốn kênh hiện có là GitHub,
  dapractice, Threads và TikTok; thêm một mục vào `LIEN_HE.kenh` trong
  `noi_dung/noi_dung.ts` là xong, giao diện tự giãn theo.
- **Chưa có bản CV tải về.** Nội dung trên trang đã đủ dựng một tệp PDF một
  trang, chỉ thiếu phần dựng và một nút.
- **Chưa có đo lường.** Nếu muốn biết người xem dừng ở mục nào thì thêm Umami
  như dapractice đang dùng, nhớ khai cả hai miền của nó vào
  `Content-Security-Policy` trong `docker/Caddyfile`.
