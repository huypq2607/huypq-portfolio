// Phép tính màu dùng chung cho những thứ xếp thành chuỗi có thứ tự.
//
// Dải màu của trang có đúng sáu bậc, từ xanh băng tới hổ phách. Bậc ấy mã hoá
// VỊ TRÍ TRONG MỘT CHUỖI chứ không phải một bảng màu trang trí, nên bất kỳ thứ
// gì có thứ tự đều tô được bằng nó: sáu chặng của dây chuyền, các mốc của dòng
// thời gian, và giờ là hai dây chuyền dài ngắn khác nhau.

/**
 * Trải n phần tử lên sáu bậc màu, phần tử đầu bậc một và phần tử cuối bậc sáu.
 *
 * Trải chứ không gán cứng theo chỉ số, vì hai chuỗi khác độ dài mà gán cứng thì
 * chuỗi ngắn hơn dừng lại giữa dải: dây chuyền năm chặng sẽ kết ở màu vàng
 * chanh trong khi dây chuyền sáu chặng kết ở hổ phách, và hai hình đứng cạnh
 * nhau trông như một hình bị cắt cụt. Trải ra thì chặng cuối của cả hai đều là
 * bậc sáu, đúng với nghĩa "đây là điểm cuối".
 */
export function bac_mau(thu_tu: number, tong: number): number {
  if (tong <= 1) return 1
  return Math.round(1 + (thu_tu * 5) / (tong - 1))
}
