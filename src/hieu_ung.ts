// Ba hiệu ứng dùng chung của trang.
//
// Cả ba đều tự tắt khi trình duyệt báo prefers-reduced-motion. Đó không phải
// phép lịch sự: với một số người, chuyển động trên màn hình gây chóng mặt thật,
// và một trang giới thiệu không đáng để đánh đổi điều đó lấy vẻ đẹp.

/** Trình duyệt có đang được yêu cầu giảm chuyển động hay không. */
export function giam_chuyen_dong(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Gắn lớp da-hien cho mọi phần tử mang lớp cho-hien khi chúng lọt vào khung
 * nhìn, rồi thôi theo dõi chúng.
 *
 * Dùng IntersectionObserver chứ không nghe sự kiện cuộn: nghe cuộn thì phải tự
 * tính vị trí từng phần tử ở mỗi khung hình, và mỗi lần cuộn ngược lên rồi
 * xuống lại là hiệu ứng chạy lại từ đầu. Lộ ra một lần rồi thôi mới là thứ
 * người đọc muốn.
 */
export function theo_doi_hien_ra(): () => void {
  const can_hien = Array.from(document.querySelectorAll<HTMLElement>('.cho-hien'))

  if (giam_chuyen_dong()) {
    for (const phan_tu of can_hien) phan_tu.classList.add('da-hien')
    return () => {}
  }

  const theo_doi = new IntersectionObserver(
    (cac_muc) => {
      for (const muc of cac_muc) {
        if (!muc.isIntersecting) continue
        muc.target.classList.add('da-hien')
        theo_doi.unobserve(muc.target)
      }
    },
    // Lùi mép dưới vào trong một chút để phần tử đã nằm hẳn trong tầm mắt mới
    // lộ ra, thay vì lộ ngay khi mới nhú lên khỏi mép màn hình.
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
  )

  for (const phan_tu of can_hien) theo_doi.observe(phan_tu)
  return () => theo_doi.disconnect()
}

/**
 * Vạch tiến độ cuộn ở chân thanh đầu trang.
 *
 * Đặt scaleX thay vì width vì scaleX chạy trên luồng hợp thành, không buộc
 * trình duyệt tính lại bố cục ở mỗi khung hình. Với một thứ cập nhật theo từng
 * nhịp cuộn thì khác biệt đó là thấy được.
 */
export function theo_doi_tien_do_cuon(vach: HTMLElement): () => void {
  let dang_cho = false

  const cap_nhat = () => {
    dang_cho = false
    const co_the_cuon = document.documentElement.scrollHeight - window.innerHeight
    const ti_le = co_the_cuon > 0 ? window.scrollY / co_the_cuon : 0
    vach.style.transform = `scaleX(${Math.min(Math.max(ti_le, 0), 1)})`
  }

  const khi_cuon = () => {
    if (dang_cho) return
    dang_cho = true
    window.requestAnimationFrame(cap_nhat)
  }

  cap_nhat()
  window.addEventListener('scroll', khi_cuon, { passive: true })
  window.addEventListener('resize', khi_cuon, { passive: true })

  return () => {
    window.removeEventListener('scroll', khi_cuon)
    window.removeEventListener('resize', khi_cuon)
  }
}

/**
 * Quầng sáng đi theo con trỏ trong phần mở đầu.
 *
 * Chỉ ghi hai biến CSS, phần vẽ để CSS lo. Nhờ vậy React không phải vẽ lại gì
 * khi chuột di chuyển, thứ sẽ rất tốn nếu làm bằng trạng thái.
 */
export function theo_doi_con_tro(vung: HTMLElement): () => void {
  if (giam_chuyen_dong()) return () => {}

  // Chỉ bật trên thiết bị có con trỏ thật. Trên màn cảm ứng, pointermove chỉ
  // sinh ra khi người ta đang miết ngón tay để cuộn, nên quầng sáng sẽ nhảy
  // giật theo mỗi lần chạm rồi đứng im ở chỗ ngón tay vừa rời đi.
  if (!window.matchMedia('(pointer: fine)').matches) return () => {}

  const khi_di_chuyen = (su_kien: PointerEvent) => {
    const khung = vung.getBoundingClientRect()
    vung.style.setProperty('--x', `${su_kien.clientX - khung.left}px`)
    vung.style.setProperty('--y', `${su_kien.clientY - khung.top}px`)
  }

  vung.addEventListener('pointermove', khi_di_chuyen, { passive: true })
  return () => vung.removeEventListener('pointermove', khi_di_chuyen)
}
