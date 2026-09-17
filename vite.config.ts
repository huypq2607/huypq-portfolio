// Cấu hình Vite cho trang giới thiệu cá nhân.
//
// Trang chạy ở gốc của một tên miền con riêng nên base là dấu gạch chéo. Nếu
// sau này chuyển sang phục vụ dưới một đường dẫn con thì phải đổi base ở đây,
// vì mọi đường dẫn tới tệp trong thư mục dist đều sinh ra từ nó.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sua_noi_dung } from './plugins/sua_noi_dung.ts'

export default defineConfig({
  base: '/',

  // Thư mục tệp tĩnh đặt tên tiếng Việt cho khớp quy ước của các dự án khác,
  // nên phải khai tường minh thay vì để Vite tự tìm thư mục public.
  publicDir: 'cong_khai',

  // sua_noi_dung chỉ chạy lúc phát triển, xem chú thích trong chính plugin đó.
  plugins: [react(), tailwindcss(), sua_noi_dung()],

  build: {
    // Bỏ tệp bản đồ nguồn trong bản phát hành. Trang này không có logic nào
    // đáng gỡ lỗi trên máy người xem, mà tệp bản đồ thì nặng gấp nhiều lần
    // chính đoạn mã nó mô tả.
    sourcemap: false,

    // Gộp mọi tài sản nhỏ hơn mức này vào thẳng tệp CSS hoặc JS dưới dạng
    // chuỗi base64. Để mức thấp vì ảnh chân dung cần ở dạng tệp riêng để
    // trình duyệt chọn được bản webp hay jpg theo khả năng của nó.
    assetsInlineLimit: 2048,
  },
})
