/* 빌드 결과물 — src/를 고친 뒤 node build.js */
"use strict";
(function () {
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
        get(k, d) { try {
            const v = localStorage.getItem(k);
            return v ? JSON.parse(v) : d;
        }
        catch {
            return d;
        } },
        set(k, v) { try {
            localStorage.setItem(k, JSON.stringify(v));
        }
        catch { } },
    };
    /* ───────── 아이콘 ───────── */
    const Ic = ({ d, s = 20 }) => (React.createElement("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, d));
    const I = {
        play: React.createElement("path", { d: "M7 4.5v15l12-7.5z", fill: "currentColor", stroke: "none" }),
        pause: React.createElement("g", { fill: "currentColor", stroke: "none" },
            React.createElement("rect", { x: "6", y: "4.5", width: "4.2", height: "15", rx: "1" }),
            React.createElement("rect", { x: "13.8", y: "4.5", width: "4.2", height: "15", rx: "1" })),
        back: React.createElement("g", null,
            React.createElement("path", { d: "M11 17l-5-5 5-5" }),
            React.createElement("path", { d: "M18 17l-5-5 5-5" })),
        fwd: React.createElement("g", null,
            React.createElement("path", { d: "M13 7l5 5-5 5" }),
            React.createElement("path", { d: "M6 7l5 5-5 5" })),
        flag: React.createElement("g", null,
            React.createElement("path", { d: "M5 21V4" }),
            React.createElement("path", { d: "M5 4h11l-2 4 2 4H5", fill: "currentColor" })),
        up: React.createElement("g", null,
            React.createElement("path", { d: "M12 16V4" }),
            React.createElement("path", { d: "M7 9l5-5 5 5" }),
            React.createElement("path", { d: "M4 20h16" })),
        x: React.createElement("g", null,
            React.createElement("path", { d: "M6 6l12 12M18 6L6 18" })),
        left: React.createElement("path", { d: "M15 6l-6 6 6 6" }),
        right: React.createElement("path", { d: "M9 6l6 6-6 6" }),
    };
    /* 문단 텍스트를 강조 표현 · 의학 용어 · 검색어 조각으로 나눔 */
    function renderText(text, query, onTerm) {
        const out = [];
        const re = new RegExp(`(${EMPH_SRC})|(${TERM_SRC})`, "gi");
        let last = 0, m, k = 0;
        const pushPlain = (s) => {
            if (!s)
                return;
            if (!query) {
                out.push(s);
                return;
            }
            const parts = s.split(new RegExp(`(${esc(query)})`, "gi"));
            parts.forEach((p) => p && out.push(p.toLowerCase() === query.toLowerCase() ? React.createElement("mark", { key: "q" + k++, className: "q", style: { background: "transparent", color: "inherit" } }, p) : p));
        };
        while ((m = re.exec(text))) {
            pushPlain(text.slice(last, m.index));
            if (m[1])
                out.push(React.createElement("span", { key: "e" + k++, className: "emph" }, m[1]));
            else {
                const g = TERM_MAP[m[2].toLowerCase()];
                out.push(React.createElement("button", { key: "t" + k++, className: "term", onClick: (e) => { e.stopPropagation(); onTerm(g, m[2]); } }, m[2]));
            }
            last = re.lastIndex;
        }
        pushPlain(text.slice(last));
        return out;
    }
    const { useState, useEffect, useRef, useMemo } = React;
    /* ───────── 샘플 강의 ───────── */
    const SAMPLE = {
        id: "sample", sample: true, title: LECTURE.title, course: LECTURE.course, created: 0, duration: LECTURE.duration,
        segs: SEGS.map(({ p, ...s }) => s), outline: OUTLINE, concepts: CONCEPTS, mechs: MECHS, keylines: KEYLINE,
        status: { transcribed: true, corrected: true, summarized: true },
    };
    const DEFAULT_CFG = {
        openaiKey: "", whisperModel: "whisper-1",
        llm: "anthropic", anthropicKey: "", fastModel: "claude-haiku-5-5", mainModel: "claude-sonnet-5-5", openaiModel: "gpt-4.1-mini",
        keywords: "한국어 의학 강의. 영어 의학 용어와 약어가 섞여 있음: Streptococcus pneumoniae, β-lactam, macrolide, fluoroquinolone, CURB-65, BUN, mg/dL, mmHg, PaO2/FiO2.",
        correct: true, showSample: true,
    };
    /* ───────── 저장: IndexedDB (강의·음성) ───────── */
    const IDB = (() => {
        let dbp;
        const open = () => dbp || (dbp = new Promise((res, rej) => {
            const r = indexedDB.open("knuts", 1);
            r.onupgradeneeded = () => { const d = r.result; d.createObjectStore("lectures", { keyPath: "id" }); d.createObjectStore("audio"); };
            r.onsuccess = () => res(r.result);
            r.onerror = () => rej(r.error);
        }));
        const tx = async (name, mode, fn) => {
            const d = await open();
            return new Promise((res, rej) => {
                const t = d.transaction(name, mode), req = fn(t.objectStore(name));
                t.oncomplete = () => res(req && req.result);
                t.onerror = () => rej(t.error);
                t.onabort = () => rej(t.error);
            });
        };
        return {
            all: () => tx("lectures", "readonly", (s) => s.getAll()),
            put: (l) => tx("lectures", "readwrite", (s) => s.put(l)),
            del: (id) => tx("lectures", "readwrite", (s) => s.delete(id)),
            getAudio: (id) => tx("audio", "readonly", (s) => s.get(id)),
            putAudio: (id, b) => tx("audio", "readwrite", (s) => s.put(b, id)),
            delAudio: (id) => tx("audio", "readwrite", (s) => s.delete(id)),
        };
    })();
    const clone = (x) => JSON.parse(JSON.stringify(x));
    /* ───────── AI 호출 ───────── */
    const BLOCKED = "API 서버에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.";
    async function extFetch(url, opt) { try {
        return await fetch(url, opt);
    }
    catch {
        throw new Error(BLOCKED);
    } }
    const aiReady = (cfg) => (cfg.llm === "anthropic" ? !!cfg.anthropicKey : !!cfg.openaiKey);
    async function llmCall(cfg, prompt, { fast = false, maxTokens = 8000 } = {}) {
        if (cfg.llm === "anthropic") {
            if (!cfg.anthropicKey)
                throw new Error("설정에서 Anthropic API 키를 입력해 주세요.");
            const r = await extFetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "content-type": "application/json", "x-api-key": cfg.anthropicKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
                body: JSON.stringify({ model: fast ? cfg.fastModel : cfg.mainModel, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }),
            });
            const j = await r.json().catch(() => ({}));
            if (!r.ok)
                throw new Error("Anthropic API 오류: " + ((j.error && j.error.message) || r.status));
            return (j.content || []).map((c) => c.text || "").join("");
        }
        if (!cfg.openaiKey)
            throw new Error("설정에서 OpenAI API 키를 입력해 주세요.");
        const r = await extFetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer " + cfg.openaiKey },
            body: JSON.stringify({ model: cfg.openaiModel, response_format: { type: "json_object" }, messages: [{ role: "user", content: prompt }] }),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok)
            throw new Error("OpenAI API 오류: " + ((j.error && j.error.message) || r.status));
        return j.choices[0].message.content;
    }
    async function llmJSON(cfg, prompt, opt) {
        const t = await llmCall(cfg, prompt, opt);
        const a = t.indexOf("{"), b = t.lastIndexOf("}");
        if (a < 0 || b < a)
            throw new Error("AI 응답을 해석하지 못했어요.");
        return JSON.parse(t.slice(a, b + 1));
    }
    /* ───────── 전사 ───────── */
    async function transcribe(file, cfg, onPart) {
        if (!cfg.openaiKey)
            throw new Error("설정에서 OpenAI API 키(음성 전사용)를 입력해 주세요.");
        const LIMIT = 25 * 1024 * 1024, CH = 20 * 1024 * 1024;
        let parts = [file];
        if (file.size > LIMIT) {
            if (!/\.mp3$/i.test(file.name) && file.type !== "audio/mpeg")
                throw new Error("25MB가 넘는 파일은 MP3만 자동으로 나눌 수 있어요. MP3로 변환해서 올려 주세요.");
            parts = [];
            for (let o = 0; o < file.size; o += CH)
                parts.push(new File([file.slice(o, o + CH)], `part${parts.length + 1}.mp3`, { type: "audio/mpeg" }));
        }
        let offset = 0, prev = "";
        const out = [];
        for (let i = 0; i < parts.length; i++) {
            onPart(i, parts.length);
            const fd = new FormData();
            fd.append("file", parts[i]);
            fd.append("model", cfg.whisperModel || "whisper-1");
            fd.append("language", "ko");
            fd.append("response_format", "verbose_json");
            fd.append("timestamp_granularities[]", "segment");
            fd.append("prompt", (cfg.keywords.slice(0, 400) + " " + prev).trim());
            const r = await extFetch("https://api.openai.com/v1/audio/transcriptions", { method: "POST", headers: { Authorization: "Bearer " + cfg.openaiKey }, body: fd });
            const j = await r.json().catch(() => ({}));
            if (!r.ok)
                throw new Error("전사 실패: " + ((j.error && j.error.message) || r.status));
            const ss = j.segments && j.segments.length ? j.segments : [{ start: 0, end: j.duration || 0, text: j.text || "" }];
            ss.forEach((s) => out.push({ start: s.start + offset, end: s.end + offset, text: String(s.text || "").trim() }));
            offset += j.duration || ss[ss.length - 1].end;
            prev = String(j.text || "").slice(-200);
        }
        return out;
    }
    const parseTime = (s) => { const p = s.replace(",", ".").split(":").map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
    function parseTranscript(text, name) {
        text = text.replace(/\r/g, "").replace(/^﻿/, "");
        if (/\.json$/i.test(name)) {
            const j = JSON.parse(text), ss = Array.isArray(j) ? j : j.segments || [];
            return ss.map((s) => ({ start: +s.start || 0, end: +s.end || +s.start || 0, text: String(s.text || "").trim() }));
        }
        if (/-->/.test(text)) {
            const out = [];
            text.split(/\n\n+/).forEach((b) => {
                const lines = b.split("\n"), k = lines.findIndex((l) => l.includes("-->"));
                if (k < 0)
                    return;
                const m = lines[k].match(/([\d:.,]+)\s*-->\s*([\d:.,]+)/);
                if (m)
                    out.push({ start: parseTime(m[1]), end: parseTime(m[2]), text: lines.slice(k + 1).join(" ").replace(/<[^>]+>/g, "").trim() });
            });
            return out;
        }
        const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
        const ms = lines.map((l) => l.match(/^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*(.*)$/));
        if (ms.filter(Boolean).length >= lines.length * 0.5) {
            const out = [];
            ms.forEach((m, i) => { if (m)
                out.push({ start: parseTime(m[1]), text: m[2] });
            else if (out.length)
                out[out.length - 1].text += " " + lines[i]; });
            out.forEach((s, i) => (s.end = out[i + 1] ? out[i + 1].start : s.start + 30));
            return out;
        }
        let t = 0;
        return lines.map((l) => { const s = { start: t, end: t + l.length / 4.5, text: l }; t = s.end; return s; });
    }
    function toParas(segs) {
        const out = [];
        let cur = null;
        for (const s of segs) {
            if (!s.text)
                continue;
            if (!cur)
                cur = { t: s.start, end: s.end, raw: s.text };
            else {
                cur.raw += " " + s.text;
                cur.end = s.end;
            }
            const d = cur.end - cur.t;
            if ((d >= 40 && /[.?!다요죠까]\s*$/.test(cur.raw)) || d >= 75) {
                out.push(cur);
                cur = null;
            }
        }
        if (cur)
            out.push(cur);
        return out.map((p, i, a) => ({ id: i, t: Math.floor(p.t), end: a[i + 1] ? Math.floor(a[i + 1].t) : Math.ceil(p.end), raw: p.raw.trim(), text: p.raw.trim() }));
    }
    /* ───────── 교정 · 요약 ───────── */
    const toSec = (x) => { if (typeof x === "number")
        return x; const m = String(x || "").match(/(\d+):(\d{2})/); return m ? +m[1] * 60 + +m[2] : 0; };
    const snap = (segs, sec) => { let b = segs[0].t; for (const s of segs)
        if (s.t <= sec)
            b = s.t; return b; };
    const segAt = (segs, sec) => { let b = segs[0]; for (const s of segs)
        if (s.t <= sec)
            b = s; return b; };
    const arr = (x) => (Array.isArray(x) ? x : []);
    const str = (x) => (x == null ? "" : String(x));
    const transcriptText = (lec) => lec.segs.map((s) => `[${fmt(s.t)}] ${s.text}`).join("\n");
    async function correctBatch(lec, k, cfg) {
        const B = 10, items = lec.segs.slice(k * B, k * B + B).map((s) => ({ i: s.id, text: s.raw }));
        const j = await llmJSON(cfg, `너는 의과대학 강의 전사 교정자다. 아래는 한국어 의학 강의를 음성인식(STT)으로 받아 적은 문단들이다. 강의 정보: ${cfg.keywords}
규칙:
- 한글 발음으로 깨진 영어 의학 용어를 정식 표기로 복원한다 (예: "스트렙토 코커스 뉴모니에"→"Streptococcus pneumoniae", "커브 육십오"→"CURB-65", "베타 락탐"→"β-lactam").
- 균 학명은 속명 대문자, 약어·단위는 표준 표기(BUN, mg/dL, mmHg, PaO2/FiO2), 수치는 아라비아 숫자로 쓴다.
- "어", "음", "그" 같은 군말과 말 반복을 지우고 문장 부호를 넣는다.
- 교수님이 말하지 않은 내용은 절대 추가하지 않는다. 확신할 수 없는 단어는 원문을 두고 뒤에 [?]를 붙인다.
- 강조 표현("꼭 외우세요", "시험에 나옵니다", "중요합니다" 등)은 그대로 살린다.
JSON만 출력: {"items":[{"i":번호,"text":"교정문"}]}
입력: ${JSON.stringify(items)}`, { fast: true, maxTokens: 8000 });
        arr(j.items).forEach((it) => { const s = lec.segs.find((x) => x.id === +it.i); if (s && str(it.text).trim())
            s.text = str(it.text).trim(); });
    }
    async function makeSummary(lec, cfg) {
        const j = await llmJSON(cfg, `너는 의대 강의 요약 조교다. 아래 전사본만 근거로 요약한다. 각 줄 앞 [MM:SS]는 발화 시점이다.
JSON만 출력:
{"title":"강의 제목(25자 이내)",
"outline":[{"t":"MM:SS","title":"대주제","sub":"한 줄 설명"}],
"concepts":[{"title":"개념 카드 제목","refs":["MM:SS"],"rows":[["항목","내용"]]}],
"mechs":[{"title":"질문형 제목","refs":["MM:SS"],"lecture":"강의에서 말한 내용 요약","extra":"강의에 없는 교과서 보충 기전, 없으면 빈 문자열"}],
"keylines":[{"t":"MM:SS","line":"시험용 한 줄 요약"}]}
분량: outline 5~10개(시간 순), concepts 4~8개(정의·분류·진단 기준·수치), mechs 4~8개(병태생리·약물 작용점·감별), keylines 6~12개(교수님이 강조했거나 출제 가능성이 높은 지점).
규칙: 수치·기준은 강의에서 말한 그대로 쓴다. lecture와 concepts에는 강의 밖 내용을 넣지 않는다.
전사본:
${transcriptText(lec)}`, { maxTokens: 8000 });
        const refs = (r) => [...new Set(arr(r).map((x) => snap(lec.segs, toSec(x))))];
        const keylines = {};
        arr(j.keylines).forEach((k) => { const s = segAt(lec.segs, toSec(k.t)); if (str(k.line))
            keylines[s.id] = str(k.line); });
        return {
            aiTitle: str(j.title),
            outline: arr(j.outline).map((o) => ({ t: snap(lec.segs, toSec(o.t)), title: str(o.title), sub: str(o.sub) })).filter((o) => o.title),
            concepts: arr(j.concepts).map((c) => ({ title: str(c.title), refs: refs(c.refs), rows: arr(c.rows).filter((r) => Array.isArray(r) && r.length >= 2).map((r) => [str(r[0]), str(r[1])]) })).filter((c) => c.title && c.rows.length),
            mechs: arr(j.mechs).map((m) => ({ title: str(m.title), refs: refs(m.refs), lecture: str(m.lecture), extra: str(m.extra) })).filter((m) => m.title),
            keylines,
        };
    }
    /* 남은 단계를 이어서 처리: 교정 → 요약. 단계마다 저장 */
    async function processLecture(lec, cfg, onStep, save) {
        const B = 10, n = Math.ceil(lec.segs.length / B);
        if (cfg.correct && !lec.status.corrected) {
            for (let k = lec.status.correctedBatches || 0; k < n; k++) {
                onStep("correct", k / n, `의학 용어 교정 ${k + 1}/${n}`);
                await correctBatch(lec, k, cfg);
                lec.status.correctedBatches = k + 1;
                await save(lec);
            }
            lec.status.corrected = true;
            await save(lec);
        }
        if (!lec.status.summarized) {
            onStep("summary", 0, "3단계 요약 · 중요 내용 정리");
            const s = await makeSummary(lec, cfg);
            if (!lec.userTitle && s.aiTitle)
                lec.title = s.aiTitle;
            delete s.aiTitle;
            Object.assign(lec, s);
            lec.status.summarized = true;
            await save(lec);
        }
        onStep("done", 1, "완료");
    }
    /* ───────── 공용 UI ───────── */
    function Sheet({ title, onClose, children, wide, locked }) {
        useEffect(() => {
            const h = (e) => e.key === "Escape" && !locked && onClose();
            window.addEventListener("keydown", h);
            document.body.style.overflow = "hidden";
            return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
        }, [locked]);
        return (React.createElement("div", { className: "scrim", onClick: () => !locked && onClose() },
            React.createElement("div", { role: "dialog", "aria-modal": "true", "aria-label": title, className: "sheet " + (wide ? "sheet-wide" : ""), onClick: (e) => e.stopPropagation() },
                React.createElement("div", { className: "flex items-center justify-between gap-2 mb-4" },
                    React.createElement("h2", { className: "text-[20px] font-bold m-0" }, title),
                    !locked && React.createElement("button", { className: "btn ghost", "aria-label": "\uB2EB\uAE30", onClick: onClose },
                        React.createElement(Ic, { d: I.x, s: 20 }))),
                children)));
    }
    const Field = ({ label, hint, children }) => (React.createElement("label", { className: "flex flex-col gap-1.5 mb-4" },
        React.createElement("span", { className: "text-[14px] font-bold" }, label),
        children,
        hint && React.createElement("span", { className: "text-[13px] mute" }, hint)));
    function Seg({ value, options, onChange, label }) {
        return (React.createElement("div", { className: "segctl", role: "tablist", "aria-label": label }, options.map(([v, l]) => React.createElement("button", { key: v, role: "tab", "aria-selected": value === v, className: value === v ? "on" : "", onClick: () => onChange(v) }, l))));
    }
    function TBadge({ t, onJump }) {
        return React.createElement("button", { className: "tbadge tnum", "aria-label": `${fmt(t)} 시점으로 이동`, onClick: (e) => { e.stopPropagation(); onJump(t); } }, fmt(t));
    }
    const fmtDate = (ms) => new Date(ms).toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });
    const fmtLong = (s) => { s = Math.round(s || 0); const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60); return h ? `${h}시간 ${m}분` : `${m}분`; };
    /* ───────── 앱 ───────── */
    function App() {
        const [cfg, setCfg] = useState(() => ({ ...DEFAULT_CFG, ...store.get("knuts.cfg", {}) }));
        useEffect(() => { store.set("knuts.cfg", cfg); }, [cfg]);
        const [lectures, setLectures] = useState(null);
        const [route, setRoute] = useState(location.hash);
        const [sheet, setSheet] = useState(null);
        const [toast, setToast] = useState(null);
        const [jobs, setJobs] = useState({}); // id → {pct,label,error}
        useEffect(() => { IDB.all().then((l) => setLectures(l || [])).catch(() => { setLectures([]); setToast("이 브라우저에서 저장소를 열 수 없어요."); }); }, []);
        useEffect(() => { const h = () => setRoute(location.hash); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h); }, []);
        useEffect(() => { if (!toast)
            return; const h = setTimeout(() => setToast(null), 4500); return () => clearTimeout(h); }, [toast]);
        const latest = useRef({});
        useEffect(() => { (lectures || []).forEach((l) => (latest.current[l.id] = l)); }, [lectures]);
        const save = async (l) => {
            const c = clone(l);
            latest.current[c.id] = c;
            await IDB.put(c);
            setLectures((ls) => [...(ls || []).filter((x) => x.id !== c.id), c]);
        };
        /* 처리 작업이 저장할 때 사용자가 그사이 바꾼 마킹·제목은 지킨다 */
        const saveFromJob = (l) => {
            const cur = latest.current[l.id];
            return save(cur ? { ...l, marks: cur.marks, hasAudio: cur.hasAudio, audioName: cur.audioName, ...(cur.userTitle ? { title: cur.title, userTitle: true } : {}) } : l);
        };
        const remove = async (id) => {
            await IDB.del(id);
            await IDB.delAudio(id).catch(() => { });
            delete latest.current[id];
            setLectures((ls) => ls.filter((x) => x.id !== id));
            location.hash = "";
        };
        const run = async (given) => {
            const id = given.id;
            const lec = latest.current[id] || given;
            let lock = null;
            try {
                lock = navigator.wakeLock && (await navigator.wakeLock.request("screen"));
            }
            catch { }
            setJobs((j) => ({ ...j, [id]: { pct: 0, label: "준비 중" } }));
            try {
                const work = clone(lec);
                await processLecture(work, cfg, (step, pct, label) => setJobs((j) => ({ ...j, [id]: { step, pct, label } })), saveFromJob);
                setJobs((j) => { const n = { ...j }; delete n[id]; return n; });
            }
            catch (e) {
                setJobs((j) => ({ ...j, [id]: { error: e.message || String(e) } }));
            }
            try {
                lock && lock.release();
            }
            catch { }
        };
        const m = route.match(/^#l-(.+)$/);
        const list = lectures || [];
        const all = cfg.showSample ? [...list, SAMPLE] : list;
        const lec = m ? all.find((l) => l.id === decodeURIComponent(m[1])) : null;
        return (React.createElement(React.Fragment, null,
            lec ? (React.createElement(LectureView, { key: lec.id, lec: lec, cfg: cfg, save: save, job: jobs[lec.id], run: () => run(lec), remove: () => remove(lec.id), openSettings: () => setSheet("settings"), toast: setToast })) : (React.createElement(Home, { lectures: list, cfg: cfg, jobs: jobs, loading: !lectures, onNew: () => setSheet("new"), onSettings: () => setSheet("settings") })),
            sheet === "settings" && React.createElement(SettingsSheet, { cfg: cfg, setCfg: setCfg, lectures: list, save: save, toast: setToast, onClose: () => setSheet(null) }),
            sheet === "new" && React.createElement(NewSheet, { cfg: cfg, save: save, openSettings: () => setSheet("settings"), onClose: () => setSheet(null), onCreated: (l) => { setSheet(null); location.hash = "l-" + l.id; run(l); } }),
            toast && React.createElement("div", { className: "toast", role: "status" }, toast)));
    }
    /* ───────── 홈 ───────── */
    function Home({ lectures, cfg, jobs, loading, onNew, onSettings }) {
        const sorted = [...lectures].sort((a, b) => b.created - a.created);
        const needKeys = !cfg.openaiKey || !aiReady(cfg);
        const Item = ({ l }) => {
            const job = jobs[l.id], st = l.status || {};
            const state = l.sample ? "샘플" : job ? (job.error ? "처리 중단됨" : "처리 중") : st.summarized ? null : "이어서 처리 필요";
            const marks = (l.marks || []).length;
            return (React.createElement("a", { href: "#l-" + encodeURIComponent(l.id), className: "card lec-item" },
                React.createElement("div", { className: "flex-1 min-w-0" },
                    React.createElement("div", { className: "text-[13px] mute" },
                        l.sample ? l.course : fmtDate(l.created),
                        " \u00B7 ",
                        fmtLong(l.duration)),
                    React.createElement("div", { className: "text-[18px] font-bold leading-snug mt-0.5" }, l.title),
                    React.createElement("div", { className: "flex flex-wrap gap-1.5 mt-2" },
                        state && React.createElement("span", { className: "chip " + (state === "샘플" ? "" : job && !job.error ? "chip-teal" : "chip-rose") }, state),
                        st.summarized && React.createElement("span", { className: "chip" }, "\uC694\uC57D \uC644\uB8CC"),
                        Object.keys(l.keylines || {}).length > 0 && React.createElement("span", { className: "chip chip-hl" },
                            "\uC911\uC694 ",
                            Object.keys(l.keylines).length),
                        marks > 0 && React.createElement("span", { className: "chip chip-rose" },
                            "\uB0B4 \uB9C8\uD0B9 ",
                            marks))),
                React.createElement(Ic, { d: I.right, s: 22 })));
        };
        return (React.createElement("div", { className: "min-h-screen" },
            React.createElement("header", { className: "appbar" },
                React.createElement("div", { className: "wrap flex items-center gap-3 py-3" },
                    React.createElement("div", { className: "flex-1" },
                        React.createElement("div", { className: "text-[13px] opacity-80" }, "KNU Transcription & Summary"),
                        React.createElement("h1", { className: "text-[26px] font-bold leading-tight m-0" }, "KNUTS")),
                    React.createElement("button", { className: "btn bar-btn", onClick: onSettings }, "\uC124\uC815"))),
            React.createElement("main", { className: "wrap py-6" },
                React.createElement("button", { className: "newbtn", onClick: onNew },
                    React.createElement("span", { className: "newbtn-plus", "aria-hidden": "true" }, "\uFF0B"),
                    React.createElement("span", { className: "text-left" },
                        React.createElement("b", { className: "block text-[18px]" }, "\uC0C8 \uAC15\uC758 \uCD94\uAC00"),
                        React.createElement("span", { className: "text-[14px] opacity-85" }, "MP3\uB97C \uC62C\uB9AC\uBA74 \uC804\uC0AC \u2192 \uC758\uD559 \uC6A9\uC5B4 \uAD50\uC815 \u2192 \uC694\uC57D\uAE4C\uC9C0 \uC790\uB3D9\uC73C\uB85C"))),
                needKeys && (React.createElement("div", { className: "card p-4 mt-4 flex flex-wrap items-center gap-3", style: { borderColor: "var(--hl-bar)" } },
                    React.createElement("div", { className: "flex-1 min-w-[220px]" },
                        React.createElement("b", null, "\uBA3C\uC800 API \uD0A4\uB97C \uB123\uC5B4 \uC8FC\uC138\uC694."),
                        React.createElement("div", { className: "text-[14px] mute" }, "\uC74C\uC131 \uC804\uC0AC\uB294 OpenAI \uD0A4, \uAD50\uC815\u00B7\uC694\uC57D\uC740 Anthropic(\uB610\uB294 OpenAI) \uD0A4\uB97C \uC501\uB2C8\uB2E4. \uD0A4\uB294 \uC774 \uAE30\uAE30\uC5D0\uB9CC \uC800\uC7A5\uB3FC\uC694.")),
                    React.createElement("button", { className: "btn primary", onClick: onSettings }, "\uD0A4 \uC785\uB825"))),
                React.createElement("h2", { className: "text-[15px] font-bold mute mt-8 mb-3" },
                    "\uB0B4 \uAC15\uC758 ",
                    sorted.length > 0 && React.createElement("span", { className: "tnum" }, sorted.length)),
                loading ? React.createElement("p", { className: "mute" }, "\uBD88\uB7EC\uC624\uB294 \uC911\u2026") : sorted.length === 0 ? (React.createElement("p", { className: "card p-5 m-0 mute" }, "\uC544\uC9C1 \uCD94\uAC00\uD55C \uAC15\uC758\uAC00 \uC5C6\uC5B4\uC694. \uC544\uB798 \uC0D8\uD50C \uAC15\uC758\uB85C \uD654\uBA74\uC744 \uBA3C\uC800 \uB458\uB7EC\uBCF4\uC138\uC694.")) : React.createElement("div", { className: "grid gap-3 md:grid-cols-2" }, sorted.map((l) => React.createElement(Item, { key: l.id, l: l }))),
                cfg.showSample && React.createElement(React.Fragment, null,
                    React.createElement("h2", { className: "text-[15px] font-bold mute mt-8 mb-3" }, "\uC0D8\uD50C"),
                    React.createElement("div", { className: "grid gap-3 md:grid-cols-2" },
                        React.createElement(Item, { l: SAMPLE }))),
                React.createElement("p", { className: "text-[13px] mute mt-10" }, "\uC544\uC774\uD328\uB4DC Safari\uC5D0\uC11C \uACF5\uC720 \uBC84\uD2BC \u2192 \u2018\uD648 \uD654\uBA74\uC5D0 \uCD94\uAC00\u2019\uB97C \uB204\uB974\uBA74 \uC571\uCC98\uB7FC \uC4F8 \uC218 \uC788\uC5B4\uC694. \uAC15\uC758 \uB370\uC774\uD130\uB294 \uC774 \uAE30\uAE30 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uC800\uC7A5\uB418\uB2C8, \uAC00\uB054 \uC124\uC815\uC5D0\uC11C \uBC31\uC5C5\uC744 \uB0B4\uB824\uBC1B\uC544 \uB450\uC138\uC694."))));
    }
    /* ───────── 새 강의 ───────── */
    function NewSheet({ cfg, save, onClose, onCreated, openSettings }) {
        const [title, setTitle] = useState("");
        const [audio, setAudio] = useState(null);
        const [tfile, setTfile] = useState(null);
        const [state, setState] = useState(null); // {label,pct}
        const [err, setErr] = useState("");
        const running = !!state;
        const start = async () => {
            setErr("");
            let lock = null;
            try {
                lock = navigator.wakeLock && (await navigator.wakeLock.request("screen"));
            }
            catch { }
            try {
                let raw;
                if (tfile) {
                    setState({ label: "전사 파일 읽는 중", pct: 0.1 });
                    raw = parseTranscript(await tfile.text(), tfile.name);
                }
                else
                    raw = await transcribe(audio, cfg, (i, n) => setState({ label: `음성 전사 ${i + 1}/${n} — 1시간 강의는 보통 2~4분 걸려요`, pct: i / n }));
                if (!raw.length)
                    throw new Error("전사 결과가 비어 있어요.");
                const segs = toParas(raw);
                const id = "L" + Date.now().toString(36);
                const lec = { id, created: Date.now(), title: title.trim() || (audio || tfile).name.replace(/\.[^.]+$/, ""), userTitle: !!title.trim(),
                    duration: segs[segs.length - 1].end, segs, outline: [], concepts: [], mechs: [], keylines: {}, marks: [],
                    status: { transcribed: true, corrected: !cfg.correct, summarized: false }, audioName: audio ? audio.name : "" };
                setState({ label: "저장 중", pct: 1 });
                if (audio) {
                    try {
                        await IDB.putAudio(id, audio);
                        lec.hasAudio = true;
                        if (navigator.storage && navigator.storage.persist)
                            navigator.storage.persist();
                    }
                    catch {
                        lec.hasAudio = false;
                    }
                }
                await save(lec);
                onCreated(lec);
            }
            catch (e) {
                setErr(e.message || String(e));
                setState(null);
            }
            try {
                lock && lock.release();
            }
            catch { }
        };
        const mb = (f) => (f.size / 1048576).toFixed(1) + "MB";
        return (React.createElement(Sheet, { title: "\uC0C8 \uAC15\uC758 \uCD94\uAC00", onClose: onClose, wide: true, locked: running },
            React.createElement(Field, { label: "\uAC15\uC758 \uC81C\uBAA9", hint: "\uBE44\uC6CC \uB450\uBA74 AI\uAC00 \uB0B4\uC6A9\uC744 \uBCF4\uACE0 \uC81C\uBAA9\uC744 \uBD99\uC5EC\uC694." },
                React.createElement("input", { className: "input", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "\uC608: \uAC10\uC5FC\uB0B4\uACFC 3\uAC15 \u2013 \uC694\uB85C\uAC10\uC5FC", disabled: running })),
            React.createElement("div", { className: "grid gap-3 sm:grid-cols-2 mb-2" },
                React.createElement("label", { className: "pick " + (audio ? "on" : "") },
                    React.createElement("b", null, "\uAC15\uC758 \uC74C\uC131 \uD30C\uC77C"),
                    React.createElement("span", { className: "text-[13px] mute" }, "MP3 \uAD8C\uC7A5 \u00B7 1\uC2DC\uAC04 \uB2E8\uC704. 25MB\uAC00 \uB118\uC73C\uBA74 20MB\uC529 \uB098\uB220 \uC804\uC0AC\uD569\uB2C8\uB2E4."),
                    React.createElement("span", { className: "pick-file" }, audio ? `${audio.name} · ${mb(audio)}` : "파일 선택"),
                    React.createElement("input", { type: "file", accept: "audio/*,.mp3,.m4a,.wav,.mp4", className: "sr-only", disabled: running, onChange: (e) => { setAudio(e.target.files[0] || null); setTfile(null); setErr(""); } })),
                React.createElement("label", { className: "pick " + (tfile ? "on" : "") },
                    React.createElement("b", null, "\uB610\uB294 \uC804\uC0AC \uD30C\uC77C"),
                    React.createElement("span", { className: "text-[13px] mute" }, ".srt \u00B7 .vtt \u00B7 Whisper .json \u00B7 [MM:SS] \uBD99\uC740 .txt"),
                    React.createElement("span", { className: "pick-file" }, tfile ? tfile.name : "파일 선택"),
                    React.createElement("input", { type: "file", accept: ".srt,.vtt,.json,.txt,text/*,application/json", className: "sr-only", disabled: running, onChange: (e) => { setTfile(e.target.files[0] || null); setAudio(null); setErr(""); } }))),
            audio && audio.size > 25 * 1048576 && !/\.mp3$/i.test(audio.name) && React.createElement("p", { className: "text-[14px] rose" },
                "25MB\uAC00 \uB118\uB294 ",
                audio.name.split(".").pop(),
                " \uD30C\uC77C\uC740 \uB098\uB20C \uC218 \uC5C6\uC5B4\uC694. MP3\uB85C \uBCC0\uD658\uD574\uC11C \uC62C\uB824 \uC8FC\uC138\uC694."),
            audio && !cfg.openaiKey && React.createElement("p", { className: "text-[14px] rose" },
                "\uC74C\uC131 \uC804\uC0AC\uC5D0\uB294 OpenAI API \uD0A4\uAC00 \uD544\uC694\uD574\uC694. ",
                React.createElement("button", { className: "link", onClick: openSettings }, "\uC124\uC815 \uC5F4\uAE30")),
            !aiReady(cfg) && React.createElement("p", { className: "text-[13px] mute" }, "\uAD50\uC815\u00B7\uC694\uC57D\uC6A9 AI \uD0A4\uAC00 \uC5C6\uC73C\uBA74 \uC804\uC0AC\uB9CC \uC800\uC7A5\uB418\uACE0, \uD0A4\uB97C \uB123\uC740 \uB4A4 \uAC15\uC758 \uD654\uBA74\uC5D0\uC11C \uC774\uC5B4\uC11C \uCC98\uB9AC\uD560 \uC218 \uC788\uC5B4\uC694."),
            state && (React.createElement("div", { className: "mt-3" },
                React.createElement("div", { className: "text-[15px] font-medium mb-2" }, state.label),
                React.createElement("div", { className: "progress" },
                    React.createElement("div", { style: { width: Math.max(4, state.pct * 100) + "%" } })),
                React.createElement("p", { className: "text-[13px] mute mt-2" }, "\uD654\uBA74\uC744 \uCF1C \uB454 \uCC44\uB85C \uC774 \uC571\uC744 \uB5A0\uB098\uC9C0 \uB9D0\uC544 \uC8FC\uC138\uC694."))),
            err && React.createElement("p", { className: "text-[14px] font-medium rose mt-3" }, err),
            React.createElement("div", { className: "flex justify-end gap-2 mt-5" },
                React.createElement("button", { className: "btn soft", disabled: running, onClick: onClose }, "\uCDE8\uC18C"),
                React.createElement("button", { className: "btn primary", disabled: running || (!audio && !tfile) || (audio && !cfg.openaiKey), onClick: start }, running ? "처리 중…" : "전사 시작"))));
    }
    /* ───────── 설정 ───────── */
    function SettingsSheet({ cfg, setCfg, lectures, save, toast, onClose }) {
        const set = (k) => (e) => setCfg((c) => ({ ...c, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
        const [usage, setUsage] = useState("");
        useEffect(() => { navigator.storage && navigator.storage.estimate && navigator.storage.estimate().then((e) => setUsage(`${(e.usage / 1048576).toFixed(0)}MB 사용 중`)).catch(() => { }); }, []);
        const exportAll = () => {
            const blob = new Blob([JSON.stringify({ app: "knuts", version: 1, exported: Date.now(), lectures }, null, 0)], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `knuts-backup-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(a.href), 5000);
        };
        const importAll = async (f) => {
            try {
                const j = JSON.parse(await f.text());
                const ls = arr(j.lectures).filter((l) => l && l.id && Array.isArray(l.segs));
                for (const l of ls)
                    await save({ ...l, hasAudio: false });
                toast(`강의 ${ls.length}개를 가져왔어요. 음성 파일은 강의 화면에서 다시 연결하세요.`);
            }
            catch {
                toast("백업 파일을 읽지 못했어요.");
            }
        };
        const ok = (v) => React.createElement("span", { className: v ? "chip chip-teal" : "chip chip-rose" }, v ? "입력됨" : "필요");
        return (React.createElement(Sheet, { title: "\uC124\uC815", onClose: onClose, wide: true },
            React.createElement("section", { className: "setsec" },
                React.createElement("h3", null,
                    "\uC74C\uC131 \uC804\uC0AC \u00B7 OpenAI Whisper ",
                    ok(!!cfg.openaiKey)),
                React.createElement(Field, { label: "OpenAI API \uD0A4", hint: "platform.openai.com\uC5D0\uC11C \uBC1C\uAE09. 1\uC2DC\uAC04 \uAC15\uC758 \uC804\uC0AC \uBE44\uC6A9\uC740 \uC57D $0.36\uC785\uB2C8\uB2E4." },
                    React.createElement("input", { className: "input", type: "password", autoComplete: "off", value: cfg.openaiKey, onChange: set("openaiKey"), placeholder: "sk-..." })),
                React.createElement(Field, { label: "\uACFC\uBAA9 \u00B7 \uC6A9\uC5B4 \uD78C\uD2B8", hint: "Whisper\uC640 \uAD50\uC815 AI\uC5D0 \uD568\uAED8 \uC804\uB2EC\uB3FC\uC694. \uC774\uBC88 \uD559\uAE30 \uACFC\uBAA9\uACFC \uC790\uC8FC \uB098\uC624\uB294 \uC601\uC5B4 \uC6A9\uC5B4\uB97C \uC801\uC73C\uBA74 \uC815\uD655\uB3C4\uAC00 \uC62C\uB77C\uAC11\uB2C8\uB2E4." },
                    React.createElement("textarea", { className: "input", rows: 3, value: cfg.keywords, onChange: set("keywords") })),
                React.createElement("details", { className: "mb-2" },
                    React.createElement("summary", { className: "text-[14px] mute cursor-pointer" }, "\uACE0\uAE09: \uC804\uC0AC \uBAA8\uB378"),
                    React.createElement(Field, { label: "\uBAA8\uB378", hint: "\uD0C0\uC784\uC2A4\uD0EC\uD504\uB97C \uC8FC\uB294 whisper-1 \uAE30\uC900\uC785\uB2C8\uB2E4. OpenAI\uAC00 2027\uB144 2\uC6D4 whisper-1 \uC885\uB8CC\uB97C \uC608\uACE0\uD588\uC5B4\uC694." },
                        React.createElement("input", { className: "input", value: cfg.whisperModel, onChange: set("whisperModel") })))),
            React.createElement("section", { className: "setsec" },
                React.createElement("h3", null,
                    "\uC758\uD559 \uAD50\uC815 \u00B7 \uC694\uC57D AI ",
                    ok(aiReady(cfg))),
                React.createElement(Field, { label: "AI \uC5D4\uC9C4" },
                    React.createElement("select", { className: "input", value: cfg.llm, onChange: set("llm") },
                        React.createElement("option", { value: "anthropic" }, "Claude (Anthropic API \uD0A4)"),
                        React.createElement("option", { value: "openai" }, "OpenAI (\uC704 OpenAI \uD0A4 \uC0AC\uC6A9)"))),
                cfg.llm === "anthropic" ? React.createElement(React.Fragment, null,
                    React.createElement(Field, { label: "Anthropic API \uD0A4", hint: "console.anthropic.com\uC5D0\uC11C \uBC1C\uAE09." },
                        React.createElement("input", { className: "input", type: "password", autoComplete: "off", value: cfg.anthropicKey, onChange: set("anthropicKey"), placeholder: "sk-ant-..." })),
                    React.createElement("details", { className: "mb-2" },
                        React.createElement("summary", { className: "text-[14px] mute cursor-pointer" }, "\uACE0\uAE09: \uBAA8\uB378"),
                        React.createElement(Field, { label: "\uAD50\uC815 \uBAA8\uB378 (\uBE60\uB974\uACE0 \uC800\uB834)" },
                            React.createElement("input", { className: "input", value: cfg.fastModel, onChange: set("fastModel") })),
                        React.createElement(Field, { label: "\uC694\uC57D \uBAA8\uB378" },
                            React.createElement("input", { className: "input", value: cfg.mainModel, onChange: set("mainModel") })))) : React.createElement(Field, { label: "\uBAA8\uB378" },
                    React.createElement("input", { className: "input", value: cfg.openaiModel, onChange: set("openaiModel") })),
                React.createElement("label", { className: "check" },
                    React.createElement("input", { type: "checkbox", checked: cfg.correct, onChange: set("correct") }),
                    " \uC804\uC0AC \uD6C4 \uC758\uD559 \uC6A9\uC5B4 \uAD50\uC815 (\uAD8C\uC7A5)")),
            React.createElement("section", { className: "setsec" },
                React.createElement("h3", null, "\uB370\uC774\uD130"),
                React.createElement("p", { className: "text-[14px] mute mt-0" },
                    "\uAC15\uC758\uC640 \uC74C\uC131\uC740 \uC774 \uAE30\uAE30 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uC800\uC7A5\uB3FC\uC694",
                    usage ? ` · ${usage}` : "",
                    ". API \uD0A4\uB294 \uBC31\uC5C5\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."),
                React.createElement("div", { className: "flex flex-wrap gap-2" },
                    React.createElement("button", { className: "btn soft", onClick: exportAll, disabled: !lectures.length }, "\uBC31\uC5C5 \uB0B4\uB824\uBC1B\uAE30"),
                    React.createElement("label", { className: "btn soft cursor-pointer" },
                        "\uBC31\uC5C5 \uAC00\uC838\uC624\uAE30",
                        React.createElement("input", { type: "file", accept: ".json,application/json", className: "sr-only", onChange: (e) => { e.target.files[0] && importAll(e.target.files[0]); e.target.value = ""; } })),
                    React.createElement("button", { className: "btn ghost rose", onClick: () => { setCfg((c) => ({ ...c, openaiKey: "", anthropicKey: "" })); toast("API 키를 지웠어요."); } }, "API \uD0A4 \uC9C0\uC6B0\uAE30")),
                React.createElement("label", { className: "check mt-3" },
                    React.createElement("input", { type: "checkbox", checked: cfg.showSample, onChange: set("showSample") }),
                    " \uC0D8\uD50C \uAC15\uC758 \uBCF4\uC774\uAE30")),
            React.createElement("div", { className: "flex justify-end" },
                React.createElement("button", { className: "btn primary", onClick: onClose }, "\uC644\uB8CC"))));
    }
    /* ───────── 강의 화면 ───────── */
    function LectureView({ lec, cfg, save, job, run, remove, openSettings, toast }) {
        const [tab, setTab] = useState("tx");
        const [marks, setMarks] = useState(() => (lec.sample ? store.get("knuts.marks.sample", []) : lec.marks || []));
        const [media, setMedia] = useState(null); // {url,isVideo,name}
        const [time, setTime] = useState(0);
        const [playing, setPlaying] = useState(false);
        const [rate, setRate] = useState(1);
        const [mediaDur, setMediaDur] = useState(0);
        const [view, setView] = useState("clean");
        const [onlyKey, setOnlyKey] = useState(false);
        const [query, setQuery] = useState("");
        const [follow, setFollow] = useState(true);
        const [term, setTerm] = useState(null);
        const [flash, setFlash] = useState(null);
        const [menu, setMenu] = useState(null);
        const [level, setLevel] = useState(1);
        const mediaRef = useRef(null), listRef = useRef(null), barRef = useRef(null), segRefs = useRef({});
        const segs = lec.segs, kl = lec.keylines || {};
        const dur = media ? mediaDur || lec.duration : lec.duration;
        /* 음성 불러오기 */
        useEffect(() => {
            let url = null, on = true;
            if (lec.hasAudio)
                IDB.getAudio(lec.id).then((b) => { if (b && on) {
                    url = URL.createObjectURL(b);
                    setMedia({ url, isVideo: /video/.test(b.type), name: lec.audioName || "강의 음성" });
                } }).catch(() => { });
            return () => { on = false; url && URL.revokeObjectURL(url); };
        }, [lec.id, lec.hasAudio]);
        /* 마킹 저장 */
        const first = useRef(true);
        useEffect(() => {
            if (first.current) {
                first.current = false;
                return;
            }
            const h = setTimeout(() => { if (lec.sample)
                store.set("knuts.marks.sample", marks);
            else
                save({ ...lec, marks }); }, 600);
            return () => clearTimeout(h);
        }, [marks]);
        /* 음성 없을 때 가상 재생 */
        useEffect(() => {
            if (media || !playing)
                return;
            let raf, last = performance.now();
            const step = (now) => {
                const dt = (now - last) / 1000;
                last = now;
                setTime((t) => { const n = t + dt * rate; if (n >= lec.duration) {
                    setPlaying(false);
                    return lec.duration;
                } return n; });
                raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
            return () => cancelAnimationFrame(raf);
        }, [playing, rate, media]);
        useEffect(() => { if (mediaRef.current)
            mediaRef.current.playbackRate = rate; }, [rate, media]);
        const play = (from) => {
            if (media && mediaRef.current) {
                const p = mediaRef.current.play();
                p && p.catch && p.catch(() => setPlaying(false));
            }
            else {
                if ((from !== null && from !== void 0 ? from : time) >= lec.duration)
                    setTime(0);
                setPlaying(true);
            }
        };
        const pause = () => (media && mediaRef.current ? mediaRef.current.pause() : setPlaying(false));
        const toggle = () => (playing ? pause() : play());
        const seek = (t, andPlay) => {
            const v = Math.min(Math.max(0, t), dur);
            setTime(v);
            if (media && mediaRef.current)
                mediaRef.current.currentTime = v;
            if (andPlay)
                play(v);
        };
        const jump = (t) => { setTab("tx"); setFollow(true); seek(t, true); };
        const addMark = () => {
            const t = Math.floor(time), id = Date.now();
            setMarks((ms) => [...ms, { id, t, note: "" }].sort((a, b) => a.t - b.t));
            setFlash({ id, t });
            setTimeout(() => setFlash((f) => (f && f.id === id ? null : f)), 1800);
        };
        useEffect(() => {
            const h = (e) => {
                if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || document.querySelector(".scrim"))
                    return;
                if (e.code === "Space") {
                    e.preventDefault();
                    toggle();
                }
                else if (e.key === "m" || e.key === "M" || e.key === "ㅡ")
                    addMark();
                else if (e.key === "ArrowLeft")
                    seek(time - 10);
                else if (e.key === "ArrowRight")
                    seek(time + 10);
            };
            window.addEventListener("keydown", h);
            return () => window.removeEventListener("keydown", h);
        });
        const attach = async (f) => {
            if (!f)
                return;
            if (media)
                URL.revokeObjectURL(media.url);
            setMedia({ url: URL.createObjectURL(f), isVideo: /video|mp4|mov/i.test(f.type + f.name), name: f.name });
            setPlaying(false);
            setTime(0);
            if (!lec.sample) {
                try {
                    await IDB.putAudio(lec.id, f);
                    await save({ ...lec, marks, hasAudio: true, audioName: f.name });
                }
                catch {
                    toast("음성을 저장하지 못했어요. 이번 사용 중에만 재생됩니다.");
                }
            }
        };
        const activeIdx = useMemo(() => { let i = 0; for (const s of segs)
            if (s.t <= time)
                i = s.id; return i; }, [time, segs]);
        const info = useMemo(() => segs.map((s) => ({ auto: EMPH_RE.test(s.text), manual: marks.filter((m) => m.t >= s.t && m.t < s.end), ai: !!kl[s.id] && !lec.sample })), [marks, segs, kl]);
        const isKey = (i) => info[i] && (info[i].auto || info[i].manual.length || info[i].ai);
        const keyCount = segs.filter((s) => isKey(s.id)).length;
        const visible = segs.filter((s) => (!onlyKey || isKey(s.id)) && (!query || (view === "clean" ? s.text : s.raw || "").toLowerCase().includes(query.toLowerCase())));
        useEffect(() => {
            if (!follow || tab !== "tx")
                return;
            const box = listRef.current, el = segRefs.current[activeIdx];
            if (!box || !el)
                return;
            const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
            box.scrollTo({ top: top - box.clientHeight / 3, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        }, [activeIdx, follow, tab, onlyKey]);
        const onBar = (e) => { const r = barRef.current.getBoundingClientRect(); seek((Math.min(Math.max(e.clientX - r.left, 0), r.width) / r.width) * dur); };
        /* 중요 내용 카드 */
        const cards = [];
        segs.forEach((s) => {
            const inf = info[s.id];
            if (!inf)
                return;
            if (inf.auto)
                cards.push({ key: "a" + s.id, t: s.t, kind: "auto", tag: `“${(s.text.match(EMPH_RE) || [])[0]}”`, line: kl[s.id] || firstSentence(s.text) });
            else if (inf.ai)
                cards.push({ key: "k" + s.id, t: s.t, kind: "ai", tag: "AI 선정", line: kl[s.id] });
        });
        marks.forEach((mk) => { const s = segAt(segs, mk.t); cards.push({ key: "m" + mk.id, t: mk.t, kind: "manual", tag: mk.note ? `내 마킹 · ${mk.note}` : "내 마킹", line: kl[s.id] || firstSentence(s.text) }); });
        cards.sort((a, b) => a.t - b.t);
        const st = lec.status || {};
        const pending = !lec.sample && !st.summarized;
        const tabs = [["tx", "전사본"], ["key", `중요 내용 ${cards.length}`], ["sum", "요약"]];
        return (React.createElement("div", { className: "min-h-screen pb-16" },
            React.createElement("header", { className: "appbar sticky top-0 z-20" },
                React.createElement("div", { className: "wrap flex items-center gap-2 py-2" },
                    React.createElement("a", { href: "#", className: "btn bar-btn", "aria-label": "\uAC15\uC758 \uBAA9\uB85D" },
                        React.createElement(Ic, { d: I.left, s: 22 })),
                    React.createElement("div", { className: "flex-1 min-w-0" },
                        React.createElement("div", { className: "text-[12px] opacity-80 truncate" },
                            lec.sample ? lec.course : fmtDate(lec.created),
                            " \u00B7 ",
                            fmtLong(lec.duration)),
                        React.createElement("h1", { className: "text-[18px] sm:text-[20px] font-bold leading-tight m-0 truncate" }, lec.title)),
                    !lec.sample && React.createElement("button", { className: "btn bar-btn", onClick: () => setMenu("menu") }, "\uB354\uBCF4\uAE30")),
                React.createElement("div", { className: "wrap pb-3" },
                    React.createElement("div", { className: "player" },
                        React.createElement("button", { className: "btn play", onClick: toggle, "aria-label": playing ? "일시정지" : "재생" },
                            React.createElement(Ic, { d: playing ? I.pause : I.play, s: 22 })),
                        React.createElement("button", { className: "btn bar-btn hide-xs", onClick: () => seek(time - 10), "aria-label": "10\uCD08 \uB4A4\uB85C" },
                            React.createElement(Ic, { d: I.back })),
                        React.createElement("button", { className: "btn bar-btn hide-xs", onClick: () => seek(time + 10), "aria-label": "10\uCD08 \uC55E\uC73C\uB85C" },
                            React.createElement(Ic, { d: I.fwd })),
                        React.createElement("span", { className: "tnum text-[13px] w-[44px] text-right" }, fmt(time)),
                        React.createElement("div", { ref: barRef, className: "tl", role: "slider", tabIndex: 0, "aria-label": "\uC7AC\uC0DD \uC704\uCE58", "aria-valuemin": 0, "aria-valuemax": Math.floor(dur), "aria-valuenow": Math.floor(time), "aria-valuetext": fmt(time), onPointerDown: (e) => { e.currentTarget.setPointerCapture(e.pointerId); onBar(e); }, onPointerMove: (e) => { if (e.buttons)
                                onBar(e); } },
                            React.createElement("div", { className: "tl-track" }),
                            React.createElement("div", { className: "tl-fill", style: { width: Math.min(100, (time / dur) * 100) + "%" } }),
                            segs.map((s) => info[s.id] && (info[s.id].auto || info[s.id].ai) && s.t <= dur && React.createElement("i", { key: s.id, className: "tl-tick hl", style: { left: (s.t / dur) * 100 + "%" } })),
                            marks.filter((mk) => mk.t <= dur).map((mk) => React.createElement("i", { key: mk.id, className: "tl-tick mk", style: { left: (mk.t / dur) * 100 + "%" } })),
                            React.createElement("div", { className: "tl-knob", style: { left: Math.min(100, (time / dur) * 100) + "%" } })),
                        React.createElement("span", { className: "tnum text-[13px] w-[44px] opacity-80" }, fmt(dur)),
                        React.createElement("button", { className: "btn bar-btn tnum text-[14px]", onClick: () => setRate((r) => ({ 1: 1.25, 1.25: 1.5, 1.5: 2, 2: 1 }[r])), "aria-label": "\uC7AC\uC0DD \uC18D\uB3C4" },
                            rate,
                            "\u00D7"),
                        React.createElement("button", { className: "btn markbtn", onClick: addMark },
                            React.createElement(Ic, { d: I.flag, s: 18 }),
                            React.createElement("span", { className: "hide-xs" }, "\uC2DC\uD5D8 \uCD9C\uC81C \uC554\uC2DC"))),
                    React.createElement("div", { className: "flex items-center justify-between gap-2 mt-1.5 text-[12px] opacity-85 min-h-[18px]" },
                        React.createElement("span", { "aria-live": "polite" }, flash ? `[${fmt(flash.t)}] 출제 암시로 북마크했어요` : media ? media.name : "음성 없음 · 가상 재생"),
                        !media && React.createElement("label", { className: "underline cursor-pointer" },
                            "\uC74C\uC131 \uC5F0\uACB0",
                            React.createElement("input", { type: "file", accept: "audio/*,video/mp4,.mp3,.m4a,.wav,.mp4", className: "sr-only", onChange: (e) => { attach(e.target.files[0]); e.target.value = ""; } }))))),
            media && (React.createElement("video", { ref: mediaRef, src: media.url, playsInline: true, preload: "metadata", className: media.isVideo ? "wrap block w-full max-h-[34vh] bg-black mt-3 rounded-xl" : "hidden", onLoadedMetadata: (e) => { setMediaDur(e.target.duration || 0); e.target.playbackRate = rate; }, onTimeUpdate: (e) => setTime(e.target.currentTime), onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onEnded: () => setPlaying(false), onClick: toggle })),
            React.createElement("main", { className: "wrap pt-4" },
                (pending || job) && (React.createElement("div", { className: "card p-4 mb-4" }, job && !job.error ? React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "flex items-center justify-between gap-3 mb-2" },
                        React.createElement("b", null, job.label),
                        React.createElement("span", { className: "text-[13px] mute" }, "\uD654\uBA74\uC744 \uCF1C \uB454 \uCC44\uB85C \uAE30\uB2E4\uB824 \uC8FC\uC138\uC694")),
                    React.createElement("div", { className: "progress" },
                        React.createElement("div", { style: { width: Math.max(4, (job.pct || 0) * 100) + "%" } }))) : React.createElement("div", { className: "flex flex-wrap items-center gap-3" },
                    React.createElement("div", { className: "flex-1 min-w-[220px]" },
                        React.createElement("b", null, job && job.error ? "처리가 중단됐어요" : "아직 교정·요약 전이에요"),
                        React.createElement("div", { className: "text-[14px] mute" }, job && job.error ? job.error : aiReady(cfg) ? "끝난 단계는 저장돼 있어서, 남은 단계부터 이어서 처리해요." : "설정에서 AI 키를 넣으면 교정과 요약을 만들 수 있어요.")),
                    aiReady(cfg) ? React.createElement("button", { className: "btn primary", onClick: run }, "\uC774\uC5B4\uC11C \uCC98\uB9AC") : React.createElement("button", { className: "btn primary", onClick: openSettings }, "\uD0A4 \uC785\uB825")))),
                React.createElement("div", { className: "mb-4" },
                    React.createElement(Seg, { value: tab, onChange: setTab, options: tabs, label: "\uBCF4\uAE30" })),
                tab === "tx" && (React.createElement("section", { className: "card overflow-hidden" },
                    React.createElement("div", { className: "toolbar" },
                        React.createElement("input", { type: "search", className: "input flex-1 min-w-[180px]", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "\uC804\uC0AC\uBCF8 \uAC80\uC0C9" }),
                        React.createElement(Seg, { value: view, onChange: setView, options: [["clean", "교정본"], ["raw", "원문"]], label: "\uC804\uC0AC \uBCF4\uAE30" }),
                        React.createElement("button", { className: "btn chipbtn " + (onlyKey ? "on" : ""), "aria-pressed": onlyKey, onClick: () => setOnlyKey((v) => !v) },
                            "\uC911\uC694\uB9CC ",
                            keyCount),
                        React.createElement("label", { className: "check m-0" },
                            React.createElement("input", { type: "checkbox", checked: follow, onChange: (e) => setFollow(e.target.checked) }),
                            " \uB530\uB77C\uAC00\uAE30")),
                    React.createElement("div", { ref: listRef, className: "txlist" },
                        view === "raw" && React.createElement("p", { className: "text-[13px] mute px-4 pt-3 m-0" }, "\uAD50\uC815 \uC804 \uC74C\uC131\uC778\uC2DD \uC6D0\uBB38\uC774\uC5D0\uC694."),
                        visible.length === 0 && React.createElement("p", { className: "p-8 text-center mute" }, "\uC870\uAC74\uC5D0 \uB9DE\uB294 \uBB38\uB2E8\uC774 \uC5C6\uC5B4\uC694."),
                        visible.map((s) => {
                            const inf = info[s.id], on = s.id === activeIdx;
                            const cls = "para" + (on ? " on" : "") + (inf.manual.length ? " mk" : inf.auto ? " hl" : inf.ai ? " ai" : "");
                            return (React.createElement("div", { key: s.id, ref: (el) => (segRefs.current[s.id] = el), className: cls, role: "button", tabIndex: 0, onClick: () => seek(s.t, true), onKeyDown: (e) => e.key === "Enter" && seek(s.t, true) },
                                React.createElement("div", { className: "para-meta" },
                                    React.createElement("span", { className: "tnum ts" }, fmt(s.t)),
                                    inf.auto && React.createElement("span", { className: "chip chip-hl" }, "\uAD50\uC218\uB2D8 \uAC15\uC870"),
                                    inf.ai && !inf.auto && React.createElement("span", { className: "chip chip-teal" }, "AI \uC911\uC694"),
                                    inf.manual.map((mk) => React.createElement("span", { key: mk.id, className: "chip chip-rose-solid tnum" },
                                        "\uCD9C\uC81C \uC554\uC2DC ",
                                        fmt(mk.t),
                                        mk.note ? " · " + mk.note : ""))),
                                React.createElement("p", { className: "para-text" + (view === "raw" ? " mute" : "") }, view === "clean" ? renderText(s.text, query.trim(), (g, w) => setTerm({ ...g, w })) : renderText(s.raw || "(원문 없음)", query.trim(), () => { })),
                                inf.ai && view === "clean" && React.createElement("p", { className: "para-key" }, kl[s.id])));
                        })))),
                tab === "key" && (React.createElement("section", null,
                    cards.length === 0 ? React.createElement("p", { className: "card p-5 mute m-0" }, "\uC544\uC9C1 \uC911\uC694 \uD45C\uC2DC\uAC00 \uC5C6\uC5B4\uC694. \uAC15\uC758\uB97C \uB4E4\uC73C\uBA70 \u2018\uC2DC\uD5D8 \uCD9C\uC81C \uC554\uC2DC\u2019\uB97C \uB204\uB974\uBA74 \uC5EC\uAE30\uC5D0 \uBAA8\uC5EC\uC694.") : (React.createElement("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" }, cards.map((c) => (React.createElement("button", { key: c.key, className: "keycard " + c.kind, onClick: () => jump(c.t) },
                        React.createElement("span", { className: "flex items-center gap-2 flex-wrap" },
                            React.createElement("span", { className: "tbadge tnum" }, fmt(c.t)),
                            React.createElement("span", { className: "chip " + (c.kind === "manual" ? "chip-rose-solid" : c.kind === "ai" ? "chip-teal" : "chip-hl") }, c.tag)),
                        React.createElement("span", { className: "text-[16px] font-medium leading-snug" }, c.line)))))),
                    marks.length > 0 && React.createElement(React.Fragment, null,
                        React.createElement("h3", { className: "text-[15px] font-bold mute mt-8 mb-3" }, "\uB0B4 \uB9C8\uD0B9 \uBA54\uBAA8"),
                        React.createElement("ul", { className: "card divide p-0 m-0 list-none" }, marks.map((mk) => (React.createElement("li", { key: mk.id, className: "flex items-center gap-2 px-3 py-2" },
                            React.createElement(TBadge, { t: mk.t, onJump: jump }),
                            React.createElement("input", { className: "input flex-1", value: mk.note, placeholder: "\uBA54\uBAA8 (\uC608: \uAD6D\uC2DC \uB2E8\uACE8)", "aria-label": `${fmt(mk.t)} 메모`, onChange: (e) => setMarks((ms) => ms.map((x) => (x.id === mk.id ? { ...x, note: e.target.value } : x))) }),
                            React.createElement("button", { className: "btn ghost", "aria-label": "\uB9C8\uD0B9 \uC0AD\uC81C", onClick: () => { setMarks((ms) => ms.filter((x) => x.id !== mk.id)); toast(`[${fmt(mk.t)}] 마킹을 지웠어요`); } },
                                React.createElement(Ic, { d: I.x, s: 18 }))))))))),
                tab === "sum" && React.createElement(SummaryView, { lec: lec, level: level, setLevel: setLevel, jump: jump })),
            term && (React.createElement("div", { className: "termcard card", role: "dialog", "aria-label": "\uC758\uD559 \uC6A9\uC5B4" },
                React.createElement("div", { className: "flex items-start justify-between gap-2" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "text-[18px] font-bold teal" }, term.w),
                        React.createElement("div", { className: "text-[15px] font-medium" }, term.ko)),
                    React.createElement("button", { className: "btn ghost", "aria-label": "\uB2EB\uAE30", onClick: () => setTerm(null) },
                        React.createElement(Ic, { d: I.x, s: 18 }))),
                React.createElement("p", { className: "text-[15px] mt-2 mb-0 mute" }, term.d))),
            menu === "menu" && (React.createElement(Sheet, { title: "\uAC15\uC758 \uAD00\uB9AC", onClose: () => setMenu(null) },
                React.createElement("div", { className: "flex flex-col gap-2" },
                    React.createElement("button", { className: "btn soft justify-start", onClick: () => setMenu("rename") }, "\uC774\uB984 \uBC14\uAFB8\uAE30"),
                    React.createElement("label", { className: "btn soft justify-start cursor-pointer" },
                        media ? "음성 파일 바꾸기" : "음성 파일 연결",
                        React.createElement("input", { type: "file", accept: "audio/*,video/mp4,.mp3,.m4a,.wav,.mp4", className: "sr-only", onChange: (e) => { attach(e.target.files[0]); e.target.value = ""; setMenu(null); } })),
                    React.createElement("button", { className: "btn soft justify-start", disabled: !aiReady(cfg) || !!(job && !job.error), onClick: async () => { setMenu(null); await save({ ...lec, marks, status: { ...st, summarized: false } }); run(); } }, "\uC694\uC57D \uB2E4\uC2DC \uB9CC\uB4E4\uAE30"),
                    React.createElement("button", { className: "btn soft justify-start rose", onClick: () => setMenu("delete") }, "\uAC15\uC758 \uC0AD\uC81C")))),
            menu === "rename" && React.createElement(RenameSheet, { title: lec.title, onClose: () => setMenu(null), onSave: (t) => { save({ ...lec, marks, title: t, userTitle: true }); setMenu(null); } }),
            menu === "delete" && (React.createElement(Sheet, { title: "\uC774 \uAC15\uC758\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?", onClose: () => setMenu(null) },
                React.createElement("p", { className: "mute mt-0" }, "\uC804\uC0AC\uBCF8, \uC694\uC57D, \uB9C8\uD0B9, \uC800\uC7A5\uB41C \uC74C\uC131\uC774 \uBAA8\uB450 \uC9C0\uC6CC\uC9C0\uACE0 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC5B4\uC694."),
                React.createElement("div", { className: "flex justify-end gap-2 mt-4" },
                    React.createElement("button", { className: "btn soft", onClick: () => setMenu(null) }, "\uCDE8\uC18C"),
                    React.createElement("button", { className: "btn danger", onClick: remove }, "\uC0AD\uC81C"))))));
    }
    function RenameSheet({ title, onClose, onSave }) {
        const [t, setT] = useState(title);
        return (React.createElement(Sheet, { title: "\uC774\uB984 \uBC14\uAFB8\uAE30", onClose: onClose },
            React.createElement("form", { onSubmit: (e) => { e.preventDefault(); t.trim() && onSave(t.trim()); } },
                React.createElement("input", { className: "input w-full", value: t, onChange: (e) => setT(e.target.value), autoFocus: true }),
                React.createElement("div", { className: "flex justify-end gap-2 mt-4" },
                    React.createElement("button", { type: "button", className: "btn soft", onClick: onClose }, "\uCDE8\uC18C"),
                    React.createElement("button", { className: "btn primary", disabled: !t.trim() }, "\uC800\uC7A5")))));
    }
    function SummaryView({ lec, level, setLevel, jump }) {
        const [closed, setClosed] = useState(() => new Set());
        const empty = !lec.outline.length && !lec.concepts.length && !lec.mechs.length;
        if (empty)
            return React.createElement("p", { className: "card p-5 mute m-0" }, "\uC694\uC57D\uC774 \uC544\uC9C1 \uC5C6\uC5B4\uC694. \uAD50\uC815\u00B7\uC694\uC57D \uCC98\uB9AC\uAC00 \uB05D\uB098\uBA74 \uC5EC\uAE30\uC5D0 \uB098\uD0C0\uB098\uC694.");
        const list = level === 2 ? lec.concepts : lec.mechs;
        const toggle = (k) => setClosed((c) => { const n = new Set(c); n.has(k) ? n.delete(k) : n.add(k); return n; });
        return (React.createElement("section", null,
            React.createElement("div", { className: "mb-4" },
                React.createElement(Seg, { value: level, onChange: setLevel, label: "\uC694\uC57D \uB2E8\uACC4", options: [[1, "① 강의 뼈대"], [2, "② 핵심 개념"], [3, "③ 상세 기전"]] })),
            level === 1 ? (React.createElement("ol", { className: "card divide p-0 m-0 list-none" }, lec.outline.map((o, i) => (React.createElement("li", { key: i, className: "flex gap-4 p-4 items-start" },
                React.createElement("span", { className: "text-[22px] font-bold tnum w-7 shrink-0 leading-none pt-0.5 teal" }, i + 1),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("div", { className: "text-[17px] font-bold" }, o.title),
                    React.createElement("div", { className: "text-[15px] mute" }, o.sub)),
                React.createElement(TBadge, { t: o.t, onJump: jump })))))) : (React.createElement("div", { className: "flex flex-col gap-3" }, list.map((c, i) => {
                const k = level + "-" + i, open = !closed.has(k);
                return (React.createElement("div", { key: k, className: "card overflow-hidden" },
                    React.createElement("button", { className: "w-full flex items-center gap-3 p-4 text-left min-h-[56px]", "aria-expanded": open, onClick: () => toggle(k) },
                        React.createElement("span", { className: "flex-1 text-[17px] font-bold" }, c.title),
                        React.createElement("span", { className: "mute", style: { transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" } },
                            React.createElement(Ic, { d: I.right, s: 18 }))),
                    open && (React.createElement("div", { className: "px-4 pb-4" },
                        c.rows ? (React.createElement("dl", { className: "kv" }, c.rows.map(([a, b], j) => React.createElement(React.Fragment, { key: j },
                            React.createElement("dt", null, a),
                            React.createElement("dd", null, b))))) : (React.createElement("div", { className: "grid gap-3 md:grid-cols-2" },
                            React.createElement("div", { className: "box act" },
                                React.createElement("div", { className: "box-h teal" }, "\uAC15\uC758\uC5D0\uC11C"),
                                React.createElement("p", { className: "m-0 text-[15px]" }, c.lecture)),
                            c.extra && React.createElement("div", { className: "box" },
                                React.createElement("div", { className: "box-h mute" }, "\uBCF4\uCDA9 \uAE30\uC804 \u00B7 \uAC15\uC758 \uC678 \uAD50\uACFC\uC11C \uB0B4\uC6A9"),
                                React.createElement("p", { className: "m-0 text-[15px]" }, c.extra)))),
                        c.refs.length > 0 && React.createElement("div", { className: "mt-3 flex flex-wrap items-center gap-1.5 text-[13px] mute" },
                            "\uADFC\uAC70 ",
                            c.refs.map((t) => React.createElement(TBadge, { key: t, t: t, onJump: jump })))))));
            }))),
            React.createElement("p", { className: "text-[13px] mute mt-5" }, lec.sample ? "샘플 강의용으로 미리 작성된 요약이에요." : "전사본만 근거로 AI가 만든 요약이에요. 수치와 기준은 시간 표시를 눌러 원문과 대조하세요.")));
    }
    ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
    if ("serviceWorker" in navigator && location.protocol === "https:")
        navigator.serviceWorker.register("sw.js").catch(() => { });
})();
