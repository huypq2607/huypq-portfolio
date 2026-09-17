// Toàn bộ chữ nghĩa của trang nằm ở đây, không rải rác trong các thành phần.
//
// Lý do gom một chỗ: trang song ngữ, và mỗi lần sửa một câu là phải sửa cả
// hai bản. Nếu chữ nằm lẫn trong JSX thì việc đó thành lần mò, và bản tiếng
// Việt sẽ dần tụt lại sau bản tiếng Anh mà không ai nhận ra.
//
// Nội dung bám theo bản CV. Nhà tuyển dụng thường đọc CV trước rồi mới mở
// trang, hoặc ngược lại; hai bên nói khác nhau một con số là hỏng niềm tin vào
// cả hai. Sửa một bên thì phải sửa bên kia.

import type {
  Chung_chi,
  Dong_ho_so,
  Du_an_noi_bat,
  Hoc_van,
  Khoi_phu,
  Kinh_nghiem,
  Nhom_ky_nang,
  Song,
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
      en: 'Military Technical Academy, Mechanical Engineering',
    },
  },
  {
    nhan: { vi: 'Sẵn sàng', en: 'Open to' },
    gia_tri: { vi: 'Data Engineer & Data Analyst', en: 'Data Engineer & Data Analyst' },
  },
]

/** Mục tiêu nghề nghiệp. Ba câu, đúng ba ý của bản CV. */
export const MUC_TIEU: readonly Song[] = [
  {
    vi: 'Bốn năm làm dữ liệu, tôi muốn đóng góp vào việc xây dựng hệ thống báo cáo và phân tích giúp tăng hiệu suất làm việc cho tổ chức và loại bỏ những báo cáo làm tay.',
    en: 'Four years in data. I want to build the reporting and analytics systems that raise an organisation’s output and retire its hand-made reports.',
  },
  {
    vi: 'Tôi đặc biệt quan tâm tới việc dùng dữ liệu để hiểu hành vi người dùng, theo dõi chỉ số và hỗ trợ ra quyết định kinh doanh chính xác và nhanh chóng.',
    en: 'I care most about using data to understand user behaviour, track the metrics that matter, and support business decisions that are both accurate and fast.',
  },
  {
    vi: 'Với tư duy cầu toàn và khả năng làm việc liên phòng ban, tôi phối hợp được với PO, Dev và Manager để tạo ra hệ thống báo cáo thực sự có người dùng.',
    en: 'I am thorough, and I work well across teams: with product owners, developers and managers, to build reporting that people actually open.',
  },
]

// ---------------------------------------------------------------------------
// Kinh nghiệm làm việc
// ---------------------------------------------------------------------------
//
// Thứ tự trong mảng là thứ tự hiển thị: nơi mới nhất đứng trước, vì đó là thứ
// nhà tuyển dụng đọc đầu tiên và cũng là thứ nói đúng nhất về hiện tại.

