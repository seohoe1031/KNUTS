const LECTURE = {
  course: "감염내과학 · 2강",
  title: "지역사회획득 폐렴(CAP): 원인균 · 중증도 평가 · 경험적 항생제",
  duration: 1440,
};

const SEG_SRC = [
  { t: 0, p: 1,
    text: "자, 오늘은 감염내과 두 번째 시간으로 지역사회획득 폐렴, community-acquired pneumonia, 줄여서 CAP를 다룹니다. 정의부터 보면, 병원 밖에서 감염되었거나 입원 후 48시간 이내에 발생한 폐렴을 말해요.",
    raw: "자 오늘은 감염내과 두 번째 시간으로 지역사회 획득 폐렴 커뮤니티 어콰이어드 뉴모니아 줄여서 씨에이피를 다룹니다 어 정의부터 보면 병원 밖에서 감염되었거나 입원 후 사십팔 시간 이내에 발생한 폐렴을 말해요" },
  { t: 42, p: 1,
    text: "흉부 X선에서 새로운 침윤이 있어야 진단할 수 있다는 점, 이건 꼭 외우세요. 기침, 발열, 객담 같은 증상만으로는 급성 기관지염과 구분이 안 됩니다.",
    raw: "흉부 엑스선에서 새로운 침윤이 있어야 진단할 수 있다는 점 이건 꼭 외우세요 기침 발열 객담 같은 증상만으로는 음 급성 기관지 염과 구분이 안 됩니다" },
  { t: 95, p: 2,
    text: "원인균으로 넘어갑시다. 원인균이 밝혀진 경우 가장 흔한 세균은 여전히 Streptococcus pneumoniae, 폐렴구균입니다. 그다음이 Haemophilus influenzae, 그리고 Moraxella catarrhalis 정도예요.",
    raw: "원인균으로 넘어갑시다 원인균이 밝혀진 경우 가장 흔한 세균은 여전히 스트렙토 코커스 뉴모니에 폐렴 구균입니다 그다음이 헤모필러스 인플루엔자 그리고 모락셀라 카타랄리스 정도예요" },
  { t: 150, p: 2,
    text: "비정형균, atypical pathogen이라고 부르는 세 가지가 Mycoplasma pneumoniae, Chlamydophila pneumoniae, Legionella pneumophila입니다. 실제로는 원인균을 못 찾는 경우가 절반이 넘고, influenza나 RSV 같은 호흡기 바이러스도 상당 부분을 차지해요.",
    raw: "비정형균 에이티피컬 패쏘젠이라고 부르는 세 가지가 마이코 플라즈마 뉴모니에 클라미도필라 뉴모니에 레지오넬라 뉴모필라입니다 실제로는 원인균을 못 찾는 경우가 절반이 넘고 인플루엔자나 알에스브이 같은 호흡기 바이러스도 상당 부분을 차지해요" },
  { t: 215, p: 2,
    text: "Mycoplasma는 세포벽이 없어서 β-lactam이 듣지 않습니다. 젊은 성인에서 walking pneumonia로 오고, cold agglutinin, 즉 한랭응집소가 양성일 수 있어요. 시험에 나옵니다.",
    raw: "마이코플라즈마는 세포벽이 없어서 베타 락탐이 듣지 않습니다 젊은 성인에서 워킹 뉴모니아로 오고 콜드 어글루티닌 즉 한랭 응집소가 양성일 수 있어요 시험에 나옵니다" },
  { t: 290, p: 3,
    text: "이제 임상 단서로 원인균을 추정하는 부분인데, 국시에 자주 나오는 파트입니다. Legionella는 고열인데 맥박이 상대적으로 느린 relative bradycardia, 그리고 hyponatremia, 설사, 간기능 수치 상승이 같이 오면 의심합니다.",
    raw: "이제 임상 단서로 원인균을 추정하는 부분인데 국시에 자주 나오는 파트입니다 레지오넬라는 고열인데 맥박이 상대적으로 느린 렐러티브 브래디카디아 그리고 하이포 나트레미아 설사 간기능 수치 상승이 같이 오면 의심합니다" },
  { t: 370, p: 3,
    text: "냉각탑이나 온수 시스템 같은 물 관련 노출력이 있으면 더 의심하고요. Legionella urinary antigen은 serogroup 1만 검출하기 때문에, 음성이라고 해서 배제할 수는 없습니다.",
    raw: "냉각탑이나 온수 시스템 같은 물 관련 노출력이 있으면 더 의심하고요 레지오넬라 유리너리 안티젠은 세로그룹 원만 검출하기 때문에 음성이라고 해서 배제할 수는 없습니다" },
  { t: 430, p: 3,
    text: "Klebsiella pneumoniae는 알코올 중독이나 당뇨 환자에서, 붉은 젤리 같은 currant jelly sputum과 상엽 침범이 특징이에요. Staphylococcus aureus는 influenza 이후 이차 세균성 폐렴으로 오고, cavitation, 즉 공동을 잘 만듭니다.",
    raw: "클렙시엘라 뉴모니에는 알코올 중독이나 당뇨 환자에서 붉은 젤리 같은 커런트 젤리 스퓨텀과 상엽 침범이 특징이에요 스타필로 코커스 아우레우스는 인플루엔자 이후 이차 세균성 폐렴으로 오고 캐비테이션 즉 공동을 잘 만듭니다" },
  { t: 505, p: 4,
    text: "진단 검사로 가면, 2019년 ATS/IDSA 가이드라인 기준으로 외래 환자에게는 객담 배양이나 혈액 배양을 routine으로 권하지 않습니다. 중증이거나 MRSA, Pseudomonas 위험인자가 있을 때 시행해요.",
    raw: "진단 검사로 가면 이천십구 년 에이티에스 아이디에스에이 가이드라인 기준으로 외래 환자에게는 객담 배양이나 혈액 배양을 루틴으로 권하지 않습니다 중증이거나 엠알에스에이 슈도모나스 위험인자가 있을 때 시행해요" },
  { t: 575, p: 4,
    text: "그리고 procalcitonin 수치만 보고 항생제를 시작할지 말지 결정하지 말라는 게 가이드라인 입장입니다. 헷갈리지 마세요. 임상적으로 폐렴이 확인되면 수치와 상관없이 경험적 항생제를 시작합니다.",
    raw: "그리고 프로칼시토닌 수치만 보고 항생제를 시작할지 말지 결정하지 말라는 게 가이드라인 입장입니다 헷갈리지 마세요 임상적으로 폐렴이 확인되면 수치와 상관없이 경험적 항생제를 시작합니다" },
  { t: 640, p: 5,
    text: "중증도 평가입니다. CURB-65, 이건 정말 중요합니다. C는 confusion, 의식 저하. U는 BUN 19 mg/dL 초과, urea로는 7 mmol/L 초과. R은 호흡수 분당 30회 이상. B는 수축기 혈압 90 mmHg 미만 또는 이완기 혈압 60 mmHg 이하. 65는 나이 65세 이상입니다.",
    raw: "중증도 평가입니다 커브 육십오 이건 정말 중요합니다 씨는 컨퓨전 의식 저하 유는 비유엔 십구 밀리그램 퍼 데시리터 초과 유레아로는 칠 밀리몰 초과 알은 호흡수 분당 삼십 회 이상 비는 수축기 혈압 구십 미만 또는 이완기 혈압 육십 이하 육십오는 나이 육십오 세 이상입니다" },
  { t: 735, p: 5,
    text: "점수 해석은 0–1점이면 외래 치료, 2점이면 입원을 고려하고, 3점 이상이면 입원, 4–5점이면 중환자실까지 고려합니다. 다만 가이드라인은 외래 치료 여부를 정할 때 CURB-65보다 PSI, Pneumonia Severity Index 사용을 더 권고해요.",
    raw: "점수 해석은 영에서 일 점이면 외래 치료 이 점이면 입원을 고려하고 삼 점 이상이면 입원 사에서 오 점이면 중환자실까지 고려합니다 다만 가이드라인은 외래 치료 여부를 정할 때 커브 육십오보다 피에스아이 뉴모니아 시비어리티 인덱스 사용을 더 권고해요" },
  { t: 815, p: 6,
    text: "중증 CAP 정의입니다. major criteria는 두 가지, 승압제가 필요한 패혈성 쇼크, 그리고 기계환기가 필요한 호흡부전입니다. major가 하나라도 있으면 중증이에요.",
    raw: "중증 씨에이피 정의입니다 메이저 크라이테리아는 두 가지 승압제가 필요한 패혈성 쇼크 그리고 기계 환기가 필요한 호흡 부전입니다 메이저가 하나라도 있으면 중증이에요" },
  { t: 870, p: 6,
    text: "minor criteria는 호흡수 30회 이상, PaO2/FiO2 250 이하, multilobar infiltrate, 의식 혼란, BUN 20 mg/dL 이상, 백혈구 4,000/μL 미만, 혈소판 100,000/μL 미만, 체온 36°C 미만, 적극적 수액 소생이 필요한 저혈압입니다. minor가 3개 이상이면 중증으로 보고 중환자실 입원을 권합니다. 족보에 매년 나오는 숫자들이니 정리해 두세요.",
    raw: "마이너 크라이테리아는 호흡수 삼십 회 이상 파오투 피오투 이백오십 이하 멀티 로바 인필트레이트 의식 혼란 비유엔 이십 이상 백혈구 사천 미만 혈소판 십만 미만 체온 삼십육 도 미만 적극적 수액 소생이 필요한 저혈압입니다 마이너가 세 개 이상이면 중증으로 보고 중환자실 입원을 권합니다 족보에 매년 나오는 숫자들이니 정리해 두세요" },
  { t: 975, p: 7,
    text: "경험적 항생제로 넘어갑니다. 동반질환이 없는 외래 환자는 amoxicillin 또는 doxycycline. macrolide 단독은 지역의 폐렴구균 macrolide 내성률이 25% 미만일 때만 쓸 수 있어요.",
    raw: "경험적 항생제로 넘어갑니다 동반 질환이 없는 외래 환자는 아목시실린 또는 독시사이클린 마크로라이드 단독은 지역의 폐렴 구균 마크로라이드 내성률이 이십오 퍼센트 미만일 때만 쓸 수 있어요" },
  { t: 1040, p: 7,
    text: "만성 심장·폐·간·신장 질환, 당뇨, 알코올 중독, 악성종양, 무비증 같은 동반질환이 있으면 amoxicillin/clavulanate나 cephalosporin에 macrolide 또는 doxycycline을 병용하거나, respiratory fluoroquinolone 단독을 씁니다. levofloxacin, moxifloxacin이 대표적이에요.",
    raw: "만성 심장 폐 간 신장 질환 당뇨 알코올 중독 악성 종양 무비증 같은 동반 질환이 있으면 아목시실린 클라불라네이트나 세팔로스포린에 마크로라이드 또는 독시사이클린을 병용하거나 레스피라토리 플루오로 퀴놀론 단독을 씁니다 레보플록사신 목시플록사신이 대표적이에요" },
  { t: 1110, p: 7,
    text: "입원 환자 중 비중증은 β-lactam, 예를 들어 ceftriaxone에 azithromycin 같은 macrolide를 병용하거나 respiratory fluoroquinolone 단독. 중증이면 β-lactam + macrolide, 또는 β-lactam + fluoroquinolone 병용입니다. 중증에서는 단독요법이 아니라는 점, 꼭 외우세요.",
    raw: "입원 환자 중 비중증은 베타 락탐 예를 들어 세프트리악손에 아지스로마이신 같은 마크로라이드를 병용하거나 레스피라토리 플루오로퀴놀론 단독 중증이면 베타락탐 플러스 마크로라이드 또는 베타락탐 플러스 플루오로퀴놀론 병용입니다 중증에서는 단독 요법이 아니라는 점 꼭 외우세요" },
  { t: 1190, p: 7,
    text: "MRSA나 Pseudomonas를 커버할지는, 이전에 호흡기 검체에서 해당 균이 분리된 적이 있거나 최근 90일 이내 입원해서 정맥 항생제를 맞은 경우에 고려합니다. MRSA는 vancomycin이나 linezolid, Pseudomonas는 piperacillin/tazobactam, cefepime, meropenem 같은 약을 씁니다.",
    raw: "엠알에스에이나 슈도모나스를 커버할지는 이전에 호흡기 검체에서 해당 균이 분리된 적이 있거나 최근 구십 일 이내 입원해서 정맥 항생제를 맞은 경우에 고려합니다 엠알에스에이는 반코마이신이나 리네졸리드 슈도모나스는 피페라실린 타조박탐 세페핌 메로페넴 같은 약을 씁니다" },
  { t: 1265, p: 8,
    text: "우리나라 특이점 두 가지. 첫째, 국내 폐렴구균의 macrolide 내성률은 70–80% 이상으로 매우 높아서 macrolide 단독요법은 사실상 쓰지 않습니다. 둘째, 결핵 유병률이 높기 때문에 fluoroquinolone을 먼저 쓰면 결핵 진단이 늦어지고 내성이 생길 수 있어요. 결핵 배제 전 fluoroquinolone 사용은 신중해야 합니다. 이건 시험에 나옵니다.",
    raw: "우리나라 특이점 두 가지 첫째 국내 폐렴 구균의 마크로라이드 내성률은 칠십에서 팔십 퍼센트 이상으로 매우 높아서 마크로라이드 단독 요법은 사실상 쓰지 않습니다 둘째 결핵 유병률이 높기 때문에 플루오로퀴놀론을 먼저 쓰면 결핵 진단이 늦어지고 내성이 생길 수 있어요 결핵 배제 전 플루오로퀴놀론 사용은 신중해야 합니다 이건 시험에 나옵니다" },
  { t: 1350, p: 8,
    text: "마지막으로 치료 기간은 최소 5일, 그리고 활력징후가 안정되는 등 임상적 안정이 확인된 뒤 종료합니다. 흡인이 의심되더라도 lung abscess나 empyema가 없으면 혐기균 커버를 routine으로 추가하지 않습니다. 오늘은 여기까지 하겠습니다.",
    raw: "마지막으로 치료 기간은 최소 오 일 그리고 활력 징후가 안정되는 등 임상적 안정이 확인된 뒤 종료합니다 흡인이 의심되더라도 렁 앱세스나 엠파이에마가 없으면 혐기균 커버를 루틴으로 추가하지 않습니다 오늘은 여기까지 하겠습니다" },
];
const SEGS = SEG_SRC.map((s, i) => ({ ...s, id: i, end: i < SEG_SRC.length - 1 ? SEG_SRC[i + 1].t : LECTURE.duration }));

