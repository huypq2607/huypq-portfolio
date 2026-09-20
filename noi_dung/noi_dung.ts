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
  Chuyen_bien,
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
}

/** Câu lớn nhất trang. Ngắn, vì nó được đặt cỡ chữ rất to. */
export const KHAU_HIEU: Song = {
  vi: 'Mọi báo cáo đều bắt nguồn từ dữ liệu!',
}

export const DAN_GIAI: Song = {
  vi: 'Từ những dòng data thô, tới những dashboard giúp đưa ra quyết định một cách nhanh chóng.',
}

export const HO_SO: readonly Dong_ho_so[] = [
  {
    nhan: { vi: 'Năm sinh' },
    gia_tri: { vi: '1997' },
  },
  {
    nhan: { vi: 'Kinh nghiệm' },
    gia_tri: { vi: '4 năm, kỹ thuật dữ liệu và phân tích' },
  },
  {
    nhan: { vi: 'Hiện tại' },
    gia_tri: { vi: 'VETC, tập đoàn Tasco' },
  },
  {
    nhan: { vi: 'Học vấn' },
    gia_tri: {
      vi: 'Học viện Kỹ thuật Quân sự, khoa Cơ khí',
    },
  },
  {
    nhan: { vi: 'Sẵn sàng' },
    gia_tri: { vi: 'Data Engineer & Data Analyst' },
  },
]

