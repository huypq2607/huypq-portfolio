// Đặt chế độ nền TRƯỚC khi trang vẽ khung hình đầu tiên.
//
// Mặc định trong CSS là nền tối, nên nếu không có đoạn này thì người đã chọn
// nền sáng sẽ thấy một nháy tối mỗi lần mở trang, đúng vào lúc React chưa kịp
// chạy. Nháy đó ngắn nhưng rất khó chịu và không có cách nào sửa từ React.
//
// Đây là tệp riêng chứ không phải thẻ script nội tuyến, vì Content-Security
// -Policy của trang khai script-src 'self' mà KHÔNG kèm 'unsafe-inline'. Giữ
// được điều đó đáng giá hơn nhiều so với một lần gọi mạng vài trăm byte.
(function () {
  try {
    var da_chon = window.localStorage.getItem('giao_dien_v1')
    if (da_chon !== 'sang' && da_chon !== 'toi') {
      // Chưa từng chọn thì mở nền tối, kể cả khi máy đang đặt nền sáng. Trang
      // này thiết kế theo nền tối trước, và đó là bản chủ trang muốn người lạ
      // nhìn thấy đầu tiên. Ai muốn nền sáng thì bấm một lần là nhớ mãi.
      da_chon = 'toi'
    }
    document.documentElement.dataset.giaoDien = da_chon
  } catch (loi) {
    // Không đọc được thì để nguyên mặc định nền tối. Không có gì phải báo.
  }
})()
