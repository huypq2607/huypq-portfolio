// Toàn bộ chữ nghĩa của trang nằm ở đây, không rải rác trong các thành phần.
//
// Lý do gom một chỗ: trang song ngữ, và mỗi lần sửa một câu là phải sửa cả
// hai bản. Nếu chữ nằm lẫn trong JSX thì việc đó thành lần mò, và bản tiếng
// Việt sẽ dần tụt lại sau bản tiếng Anh mà không ai nhận ra.
//
// Con số trong tệp này lấy từ hai kho mã thật và đã đối chiếu. Đừng làm tròn
// lên cho đẹp: một con số sai trên trang giới thiệu làm hỏng niềm tin vào mọi
// con số còn lại.

import type {
  Dong_ho_so,
  Du_an,
  Lop_hop_cat,
  Nhom_ky_nang,
  Song,
  Tang_du_lieu,
} from './kieu.ts'

/** Tên hiển thị. Không dịch, nên để chuỗi thường thay vì cặp song ngữ. */
export const TEN = 'Phạm Quang Huy'

export const CHUC_DANH: Song = {
  vi: 'Data Engineer & Data Analyst',
  en: 'Data Engineer & Data Analyst',
}

/** Câu lớn nhất trang. Ngắn, vì nó được đặt cỡ chữ rất to. */
export const KHAU_HIEU: Song = {
  vi: 'Mọi báo cáo đều bắt nguồn từ dữ liệu!',
  en: 'Every report starts with data',
}

export const DAN_GIAI: Song = {
  vi: 'Từ những dòng data thô, tới những dashboard giúp đưa ra quyết định một cách nhanh chóng.',
  en: 'From raw rows to the dashboards decisions are made on, fast.',
}

export const GIOI_THIEU: readonly Song[] = [
  {
    vi: 'Với bốn năm làm dữ liệu, hiện tại tôi đang làm việc tại VETC thuộc tập đoàn Tasco. Tôi hiện đang phụ trách xây dựng pipeline khép kín từ: Từ lấy dữ liệu - Làm sạch - Cook - Cho ra bảng dữ liệu có thể dùng để dựng dashboard - Gửi báo cáo hàng ngày qua Outlook và Tự động cảnh báo bất thường tới stakeholder.',
    en: 'Four years in data, currently at VETC, part of the Tasco group. I own a closed-loop pipeline end to end: ingest, clean, cook, land a serving table that dashboards run on, send the daily report through Outlook, and alert stakeholders automatically when a number goes abnormal.',
  },
  {
    vi: 'Ngoài ra, tôi tự xây dựng và tự vận hành từ A-Z dapractice, một nền tảng thực chiến cho dân Phân tích dữ liệu, có AI đóng vai trò như một trợ lý học tập.',
    en: 'Alongside that I build and run dapractice alone, end to end: a hands-on platform for data analysts, with AI acting as a study assistant.',
  },
]

export const HO_SO: readonly Dong_ho_so[] = [
  {
    nhan: { vi: 'Năm sinh', en: 'Born' },
    gia_tri: { vi: '1997', en: '1997' },
  },
  {
    nhan: { vi: 'Kinh nghiệm', en: 'Experience' },
    gia_tri: { vi: '4 năm, kỹ thuật dữ liệu và phân tích', en: '4 years, data engineering and analytics' },
  },
  {
    nhan: { vi: 'Hiện tại', en: 'Now' },
    gia_tri: { vi: 'VETC, tập đoàn Tasco', en: 'VETC, Tasco group' },
  },
  {
    nhan: { vi: 'Học vấn', en: 'Education' },
    gia_tri: {
      vi: 'Học viện Kỹ thuật Quân sự, khoa Cơ khí',
      en: 'Le Quy Don Technical University, Mechanical Engineering',
    },
  },
  {
    nhan: { vi: 'Sẵn sàng', en: 'Open to' },
    gia_tri: { vi: 'Data Engineer & Data Analyst', en: 'Data Engineer & Data Analyst' },
  },
]

/** Sáu tầng của lakehouse, dùng vẽ sơ đồ ngay dưới phần mở đầu.
 *  Số model đếm từ đồ thị lineage của chính dự án. */