/* 의학 용어 사전 — 전사본 속 영문 용어를 탭하면 뜻이 나옴 */
const GLOSS = [
  { m: ["CAP", "community-acquired pneumonia"], ko: "지역사회획득 폐렴", d: "병원 밖에서 감염되었거나 입원 48시간 이내에 발생한 폐렴." },
  { m: ["Streptococcus pneumoniae"], ko: "폐렴구균", d: "CAP에서 원인균이 확인될 때 가장 흔한 세균. 그람양성 쌍구균." },
  { m: ["Haemophilus influenzae"], ko: "헤모필루스 인플루엔자균", d: "그람음성 구간균. COPD 환자 CAP에서 흔함." },
  { m: ["Moraxella catarrhalis"], ko: "모락셀라 카타랄리스", d: "그람음성 쌍구균. 만성 폐질환 환자에서 원인균." },
  { m: ["Mycoplasma pneumoniae", "Mycoplasma"], ko: "마이코플라스마", d: "세포벽이 없어 β-lactam 무효. 젊은 성인, 한랭응집소, 수포성 고막염." },
  { m: ["Chlamydophila pneumoniae"], ko: "클라미도필라 뉴모니에", d: "세포 내 기생 비정형균. 인후염·쉰 목소리 동반 가능." },
  { m: ["Legionella pneumophila", "Legionella urinary antigen", "Legionella"], ko: "레지오넬라", d: "물 관련 노출. 고열, 상대적 서맥, 저나트륨혈증, 설사, 간효소 상승. 소변 항원은 serogroup 1만 검출." },
  { m: ["Klebsiella pneumoniae"], ko: "폐렴막대균", d: "알코올 중독·당뇨. currant jelly sputum, 상엽 침범." },
  { m: ["Staphylococcus aureus"], ko: "황색포도알균", d: "인플루엔자 후 이차 세균성 폐렴. 괴사성 폐렴, 공동 형성." },
  { m: ["atypical pathogen"], ko: "비정형균", d: "일반 배양·그람염색으로 잘 보이지 않는 원인균군 (Mycoplasma, Chlamydophila, Legionella)." },
  { m: ["walking pneumonia"], ko: "보행 폐렴", d: "증상이 경미해 일상생활이 가능한 폐렴. 주로 Mycoplasma." },
  { m: ["cold agglutinin"], ko: "한랭응집소", d: "저온에서 적혈구를 응집시키는 IgM 항체. Mycoplasma 감염에서 양성 가능." },
  { m: ["relative bradycardia"], ko: "상대적 서맥", d: "체온 상승에 비해 맥박이 덜 빠른 소견 (Faget sign). Legionella의 단서." },
  { m: ["hyponatremia"], ko: "저나트륨혈증", d: "혈청 Na⁺ <135 mEq/L. Legionella 폐렴의 단서." },
  { m: ["currant jelly sputum"], ko: "건포도 젤리 객담", d: "혈액이 섞인 끈적한 붉은 객담. Klebsiella의 고전적 소견." },
  { m: ["cavitation"], ko: "공동 형성", d: "폐 실질 괴사로 생긴 빈 공간. S. aureus, 결핵, 혐기균, Klebsiella." },
  { m: ["MRSA"], ko: "메티실린 내성 황색포도알균", d: "치료: vancomycin 또는 linezolid." },
  { m: ["Pseudomonas"], ko: "녹농균", d: "항녹농균 β-lactam: piperacillin/tazobactam, cefepime, ceftazidime, meropenem 등." },
  { m: ["procalcitonin"], ko: "프로칼시토닌", d: "세균 감염 시 상승하는 표지자. CAP에서 항생제 시작 여부 결정에는 쓰지 않음." },
  { m: ["CURB-65"], ko: "CURB-65 점수", d: "Confusion, BUN >19 mg/dL, RR ≥30, SBP <90 또는 DBP ≤60, 나이 ≥65. 각 1점." },
  { m: ["PSI", "Pneumonia Severity Index"], ko: "폐렴 중증도 지수", d: "20개 항목 기반 사망 위험 평가. 외래 치료 결정에 CURB-65보다 권고됨." },
  { m: ["PaO2/FiO2"], ko: "P/F 비", d: "동맥혈 산소분압 / 흡입 산소 분율. ≤250이면 중증 CAP minor criterion." },
  { m: ["BUN"], ko: "혈중요소질소", d: "Blood urea nitrogen. CURB-65는 >19 mg/dL, 중증 minor는 ≥20 mg/dL." },
  { m: ["multilobar infiltrate"], ko: "다엽성 침윤", d: "두 개 이상의 폐엽을 침범한 침윤. 중증 CAP minor criterion." },
  { m: ["β-lactam"], ko: "베타락탐계", d: "세포벽 합성 억제. CAP에서는 ceftriaxone, cefotaxime, ampicillin/sulbactam 등." },
  { m: ["macrolide"], ko: "마크로라이드계", d: "azithromycin, clarithromycin. 국내 폐렴구균 내성률이 매우 높음." },
  { m: ["respiratory fluoroquinolone", "fluoroquinolone"], ko: "(호흡기) 플루오로퀴놀론", d: "levofloxacin, moxifloxacin, gemifloxacin. 결핵 진단 지연 위험." },
  { m: ["amoxicillin/clavulanate"], ko: "아목시실린/클라불란산", d: "β-lactamase 억제제 복합제. 동반질환 있는 외래 CAP." },
  { m: ["lung abscess"], ko: "폐농양", d: "폐 실질 내 고름 집. 있으면 혐기균 커버 필요." },
  { m: ["empyema"], ko: "농흉", d: "흉막강 내 고름. 있으면 혐기균 커버와 배액 고려." },
];
const TERM_MAP = {};
GLOSS.forEach((g) => g.m.forEach((k) => (TERM_MAP[k.toLowerCase()] = g)));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
const TERM_SRC = Object.keys(TERM_MAP).sort((a, b) => b.length - a.length).map(esc).join("|");