/** Mục tiêu nghề nghiệp. Ba câu, đúng ba ý của bản CV. */
export const MUC_TIEU: readonly Song[] = [
  {
    vi: 'Bốn năm làm dữ liệu, tôi muốn đóng góp vào việc xây dựng hệ thống báo cáo và phân tích giúp tăng hiệu suất làm việc cho tổ chức và loại bỏ những báo cáo làm tay.',
  },
  {
    vi: 'Tôi đặc biệt quan tâm tới việc dùng dữ liệu để hiểu hành vi người dùng, theo dõi chỉ số và hỗ trợ ra quyết định kinh doanh chính xác và nhanh chóng.',
  },
  {
    vi: 'Với tư duy cầu toàn và khả năng làm việc liên phòng ban, tôi phối hợp được với PO, Dev và Manager để tạo ra hệ thống báo cáo thực sự có người dùng.',
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
    cong_ty: { vi: 'VETC, tập đoàn Tasco' },
    chuc_danh: { vi: 'Data Analyst & Data Engineer' },
    thoi_gian: { vi: '2025 – Hiện tại' },

    so_lieu: [
      { so: { vi: '534' }, nhan: { vi: 'model dbt' } },
      { so: { vi: '720' }, nhan: { vi: 'bảng nguồn' } },
      { so: { vi: '12.027' }, nhan: { vi: 'dòng dữ liệu mỗi giờ' } },
    ],

    // Sáu chặng, chạy khép kín từ lúc lấy dữ liệu tới lúc một con người nhận
    // được cảnh báo. Thứ tự ở đây là thứ tự chạy thật, và sơ đồ lấy đúng thứ
    // tự ấy để chọn màu, nên đảo hai dòng là đảo luôn màu trên hình.
    quy_trinh: [
      { ma: 'lay', ten: { vi: 'Lấy dữ liệu' }, nhip: { vi: 'Mỗi giờ' } },
      { ma: 'sach', ten: { vi: 'Làm sạch' }, nhip: { vi: 'Mỗi giờ' } },
      { ma: 'chi-so', ten: { vi: 'Dựng chỉ số' }, nhip: { vi: 'Hằng ngày' } },
      { ma: 'phuc-vu', ten: { vi: 'Master data' }, nhip: { vi: 'Hằng ngày' } },
      { ma: 'dashboard', ten: { vi: 'Dashboard Superset' }, nhip: { vi: 'Hằng ngày' } },
      { ma: 'canh-bao', ten: { vi: 'Cảnh báo bất thường' }, nhip: { vi: 'Sau mỗi lần chạy' } },
      { ma: 'bao-cao', ten: { vi: 'Gửi mail Outlook' }, nhip: { vi: '7:00 hằng ngày' } },
    ],

    vai_tro: [
      {
        ten: { vi: 'Vai trò Data Analyst' },
        viec: [
          {
            lam: {
              vi: 'Xây dựng và vận hành pipeline khép kín 6 chặng cho mảng telesales và bảo hiểm, từ lấy dữ liệu CDC tới báo cáo và cảnh báo, chạy theo lịch mỗi giờ.',
            },
            ket_qua: {
              vi: 'Loại bỏ hoàn toàn thao tác thủ công trong luồng dữ liệu hằng ngày.',
            },
            hinh: 'bo-thu-cong',
          },
          {
            lam: {
              vi: 'Tự động hoá báo cáo hằng ngày qua Outlook gửi stakeholder lúc 7:00, thay thế quy trình tổng hợp tay mỗi sáng.',
            },
            ket_qua: {
              vi: 'thời gian làm báo cáo mỗi tuần',
            },
            so: { vi: '−70%' },
            hinh: 'thoi-gian',
          },
          {
            lam: {
              vi: 'Xây dựng hệ thống cảnh báo bất thường, so chỉ số với dải kỳ vọng sau mỗi lần chạy.',
            },
            ket_qua: {
              vi: 'phát hiện sai lệch, thay vì sau 5 ngày như trước, xử lý trước khi lan sang báo cáo tháng',
            },
            so: { vi: 'Trong ngày' },
            hinh: 'phat-hien',
          },
          {
            lam: {
              vi: 'Vận hành dự án dbt dùng chung quy mô 534 model trên 720 bảng nguồn, 12.027 cột trong đồ thị lineage.',
            },
            ket_qua: {
              vi: 'Đưa toàn bộ chỉ số của mảng về một nguồn số liệu duy nhất, chấm dứt tình trạng mỗi bộ phận báo một con số khác nhau.',
            },
            hinh: 'gop-mot-moi',
          },
          {
            lam: {
              vi: 'Xây dựng lớp hợp nhất định danh khách hàng xuyên tolling, ví điện tử, bảo hiểm và telesales, cho phép đo vòng đời khách hàng và tái tục hợp đồng thay vì đếm giao dịch rời rạc.',
            },
            ket_qua: {
              vi: 'tỷ lệ tái tục mảng bảo hiểm',
            },
            so: { vi: '+60%' },
            hinh: 'tai-tuc',
          },
                ],
      },
      {
        ten: { vi: 'Vai trò Data Engineer' },
        viec: [
          {
            lam: {
              vi: 'Cung cấp bảng tổng hợp dạng phẳng cho Superset và API nội bộ, dựng sẵn chỉ số nên không phải join lúc đọc.',
            },
            ket_qua: {
              vi: 'thời gian tải dashboard, và giảm 20% yêu cầu báo cáo gửi về đội data',
            },
            so: { vi: 'Phút → giây' },
            hinh: 'toc-do',
          },
          {
            lam: {
              vi: 'Thiết lập ranh giới dữ liệu cá nhân: số điện thoại, email, biển số và số định danh được che tại tầng curated, canh ở bước duyệt merge request.',
            },
            ket_qua: {
              vi: 'Biến yêu cầu tuân thủ thành ràng buộc kỹ thuật, loại bỏ rủi ro lộ dữ liệu cá nhân qua các bảng báo cáo.',
            },
            hinh: 'che-chan',
          },
          {
            lam: {
              vi: 'Kiến trúc và vận hành: phân tầng landing, curated, hợp nhất định danh, precomp, datamart và serving trên Apache Iceberg với Star Schema, Fact Table, Dimension Table và SCD; luồng biến đổi bằng dbt-core và dbt-spark kèm kiểm thử dữ liệu tự động; CDC qua Debezium theo nhịp giờ; điều phối bằng Airflow, mọi thay đổi qua GitLab CI.',
            },
            ket_qua: {
              vi: 'Chặn lỗi dữ liệu ở CI thay vì để người dùng phát hiện trên dashboard.',
            },
            hinh: 'chan-loi',
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
    cong_ty: { vi: 'Công ty cổ phần TMDV 30Shine' },
    chuc_danh: { vi: 'Data Analyst' },
    thoi_gian: { vi: '2022 – 2025' },

    so_lieu: [
      { so: { vi: '14' }, nhan: { vi: 'dashboard dùng hằng ngày' } },
      { so: { vi: '100+' }, nhan: { vi: 'quản lý salon là người dùng' } },
      { so: { vi: '10 triệu' }, nhan: { vi: 'dòng tích luỹ trong kho dữ liệu' } },
    ],

    // Năm chặng chứ không phải sáu. Không độn thêm một chặng cho bằng VETC:
    // dây chuyền ở đây dừng lại ở cảnh báo vượt ngưỡng, và bịa ra chặng thứ
    // sáu chỉ để hai hình cân nhau là nói sai. Màu vẫn trải hết dải vì bậc
    // tính theo số chặng thật.
    quy_trinh: [
      { ma: 'lay', ten: { vi: 'Lấy dữ liệu' }, nhip: { vi: 'Neartime' } },
      { ma: 'sach', ten: { vi: 'Làm sạch và kiểm tra' }, nhip: { vi: 'Mỗi lần nạp' } },
      { ma: 'kho', ten: { vi: 'Master data' }, nhip: { vi: 'Hằng ngày' } },
      { ma: 'dashboard', ten: { vi: 'Dashboard Power BI' }, nhip: { vi: 'Độ trễ dưới 15 phút' } },
      { ma: 'canh-bao', ten: { vi: 'Cảnh báo vượt ngưỡng' }, nhip: { vi: 'Khi vượt ngưỡng' } },
      { ma: 'nhan-tin', ten: { vi: 'Gửi thông báo qua Lark' }, nhip: { vi: '8:00 hàng ngày' } },
    ],

    vai_tro: [
      {
        viec: [
          {
            lam: {
              vi: 'Xây dựng 14 dashboard Power BI cho hơn 100 quản lý salon dùng hằng ngày: doanh thu theo dịch vụ và sản phẩm, năng suất nhân viên, tỷ lệ đạt KPI theo vị trí, chi nhánh và vùng.',
            },
            ket_qua: {
              vi: 'hiệu quả vận hành, và loại bỏ hoàn toàn báo cáo thủ công cuối tuần',
            },
            so: { vi: '+15%' },
            hinh: 'leo-bac',
          },
          {
            lam: {
              vi: 'Tự động hoá thu thập và xử lý dữ liệu từ SQL Server, Excel và API nội bộ.',
            },
            ket_qua: {
              vi: 'thời gian xử lý thủ công hằng tháng, để Vận hành, Kinh doanh và Marketing tập trung phân tích thay vì nhập liệu',
            },
            so: { vi: '−70%' },
            hinh: 'bot-viec',
          },
          {
            lam: {
              vi: 'Xây dựng hệ thống báo cáo tài chính vận hành: doanh thu thực so với kế hoạch, kiểm soát chi phí vật tư và nhân sự theo từng salon và vùng, chuẩn hoá chỉ số cùng bộ phận Kế toán.',
            },
            ket_qua: {
              vi: 'ngân sách tiết kiệm mỗi quý, BOD nắm biên lợi nhuận theo thời gian thực',
            },
            so: { vi: '10–15%' },
            hinh: 'ngan-sach',
          },
          {
            lam: {
              vi: 'Phân tích cơ cấu lương thưởng và hiệu suất nhân sự toàn chuỗi, đề xuất điều chỉnh đãi ngộ theo nhóm vị trí và mức KPI.',
            },
            ket_qua: {
              vi: 'hiệu suất tổng thể, và cải thiện tỷ lệ giữ chân nhân sự',
            },
            so: { vi: '+25%' },
            hinh: 'nhan-su',
          },
          {
            lam: {
              vi: 'Ứng dụng AI vào phân tích dữ liệu: cảnh báo bất thường tự động, gợi ý biểu đồ trực quan hoá và dự đoán xu hướng doanh thu.',
            },
            ket_qua: {
              vi: 'Hỗ trợ BOD ra quyết định nhanh và chính xác hơn.',
            },
            hinh: 'quyet-dinh',
          },
          {
            lam: {
              vi: 'Data Warehouse và ETL: Star Schema và Snowflake Schema với Fact Table, Dimension Table và SCD; luồng ETL từ nhiều nguồn vào DWH kèm data cleaning, transformation và validation; CDC đồng bộ thay đổi theo thời gian gần thực.',
            },
            ket_qua: {
              vi: 'Giữ độ trễ báo cáo thấp.',
            },
            hinh: 'do-tre',
          },
          {
            lam: {
              vi: 'Thiết kế ERD, viết tài liệu BRD và SRS, làm việc trực tiếp với BA, Dev và người dùng nghiệp vụ để chốt yêu cầu ngay từ đầu.',
            },
            hinh: 'tai-lieu',
          },
                ],
      },
    ],

    ngan_xep: ['Power BI', 'DAX', 'SQL Server', 'SSIS', 'Python', 'Star Schema', 'SCD', 'ETL', 'CDC'],
  },
]

// ---------------------------------------------------------------------------
// Những con số đã đổi được
// ---------------------------------------------------------------------------
//
// Khối này đứng ngay dưới phần mở đầu, trước mọi đoạn chữ. Người lướt trang
// dừng lại ở đây là đã nắm được toàn bộ câu chuyện, không cần đọc câu nào.
//
// Hai dạng nằm chung một danh sách: cặp trước và sau khi đo được cả hai đầu,
// và một mức chênh khi chỉ đo được phần thay đổi. Không ép dạng thứ hai thành
// dạng thứ nhất, vì làm thế là bịa ra một mốc trước mà không ai từng đo.

export const CHUYEN_BIEN: readonly Chuyen_bien[] = [
  {
    noi: 'VETC',
    nhan: { vi: 'Giờ làm báo cáo tay mỗi tuần' },
    chieu: 'giam',
    sau: { vi: '-70%' },
  },
  {
    noi: 'VETC',
    nhan: { vi: 'Tỷ lệ tái tục mảng bảo hiểm' },
    chieu: 'tang',
    sau: { vi: '+60%' },
  },
  {
    noi: 'VETC',
    nhan: { vi: 'Thời gian phát hiện sai lệch' },
    chieu: 'rut',
    truoc: { vi: '5 ngày' },
    sau: { vi: 'Trong ngày' },
  },
  {
    noi: 'VETC',
    nhan: { vi: 'Thời gian loading dashboard' },
    chieu: 'rut',
    truoc: { vi: 'Phút' },
    sau: { vi: 'Giây' },
  },
  {
    noi: '30Shine',
    nhan: { vi: 'Thời gian xử lý dữ liệu thủ công mỗi tháng' },
    chieu: 'giam',
    sau: { vi: '-70%' },
  },
  {
    noi: '30Shine',
    nhan: { vi: 'Ngân sách vận hành tiết kiệm mỗi quý' },
    chieu: 'giam',
    sau: { vi: '10-15%' },
  },
  {
    noi: '30Shine',
    nhan: { vi: 'Hiệu quả vận hành toàn chuỗi' },
    chieu: 'tang',
    sau: { vi: '+15%' },
  },
  {
    noi: '30Shine',
    nhan: { vi: 'Thời gian bổ sung nghiệp vụ báo cáo' },
    chieu: 'tang',
    sau: { vi: '4-6 giờ/tuần' },
  },
]


// ---------------------------------------------------------------------------
// Kỹ năng chuyên môn
// ---------------------------------------------------------------------------

export const KY_NANG: readonly Nhom_ky_nang[] = [
  {
    ten: { vi: 'Công cụ và ngôn ngữ' },
    cong_cu: [
      'Power BI',
      'DAX',
      'Power Query',
      'Superset',
      'SQL',
      'Trino',
      'Spark SQL',
      'SQL Server',
      'PostgreSQL',
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
    ],
  },
  {
    ten: { vi: 'Nền tảng dữ liệu' },
    cong_cu: [
      'Apache Iceberg',
      'REST catalog',
      'MinIO / S3',
      'dbt core',
      'dbt spark',
      'Custom materializations',
      'Incremental & merge',
      'Apache Spark',
      'Apache Airflow',
      'Debezium',
      'CDC',
      'Docker',
      'GitLab CI',
    ],
  },
  {
    ten: { vi: 'Mô hình hoá dữ liệu' },
    cong_cu: [
      'Star Schema',
      'Snowflake Schema',
      'Fact Table',
      'Dimension Table',
      'SCD',
      'ERD',
      'BRD',
      'SRS',
    ],
  },
  {
    ten: { vi: 'Cách làm việc' },
    y: [
      { vi: 'Định nghĩa chỉ số và chuẩn hoá định nghĩa giữa các bộ phận, để cùng một câu hỏi chỉ có một con số.' },
      { vi: 'Xây dựng hệ thống KPI, dải kỳ vọng và ngưỡng cảnh báo tự động cho chỉ số vận hành.' },
      { vi: 'Thiết kế luồng báo cáo tự động theo lịch gửi tới stakeholder.' },
      { vi: 'Kiểm thử dữ liệu tự động trong CI, che dữ liệu cá nhân theo tầng.' },
      { vi: 'Giao tiếp liên phòng ban, làm rõ yêu cầu và trình bày dữ liệu dễ hiểu.' },
      { vi: 'Làm việc trên kho mã dùng chung: review merge request, viết tài liệu để người sau đọc lại được.' },
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
    },
    noi: 'VETC',
    cong_cu: ['dbt', 'Spark', 'Iceberg', 'Airflow', 'Trino'],
    nguon: {
      vi: 'CDC qua Debezium từ database nghiệp vụ',
    },
    quy_mo: { vi: '534 model, 720 bảng nguồn' },
    viec: {
      vi: 'Pipeline 6 chặng chạy theo lịch mỗi giờ, tự gửi báo cáo lúc 7:00 và bắn cảnh báo khi chỉ số lệch khỏi dải kỳ vọng.',
    },
    gia_tri: [
      { vi: 'Giảm 70% giờ làm báo cáo tay mỗi tuần' },
      { vi: 'Rút thời gian phát hiện sai lệch từ 5 ngày xuống trong ngày' },
    ],
  },
  {
    ma: 'dinh-danh-vetc',
    ten: { vi: 'Lớp hợp nhất định danh khách hàng' },
    noi: 'VETC',
    cong_cu: ['dbt-spark', 'Iceberg', 'Trino'],
    nguon: { vi: 'Tolling, ví điện tử, bảo hiểm, telesales' },
    quy_mo: { vi: '4 hệ nguồn độc lập' },
    viec: {
      vi: 'Nối bốn hệ nguồn về cùng một khách hàng, đo được vòng đời và tái tục thay vì đếm giao dịch rời rạc.',
    },
    gia_tri: [{ vi: 'Tăng 60% tỷ lệ tái tục mảng bảo hiểm' }],
  },
  {
    ma: 'serving-vetc',
    ten: { vi: 'Bảng phục vụ BI dạng phẳng' },
    noi: 'VETC',
    cong_cu: ['dbt', 'Iceberg', 'Trino', 'Superset'],
    nguon: { vi: 'Tầng datamart' },
    quy_mo: { vi: '12.027 cột trong đồ thị lineage' },
    viec: {
      vi: 'Dựng sẵn toàn bộ chỉ số nên dashboard không phải join lúc đọc.',
    },
    gia_tri: [
      { vi: 'Rút thời gian tải dashboard từ phút xuống giây' },
      { vi: 'Giảm 20% yêu cầu báo cáo gửi về đội data' },
    ],
  },
  {
    ma: 'dwh-shine',
    ten: {
      vi: 'Data Warehouse tập trung và pipeline ETL/CDC cho chuỗi 100+ salon',
    },
    noi: '30Shine',
    cong_cu: ['SQL Server', 'SSIS', 'Python'],
    nguon: { vi: 'POS, lương thưởng, vật tư, chấm công' },
    quy_mo: { vi: '~10 triệu dòng tích luỹ' },
    viec: {
      vi: 'Star Schema hợp nhất 4 hệ nguồn độc lập, ETL tự động thay hoàn toàn import thủ công, CDC chỉ xử lý bản ghi thay đổi.',
    },
    gia_tri: [
      { vi: 'Một nguồn số liệu nhất quán cho toàn chuỗi' },
      { vi: 'Độ trễ dashboard dưới 15 phút' },
    ],
  },
  {
    ma: 'dashboard-shine',
    ten: {
      vi: 'Bộ dashboard vận hành cho hơn 100 quản lý salon',
    },
    noi: '30Shine',
    cong_cu: ['Power BI', 'SQL Server', 'DAX'],
    nguon: { vi: 'Giao dịch, chấm công, KPI nội bộ' },
    quy_mo: { vi: '~5 triệu dòng mỗi tháng' },
    viec: {
      vi: 'Doanh thu theo dịch vụ, AOV, lượt khách và hiệu suất theo nhân viên, salon, vùng — thay hoàn toàn báo cáo Excel cuối tuần.',
    },
    gia_tri: [
      { vi: 'Tiết kiệm 4–6 giờ mỗi tuần cho mỗi quản lý vùng' },
      { vi: 'Tăng 15% hiệu suất nhân sự toàn chuỗi' },
    ],
  },
  {
    ma: 'tai-chinh-shine',
    ten: { vi: 'Hệ thống báo cáo tài chính và kiểm soát chi phí' },
    noi: '30Shine',
    cong_cu: ['Power BI', 'SQL Server', 'DAX', 'Python'],
    nguon: { vi: 'Doanh thu, chi phí vật tư, lương thưởng' },
    quy_mo: { vi: '~900.000 dòng mỗi tháng' },
    viec: {
      vi: 'Lợi nhuận gộp theo từng salon và vùng, cảnh báo tự động khi chi phí vật tư hoặc nhân sự vượt ngưỡng.',
    },
    gia_tri: [
      { vi: 'Tiết kiệm 10–15% ngân sách toàn hệ thống mỗi quý' },
      { vi: 'BOD nắm biên lợi nhuận theo thời gian thực' },
    ],
  },
]

/** Sản phẩm cá nhân. Một khối nhỏ, vì nó không nằm trong CV nhưng là thứ duy
 *  nhất trên trang mà người đọc mở ra dùng thử được ngay. */
export const DAPRACTICE: Khoi_phu = {
  ten: { vi: 'dapractice' },
  mo_ta: {
    vi: 'Nền tảng luyện tập dành cho dân Phân tích dữ liệu tôi tự xây và tự vận hành. Có đầy đủ từng chặng đường để trở thành 1 DA chuyên nghiệp. Có AI đóng vai trò là trợ lý học tập.',
  },
  lien_ket: {
    nhan: { vi: 'Mở dapractice.site' },
    dia_chi: 'https://dapractice.site',
  },
}

// ---------------------------------------------------------------------------
// Học vấn và chứng chỉ
// ---------------------------------------------------------------------------

export const HOC_VAN: Hoc_van = {
  truong: { vi: 'Học viện Kỹ thuật Quân sự' },
  nganh: { vi: 'Ngành Cơ khí' },
  thoi_gian: '2016 – 2020',
  ghi_chu: { vi: 'Tốt nghiệp loại Khá' },
}

export const CHUNG_CHI: readonly Chung_chi[] = [
  {
    ten: { vi: 'Business Analyst — FPT' },
    nam: '2021',
    ghi_chu: { vi: 'Phân tích nghiệp vụ, đặc tả yêu cầu' },
  },
]

// ---------------------------------------------------------------------------
// Liên hệ và nhãn giao diện
// ---------------------------------------------------------------------------

export const LIEN_HE = {
  loi_moi: {
    vi: 'Sđt: 0972.617.963',
  } satisfies Song,
  email: 'huypq2607@gmail.com',

  /** Các nơi khác có thể tìm thấy tôi. Thứ tự trong mảng là thứ tự hiển thị:
   *  sản phẩm tự làm trước, rồi hai kênh chia sẻ kiến thức. */
  kenh: [
    { ten: 'dapractice', nhan: 'dapractice.site', dia_chi: 'https://dapractice.site' },
    { ten: 'Threads', nhan: '@huypq.data', dia_chi: 'https://www.threads.com/@huypq.data' },
    { ten: 'TikTok', nhan: '@huypq17b6', dia_chi: 'https://www.tiktok.com/@huypq17b6' },
  ],
}

/** Nhãn dùng trong giao diện: tiêu đề mục, chú thích, chân trang. */
export const NHAN = {
  tieu_de_trang: {
    vi: 'Phạm Quang Huy, Kỹ sư Dữ liệu và Phân tích Dữ liệu',
  } satisfies Song,
  mo_ta_trang: {
    vi: 'Bốn năm xây nền tảng dữ liệu và đường ống dữ liệu từ nguồn tới biểu đồ. Hiện làm tại VETC, tập đoàn Tasco.',
  } satisfies Song,

  muc_muc_tieu: { vi: 'Mục tiêu nghề nghiệp' } satisfies Song,
  muc_kinh_nghiem: { vi: 'Kinh nghiệm làm việc' } satisfies Song,
  muc_ky_nang: { vi: 'Kỹ năng chuyên môn' } satisfies Song,
  muc_du_an: { vi: 'Dự án nổi bật' } satisfies Song,
  muc_hoc_van: { vi: 'Học vấn và chứng chỉ' } satisfies Song,
  muc_lien_he: { vi: 'Liên hệ' } satisfies Song,

  dieu_huong_kinh_nghiem: { vi: 'Kinh nghiệm' } satisfies Song,
  dieu_huong_du_an: { vi: 'Dự án' } satisfies Song,

  nhan_ngan_xep: { vi: 'Tech stack' } satisfies Song,
  nhan_cong_cu: { vi: 'Công cụ' } satisfies Song,
  nhan_nguon: { vi: 'Nguồn dữ liệu' } satisfies Song,
  nhan_quy_mo: { vi: 'Quy mô' } satisfies Song,
  nhan_hoc_van: { vi: 'Học vấn' } satisfies Song,
  nhan_chung_chi: { vi: 'Chứng chỉ' } satisfies Song,
  nhan_san_pham_rieng: { vi: 'Sản phẩm cá nhân' } satisfies Song,
  nhan_quy_trinh: { vi: 'Pipeline dữ liệu' } satisfies Song,
  muc_ket_qua: { vi: 'Tôi đã đóng góp cho Tổ chức trong 4 năm qua' } satisfies Song,
  nhan_dong_thoi_gian: { vi: 'Bốn năm vừa rồi' } satisfies Song,

  bo_qua_dau_trang: { vi: 'Bỏ qua phần đầu trang' } satisfies Song,
  doi_sang_nen_toi: { vi: 'Chuyển sang nền tối' } satisfies Song,
  doi_sang_nen_sang: { vi: 'Chuyển sang nền sáng' } satisfies Song,
  nhan_theo_doi: { vi: 'Tìm tôi ở' } satisfies Song,
  anh_chan_dung: { vi: 'Ảnh chân dung Phạm Quang Huy' } satisfies Song,
  chan_trang: { vi: 'made by HuyPQ' } satisfies Song,
}