export const TANG_DU_LIEU: readonly Tang_du_lieu[] = [
  { ma: 'landing', so_model: 3, vai_tro: { vi: 'CDC thô từ Debezium', en: 'Raw CDC from Debezium' } },
  { ma: 'curated', so_model: 265, vai_tro: { vi: 'Khử trùng, ép kiểu, che dữ liệu cá nhân', en: 'Dedup, cast, mask personal data' } },
  { ma: 'gci', so_model: 22, vai_tro: { vi: 'Hợp nhất định danh khách hàng', en: 'Customer identity resolution' } },
  { ma: 'precomp', so_model: 82, vai_tro: { vi: 'Trải phẳng và hợp nhất nguồn', en: 'Flatten and unify sources' } },
  { ma: 'datamart', so_model: 59, vai_tro: { vi: 'Dựng chỉ số theo nghiệp vụ', en: 'Build business metrics' } },
  { ma: 'serving', so_model: 83, vai_tro: { vi: 'Bảng phẳng cho BI và API', en: 'Flat tables for BI and API' } },
]

/** Bảy lớp của hộp cát SQL trong dapractice. Cột mã lỗi là mã SQLSTATE thật
 *  mà người học nhận được, không phải mã do ứng dụng tự đặt. */
export const LOP_HOP_CAT: readonly Lop_hop_cat[] = [
  { so: 1, cach: { vi: 'begin read only', en: 'begin read only' }, chan: { vi: 'Mọi lệnh ghi và mọi lệnh đổi cấu trúc', en: 'Every write and every schema change' }, ma_loi: '25006' },
  { so: 2, cach: { vi: 'set local role', en: 'set local role' }, chan: { vi: 'Đọc sang lĩnh vực khác, đọc tệp, gọi pg_sleep', en: 'Reading another domain, reading files, pg_sleep' }, ma_loi: '42501' },
  { so: 3, cach: { vi: 'giao thức mở rộng', en: 'extended protocol' }, chan: { vi: 'Nhiều câu lệnh giấu trong một chuỗi', en: 'Several statements hidden in one string' }, ma_loi: '42601' },
  { so: 4, cach: { vi: 'statement_timeout', en: 'statement_timeout' }, chan: { vi: 'Truy vấn chạy lâu', en: 'A query that runs forever' }, ma_loi: '57014' },
  { so: 5, cach: { vi: 'đồng hồ phía máy chủ', en: 'server-side clock' }, chan: { vi: 'Cơ sở dữ liệu câm hẳn, không trả lời', en: 'A database that stops answering entirely' }, ma_loi: '57014' },
  { so: 6, cach: { vi: 'con trỏ 500 dòng', en: 'cursor, 500 rows' }, chan: { vi: 'Nối chéo trả về hàng triệu dòng', en: 'A cross join returning millions of rows' }, ma_loi: '—' },
  { so: 7, cach: { vi: 'discard all', en: 'discard all' }, chan: { vi: 'Thiết lập của câu trước liên kết sang câu sau', en: 'State from one query leaking into the next' }, ma_loi: '—' },
]