export const KINH_NGHIEM: readonly Kinh_nghiem[] = [
  {
    ma: 'vetc',
    cong_ty: { vi: 'VETC, tập đoàn Tasco', en: 'VETC, Tasco group' },
    chuc_danh: { vi: 'Data Analyst & Data Engineer', en: 'Data Analyst & Data Engineer' },
    thoi_gian: { vi: '2025 – Hiện tại', en: '2025 – Present' },

    so_lieu: [
      { so: { vi: '534', en: '534' }, nhan: { vi: 'model dbt', en: 'dbt models' } },
      { so: { vi: '720', en: '720' }, nhan: { vi: 'bảng nguồn đã khai', en: 'registered sources' } },
      { so: { vi: '12.027', en: '12,027' }, nhan: { vi: 'cột trong đồ thị lineage', en: 'columns under lineage' } },
    ],

    vai_tro: [
      {
        ten: { vi: 'Vai trò Data Analyst', en: 'As Data Analyst' },
        viec: [
          {
            vi: 'Xây dựng và vận hành pipeline khép kín 6 chặng cho mảng telesales và bảo hiểm, từ lấy dữ liệu CDC tới báo cáo và cảnh báo, chạy theo lịch mỗi giờ — loại bỏ hoàn toàn thao tác thủ công trong luồng dữ liệu hằng ngày.',
            en: 'Built and run a closed-loop six-stage pipeline for the telesales and insurance vertical, from CDC ingest through to reports and alerts, on an hourly schedule — removing manual work from the daily data flow entirely.',
          },
          {
            vi: 'Tự động hoá báo cáo hằng ngày qua Outlook gửi stakeholder lúc 7:00, thay thế quy trình tổng hợp tay mỗi sáng — giảm 30% thời gian làm báo cáo mỗi tuần.',
            en: 'Automated the daily Outlook report to stakeholders at 07:00, replacing the morning hand-assembly — cutting 30% of weekly reporting time.',
          },
          {
            vi: 'Xây dựng hệ thống cảnh báo bất thường, so chỉ số với dải kỳ vọng sau mỗi lần chạy — rút thời gian phát hiện sai lệch từ 5 ngày xuống trong ngày, xử lý trước khi lan sang báo cáo tháng.',
            en: 'Built anomaly alerting that checks each metric against its expected band after every run — cutting time-to-detection from 5 days to same-day, so a discrepancy is fixed before it reaches the monthly report.',
          },
          {
            vi: 'Vận hành dự án dbt dùng chung quy mô 534 model trên 720 bảng nguồn, 12.027 cột trong đồ thị lineage — đưa toàn bộ chỉ số của mảng về một nguồn số liệu duy nhất, chấm dứt tình trạng mỗi bộ phận báo một con số khác nhau.',
            en: 'Operate a shared dbt project of 534 models over 720 registered sources with 12,027 columns under lineage — putting every metric in the vertical on one source of truth, ending the era of each team quoting a different number.',
          },
          {
            vi: 'Xây dựng lớp hợp nhất định danh khách hàng xuyên tolling, ví điện tử, bảo hiểm và telesales, cho phép đo vòng đời khách hàng và tái tục hợp đồng thay vì đếm giao dịch rời rạc — góp phần tăng 60% tỷ lệ tái tục mảng bảo hiểm.',
            en: 'Built the customer identity resolution layer across tolling, e-wallet, insurance and telesales, making customer lifetime and policy renewal measurable instead of counting isolated transactions — contributing to a 60% lift in insurance renewal rate.',
          },
        ],
      },
      {
        ten: { vi: 'Vai trò Data Engineer', en: 'As Data Engineer' },
        viec: [
          {
            vi: 'Cung cấp bảng tổng hợp dạng phẳng cho Superset và API nội bộ, dựng sẵn chỉ số nên không phải join lúc đọc — rút thời gian tải dashboard từ phút xuống giây và giảm 20% yêu cầu báo cáo gửi về đội data.',
            en: 'Serve flat, pre-computed tables to Superset and the internal API so nothing is joined at read time — cutting dashboard load from minutes to seconds and reducing ad-hoc report requests to the data team by 20%.',
          },
          {
            vi: 'Thiết lập ranh giới dữ liệu cá nhân: số điện thoại, email, biển số và số định danh được che tại tầng curated, canh ở bước duyệt merge request — biến yêu cầu tuân thủ thành ràng buộc kỹ thuật, loại bỏ rủi ro lộ dữ liệu cá nhân qua các bảng báo cáo.',
            en: 'Set the personal-data boundary: phone numbers, emails, plates and ID numbers are masked at the curated tier and the boundary is enforced at merge request review — turning a compliance rule into a technical constraint and removing the risk of leaks through reporting tables.',
          },
          {
            vi: 'Kiến trúc và vận hành: thiết kế phân tầng landing, curated, hợp nhất định danh, precomp, datamart và serving trên Apache Iceberg với Star Schema, Fact Table, Dimension Table và SCD; luồng biến đổi bằng dbt-core và dbt-spark kèm kiểm thử dữ liệu tự động; CDC qua Debezium đồng bộ theo nhịp giờ không nạp lại toàn bảng; điều phối bằng Airflow, mọi thay đổi qua GitLab CI — chặn lỗi dữ liệu ở CI thay vì để người dùng phát hiện trên dashboard.',
            en: 'Architecture and operations: designed the landing, curated, identity, precomp, datamart and serving tiers on Apache Iceberg with Star Schema, fact and dimension tables and SCD; transformations in dbt-core and dbt-spark with automated data tests; CDC through Debezium syncing hourly without full reloads; orchestration in Airflow with every change passing GitLab CI — so data errors are caught in CI rather than by a user staring at a dashboard.',
          },
        ],
      },
    ],

    ngan_xep: [
      'dbt-core',
      'dbt-spark',
      'Apache Iceberg',
      'Lakekeeper REST catalog',
      'Trino',
      'Apache Airflow',
      'MinIO / S3',
      'Superset',
      'OAuth2 / Keycloak',
      'GitLab CI',
      'Debezium',
    ],
  },

  {
    ma: 'shine',
    cong_ty: { vi: 'Công ty cổ phần TMDV 30Shine', en: '30Shine' },
    chuc_danh: { vi: 'Data Analyst', en: 'Data Analyst' },
    thoi_gian: { vi: '2022 – 2025', en: '2022 – 2025' },

    so_lieu: [
      { so: { vi: '14', en: '14' }, nhan: { vi: 'dashboard dùng hằng ngày', en: 'dashboards in daily use' } },
      { so: { vi: '100+', en: '100+' }, nhan: { vi: 'quản lý salon là người dùng', en: 'salon managers as users' } },
      { so: { vi: '10 triệu', en: '10 million' }, nhan: { vi: 'dòng tích luỹ trong kho dữ liệu', en: 'rows in the warehouse' } },
    ],

    vai_tro: [
      {
        viec: [
          {
            vi: 'Xây dựng 14 dashboard Power BI cho hơn 100 quản lý salon dùng hằng ngày: doanh thu theo dịch vụ và sản phẩm, năng suất nhân viên, tỷ lệ đạt KPI theo vị trí, chi nhánh và vùng — tăng 15% hiệu quả vận hành và loại bỏ hoàn toàn báo cáo thủ công cuối tuần.',
            en: 'Built 14 Power BI dashboards used daily by over 100 salon managers: revenue by service and product, staff productivity, KPI attainment by position, branch and region — a 15% gain in operating efficiency and the end of the hand-made weekend report.',
          },
          {
            vi: 'Tự động hoá thu thập và xử lý dữ liệu từ SQL Server, Excel và API nội bộ — giảm 70% thời gian xử lý thủ công hằng tháng, để các team Vận hành, Kinh doanh và Marketing tập trung phân tích thay vì nhập liệu.',
            en: 'Automated collection and processing from SQL Server, Excel and internal APIs — cutting 70% of monthly manual processing so the operations, sales and marketing teams could analyse instead of key in data.',
          },
          {
            vi: 'Xây dựng hệ thống báo cáo tài chính vận hành: theo dõi doanh thu thực so với kế hoạch, kiểm soát chi phí vật tư và nhân sự theo từng salon và vùng, chuẩn hoá chỉ số cùng bộ phận Kế toán — tiết kiệm 10–15% ngân sách mỗi quý, giúp BOD nắm biên lợi nhuận theo thời gian thực.',
            en: 'Built the operations finance reporting: actual against plan, materials and staff cost controlled per salon and region, metrics standardised together with Accounting — saving 10–15% of quarterly budget and giving the board a live view of gross margin.',
          },
          {
            vi: 'Phân tích cơ cấu lương thưởng và hiệu suất nhân sự toàn chuỗi, đề xuất điều chỉnh đãi ngộ theo nhóm vị trí và mức KPI — tăng 25% hiệu suất tổng thể và cải thiện tỷ lệ giữ chân nhân sự.',
            en: 'Analysed chain-wide compensation structure and staff performance, and proposed a pay adjustment by role group and KPI band — a 25% lift in overall productivity and better retention.',
          },
          {
            vi: 'Ứng dụng AI vào phân tích dữ liệu: cảnh báo bất thường tự động, gợi ý biểu đồ trực quan hoá và dự đoán xu hướng doanh thu — hỗ trợ BOD ra quyết định nhanh và chính xác hơn.',
            en: 'Applied AI to the analysis work: automatic anomaly alerts, chart suggestions and revenue trend forecasting — helping the board decide faster and with better grounding.',
          },
          {
            vi: 'Data Warehouse và ETL: thiết kế mô hình Star Schema và Snowflake Schema với Fact Table, Dimension Table và SCD; xây dựng luồng ETL từ nhiều nguồn vào DWH kèm data cleaning, transformation và validation; áp dụng CDC để đồng bộ thay đổi theo thời gian gần thực, giữ độ trễ báo cáo thấp.',
            en: 'Data warehouse and ETL: designed Star and Snowflake schemas with fact tables, dimension tables and SCD; built ETL flows from several sources into the warehouse with cleaning, transformation and validation; applied CDC to sync changes in near real time and keep reporting latency low.',
          },
          {
            vi: 'Thiết kế ERD, viết tài liệu BRD và SRS, làm việc trực tiếp với BA, Dev và người dùng nghiệp vụ để chốt yêu cầu ngay từ đầu.',
            en: 'Designed ERDs, wrote BRD and SRS documents, and worked directly with BAs, developers and business users to settle requirements before a line of code was written.',
          },
        ],
      },
    ],

    ngan_xep: ['Power BI', 'DAX', 'SQL Server', 'SSIS', 'Python', 'Star Schema', 'SCD', 'ETL', 'CDC'],
  },
]

