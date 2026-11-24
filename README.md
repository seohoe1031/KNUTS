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

1. [Faster-Whisper-XXL 릴리스](https://github.com/Purfview/whisper-standalone-win/releases/tag/Faster-Whisper-XXL)에서 Windows용 압축 파일을 받아, 이 폴더 안에 `Faster-Whisper-XXL` 폴더로 풉니다.
2. 그 폴더에 `ffmpeg.exe`가 없으면 [ffmpeg essentials](https://www.gyan.dev/ffmpeg/builds/)에서 받아 `ffmpeg.exe`, `ffprobe.exe`를 이 폴더에 넣습니다.
3. 강의 파일(mp4/mp3/m4a/wav)을 `KNUTS 전사.bat` 위에 끌어다 놓습니다. 결과는 원본 옆 `<파일이름>_KNUTS` 폴더에 생겨요.

모델·용어 힌트는 `knuts-transcribe.ps1` 맨 위 설정에서 바꿀 수 있어요. 중간에 꺼져도 다시 실행하면 끝난 조각은 건너뜁니다.