export const DU_AN: readonly Du_an[] = [
  {
    ma: 'vetc',
    ten: {
      vi: 'Lakehouse quy mô tập đoàn',
      en: 'An enterprise-scale lakehouse',
    },
    vai_tro: {
      vi: 'Kỹ sư dữ liệu tại VETC, tập đoàn Tasco, 2025 tới nay',
      en: 'Data engineer at VETC, Tasco group, 2025 to now',
    },
    tom_tat: {
      vi: 'Xây dựng pipeline khép kín từ: Từ lấy dữ liệu - Làm sạch - Cook - Cho ra bảng dữ liệu có thể dùng để dựng dashboard - Gửi báo cáo hàng ngày qua Outlook và Tự động cảnh báo bất thường tới stakeholder.',
      en: 'A closed-loop pipeline: ingest, clean, cook, a serving table dashboards can be built on, the daily report sent through Outlook, and an automatic anomaly alert to stakeholders.',
    },
    // Dấu phân cách hàng nghìn khác nhau giữa hai ngôn ngữ, nên con số cũng
    // phải có hai bản. Viết 12.027 cho người đọc tiếng Anh là mười hai phẩy
    // không hai bảy, tức sai đi một nghìn lần.
    so_lieu: [
      { so: { vi: '534', en: '534' }, nhan: { vi: 'model dbt', en: 'dbt models' } },
      { so: { vi: '720', en: '720' }, nhan: { vi: 'bảng nguồn đã khai', en: 'registered sources' } },
      { so: { vi: '12.027', en: '12,027' }, nhan: { vi: 'cột trong đồ thị lineage', en: 'columns under lineage' } },
      { so: { vi: '6', en: '6' }, nhan: { vi: 'tầng, mỗi tầng một catalog', en: 'tiers, one catalog each' } },
    ],
    ngan_xep: [
      'dbt-core',
      'dbt-spark',
      'Apache Iceberg',
      'Lakekeeper REST catalog',
      'OAuth2 / Keycloak',
      'MinIO / S3',
      'Apache Airflow',
      'Trino',
      'Superset',
      'GitLab CI',
    ],
    // CHỖ TRỐNG PHẢI ĐIỀN. Dấu gạch dưới đôi là chỗ chờ con số thật, và cổng
    // cham-thu-noi-dung chặn lệnh dựng khi còn chỗ nào chưa điền. Một trang
    // giới thiệu ra mắt với "__ giờ mỗi tuần" còn tệ hơn là không có mục này.
    dong_gop: [
      {
        so: { vi: '- 30% giờ mỗi tuần', en: '- 30% hours a week' },
        nhan: { vi: 'Thời gian làm báo cáo tay đã bỏ được', en: 'Manual reporting time removed' },
        boi_canh: {
          vi: 'Bản tổng hợp sáng nay được sinh từ bảng phục vụ và gửi tự động lúc bảy giờ.',
          en: 'The morning summary is now generated from the serving table and sent automatically at seven.',
        },
      },
      {
        so: { vi: '3 lần/ngày', en: '3 times a day' },
        nhan: { vi: 'Thời gian phát hiện số liệu bất thường', en: 'Time to spot an anomaly' },
        boi_canh: {
          vi: 'Trước đây phải chờ tới kỳ đối soát mới có người nhìn ra.',
          en: 'Previously nobody noticed until the reconciliation cycle came round.',
        },
      },
      {
        so: { vi: '70%', en: '70%' },
        nhan: { vi: 'Quyết định chính xác từ việc xem báo cáo hàng ngày', en: 'Decisions made correctly off the daily report' },
        boi_canh: {
          vi: 'Tự động lên số, tự động cảnh báo bất thường',
          en: 'Numbers generated automatically, anomalies flagged automatically',
        },
      },
    ],

    ghi_chu: {
      vi: 'Đây là số liệu demo, không phải số liệu thực tế.',
      en: 'These are demo figures, not real data.',
    },
  },
  {
    ma: 'shine',
    ten: {
      vi: 'Hệ thống báo cáo cho chuỗi hơn 100 Salon',
      en: 'A reporting system for a chain of 100+ salons',
    },
    vai_tro: {
      vi: 'Data Analyst tại 30Shine, 2022 tới 2025',
      en: 'Data Analyst at 30Shine, 2022 to 2025',
    },
    tom_tat: {
      vi: '30Shine là chuỗi cắt tóc và chăm sóc nam giới hơn một trăm salon. Tôi gom bốn hệ nguồn độc lập gồm giao dịch, nhân sự, vật tư và chấm công về một kho dữ liệu tập trung theo Star Schema, rồi trải nó thành dashboard mà hơn 100 quản lý salon và BOD mở hằng ngày.',
      en: '30Shine is a men’s grooming chain of more than a hundred salons. I consolidated four independent source systems — transactions, people, materials and time tracking — into one central Star Schema warehouse, then surfaced it as dashboards that over a hundred salon managers and the board open every day.',
    },
    so_lieu: [
      { so: { vi: '14', en: '14' }, nhan: { vi: 'dashboard dùng hằng ngày', en: 'dashboards in daily use' } },
      { so: { vi: '100+', en: '100+' }, nhan: { vi: 'quản lý salon là người dùng', en: 'salon managers as users' } },
      { so: { vi: '10 triệu', en: '10 million' }, nhan: { vi: 'dòng tích luỹ trong kho dữ liệu', en: 'rows accumulated in the warehouse' } },
      { so: { vi: '4', en: '4' }, nhan: { vi: 'hệ nguồn độc lập gom về một mối', en: 'source systems consolidated into one' } },
    ],
    ngan_xep: ['Power BI', 'DAX', 'SQL Server', 'SSIS', 'Python', 'Star Schema', 'SCD', 'ETL', 'CDC'],
    dong_gop: [
      {
        so: { vi: '70%', en: '70%' },
        nhan: {
          vi: 'Thời gian xử lý dữ liệu thủ công cắt bỏ mỗi tháng',
          en: 'Manual data processing time removed each month',
        },
        boi_canh: {
          vi: 'Dữ liệu từ SQL Server, Excel và API nội bộ gom về một luồng tự động, thay cho việc nhập tay.',
          en: 'Data from SQL Server, Excel and internal APIs pulled into one automated flow, replacing hand entry.',
        },
      },
      {
        so: { vi: '4 tới 6 giờ mỗi tuần', en: '4 to 6 hours a week' },
        nhan: {
          vi: 'Thời gian mỗi quản lý vùng lấy lại được',
          en: 'Time given back to each regional manager',
        },
        boi_canh: {
          vi: 'Dashboard thời gian thực thay hẳn bản Excel làm tay mỗi cuối tuần.',
          en: 'A real-time dashboard replaced the hand-made weekend Excel report entirely.',
        },
      },
      {
        so: { vi: '10 tới 15%', en: '10 to 15%' },
        nhan: {
          vi: 'Ngân sách vận hành tiết kiệm mỗi quý',
          en: 'Operating budget saved each quarter',
        },
        boi_canh: {
          vi: 'Báo cáo tài chính vận hành theo dõi doanh thu thực so với kế hoạch, và cảnh báo khi chi phí vượt ngưỡng.',
          en: 'An operations finance report tracking actual against plan, with an alert when cost crosses its ceiling.',
        },
      },
    ],
    ghi_chu: {
      vi: 'Dashboard của chuỗi là dữ liệu nội bộ nên không đưa lên đây.',
      en: 'The chain’s dashboards hold internal data, so they are not shown here.',
    },
  },
  {
    ma: 'dapractice',
    ten: {
      vi: 'dapractice, nền tảng luyện SQL có người trả tiền',
      en: 'dapractice, a SQL practice platform with paying users',
    },
    vai_tro: {
      vi: 'Một mình: sản phẩm, máy chủ, giao diện, hạ tầng',
      en: 'Solo: product, server, interface, infrastructure',
    },
    tom_tat: {
      vi: 'Bấm một đường dẫn là có ngay một Postgres thật với dữ liệu bẩn cố ý, làm bài, được chấm tự động. Không phải cài gì, đọc đề không cần tài khoản. 600 bài trên ba lĩnh vực thương mại điện tử, marketing và ứng dụng di động. Có thu tiền, chạy trên VPS, và từ đầu tới giờ chỉ một người commit vào nó.',
      en: 'Follow a link and you have a real Postgres with deliberately dirty data, an exercise, and automatic grading. Nothing to install, no account needed to read. 600 exercises across e-commerce, marketing and mobile app. It takes money, runs on a VPS, and exactly one person has ever committed to it.',
    },
    so_lieu: [
      { so: { vi: '600', en: '600' }, nhan: { vi: 'bài tập, ba lĩnh vực', en: 'exercises, three domains' } },
      { so: { vi: '77.500', en: '77,500' }, nhan: { vi: 'dòng TypeScript', en: 'lines of TypeScript' } },
      { so: { vi: '3.141', en: '3,141' }, nhan: { vi: 'phép kiểm tự động trong CI', en: 'automated checks in CI' } },
      { so: { vi: '22×', en: '22×' }, nhan: { vi: 'nhẹ hơn sau khi tái kiến trúc', en: 'lighter after re-architecture' } },
    ],
    ngan_xep: [
      'TypeScript',
      'Fastify 5',
      'Node 24',
      'React 19',
      'PostgreSQL 17',
      'Tailwind 4',
      'CodeMirror 6',
      'Docker Compose',
      'Caddy',
      'GitHub Actions',
    ],
    ghi_chu: {
      vi: 'Mã nguồn riêng tư vì sản phẩm đang bán. Trang đang chạy thì mở được, và tôi sẵn sàng dẫn qua bất kỳ phần nào trong một buổi trò chuyện.',
      en: 'The source is private because the product is being sold. The running site is open to anyone, and I am happy to walk through any part of it in a conversation.',
    },
    lien_ket: { nhan: { vi: 'Mở dapractice.site', en: 'Open dapractice.site' }, dia_chi: 'https://dapractice.site' },
  },
]