// ---------------------------------------------------------------------------
// Kỹ năng chuyên môn
// ---------------------------------------------------------------------------

export const KY_NANG: readonly Nhom_ky_nang[] = [
  {
    ten: { vi: 'Công cụ và Ngôn ngữ', en: 'Tools and languages' },
    dong: [
      {
        nhan: { vi: 'Power BI và Superset', en: 'Power BI and Superset' },
        mo_ta: {
          vi: 'DAX, Power Query, thiết kế dashboard, trực quan hoá dữ liệu.',
          en: 'DAX, Power Query, dashboard design, data visualisation.',
        },
      },
      {
        nhan: { vi: 'SQL', en: 'SQL' },
        mo_ta: {
          vi: 'Trino, Spark SQL, SQL Server, PostgreSQL — truy vấn trên cả kho quan hệ và lakehouse.',
          en: 'Trino, Spark SQL, SQL Server, PostgreSQL — querying both the relational warehouse and the lakehouse.',
        },
      },
      {
        nhan: { vi: 'Python', en: 'Python' },
        mo_ta: {
          vi: 'Pandas, NumPy, Matplotlib, Seaborn — xử lý dữ liệu và tự động hoá.',
          en: 'Pandas, NumPy, Matplotlib, Seaborn — data processing and automation.',
        },
      },
    ],
  },
  {
    ten: { vi: 'Nền tảng Dữ liệu', en: 'Data platform' },
    dong: [
      {
        nhan: { vi: 'Lakehouse', en: 'Lakehouse' },
        mo_ta: {
          vi: 'Apache Iceberg, REST catalog, MinIO/S3; kiến trúc phân tầng từ landing tới serving.',
          en: 'Apache Iceberg, REST catalog, MinIO/S3; tiered architecture from landing to serving.',
        },
      },
      {
        nhan: { vi: 'Transform và điều phối', en: 'Transform and orchestration' },
        mo_ta: {
          vi: 'dbt core và spark, custom materializations, incremental và merge, Apache Spark, Apache Airflow.',
          en: 'dbt core and spark, custom materializations, incremental and merge, Apache Spark, Apache Airflow.',
        },
      },
      {
        nhan: { vi: 'CDC', en: 'CDC' },
        mo_ta: {
          vi: 'Debezium — đồng bộ thay đổi theo thời gian gần thực, không nạp lại toàn bộ bảng.',
          en: 'Debezium — near real-time change sync without reloading whole tables.',
        },
      },
      {
        nhan: { vi: 'Mô hình hoá', en: 'Modelling' },
        mo_ta: {
          vi: 'Star Schema, Snowflake Schema, Fact Table, Dimension Table, SCD.',
          en: 'Star Schema, Snowflake Schema, fact tables, dimension tables, SCD.',
        },
      },
      {
        nhan: { vi: 'Chất lượng và vận hành', en: 'Quality and operations' },
        mo_ta: {
          vi: 'Kiểm thử dữ liệu tự động trong CI, che dữ liệu cá nhân theo tầng, Docker, GitLab CI.',
          en: 'Automated data tests in CI, personal-data masking by tier, Docker, GitLab CI.',
        },
      },
    ],
  },
  {
    ten: { vi: 'Kỹ năng Phân tích', en: 'Analytics' },
    dong: [
      {
        mo_ta: {
          vi: 'Làm sạch, tổng hợp dữ liệu từ nhiều nguồn; phân tích xu hướng, dự báo và phát hiện bất thường.',
          en: 'Cleaning and consolidating data from many sources; trend analysis, forecasting and anomaly detection.',
        },
      },
      {
        mo_ta: {
          vi: 'Định nghĩa chỉ số và chuẩn hoá định nghĩa giữa các bộ phận, để cùng một câu hỏi chỉ có một con số.',
          en: 'Defining metrics and standardising those definitions across teams, so one question has exactly one answer.',
        },
      },
      {
        mo_ta: {
          vi: 'Xây dựng hệ thống KPI, dải kỳ vọng và ngưỡng cảnh báo tự động cho chỉ số vận hành.',
          en: 'Building KPI systems, expected bands and automatic alert thresholds for operational metrics.',
        },
      },
      {
        mo_ta: {
          vi: 'Thiết kế luồng báo cáo tự động theo lịch gửi tới stakeholder; đưa insight hỗ trợ ra quyết định kinh doanh.',
          en: 'Designing scheduled report delivery to stakeholders, and turning it into insight a decision can rest on.',
        },
      },
    ],
  },
  {
    ten: { vi: 'Kỹ năng Mềm', en: 'Working style' },
    dong: [
      {
        mo_ta: {
          vi: 'Giao tiếp liên phòng ban, làm rõ yêu cầu và trình bày dữ liệu dễ hiểu; tư duy phân tích, chủ động, làm việc độc lập và theo nhóm.',
          en: 'Communicating across teams, pulling requirements into focus and presenting data plainly; analytical, self-directed, effective alone and in a team.',
        },
      },
      {
        mo_ta: {
          vi: 'Làm việc trên kho mã dùng chung: review merge request, viết tài liệu để người sau đọc lại được.',
          en: 'Working in a shared repository: reviewing merge requests, and writing the documentation the next person will need.',
        },
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Dự án nổi bật
// ---------------------------------------------------------------------------
//
// Mỗi dự án phải có ít nhất một mệnh đề giá trị. Dự án không đổi được điều gì
// cho doanh nghiệp thì không thuộc về mục này, và cổng cham-thu-noi-dung chặn
// lệnh dựng khi danh sách gia_tri rỗng.

export const DU_AN_NOI_BAT: readonly Du_an_noi_bat[] = [
  {
    ma: 'pipeline-vetc',
    ten: {
      vi: 'Pipeline tự động và cảnh báo bất thường, mảng bảo hiểm và telesales',
      en: 'Automated pipeline and anomaly alerting for insurance and telesales',
    },
    noi: 'VETC',
    cong_cu: ['dbt', 'Spark', 'Iceberg', 'Airflow', 'Trino'],
    nguon: {
      vi: 'CDC qua Debezium từ database nghiệp vụ',
      en: 'CDC through Debezium from the operational databases',
    },
    quy_mo: { vi: '534 model, 720 bảng nguồn', en: '534 models, 720 sources' },
    viec: {
      vi: 'Pipeline 6 chặng chạy theo lịch mỗi giờ, tự gửi báo cáo lúc 7:00 và bắn cảnh báo khi chỉ số lệch khỏi dải kỳ vọng.',
      en: 'A six-stage pipeline on an hourly schedule that sends the report at 07:00 and fires an alert when a metric leaves its expected band.',
    },
    gia_tri: [
      { vi: 'Giảm 30% giờ làm báo cáo tay mỗi tuần', en: '30% fewer hours on manual reporting each week' },
      { vi: 'Rút thời gian phát hiện sai lệch từ 5 ngày xuống trong ngày', en: 'Time to detection cut from 5 days to same day' },
    ],
  },
  {
    ma: 'dinh-danh-vetc',
    ten: { vi: 'Lớp hợp nhất định danh khách hàng', en: 'Customer identity resolution layer' },
    noi: 'VETC',
    cong_cu: ['dbt-spark', 'Iceberg', 'Trino'],
    nguon: { vi: 'Tolling, ví điện tử, bảo hiểm, telesales', en: 'Tolling, e-wallet, insurance, telesales' },
    quy_mo: { vi: '4 hệ nguồn độc lập', en: '4 independent source systems' },
    viec: {
      vi: 'Nối bốn hệ nguồn về cùng một khách hàng, đo được vòng đời và tái tục thay vì đếm giao dịch rời rạc.',
      en: 'Ties four source systems to one customer, making lifetime and renewal measurable instead of counting isolated transactions.',
    },
    gia_tri: [{ vi: 'Tăng 60% tỷ lệ tái tục mảng bảo hiểm', en: '60% lift in insurance renewal rate' }],
  },
  {
    ma: 'serving-vetc',
    ten: { vi: 'Bảng phục vụ BI dạng phẳng', en: 'Flat BI serving tables' },
    noi: 'VETC',
    cong_cu: ['dbt', 'Iceberg', 'Trino', 'Superset'],
    nguon: { vi: 'Tầng datamart', en: 'The datamart tier' },
    quy_mo: { vi: '12.027 cột trong đồ thị lineage', en: '12,027 columns under lineage' },
    viec: {
      vi: 'Dựng sẵn toàn bộ chỉ số nên dashboard không phải join lúc đọc.',
      en: 'Every metric is pre-computed, so no dashboard joins anything at read time.',
    },
    gia_tri: [
      { vi: 'Rút thời gian tải dashboard từ phút xuống giây', en: 'Dashboard load time cut from minutes to seconds' },
      { vi: 'Giảm 20% yêu cầu báo cáo gửi về đội data', en: '20% fewer ad-hoc report requests to the data team' },
    ],
  },
  {
    ma: 'dwh-shine',
    ten: {
      vi: 'Data Warehouse tập trung và pipeline ETL/CDC cho chuỗi 100+ salon',
      en: 'Central data warehouse and ETL/CDC pipeline for a 100+ salon chain',
    },
    noi: '30Shine',
    cong_cu: ['SQL Server', 'SSIS', 'Python'],
    nguon: { vi: 'POS, lương thưởng, vật tư, chấm công', en: 'POS, payroll, materials, time tracking' },
    quy_mo: { vi: '~10 triệu dòng tích luỹ', en: '~10 million rows accumulated' },
    viec: {
      vi: 'Star Schema hợp nhất 4 hệ nguồn độc lập, ETL tự động thay hoàn toàn import thủ công, CDC chỉ xử lý bản ghi thay đổi.',
      en: 'A Star Schema unifying four independent source systems, automated ETL replacing manual imports entirely, and CDC processing only changed rows.',
    },
    gia_tri: [
      { vi: 'Một nguồn số liệu nhất quán cho toàn chuỗi', en: 'One consistent source of truth for the whole chain' },
      { vi: 'Độ trễ dashboard dưới 15 phút', en: 'Dashboard latency under 15 minutes' },
    ],
  },
  {
    ma: 'dashboard-shine',
    ten: {
      vi: 'Bộ dashboard vận hành cho hơn 100 quản lý salon',
      en: 'Operations dashboards for 100+ salon managers',
    },
    noi: '30Shine',
    cong_cu: ['Power BI', 'SQL Server', 'DAX'],
    nguon: { vi: 'Giao dịch, chấm công, KPI nội bộ', en: 'Transactions, time tracking, internal KPIs' },
    quy_mo: { vi: '~5 triệu dòng mỗi tháng', en: '~5 million rows a month' },
    viec: {
      vi: 'Doanh thu theo dịch vụ, AOV, lượt khách và hiệu suất theo nhân viên, salon, vùng — thay hoàn toàn báo cáo Excel cuối tuần.',
      en: 'Revenue by service, AOV, footfall and performance by staff, salon and region — replacing the weekend Excel report outright.',
    },
    gia_tri: [
      { vi: 'Tiết kiệm 4–6 giờ mỗi tuần cho mỗi quản lý vùng', en: '4 to 6 hours a week saved for each regional manager' },
      { vi: 'Tăng 15% hiệu suất nhân sự toàn chuỗi', en: '15% lift in chain-wide staff productivity' },
    ],
  },
  {
    ma: 'tai-chinh-shine',
    ten: { vi: 'Hệ thống báo cáo tài chính và kiểm soát chi phí', en: 'Finance reporting and cost control system' },
    noi: '30Shine',
    cong_cu: ['Power BI', 'SQL Server', 'DAX', 'Python'],
    nguon: { vi: 'Doanh thu, chi phí vật tư, lương thưởng', en: 'Revenue, materials cost, payroll' },
    quy_mo: { vi: '~900.000 dòng mỗi tháng', en: '~900,000 rows a month' },
    viec: {
      vi: 'Lợi nhuận gộp theo từng salon và vùng, cảnh báo tự động khi chi phí vật tư hoặc nhân sự vượt ngưỡng.',
      en: 'Gross margin per salon and region, with automatic alerts when materials or staff cost crosses its ceiling.',
    },
    gia_tri: [
      { vi: 'Tiết kiệm 10–15% ngân sách toàn hệ thống mỗi quý', en: '10 to 15% of system-wide budget saved each quarter' },
      { vi: 'BOD nắm biên lợi nhuận theo thời gian thực', en: 'The board sees gross margin in real time' },
    ],
  },
]

/** Sản phẩm cá nhân. Một khối nhỏ, vì nó không nằm trong CV nhưng là thứ duy
 *  nhất trên trang mà người đọc mở ra dùng thử được ngay. */
export const DAPRACTICE: Khoi_phu = {
  ten: { vi: 'dapractice', en: 'dapractice' },
  mo_ta: {
    vi: 'Nền tảng luyện SQL tôi tự xây và tự vận hành từ đầu tới cuối: sản phẩm, máy chủ, giao diện, hạ tầng. Bấm một đường dẫn là có ngay một Postgres thật với dữ liệu bẩn cố ý, làm bài và được chấm tự động.',
    en: 'A SQL practice platform I built and run end to end: product, server, interface, infrastructure. Follow a link and you get a real Postgres with deliberately dirty data, an exercise, and automatic grading.',
  },
  lien_ket: {
    nhan: { vi: 'Mở dapractice.site', en: 'Open dapractice.site' },
    dia_chi: 'https://dapractice.site',
  },
}

// ---------------------------------------------------------------------------
// Học vấn và chứng chỉ
// ---------------------------------------------------------------------------

export const HOC_VAN: Hoc_van = {
  truong: { vi: 'Học viện Kỹ thuật Quân sự', en: 'Military Technical Academy' },
  nganh: { vi: 'Ngành Cơ khí', en: 'Mechanical Engineering' },
  thoi_gian: '2016 – 2020',
  ghi_chu: { vi: 'Tốt nghiệp loại Khá', en: 'Graduated with credit' },
}

export const CHUNG_CHI: readonly Chung_chi[] = [
  {
    ten: { vi: 'Business Analyst — FPT', en: 'Business Analyst — FPT' },
    nam: '2021',
    ghi_chu: { vi: 'Phân tích nghiệp vụ, đặc tả yêu cầu', en: 'Business analysis, requirements specification' },
  },
]

// ---------------------------------------------------------------------------
// Liên hệ và nhãn giao diện
// ---------------------------------------------------------------------------

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

/** Nhãn dùng trong giao diện: tiêu đề mục, chú thích, chân trang. */
export const NHAN = {
  tieu_de_trang: {
    vi: 'Phạm Quang Huy, Kỹ sư Dữ liệu và Phân tích Dữ liệu',
    en: 'Phạm Quang Huy, Data Engineer & Data Analyst',
  } satisfies Song,
  mo_ta_trang: {
    vi: 'Bốn năm xây nền tảng dữ liệu và đường ống dữ liệu từ nguồn tới biểu đồ. Hiện làm tại VETC, tập đoàn Tasco.',
    en: 'Four years building data platforms and pipelines from source system to chart. Currently at VETC, Tasco group.',
  } satisfies Song,

  muc_muc_tieu: { vi: 'Mục tiêu nghề nghiệp', en: 'What I am after' } satisfies Song,
  muc_kinh_nghiem: { vi: 'Kinh nghiệm làm việc', en: 'Experience' } satisfies Song,
  muc_ky_nang: { vi: 'Kỹ năng chuyên môn', en: 'Skills' } satisfies Song,
  muc_du_an: { vi: 'Dự án nổi bật', en: 'Selected projects' } satisfies Song,
  muc_hoc_van: { vi: 'Học vấn và chứng chỉ', en: 'Education and certification' } satisfies Song,
  muc_lien_he: { vi: 'Liên hệ', en: 'Get in touch' } satisfies Song,

  dieu_huong_kinh_nghiem: { vi: 'Kinh nghiệm', en: 'Experience' } satisfies Song,
  dieu_huong_du_an: { vi: 'Dự án', en: 'Projects' } satisfies Song,

  nhan_ngan_xep: { vi: 'Tech stack', en: 'Tech stack' } satisfies Song,
  nhan_cong_cu: { vi: 'Công cụ', en: 'Tools' } satisfies Song,
  nhan_nguon: { vi: 'Nguồn dữ liệu', en: 'Data source' } satisfies Song,
  nhan_quy_mo: { vi: 'Quy mô', en: 'Scale' } satisfies Song,
  nhan_gia_tri: { vi: 'Giá trị mang lại', en: 'Business impact' } satisfies Song,
  nhan_hoc_van: { vi: 'Học vấn', en: 'Education' } satisfies Song,
  nhan_chung_chi: { vi: 'Chứng chỉ', en: 'Certification' } satisfies Song,
  nhan_san_pham_rieng: { vi: 'Sản phẩm cá nhân', en: 'Side project' } satisfies Song,

  doi_ngon_ngu: { vi: 'Đổi sang tiếng Anh', en: 'Switch to Vietnamese' } satisfies Song,
  bo_qua_dau_trang: { vi: 'Bỏ qua phần đầu trang', en: 'Skip to main content' } satisfies Song,
  doi_sang_nen_toi: { vi: 'Chuyển sang nền tối', en: 'Switch to dark theme' } satisfies Song,
  doi_sang_nen_sang: { vi: 'Chuyển sang nền sáng', en: 'Switch to light theme' } satisfies Song,
  nhan_theo_doi: { vi: 'Tìm tôi ở', en: 'Find me on' } satisfies Song,
  anh_chan_dung: { vi: 'Ảnh chân dung Phạm Quang Huy', en: 'Portrait of Phạm Quang Huy' } satisfies Song,
  chan_trang: { vi: 'made by HuyPQ', en: 'made by HuyPQ' } satisfies Song,
}