/* 교수님 강조 표현 자동 감지 */
const EMPH_SRC = "(?:이건 )?꼭 외우세요|(?:꼭 |반드시 )?외워 ?(?:두세요|야 (?:해요|합니다))|(?:이건 )?시험에 (?:잘 |꼭 |자주 )?(?:나옵니다|나와요|나온다|낼 거예요|냅니다)|국시에 (?:자주|잘) 나오는|(?:이건 )?(?:정말|굉장히|아주|매우) 중요(?:합니다|해요)|족보에 (?:매년 )?나오는|헷갈리지 마세요|반드시 기억하세요|(?:꼭 )?기억해 ?두세요";
const EMPH_RE = new RegExp(EMPH_SRC);

/* ───────── 모듈 B 샘플 데이터: 3단계 요약 ───────── */
const KEYLINE = {
  1: "CAP 진단엔 흉부 X선의 새 침윤이 필수 — 증상만으로는 급성 기관지염과 구분 불가",
  4: "Mycoplasma: 세포벽 없음 → β-lactam 무효 · walking pneumonia · cold agglutinin",
  5: "Legionella 단서: 상대적 서맥 · 저나트륨혈증 · 설사 · 간효소 상승",
  9: "Procalcitonin 수치만으로 항생제 시작 여부를 결정하지 않는다",
  10: "CURB-65: Confusion · BUN >19 mg/dL · RR ≥30 · SBP <90 또는 DBP ≤60 · 나이 ≥65",
  13: "중증 CAP = major ≥1 또는 minor ≥3 → 중환자실 입원 권고",
  16: "중증 CAP는 병용요법: β-lactam + macrolide 또는 β-lactam + FQ",
  18: "국내: 폐렴구균 macrolide 내성 매우 높음, 결핵 배제 전 FQ 신중",
};
const firstSentence = (s) => (s.match(/[^.!?]+[.!?]?/) || [s])[0].trim();

