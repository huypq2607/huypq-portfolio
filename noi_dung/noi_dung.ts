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
  Nang_luc,
  Nhom_ky_nang,
  Song,
  Tang_du_lieu,
} from './kieu.ts'

/** Tên hiển thị. Không dịch, nên để chuỗi thường thay vì cặp song ngữ. */
export const TEN = 'Phạm Quang Huy'

export const CHUC_DANH: Song = {
  vi: 'Kỹ sư Dữ liệu và Phân tích Dữ liệu',
  en: 'Data Engineer & Data Analyst',
}

/** Câu lớn nhất trang. Ngắn, vì nó được đặt cỡ chữ rất to. */
export const KHAU_HIEU: Song = {
  vi: 'Tôi dựng con đường của dữ liệu',
  en: 'I build the path data takes',
}

export const DAN_GIAI: Song = {
  vi: 'Từ một hệ thống nguồn không ai viết tài liệu, tới con số mà ai đó dựa vào để ra quyết định.',
  en: 'From a source system nobody documented, to the number someone makes a decision on.',
}

export const GIOI_THIEU: readonly Song[] = [
  {
    vi: 'Hơn ba năm làm dữ liệu, hiện tại ở VETC thuộc tập đoàn Tasco. Tôi làm trong dự án dbt dùng chung của cả phòng dữ liệu, cùng khoảng hai mươi kỹ sư, và sở hữu trọn mảng telesales với bảo hiểm, từ nguồn CDC tới bảng mà sàn kinh doanh và báo cáo doanh thu chạy trên đó.',
    en: 'Three years and counting in data, currently at VETC, part of the Tasco group. I work inside the data team’s shared dbt project alongside about twenty engineers, and own the telesales and insurance vertical end to end — from CDC source to the tables the sales floor and the revenue report run on.',
  },
  {
    vi: 'Ngoài giờ, tôi tự dựng và tự vận hành dapractice, một nền tảng luyện SQL có người trả tiền. Một mình toàn bộ: sản phẩm, máy chủ, giao diện, hạ tầng.',
    en: 'Outside work I build and operate dapractice, a SQL practice platform with paying users. All of it alone: product, server, interface, infrastructure.',
  },
]

