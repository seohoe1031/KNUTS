# KNUTS 강의 전사 (Windows, 무료 · 오프라인)
# 녹화본(mp4)이나 음성(mp3·m4a·wav)을 받아
#   1) 1시간 단위 MP3로 자르고
#   2) Faster-Whisper-XXL로 한국어 + 의학 용어 힌트를 넣어 전사해
#   3) 같은 폴더의 "<파일이름>_KNUTS" 폴더에 .srt를 저장합니다.
# 사용: "KNUTS 전사.bat" 위에 파일을 끌어다 놓기 (여러 개 가능)

param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Files)

# ───── 설정 (필요하면 여기만 고치세요) ─────
$Model   = "large-v3-turbo"   # 느리면 "medium", 더 정확하게는 "large-v3"
$Device  = "cpu"              # LG 그램(Intel Iris Xe)은 cpu
$Compute = "int8"
$ChunkSeconds = 3600          # 1시간
$Prompt  = "의과대학 강의. 한국어 설명에 영어 의학 용어와 약어가 섞여 있음. Streptococcus pneumoniae, Staphylococcus aureus, β-lactam, macrolide, fluoroquinolone, CURB-65, BUN, creatinine, mg/dL, mmHg, PaO2/FiO2, pathophysiology, diagnosis."
# ────────────────────────────────────────

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$here = $PSScriptRoot

function Find-Tool($names) {
  foreach ($n in $names) {
    foreach ($dir in @("$here\Faster-Whisper-XXL", $here, "$here\ffmpeg\bin")) {
      $p = Join-Path $dir $n
      if (Test-Path $p) { return $p }
    }
    $c = Get-Command $n -ErrorAction SilentlyContinue
    if ($c) { return $c.Source }
  }
  return $null
}
$whisper = Find-Tool @("faster-whisper-xxl.exe")
$ffmpeg  = Find-Tool @("ffmpeg.exe")
$ffprobe = Find-Tool @("ffprobe.exe")
if (-not $whisper) { Write-Host "[오류] faster-whisper-xxl.exe를 찾지 못했어요. 이 스크립트 옆 'Faster-Whisper-XXL' 폴더에 압축을 풀어 주세요." -ForegroundColor Red; Read-Host "엔터를 누르면 닫혀요"; exit 1 }
if (-not $ffmpeg)  { Write-Host "[오류] ffmpeg.exe를 찾지 못했어요. ffmpeg.exe를 이 스크립트와 같은 폴더에 넣어 주세요." -ForegroundColor Red; Read-Host "엔터를 누르면 닫혀요"; exit 1 }
if (-not $Files -or $Files.Count -eq 0) { Write-Host "전사할 파일을 'KNUTS 전사.bat' 위에 끌어다 놓아 주세요."; Read-Host "엔터를 누르면 닫혀요"; exit 0 }

# 작업 중 노트북이 잠자기로 빠지지 않게 (관리자 권한 불필요)
Add-Type -Namespace KNUTS -Name Power -MemberDefinition '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint f);'
[KNUTS.Power]::SetThreadExecutionState([uint32]2147483649) | Out-Null   # ES_CONTINUOUS | ES_SYSTEM_REQUIRED

function Get-Duration($f) {
  if ($ffprobe) {
    $d = & $ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f" 2>$null
    if ($d) { return [double]$d }
  }
  return 0
}

$startAll = Get-Date
foreach ($f in $Files) {
  if (-not (Test-Path $f)) { continue }
  $item = Get-Item $f
  $out = Join-Path $item.DirectoryName ($item.BaseName + "_KNUTS")
  New-Item -ItemType Directory -Force -Path $out | Out-Null
  Write-Host ""
  Write-Host "■ $($item.Name)" -ForegroundColor Cyan

  # 1) 1시간 단위 MP3 (모노 16kHz · 64kbps: 음성 인식에 충분하고 용량이 작음)
  $parts = @(Get-ChildItem -Path $out -Filter ($item.BaseName + "_part*.mp3") -ErrorAction SilentlyContinue)
  if ($parts.Count -eq 0) {
    Write-Host "  MP3로 자르는 중…"
    $pattern = Join-Path $out ($item.BaseName + "_part%02d.mp3")
    & $ffmpeg -hide_banner -loglevel error -y -i "$($item.FullName)" -vn -ac 1 -ar 16000 -b:a 64k -f segment -segment_time $ChunkSeconds -reset_timestamps 1 "$pattern"
    $parts = @(Get-ChildItem -Path $out -Filter ($item.BaseName + "_part*.mp3") | Sort-Object Name)
  }
  Write-Host "  조각 $($parts.Count)개"

  # 2) 조각마다 전사 (이미 .srt가 있으면 건너뜀 → 중간에 꺼져도 이어서 가능)
  $i = 0
  foreach ($p in ($parts | Sort-Object Name)) {
    $i++
    $srt = Join-Path $out ($p.BaseName + ".srt")
    if (Test-Path $srt) { Write-Host "  [$i/$($parts.Count)] 이미 있음: $($p.BaseName).srt"; continue }
    $t0 = Get-Date
    $mins = [math]::Round((Get-Duration $p.FullName) / 60)
    Write-Host "  [$i/$($parts.Count)] 전사 중 ($($mins)분 분량, 모델 $Model) — 처음 한 번은 모델을 내려받아요"
    & $whisper "$($p.FullName)" --language ko --model $Model --device $Device --compute_type $Compute --initial_prompt "$Prompt" --output_format srt --output_dir "$out" --beep_off
    if (Test-Path $srt) {
      $took = [math]::Round(((Get-Date) - $t0).TotalMinutes)
      Write-Host "  [$i/$($parts.Count)] 완료 ($($took)분 걸림) → $($p.BaseName).srt" -ForegroundColor Green
    } else {
      Write-Host "  [$i/$($parts.Count)] .srt가 만들어지지 않았어요. 위 오류 메시지를 확인해 주세요." -ForegroundColor Yellow
    }
  }
  Start-Process explorer.exe $out
}

[KNUTS.Power]::SetThreadExecutionState([uint32]2147483648) | Out-Null
Write-Host ""
Write-Host "모두 끝났어요. 총 $([math]::Round(((Get-Date) - $startAll).TotalMinutes))분 걸렸어요." -ForegroundColor Green
Write-Host "각 폴더의 .srt 파일을 Claude 채팅에 올리고 '과목명으로 정리해 줘'라고 하면 됩니다."
Read-Host "엔터를 누르면 닫혀요"