const OUTLINE = [
  { t: 0, title: "CAP의 정의와 진단 원칙", sub: "병원 밖 감염 또는 입원 48시간 이내 · 흉부 X선 새 침윤 필수" },
  { t: 95, title: "원인균", sub: "전형 세균 · 비정형균 3종 · 호흡기 바이러스 · 원인 미확인 절반 이상" },
  { t: 290, title: "임상 단서로 원인균 추정", sub: "Legionella · Klebsiella · S. aureus" },
  { t: 505, title: "진단 검사", sub: "배양 시행 대상 · procalcitonin의 위치" },
  { t: 640, title: "중증도 평가", sub: "CURB-65 항목과 점수 해석 · PSI 권고" },
  { t: 815, title: "중증 CAP 기준", sub: "major 2개 · minor 9개" },
  { t: 975, title: "경험적 항생제", sub: "외래 · 입원 · 중증 · MRSA/Pseudomonas 위험군" },
  { t: 1265, title: "국내 특이점과 치료 기간", sub: "macrolide 내성 · FQ와 결핵 · 최소 5일" },
];

const CONCEPTS = [
  { title: "CAP 정의 · 진단", refs: [0, 42], rows: [["정의", "병원 밖 감염 또는 입원 후 48시간 이내 발생"], ["진단", "임상 증상 + 흉부 X선의 새로운 침윤"], ["주의", "증상만으로는 급성 기관지염과 구분 불가"]] },
  { title: "원인균 분류", refs: [95, 150], rows: [["전형 세균", "S. pneumoniae(최다) · H. influenzae · M. catarrhalis"], ["비정형균", "Mycoplasma · Chlamydophila · Legionella"], ["바이러스", "influenza · RSV 등"], ["현실", "원인균 미확인이 절반 이상"]] },
  { title: "CURB-65", refs: [640, 735], rows: [["C", "Confusion (의식 저하)"], ["U", "BUN >19 mg/dL (urea >7 mmol/L)"], ["R", "호흡수 ≥30회/분"], ["B", "SBP <90 mmHg 또는 DBP ≤60 mmHg"], ["65", "나이 ≥65세"], ["해석", "0–1 외래 · 2 입원 고려 · ≥3 입원 · 4–5 ICU 고려"], ["권고", "외래 치료 결정엔 PSI를 더 권고"]] },
  { title: "중증 CAP 기준", refs: [815, 870], rows: [["Major", "승압제가 필요한 패혈성 쇼크 · 기계환기가 필요한 호흡부전"], ["Minor", "RR ≥30 · PaO2/FiO2 ≤250 · multilobar infiltrate · 의식 혼란 · BUN ≥20 · WBC <4,000 · PLT <100,000 · 체온 <36°C · 적극적 수액이 필요한 저혈압"], ["판정", "major ≥1 또는 minor ≥3 → 중증, ICU 권고"]] },
  { title: "경험적 항생제", refs: [975, 1040, 1110, 1190], rows: [["외래 · 동반질환 없음", "amoxicillin 또는 doxycycline (macrolide 단독은 내성률 <25% 지역만)"], ["외래 · 동반질환", "amoxicillin/clavulanate 또는 cephalosporin + macrolide/doxycycline, 또는 resp. FQ 단독"], ["입원 · 비중증", "β-lactam(ceftriaxone 등) + macrolide, 또는 resp. FQ 단독"], ["중증", "β-lactam + macrolide, 또는 β-lactam + FQ (단독요법 ✕)"], ["MRSA · Pseudomonas", "이전 호흡기 검체 분리 또는 최근 90일 입원 + 정맥 항생제 → vancomycin/linezolid, piperacillin/tazobactam · cefepime · meropenem"]] },
  { title: "진단 검사 원칙", refs: [505, 575], rows: [["배양", "외래는 객담·혈액 배양 routine ✕ — 중증, MRSA/Pseudomonas 위험 시 시행"], ["Procalcitonin", "수치로 항생제 시작 여부 결정 ✕"], ["Legionella 소변 항원", "serogroup 1만 검출 → 음성이어도 배제 불가"]] },
];