export const KY_NANG: readonly Nhom_ky_nang[] = [
  {
    ten: { vi: 'Nền tảng dữ liệu', en: 'Data platform' },
    muc: ['Apache Iceberg', 'dbt core & spark', 'Custom materializations', 'Apache Spark', 'Trino', 'Apache Airflow', 'REST catalog', 'MinIO / S3', 'CDC, Debezium'],
  },
  {
    ten: { vi: 'Mô hình hoá và phân tích', en: 'Modelling and analytics' },
    muc: ['SQL: Trino, Spark, Postgres', 'Incremental & merge', 'Dimensional modelling', 'Metric definition', 'Superset', 'Dashboard design', 'Data quality gates'],
  },
  {
    ten: { vi: 'Kỹ thuật phần mềm', en: 'Software engineering' },
    muc: ['TypeScript', 'Node & Fastify', 'React', 'Python', 'PostgreSQL', 'Docker & Compose', 'Caddy', 'GitLab CI', 'GitHub Actions'],
  },
]

export const LIEN_HE = {
  loi_moi: {
    vi: 'Nếu bạn đang tuyển cho một vị trí nền tảng dữ liệu hoặc analytics engineering, remote hay tại chỗ, hãy viết cho tôi. Tôi đọc hết.',
    en: 'If you are hiring for a data platform or analytics engineering role, remote or on-site, write to me. I read everything.',
  } satisfies Song,
  email: 'huypq2607@gmail.com',

  /** Các nơi khác có thể tìm thấy tôi. Thứ tự trong mảng là thứ tự hiển thị:
   *  kho mã trước, rồi sản phẩm đang bán, rồi hai kênh chia sẻ kiến thức. */
  kenh: [
    { ten: 'GitHub', nhan: 'github.com/huypq2607', dia_chi: 'https://github.com/huypq2607' },
    { ten: 'dapractice', nhan: 'dapractice.site', dia_chi: 'https://dapractice.site' },
    { ten: 'Threads', nhan: '@huypq.data', dia_chi: 'https://www.threads.com/@huypq.data' },
    { ten: 'TikTok', nhan: '@huypq17b6', dia_chi: 'https://www.tiktok.com/@huypq17b6' },
  ],
}

