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
  quy_trinh.ts   Dây chuyền sáu chặng và ba dashboard minh hoạ của dự án VETC
  quy_trinh.ts   Dây chuyền sáu chặng và ba dashboard minh hoạ của dự án VETC

src/
  ngon_ngu.tsx   Ngôn ngữ đang hiển thị, nhớ trong localStorage
  nen.tsx        Chế độ nền sáng và nền tối
  hieu_ung.ts    Lộ ra khi cuộn, vạch tiến độ, quầng sáng theo con trỏ
  giao_dien.css  Dải màu sáu bậc, phông chữ, chuyển động
  main.tsx       Ráp trang
  thanh_phan/    Các khối giao diện

scripts/
  kiem_tra_moi_truong.ts   Cổng 1, chạy trước khi dev và build
  cham_thu_noi_dung.ts     Cổng 2, kiểm nội dung song ngữ
  do_kich_thuoc.ts         Cổng 3, đo dung lượng và canh rò rỉ sau khi dựng

plugins/         Chỉ chạy lúc phát triển
  sua_noi_dung.ts          Tuyến ghi chữ ngược vào tệp nguồn
  thay_chuoi_trong_ma.ts   Thay đúng một chuỗi qua cây cú pháp TypeScript

src/sua/         Phần sửa chữ, chỉ có lúc phát triển
  ban_do.ts                Tra từ một cặp song ngữ ra vị trí của nó trong nguồn
  TrangSua.tsx             Bảng liệt kê toàn bộ chuỗi tại /sua

cong_khai/       Tệp tĩnh chép nguyên sang dist
  giao_dien_som.js   Đặt chế độ nền trước khi trang vẽ khung hình đầu tiên
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

### Dải màu là thông tin, không phải trang trí

Sáu tầng dữ liệu là một chuỗi **có thứ tự**: đầu này là dữ liệu thô lạnh ngắt,
đầu kia là bảng phục vụ nơi nghiệp vụ chạm vào. Nên bảng màu của trang không
phải một màu nhấn cộng xám, mà là một **dải liên tục từ xanh băng tới hổ phách**
trải đúng theo sáu tầng đó. Hai đầu dải trở thành màu nhấn của cả trang.

Nhờ vậy màu ở đây mang thông tin: nhìn một đốm hổ phách là biết nó thuộc bậc
cuối của một chuỗi, nhìn một đốm xanh băng là biết nó thuộc bậc đầu. Dải ấy
xuất hiện lại ở bảng bảy lớp hộp cát, ở bốn ô số liệu của mỗi dự án, ở bốn thẻ
liên hệ, và ở vạch tiến độ cuộn — mỗi nơi vẫn mang đúng một nghĩa là **vị trí
trong một chuỗi có thứ tự**.

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
vì trang song ngữ và phông này được dựng riêng cho dấu tiếng Việt. Cá tính của
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

- **Sơ đồ sáu tầng** ngay dưới phần mở đầu. Chiều cao cột tỷ lệ **thẳng** với
  số model, không lấy căn bậc hai cho dễ nhìn. Tầng landing chỉ có 3 model nên
  cột của nó gần như một vạch, và đó là sự thật đáng thấy chứ không phải khuyết
  điểm của hình.
- **Bảng bảy lớp hộp cát** trong dự án thứ hai. Mỗi hàng thụt vào sâu hơn hàng
  trên một nấc và mang một màu nội suy trên dải, nên bảng tự nói ra rằng đây là
  bảy lớp bọc lấy nhau.

Màn hẹp đổi hẳn bố cục sơ đồ thành danh sách dọc thay vì bắt cuộn ngang. Ép
người xem cuộn ngang để đọc một sơ đồ là cách chắc chắn khiến họ bỏ qua nó.

### Trên điện thoại

Bốn quyết định riêng cho màn hẹp, và cả bốn đều là thay đổi thật chứ không phải
để mặc lưới tự co:

- **Sơ đồ sáu tầng đổi hẳn bố cục** thành danh sách dọc với thanh ngang. Sáu cột
  nhồi vào ba trăm điểm ảnh thì nhãn tầng nào cũng vỡ chữ, và ép người xem cuộn
  ngang để đọc một sơ đồ là cách chắc chắn khiến họ bỏ qua nó.
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
| Đếm số | Khi con số lọt vào tầm mắt | Bốn ô số liệu của mỗi dự án đếm lên rồi dừng |

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

## Biểu đồ và số liệu minh hoạ

Dự án VETC có hai khối riêng: **dây chuyền sáu chặng** từ lấy dữ liệu tới hộp
thư lúc bảy giờ sáng và tới cảnh báo bất thường, rồi **ba dashboard minh hoạ**
cho thấy bộ dữ liệu ấy trả lời được loại câu hỏi nào.

### Số liệu là số mô phỏng, và trang nói rõ điều đó

Ba dashboard dùng **số mô phỏng, không phải số thật của VETC**. Dữ liệu thật là
dữ liệu nội bộ và có thông tin cá nhân, không được phép rời khỏi hệ thống.

Điều đó được ghi ngay trên từng khối chứ không giấu xuống chân trang, vì một
người tuyển dụng đọc lướt mà tưởng đây là số thật rồi sau mới biết là số bịa thì
mất niềm tin vào cả trang, kể cả những phần hoàn toàn đúng.

### Ba khối, ba thể loại hình, ba luật tô màu

Thể loại hình chọn theo việc của dữ liệu chứ không theo cái nào đẹp hơn:

| Khối | Dữ liệu làm việc gì | Thể loại | Màu |
|---|---|---|---|
| Phễu tái tục | Cùng một phép đo ở bốn bậc | Thanh ngang thu dần | Dải tuần tự một sắc |
| Cơ cấu kênh | Bốn thực thể khác loại | Thanh xếp chồng | Bảng phân loại bốn sắc |
| Theo dõi lệch | Chuỗi thời gian có dải kỳ vọng | Đường kèm dải | Một sắc, cộng màu trạng thái |

Ba bảng màu khai riêng trong `src/giao_dien.css`, tách khỏi dải sáu tầng của
trang, và **tính riêng cho từng chế độ nền** chứ không lật ngược bộ của nền tối:
màu sáng trên nền trắng tụt cả độ tương phản lẫn khoảng cách nhận biết.

Cả ba bộ đã chạy qua bộ kiểm dải màu: dải độ sáng, sàn độ bão hoà, khoảng cách
giữa các cặp kề nhau dưới mô phỏng mù màu, và độ tương phản với nền của khối
biểu đồ. Đổi một mã màu trong đó thì **phải chạy lại bộ kiểm**, đừng ước lượng
bằng mắt.

Ba luật không được phá:

- **Bảng phân loại giữ thứ tự cố định, không bao giờ xoay vòng.** Kênh nào cũng
  giữ nguyên màu của nó kể cả khi bộ lọc bỏ bớt kênh khác đi.
- **Dải tuần tự là một sắc chạy từ nhạt tới đậm**, tuyệt đối không phải cầu vồng.
- **Màu trạng thái là màu dành riêng.** Không bao giờ mượn nó làm màu thứ năm
  của bảng phân loại, và nó luôn đi kèm biểu tượng với chữ, không bao giờ chỉ
  nói bằng màu.

### Mọi giá trị đều có mặt dưới dạng chữ

Không giá trị nào chỉ tồn tại trong hình. Người không rê được chuột, người dùng
trình đọc màn hình và người in trang ra giấy đều đọc đủ số. Phần rê chuột chỉ là
lớp tiện thêm, và vùng rê là cả hàng chứ không phải riêng thanh màu, vì thanh
chỉ cao vài điểm ảnh.

### Cổng canh gác cho phần số liệu

`npm run cham-thu-noi-dung` kiểm thêm ba điều mà chỉ nhìn ảnh chụp mới thấy:

- Bốn kênh phải cộng lại đúng 100 phần trăm, nếu không thanh xếp chồng vẽ ra
  một tỷ lệ không có thật.
- Phễu phải thu dần, vì một bậc sau lớn hơn bậc trước là phễu phình ra.
- Điểm được đánh dấu cảnh báo phải thật sự nằm ngoài dải kỳ vọng.

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

## Biểu đồ minh hoạ

Dự án VETC có hai khối riêng: **dây chuyền sáu chặng** từ lấy dữ liệu tới báo
cáo Outlook và cảnh báo bất thường, rồi **ba dashboard** vẽ bằng SVG nội tuyến
với CSS, không kéo thêm thư viện nào.

**Số liệu là số mô phỏng, không phải số thật của VETC**, và trang nói rõ điều đó
ngay trên khối chứ không giấu xuống chân trang.

Thể loại hình chọn theo việc của dữ liệu:

| Khối | Dữ liệu | Màu |
|---|---|---|
| Cột, doanh thu theo tháng | Một chuỗi theo thời gian | Một sắc duy nhất |
| Tròn, cơ cấu theo kênh | Bốn phần của một tổng | Bảng phân loại bốn sắc |
| Đường, cảnh báo bất thường | Chuỗi thời gian có dải kỳ vọng | Một sắc, cộng màu trạng thái |

Ba bảng màu khai riêng trong `src/giao_dien.css`, tính riêng cho từng chế độ nền
chứ không lật ngược bộ của nền tối, và đã chạy qua bộ kiểm dải màu: độ sáng, độ
bão hoà, khoảng cách giữa các cặp kề nhau dưới mô phỏng mù màu, độ tương phản
với nền. **Đổi một mã màu thì phải chạy lại bộ kiểm**, đừng ước lượng bằng mắt.

Ba luật không phá: bảng phân loại giữ thứ tự cố định không xoay vòng; cột của
một chuỗi duy nhất dùng một sắc, không tô theo thứ hạng; màu trạng thái là màu
dành riêng và luôn đi kèm biểu tượng với chữ.

`npm run cham-thu-noi-dung` kiểm thêm: bốn kênh cộng đúng 100 phần trăm, cột nào
cũng lớn hơn 0, và điểm đánh dấu cảnh báo thật sự nằm ngoài dải kỳ vọng.

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

- **Chưa có LinkedIn** trong phần liên hệ. Bốn kênh hiện có là GitHub,
  dapractice, Threads và TikTok; thêm một mục vào `LIEN_HE.kenh` trong
  `noi_dung/noi_dung.ts` là xong, giao diện tự giãn theo.
- **Chưa có bản CV tải về.** Nội dung trên trang đã đủ dựng một tệp PDF một
  trang, chỉ thiếu phần dựng và một nút.
- **Chưa có đo lường.** Nếu muốn biết người xem dừng ở mục nào thì thêm Umami
  như dapractice đang dùng, nhớ khai cả hai miền của nó vào
  `Content-Security-Policy` trong `docker/Caddyfile`.