const MECHS = [
  { title: "Mycoplasma에 β-lactam이 듣지 않는 이유", refs: [215],
    lecture: "Mycoplasma는 세포벽이 없어서 β-lactam이 듣지 않는다.",
    extra: "β-lactam은 PBP(penicillin-binding protein)에 결합해 펩티도글리칸 교차결합(transpeptidation)을 막는다. 세포벽이 없으면 표적 자체가 없다." },
  { title: "비정형균 커버에 macrolide · doxycycline · FQ를 쓰는 이유", refs: [150, 975, 1040],
    lecture: "비정형균 3종(Mycoplasma, Chlamydophila, Legionella)을 구분하고, 처방에 macrolide·doxycycline·resp. FQ가 들어간다.",
    extra: "Legionella·Chlamydophila는 세포 내 기생균이라 세포 내 침투가 좋은 약이 필요하다. Macrolide는 50S(23S rRNA)에 결합해 단백질 합성을 억제하고, doxycycline은 30S에 결합해 tRNA 결합을 막으며, FQ는 DNA gyrase·topoisomerase IV를 억제한다." },
  { title: "Legionella의 저나트륨혈증", refs: [290],
    lecture: "고열 + 상대적 서맥 + hyponatremia + 설사 + 간기능 상승이면 의심.",
    extra: "SIADH 등이 기전으로 제시되지만 명확히 확립되지는 않았다. 시험에서는 기전보다 '단서 조합'으로 묻는 경우가 많다." },
  { title: "인플루엔자 후 S. aureus 폐렴과 공동", refs: [430],
    lecture: "influenza 이후 이차 세균성 폐렴으로 오고 cavitation을 잘 만든다.",
    extra: "바이러스가 기도 상피를 손상시키고 섬모 청소 기능을 떨어뜨려 세균 부착이 쉬워진다. PVL(Panton-Valentine leukocidin) 같은 독소는 괴사성 폐렴과 공동 형성에 관여한다." },
  { title: "국내 폐렴구균의 macrolide 내성", refs: [1265, 975],
    lecture: "국내 내성률 70–80% 이상 → macrolide 단독요법은 사실상 쓰지 않는다. 기준선은 내성률 25%.",
    extra: "주요 내성 기전은 erm(B)에 의한 23S rRNA 메틸화(표적 변형, 고도 내성)와 mef(A)에 의한 유출 펌프(중등도 내성)다." },
  { title: "Fluoroquinolone과 결핵", refs: [1265],
    lecture: "결핵 유병률이 높아 FQ를 먼저 쓰면 결핵 진단이 늦어지고 내성이 생길 수 있다.",
    extra: "FQ는 M. tuberculosis에도 활성이 있어 일시적으로 호전돼 진단을 가리고, 단독 노출로 FQ 내성 결핵이 선택될 수 있다. FQ는 다제내성 결핵 치료의 핵심 약물이라 보존이 중요하다." },
  { title: "MRSA · Pseudomonas 약물의 작용점", refs: [1190],
    lecture: "MRSA는 vancomycin·linezolid, Pseudomonas는 piperacillin/tazobactam·cefepime·meropenem.",
    extra: "Vancomycin은 D-Ala-D-Ala 말단에 결합해 세포벽 합성을 막는다. Linezolid는 50S(23S rRNA)에 결합해 70S 개시 복합체 형성을 억제한다. 항녹농균 β-lactam은 외막 투과성과 β-lactamase 안정성으로 커버 범위가 정해진다." },
  { title: "Procalcitonin을 시작 기준으로 쓰지 않는 이유", refs: [575],
    lecture: "임상적으로 폐렴이면 수치와 상관없이 경험적 항생제를 시작한다.",
    extra: "세균 감염 시 IL-1β·TNF-α·IL-6에 의해 상승하고 바이러스 감염에서는 IFN-γ로 억제되지만, 초기 세균성 폐렴에서도 낮을 수 있어 단독 판단에 쓰기엔 민감도가 부족하다." },
];

