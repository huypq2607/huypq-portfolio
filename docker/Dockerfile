# Đóng gói trang thành một ảnh tĩnh, hai tầng.
#
# Đường phát hành chính của dự án là GitHub Pages, không phải ảnh này. Ảnh tồn
# tại cho hai việc: chạy thử đúng thứ sẽ ra máy thật ngay trên máy phát triển,
# và để có sẵn đường lui nếu sau này trang chuyển về VPS nằm sau Caddy của
# dapractice.
#
# Tầng một dựng, tầng hai chỉ có Caddy và thư mục dist. Ảnh cuối không mang
# theo Node, node_modules hay mã nguồn nào.

FROM node:24-alpine AS dung

WORKDIR /app

# Chép tệp khoá trước rồi mới chép mã nguồn, để lớp cài thư viện còn dùng lại
# được khi chỉ có mã nguồn thay đổi.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Biến VITE_ được nhúng vào gói ngay lúc dựng chứ không đọc lúc chạy, nên phải
# truyền vào từ đây. Thiếu nó thì cổng kiểm tra môi trường chặn ngay, chứ ảnh
# không lặng lẽ ra lò với thẻ địa chỉ chuẩn hỏng.
ARG VITE_DIA_CHI_TRANG=https://huypq.dapractice.site
ENV VITE_DIA_CHI_TRANG=$VITE_DIA_CHI_TRANG

RUN npm run build

FROM caddy:2-alpine

COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=dung /app/dist /srv

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