export const HO_SO: readonly Dong_ho_so[] = [
  {
    nhan: { vi: 'Kinh nghiệm', en: 'Experience' },
    gia_tri: { vi: 'Hơn 3 năm, kỹ thuật dữ liệu và phân tích', en: '3+ years, data engineering and analytics' },
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
    gia_tri: { vi: 'Vị trí remote và tại chỗ', en: 'Remote and on-site roles' },
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

export const NANG_LUC: readonly Nang_luc[] = [
  {
    tieu_de: { vi: 'Vận hành nền tảng, không chỉ viết model', en: 'Run the platform, not just write models' },
    than: {
      vi: 'Bố trí và bảo trì bảng Iceberg, chiến lược nạp tăng dần và merge, và một materialization dbt tự viết khi bản gốc của adapter không còn tin được trước một REST catalog trả kết quả chập chờn.',
      en: 'Iceberg table layout and maintenance, incremental and merge strategy, and a hand-written dbt materialization for when the adapter’s own one could no longer be trusted against a REST catalog that answered inconsistently.',
    },
  },
  {
    tieu_de: { vi: 'Đưa dữ liệu đi hết chặng', en: 'Carry data the whole way' },
    than: {
      vi: 'CDC từ cơ sở dữ liệu nguồn, qua tầng chuẩn hoá và tầng chỉ số, tới bảng phẳng cho một biểu đồ hay một API đọc. Kể cả những hệ thống không cho API nào và phải lấy bằng đường khác.',
      en: 'CDC out of the source database, through the curated and metric tiers, to the flat table a chart or an API reads. Including the systems that offer no API and have to be read some other way.',
    },
  },
  {
    tieu_de: { vi: 'Dựng sản phẩm quanh dữ liệu', en: 'Build the product around the data' },
    than: {
      vi: 'TypeScript, Postgres, Docker, CI. Tôi đã tự dựng và tự phát hành một sản phẩm có người trả tiền, nên biết rõ những bảng mình bàn giao phải chịu được gì khi có người thật dùng.',
      en: 'TypeScript, Postgres, Docker, CI. I have shipped and operated a paid product alone, so I know what the tables I hand over have to survive once real people are on them.',
    },
  },
]

/** Bảy lớp của hộp cát SQL trong dapractice. Cột mã lỗi là mã SQLSTATE thật
 *  mà người học nhận được, không phải mã do ứng dụng tự đặt. */
export const LOP_HOP_CAT: readonly Lop_hop_cat[] = [
  { so: 1, cach: { vi: 'begin read only', en: 'begin read only' }, chan: { vi: 'Mọi lệnh ghi và mọi lệnh đổi cấu trúc', en: 'Every write and every schema change' }, ma_loi: '25006' },
  { so: 2, cach: { vi: 'set local role', en: 'set local role' }, chan: { vi: 'Đọc sang lĩnh vực khác, đọc tệp, gọi pg_sleep', en: 'Reading another domain, reading files, pg_sleep' }, ma_loi: '42501' },
  { so: 3, cach: { vi: 'giao thức mở rộng', en: 'extended protocol' }, chan: { vi: 'Nhiều câu lệnh giấu trong một chuỗi', en: 'Several statements hidden in one string' }, ma_loi: '42601' },
  { so: 4, cach: { vi: 'statement_timeout', en: 'statement_timeout' }, chan: { vi: 'Truy vấn chạy lê thê', en: 'A query that runs forever' }, ma_loi: '57014' },
  { so: 5, cach: { vi: 'đồng hồ phía máy chủ', en: 'server-side clock' }, chan: { vi: 'Cơ sở dữ liệu câm hẳn, không trả lời', en: 'A database that stops answering entirely' }, ma_loi: '57014' },
  { so: 6, cach: { vi: 'con trỏ 500 dòng', en: 'cursor, 500 rows' }, chan: { vi: 'Nối chéo trả về hàng triệu dòng', en: 'A cross join returning millions of rows' }, ma_loi: '—' },
  { so: 7, cach: { vi: 'discard all', en: 'discard all' }, chan: { vi: 'Thiết lập của câu trước dính sang câu sau', en: 'State from one query leaking into the next' }, ma_loi: '—' },
]

export const DU_AN: readonly Du_an[] = [
  {
    ma: 'vetc',
    ten: {
      vi: 'Lakehouse quy mô tập đoàn cho một nhà vận hành thu phí',
      en: 'An enterprise lakehouse for a toll road operator',
    },
    vai_tro: {
      vi: 'Kỹ sư dữ liệu tại VETC, tập đoàn Tasco',
      en: 'Data engineer at VETC, Tasco group',
    },
    tom_tat: {
      vi: 'VETC vận hành hệ thống thu phí không dừng của Việt Nam. Dự án dbt dùng chung của phòng dữ liệu phủ thu phí, ví điện tử, khách hàng thân thiết, bảo hiểm, cứu hộ, bãi đỗ, telesales và tổng đài. Tôi làm trong đó cùng khoảng hai mươi kỹ sư, và sở hữu mảng telesales với bảo hiểm từ nguồn tới bảng phục vụ.',
      en: 'VETC runs Vietnam’s electronic toll collection. The data team’s shared dbt project covers tolling, e-wallet, loyalty, insurance, roadside assistance, parking, telesales and the call centre. I work in it alongside about twenty engineers, and own the telesales and insurance vertical from source to serving table.',
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
    quyet_dinh: [
      {
        tieu_de: { vi: 'Ngày hết hạn sai trên danh sách gọi tái tục', en: 'The wrong expiry date on a renewal call list' },
        than: {
          vi: 'Danh sách khách tái tục mà telesales gọi đang lấy ngày hết hạn của hợp đồng gốc. Hợp đồng có sửa đổi bổ sung mang một ngày khác mà model không hề nhìn tới, nên những xe đã gia hạn rồi vẫn bị gọi. Sửa bằng cách ưu tiên ngày của bản sửa đổi khi nó tồn tại. Cùng bảng đó còn phải khử trùng hai lần: nguồn giữ nhiều ảnh chụp CDC cho một hợp đồng, còn phần ghép số điện thoại thì đang lọc theo thẻ đang hoạt động, vô tình bỏ rơi khách chỉ có số trên thẻ đã ngừng.',
          en: 'The lead pool telesales calls from was reading the expiry date of the original contract. A contract amended by an endorsement carries a different date that the model never looked at, so cars whose cover had already been extended were called anyway. Fixed by taking the endorsement date over the original wherever one exists. The same table needed deduplicating twice over: the source keeps several CDC snapshots per contract, and the phone-number join was filtering to active cards only, quietly dropping customers whose number sat on a deactivated one.',
        },
      },
      {
        tieu_de: { vi: 'Lỗi merge chỉ vỡ ở lần chạy thứ hai', en: 'A merge that only breaks the second time' },
        than: {
          vi: 'Nếu nguồn sinh ra hai dòng cho cùng một khoá merge thì lần chạy toàn phần không hề phát hiện: nó dựng lại bảng và mọi thứ trông vẫn đúng. Lần nạp tăng dần kế tiếp mới vỡ, thường vào ban đêm, thường rơi vào tay người khác. Tôi gặp nó, rồi đưa bất biến đó vào bộ quy tắc dựng model của đội: mọi model phải chứng minh một dòng trên một khoá trước khi merge, ở cả ba tầng.',
          en: 'If a source produces two rows for one merge key, a full refresh never notices: it rebuilds the table and everything looks right. The next incremental run is the one that breaks, usually at night, usually in somebody else’s hands. I hit it, then wrote the invariant into the team’s build standard: every model proves one row per key before the merge, at all three tiers.',
        },
      },
      {
        tieu_de: { vi: 'Xoá một bảng tôi vừa dựng xong', en: 'Deleting a table I had just finished building' },
        than: {
          vi: 'Tôi dựng một bảng dạng dài gồm bốn mươi chỉ số trên bốn trục ngày để phục vụ biểu đồ so sánh cùng kỳ. Một tuần sau, biểu đồ chuyển sang cửa sổ ngày cố định, bảng ghép sẵn sáu loại kỳ không còn ai đọc, nhưng vẫn build và vẫn tốn lưu trữ mỗi ngày. Tôi gộp phần còn dùng vào bảng kia rồi xoá nó. Việc không ai đọc không trung tính, nó là một hoá đơn tới mỗi sáng.',
          en: 'I built a long-format table holding forty metrics across four date axes to drive period-over-period charts. A week later the charts moved to a fixed date window, the pre-joined six-period table stopped being read, and it kept building and kept costing storage every single day. I folded what was still used into the other table and removed it. Work nobody reads is not neutral; it is a bill that arrives every morning.',
        },
      },
      {
        tieu_de: { vi: 'Chỗ phải bọc múi giờ và chỗ tuyệt đối không', en: 'Where the timezone must be wrapped, and where it must not' },
        than: {
          vi: 'Dữ liệu thô về theo giờ UTC, mọi tầng phía sau đọc theo giờ Việt Nam. Bộ lọc nạp tăng dần phải bọc múi giờ ở tầng precomp và tuyệt đối không bọc ở tầng trên nó. Làm ngược là câu lọc không khớp dòng nào: dbt báo chạy thành công, không dòng nào được ghi, không lỗi nào hiện ra. Thành công giả là kiểu hỏng tôi phòng trước tiên kể từ đó.',
          en: 'Raw data arrives in UTC; every tier above it is read in Vietnam time. The incremental filter has to be wrapped at the precomp tier and must never be wrapped above it. Get it the wrong way round and the filter matches nothing: dbt reports a successful run, zero rows written, no error raised. Silent success is the failure mode I design against first now.',
        },
      },
    ],
    ghi_chu: {
      vi: 'Các con số mô tả dự án dùng chung của cả phòng. Số điện thoại, email, biển số và số giấy tờ không bao giờ rời tầng curated, ranh giới đó được canh ở khâu duyệt merge request. Đó cũng là lý do trang này không có một dòng mã hay một tên bảng nào của dự án.',
      en: 'The figures describe the whole team’s shared project. Phone numbers, emails, plates and ID numbers never leave the curated tier; that boundary is enforced at merge request review. It is also why no line of code and no table name from that project appears on this page.',
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
    quyet_dinh: [
      {
        tieu_de: { vi: 'Không lọc SQL bằng biểu thức chính quy', en: 'Not filtering SQL with a regular expression' },
        than: {
          vi: 'Nước đi đầu tiên ai cũng nghĩ tới là một danh sách từ cấm. Nó không bao giờ đứng vững: chú thích, chuỗi có dấu đô la, hoa thường lẫn lộn, ký tự Unicode nhìn giống nhau. Danh sách cấm nào cũng thiếu một cách viết, và chỉ khi có người dùng đúng cách viết ấy ta mới biết. Tệ hơn, một bộ lọc trông chặt chẽ khiến ta lơi lỏng những lớp thật sự có tác dụng. Postgres hiểu đúng cú pháp của chính nó, nên việc từ chối giao hết cho Postgres, và nó từ chối kèm một mã lỗi người học đọc được.',
          en: 'The obvious first move is a denylist of forbidden words. It never holds: comments, dollar-quoting, mixed case, lookalike Unicode. Every denylist is missing a spelling, and you learn which one only after somebody has used it. Worse, a filter that looks thorough makes you relax the layers that actually work. Postgres understands its own grammar, so the refusing is left entirely to Postgres, and it refuses with an error code the learner can read.',
        },
      },
      {
        tieu_de: { vi: 'Đưa Postgres ra khỏi trình duyệt', en: 'Moving Postgres out of the browser' },
        than: {
          vi: 'Bản đầu chạy Postgres biên dịch sang WebAssembly ngay trong trình duyệt. Gọn, và sai ở hai chỗ: toàn bộ bảng đáp án buộc phải đi xuống máy người học, và lần tải đầu nặng 6,27 MB. Dựng lại thành ba tầng gồm cơ sở dữ liệu, máy chủ và giao diện đã đưa đáp án về một tiến trình máy chủ không ai mở công cụ nhà phát triển ra dò được, đồng thời giảm lần tải đầu xuống 282 KB, khoảng hai mươi hai lần.',
          en: 'The first version ran Postgres compiled to WebAssembly inside the browser. Elegant, and wrong in two ways: the entire answer key had to ship to the learner’s machine, and first load weighed 6.27 MB. Rebuilding it as three tiers — database, server, interface — put the answers in a server process nobody can open devtools on, and cut first load to 282 KB, about twenty-two times smaller.',
        },
      },
      {
        tieu_de: { vi: 'Chỉ đúng chỗ sai mà không hé lộ đáp án', en: 'Naming the mistake without revealing the answer' },
        than: {
          vi: 'Chấm bằng cách so chuỗi băm của kết quả đã chuẩn hoá, nên không giá trị đáp án nào đi xuống trình duyệt. Phản hồi dừng ở bậc trượt đầu tiên trong năm bậc, vì nêu ba lỗi cùng lúc thì người học không biết bắt đầu từ đâu. Bậc thứ năm băm riêng từng cột: người nối bảng trước khi gom nhóm sẽ thấy giá trị hàng thì khớp còn phí vận chuyển thì không, và đó là đầu mối dẫn thẳng tới lỗi nhân bản, mà vẫn không lộ một con số nào.',
          en: 'Grading compares a hash of the normalised result, so no answer value ever reaches the browser. Feedback stops at the first failing tier of five, because naming three problems at once leaves nobody knowing where to start. The fifth tier hashes each column separately: a learner who joined before grouping sees that the order value matched and the shipping fee did not, which points straight at the duplication — and still reveals no value at all.',
        },
      },
      {
        tieu_de: { vi: 'Cổng canh cho những kiểu hỏng báo thành công', en: 'Gates for the failures that report success' },
        than: {
          vi: 'Bộ sinh dữ liệu phải tất định, vì mọi chuỗi băm đáp án tính từ chính dữ liệu nó sinh ra. CI sinh lại trên Linux rồi trượt ngay ở git diff nếu lệch một byte so với bản dựng trên Windows: dữ liệu trôi một dòng là cả 600 bài chấm sai với người làm đúng, mà không dấu hiệu nào chỉ ra nguyên nhân. Cổng đo dung lượng gói làm thêm việc thứ hai, nó trượt nếu kho đề hay bảng đáp án lọt vào gói trình duyệt, thứ mà mọi kiểm thử khác vẫn cho qua vì ứng dụng chạy đúng như thường.',
          en: 'The data generator has to be deterministic, because every answer hash derives from the data it produces. CI regenerates it on Linux and fails on git diff if a single byte moved from the Windows build: data that drifts by one row marks all 600 exercises wrong against learners who are right, with nothing pointing at the cause. The bundle-size gate does a second job — it fails if the exercise bank or the answer table ever reaches the browser bundle, which every other test would happily pass, because the app still runs exactly as before.',
        },
      },
    ],
    ghi_chu: {
      vi: 'Mã nguồn riêng tư vì sản phẩm đang bán. Trang đang chạy thì mở được, và tôi sẵn sàng dẫn qua bất kỳ phần nào trong một buổi trò chuyện.',
      en: 'The source is private because the product is being sold. The running site is open to anyone, and I am happy to walk through any part of it in a conversation.',
    },
    lien_ket: { nhan: { vi: 'Mở dapractice.site', en: 'Open dapractice.site' }, dia_chi: 'https://dapractice.site' },
  },
]

export const CACH_LAM: readonly Nang_luc[] = [
  {
    tieu_de: { vi: 'Viết ra lý do, không chỉ viết ra kết quả', en: 'Write down the why, not just the what' },
    than: {
      vi: 'Một commit message ghi “update” hôm nay không tốn gì và tám tháng sau tốn tất cả. Commit của tôi nói cái gì đổi và vì sao phải đổi. Bộ quy tắc dựng model tôi viết cho đội dữ liệu dài hơn một nghìn dòng lý lẽ, còn README của sản phẩm có hẳn một mục liệt kê những thứ đã bỏ và vì sao bỏ, để không ai vô tình mang chúng về.',
      en: 'A commit message that says “update” costs nothing today and everything eight months from now. Mine say what changed and why it had to. The build standard I wrote for the data team runs to over a thousand lines of reasoning, and the product README has a section listing what was removed and why, so nobody brings it back by accident.',
    },
  },
  {
    tieu_de: { vi: 'Đặt cổng ở đúng chỗ hỏng mà không kêu', en: 'Put a gate exactly where failure is silent' },
    than: {
      vi: 'Lỗi đáng sợ là loại báo thành công. Một lần nạp tăng dần không khớp dòng nào. Một bộ chấm đánh trượt người làm đúng. Một bảng đáp án lọt vào gói JavaScript. Mỗi thứ đó bây giờ đều có một phép kiểm trong CI chuyển đỏ khi nó xảy ra.',
      en: 'The bugs worth fearing are the ones that report success. An incremental run that matched zero rows. A grader that fails correct answers. An answer key that slipped into a JavaScript bundle. Each of those now has a check in CI that goes red when it happens.',
    },
  },
  {
    tieu_de: { vi: 'Chọn ranh giới không thể đặt sai', en: 'Prefer the boundary that cannot be misconfigured' },
    than: {
      vi: 'Hai tiến trình Postgres tách hẳn thay vì một tiến trình với các quyền đặt cẩn thận, vì ranh giới tiến trình không hỏng khi một lệnh cấp quyền rơi nhầm chỗ. Để Postgres từ chối câu lệnh thay vì một danh sách từ cấm, vì chỉ nó hiểu đúng cú pháp của chính nó.',
      en: 'Two separate Postgres processes rather than one with carefully chosen grants, because a process boundary does not break when a single grant lands in the wrong place. Let Postgres reject the statement rather than a denylist, because it is the only thing that understands its own grammar.',
    },
  },
  {
    tieu_de: { vi: 'Xoá thứ không ai đọc', en: 'Delete what nobody reads' },
    than: {
      vi: 'Một bảng vẫn build mỗi đêm, một thư viện giữ lại vì đúng một tính năng, một trang chỉ tồn tại để chứng minh một điều. Mỗi thứ là một chi phí tới đều đặn. Gỡ chúng đi là việc rẻ nhất có thể làm, và gần như không ai làm.',
      en: 'A table that still builds every night, a library kept for exactly one feature, a page that only existed to prove a point. Each is a cost that keeps arriving. Removing them is the cheapest work available, and almost nobody does it.',
    },
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
    vi: 'Hơn ba năm xây nền tảng dữ liệu và đường ống dữ liệu từ nguồn tới biểu đồ. Hiện làm tại VETC, tập đoàn Tasco.',
    en: 'Three years building data platforms and pipelines from source system to chart. Currently at VETC, Tasco group.',
  } satisfies Song,
  muc_nang_luc: { vi: 'Tôi làm gì', en: 'What I do' } satisfies Song,
  muc_du_an: { vi: 'Hai thứ tôi đã dựng', en: 'Two things I have built' } satisfies Song,
  muc_cach_lam: { vi: 'Cách tôi làm việc', en: 'How I work' } satisfies Song,
  muc_ky_nang: { vi: 'Công cụ', en: 'Tools' } satisfies Song,
  muc_lien_he: { vi: 'Liên hệ', en: 'Get in touch' } satisfies Song,
  so_do_tang: {
    vi: 'Kiến trúc dữ liệu tôi làm việc bên trong mỗi ngày',
    en: 'The data architecture I work inside every day',
  } satisfies Song,
  nhan_model: { vi: 'model', en: 'models' } satisfies Song,
  nhan_truc_model: { vi: 'Số model mỗi tầng', en: 'Model count per tier' } satisfies Song,
  dieu_huong_du_an: { vi: 'Dự án', en: 'Work' } satisfies Song,
  nhan_vai_tro: { vi: 'Vai trò', en: 'Role' } satisfies Song,
  nhan_ngan_xep: { vi: 'Ngăn xếp', en: 'Stack' } satisfies Song,
  nhan_quyet_dinh: { vi: 'Bốn quyết định đáng kể', en: 'Four decisions worth reading' } satisfies Song,
  nhan_hop_cat: {
    vi: 'Hộp cát bảy lớp, nơi câu lệnh của người lạ chạy trên Postgres thật',
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