const fmt = (s) => {
  s = Math.max(0, Math.floor(s || 0));
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
};
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ───────── 아이콘 ───────── */
const Ic = ({ d, s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const I = {
  play: <path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none" />,
  pause: <g fill="currentColor" stroke="none"><rect x="6" y="4.5" width="4.2" height="15" rx="1" /><rect x="13.8" y="4.5" width="4.2" height="15" rx="1" /></g>,
  back: <g><path d="M11 17l-5-5 5-5" /><path d="M18 17l-5-5 5-5" /></g>,
  fwd: <g><path d="M13 7l5 5-5 5" /><path d="M6 7l5 5-5 5" /></g>,
  flag: <g><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" fill="currentColor" /></g>,
  up: <g><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M4 20h16" /></g>,
  x: <g><path d="M6 6l12 12M18 6L6 18" /></g>,
  left: <path d="M15 6l-6 6 6 6" />,
  right: <path d="M9 6l6 6-6 6" />,
};

/* 문단 텍스트를 강조 표현 · 의학 용어 · 검색어 조각으로 나눔 */
function renderText(text, query, onTerm) {
  const out = [];
  const re = new RegExp(`(${EMPH_SRC})|(${TERM_SRC})`, "gi");
  let last = 0, m, k = 0;
  const pushPlain = (s) => {
    if (!s) return;
    if (!query) { out.push(s); return; }
    const parts = s.split(new RegExp(`(${esc(query)})`, "gi"));
    parts.forEach((p) => p && out.push(p.toLowerCase() === query.toLowerCase() ? <mark key={"q" + k++} className="q" style={{ background: "transparent", color: "inherit" }}>{p}</mark> : p));
  };
  while ((m = re.exec(text))) {
    pushPlain(text.slice(last, m.index));
    if (m[1]) out.push(<span key={"e" + k++} className="emph">{m[1]}</span>);
    else {
      const g = TERM_MAP[m[2].toLowerCase()];
      out.push(<button key={"t" + k++} className="term" onClick={(e) => { e.stopPropagation(); onTerm(g, m[2]); }}>{m[2]}</button>);
    }
    last = re.lastIndex;
  }
  pushPlain(text.slice(last));
  return out;
}