/** Nhãn dùng trong giao diện: tiêu đề mục, chú thích sơ đồ, chân trang. */
export const NHAN = {
  tieu_de_trang: {
    vi: 'Phạm Quang Huy, Kỹ sư Dữ liệu và Phân tích Dữ liệu',
    en: 'Phạm Quang Huy, Data Engineer & Data Analyst',
  } satisfies Song,
  mo_ta_trang: {
    vi: 'Bốn năm xây nền tảng dữ liệu và đường ống dữ liệu từ nguồn tới biểu đồ. Hiện làm tại VETC, tập đoàn Tasco.',
    en: 'Four years building data platforms and pipelines from source system to chart. Currently at VETC, Tasco group.',
  } satisfies Song,
  muc_du_an: { vi: 'Dự án tiêu biểu', en: 'Selected work' } satisfies Song,
  muc_ky_nang: { vi: 'Công cụ', en: 'Tools' } satisfies Song,
  muc_lien_he: { vi: 'Liên hệ', en: 'Get in touch' } satisfies Song,
  so_do_tang: {
    vi: 'Kiến trúc dữ liệu tôi làm việc mỗi ngày',
    en: 'The data architecture I work inside every day',
  } satisfies Song,
  nhan_model: { vi: 'model', en: 'models' } satisfies Song,
  nhan_truc_model: { vi: 'Số model mỗi tầng', en: 'Model count per tier' } satisfies Song,
  dieu_huong_du_an: { vi: 'Dự án', en: 'Work' } satisfies Song,
  nhan_vai_tro: { vi: 'Vai trò', en: 'Role' } satisfies Song,
  nhan_ngan_xep: { vi: 'Ngăn xếp', en: 'Stack' } satisfies Song,
  nhan_dong_gop: { vi: 'Giá trị mang lại', en: 'Business impact' } satisfies Song,
  nhan_hop_cat: {
    vi: 'Bộ lọc 7 lớp, nơi câu lệnh của người lạ chạy trên Postgres thật',
    en: 'The seven-layer sandbox where a stranger’s SQL runs on a real Postgres',
  } satisfies Song,
  cot_lop: { vi: 'Lớp', en: 'Layer' } satisfies Song,
  cot_cach: { vi: 'Cách làm', en: 'Mechanism' } satisfies Song,
  cot_chan: { vi: 'Chặn được gì', en: 'What it blocks' } satisfies Song,
  cot_ma: { vi: 'Mã lỗi', en: 'Error code' } satisfies Song,
  doi_ngon_ngu: { vi: 'Đổi sang tiếng Anh', en: 'Switch to Vietnamese' } satisfies Song,
  bo_qua_dau_trang: { vi: 'Bỏ qua phần đầu trang', en: 'Skip to main content' } satisfies Song,
  doi_sang_nen_toi: { vi: 'Chuyển sang nền tối', en: 'Switch to dark theme' } satisfies Song,
  doi_sang_nen_sang: { vi: 'Chuyển sang nền sáng', en: 'Switch to light theme' } satisfies Song,
  nhan_theo_doi: { vi: 'Tìm tôi ở', en: 'Find me on' } satisfies Song,
  anh_chan_dung: { vi: 'Ảnh chân dung Phạm Quang Huy', en: 'Portrait of Phạm Quang Huy' } satisfies Song,
  chan_trang: {
    vi: 'Trang này tự dựng bằng React và Tailwind, phát hành qua GitHub Actions.',
    en: 'This page is hand-built with React and Tailwind, released through GitHub Actions.',
  } satisfies Song,
}
