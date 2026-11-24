# KNUTS

**KNU T**ranscription & **S**ummary. 의대 강의 녹음(MP3)을 의학 용어에 맞게 전사하고, 3단계 요약과 중요 내용 강조까지 정리하는 웹앱입니다. 아이패드 Safari에서 "홈 화면에 추가"로 앱처럼 쓸 수 있어요.

## 쓰는 법
1. 앱의 **설정**에 API 키를 넣습니다.
   - OpenAI 키: 음성 전사(Whisper). 25MB가 넘는 MP3는 20MB씩 나눠 전사합니다.
   - Anthropic 키(또는 OpenAI 키): 의학 용어 교정과 요약.
2. **새 강의 추가**에서 MP3(또는 .srt/.vtt/.json/.txt 전사 파일)를 올립니다.
3. 전사본 · 중요 내용 · 요약 탭에서 복습합니다. 시간 표시를 누르면 그 시점의 음성이 재생돼요.

## 데이터
API 키, 강의, 음성은 모두 **이 기기 브라우저(IndexedDB·localStorage)에만** 저장됩니다. 저장소에는 앱 코드만 있어요. 기기를 바꾸거나 브라우저 데이터를 지우기 전에 설정 → 백업 내려받기를 해 두세요.

## 개발
`src/`를 고친 뒤 `node build.js`(→ app.js), 클래스를 새로 썼다면 `node tw.js`(→ tw.css).

## 무료 전사 도구 (Windows)
`tools/windows/` — 녹화본을 1시간 MP3로 자르고 Faster-Whisper-XXL로 .srt를 만듭니다. 인터넷·API 키 없이 노트북 CPU로 돌아가요.

### 처음 한 번만
1. [Faster-Whisper-XXL 릴리스](https://github.com/Purfview/whisper-standalone-win/releases/tag/Faster-Whisper-XXL)에서 Windows용 7z를 받아, 이 폴더 안에 `Faster-Whisper-XXL` 폴더로 풉니다 (안에 `ffmpeg.exe`도 들어 있습니다).
2. `KNUTS 전사.bat`, `knuts-transcribe.ps1`, `용어힌트.txt`를 같은 폴더에 둡니다.

### GitHub에 자동으로 올리기 (한 번만 설정)
`저장소 연결.bat`을 더블클릭하면 git을 설치하고, `Classification-of-Past-Exam` 저장소의 `올리기/전사본` 부분만 1MB 이하로 내려받아 `전사본저장소` 폴더에 연결합니다(전체 13GB를 받지 않습니다). 연결해 두면 `knuts-transcribe.ps1`이 결과 폴더와 자동 올리기를 알아서 켭니다.

그 뒤로는 전사가 끝날 때마다 `.srt`가 GitHub로 올라가고, 「본과 1학년」 앱의 과목 화면에서 **「내 Claude로 전사본 정리」** 를 누르면 Claude가 수업별로 분류하고 교정합니다.

### 하루치 한 번에 돌리기
- **방법 1** 강의 파일 여러 개 또는 그날 폴더를 통째로 `KNUTS 전사.bat` 위에 끌어다 놓기
- **방법 2** 같은 폴더의 `입력` 폴더에 하루치를 넣고 `KNUTS 전사.bat`을 더블클릭 (처음 실행하면 `입력` 폴더가 자동으로 만들어집니다)

큐에 쌓아 한 파일씩 처리하고, 이미 만들어진 `.srt`는 건너뜁니다. 중간에 꺼져도 다시 실행하면 이어서 합니다. 진행 상황은 `전사기록.txt`에 남습니다.

### 설정 (`knuts-transcribe.ps1` 맨 위)
| 항목 | 기본값 | 설명 |
|---|---|---|
| `$Model` | `large-v3-turbo` | 느리면 `medium`, 더 정확하게는 `large-v3` |
| `$ChunkSeconds` | `3600` | 자르는 단위(초) |
| `$WhenDone` | `none` | 끝난 뒤 `sleep`(절전) 또는 `shutdown`(종료) |

`용어힌트.txt`는 그 과목에 자주 나오는 용어를 적어 두는 파일입니다. 전사할 때 Whisper에 함께 전달돼 용어 인식이 좋아집니다. 강의 파일과 같은 폴더에 `용어힌트.txt`를 두면 그 과목 것이 우선 적용됩니다. Whisper 힌트는 길면 효과가 없어서 300자까지만 씁니다.

### 전사 뒤
`.srt`를 Claude 채팅에 올리고 "○○과목으로 정리해 줘"라고 하면, 강의 슬라이드·필기본을 근거로 의학 용어를 교정하고 요약·중요 내용을 만들어 저장합니다.
