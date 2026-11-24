# KNUTS 강의 전사 v2 (Windows, 무료 · 오프라인)
# 하루치를 한 번에 돌릴 수 있습니다.
#   방법 1) 강의 파일 여러 개 또는 폴더를 "KNUTS 전사.bat" 위에 끌어다 놓기
#   방법 2) 이 폴더의 "입력" 폴더에 하루치를 넣고 "KNUTS 전사.bat"을 그냥 더블클릭
# 하는 일: 1시간 단위 MP3로 자르기 -> 한국어+용어 힌트로 전사 -> <파일이름>_KNUTS 폴더에 .srt 저장
# 이미 만들어진 .srt는 건너뛰므로, 중간에 꺼져도 다시 실행하면 이어서 합니다.

param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Items)

# ───── 설정 (필요하면 여기만 고치세요) ─────
$Model        = "large-v3-turbo"   # 느리면 "medium", 더 정확하게는 "large-v3"
$Device       = "cpu"              # LG 그램(Intel Iris Xe)은 cpu
$Compute      = "int8"
$ChunkSeconds = 3600               # 1시간
$WhenDone     = "none"             # 끝난 뒤: none(그대로) / sleep(절전) / shutdown(종료)
$DefaultPrompt = "의과대학 강의 녹음입니다. 한국어 설명에 영어 의학 용어가 섞여 있습니다. pathophysiology, diagnosis, antibiotics, RT-PCR, incubation period."
# ──────────────────────────────────────────

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$here = $PSScriptRoot
$log  = Join-Path $here "전사기록.txt"
$exts = @(".mp4", ".mkv", ".mov", ".avi", ".m4v", ".mp3", ".m4a", ".wav", ".flac", ".aac", ".webm", ".ogg")

function Say($msg, $color) {
  if ($color) { Write-Host $msg -ForegroundColor $color } else { Write-Host $msg }
  try { Add-Content -LiteralPath $log -Value ((Get-Date -Format "MM-dd HH:mm") + "  " + $msg) -Encoding UTF8 } catch { }
}
function Find-Tool($name) {
  foreach ($dir in @((Join-Path $here "Faster-Whisper-XXL"), $here, (Join-Path $here "ffmpeg\bin"))) {
    $p = Join-Path $dir $name
    if (Test-Path -LiteralPath $p) { return $p }
  }
  $c = Get-Command $name -ErrorAction SilentlyContinue
  if ($c) { return $c.Source }
  return $null
}
function Add-Media($path, $list) {
  if (Test-Path -LiteralPath $path -PathType Container) {
    $found = @(Get-ChildItem -LiteralPath $path -File -Recurse -ErrorAction SilentlyContinue)
    foreach ($f in $found) {
      if (($exts -contains $f.Extension.ToLower()) -and ($f.DirectoryName -notlike "*_KNUTS")) { [void]$list.Add($f.FullName) }
    }
  } elseif (Test-Path -LiteralPath $path -PathType Leaf) {
    $f = Get-Item -LiteralPath $path
    if ($exts -contains $f.Extension.ToLower()) { [void]$list.Add($f.FullName) }
  }
}
function Get-Duration($f) {
  if ($ffprobe) {
    $d = & $ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f" 2>$null
    if ($d) { return [double]$d }
  }
  return 0
}
function Get-Prompt($file) {
  $dir = Split-Path -LiteralPath $file -Parent
  foreach ($p in @((Join-Path $dir "용어힌트.txt"), (Join-Path $here "용어힌트.txt"))) {
    if (Test-Path -LiteralPath $p) {
      $t = (Get-Content -LiteralPath $p -Raw -Encoding UTF8) -replace "\s+", " "
      $t = $t.Trim()
      if ($t.Length -gt 0) {
        if ($t.Length -gt 300) { $t = $t.Substring(0, 300) }   # Whisper 힌트는 짧아야 효과가 있습니다
        return $t
      }
    }
  }
  return $DefaultPrompt
}
function Show-Span($sec) {
  $t = [TimeSpan]::FromSeconds([math]::Round($sec))
  if ($t.TotalHours -ge 1) { return ("{0}시간 {1}분" -f [int]$t.TotalHours, $t.Minutes) }
  return ("{0}분" -f [math]::Max(1, $t.Minutes))
}

$whisper = Find-Tool "faster-whisper-xxl.exe"
$ffmpeg  = Find-Tool "ffmpeg.exe"
$ffprobe = Find-Tool "ffprobe.exe"
if (-not $whisper) { Say "[오류] faster-whisper-xxl.exe를 찾지 못했어요. 이 스크립트 옆 'Faster-Whisper-XXL' 폴더에 압축을 풀어 주세요." Red; Read-Host "엔터를 누르면 닫혀요"; exit 1 }
if (-not $ffmpeg)  { Say "[오류] ffmpeg.exe를 찾지 못했어요. ffmpeg.exe를 이 스크립트와 같은 폴더에 넣어 주세요." Red; Read-Host "엔터를 누르면 닫혀요"; exit 1 }

# ── 처리할 파일 모으기 ──
$queue = New-Object System.Collections.ArrayList
if ($Items -and $Items.Count -gt 0) {
  foreach ($i in $Items) { Add-Media $i $queue }
} else {
  $inbox = Join-Path $here "입력"
  if (-not (Test-Path -LiteralPath $inbox)) { New-Item -ItemType Directory -Path $inbox | Out-Null }
  Add-Media $inbox $queue
  if ($queue.Count -eq 0) {
    Write-Host ""
    Write-Host "처리할 강의 파일이 없어요." -ForegroundColor Yellow
    Write-Host "  방법 1) 강의 파일이나 폴더를 'KNUTS 전사.bat' 위에 끌어다 놓으세요."
    Write-Host "  방법 2) 아래 '입력' 폴더에 하루치를 넣고 다시 더블클릭하세요."
    Write-Host "          $inbox"
    Start-Process explorer.exe $inbox
    Read-Host "엔터를 누르면 닫혀요"; exit 0
  }
}
$files = @($queue | Sort-Object -Unique)
if ($files.Count -eq 0) { Say "처리할 수 있는 음성·영상 파일이 없어요." Yellow; Read-Host "엔터를 누르면 닫혀요"; exit 0 }

# ── 전체 안내 ──
$totalSec = 0
foreach ($f in $files) { $totalSec += (Get-Duration $f) }
Write-Host ""
Say ("■ 전사 시작 — 파일 " + $files.Count + "개" + $(if ($totalSec -gt 0) { " · 녹음 길이 합계 " + (Show-Span $totalSec) } else { "" })) Cyan
if ($totalSec -gt 0) { Write-Host ("  예상 소요 시간: 약 " + (Show-Span ($totalSec / 1.1)) + " (이 노트북 기준, 녹음 길이와 비슷합니다)") -ForegroundColor DarkGray }
foreach ($f in $files) { Write-Host ("   - " + [System.IO.Path]::GetFileName($f)) -ForegroundColor DarkGray }
if ($WhenDone -ne "none") { Write-Host ("  끝난 뒤: " + $(if ($WhenDone -eq "sleep") { "절전 모드로 전환" } else { "컴퓨터 종료" })) -ForegroundColor DarkGray }
Write-Host ""

# 작업 중 노트북이 잠자기로 빠지지 않게 (관리자 권한 불필요)
Add-Type -Namespace KNUTS -Name Power -MemberDefinition '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint f);'
[void][KNUTS.Power]::SetThreadExecutionState([uint32]2147483649)   # ES_CONTINUOUS | ES_SYSTEM_REQUIRED

$startAll = Get-Date
$okCount = 0; $failCount = 0; $outDirs = New-Object System.Collections.ArrayList
$n = 0
foreach ($file in $files) {
  $n++
  $item = Get-Item -LiteralPath $file
  $out = Join-Path $item.DirectoryName ($item.BaseName + "_KNUTS")
  if (-not (Test-Path -LiteralPath $out)) { New-Item -ItemType Directory -Force -Path $out | Out-Null }
  Write-Host ""
  Say ("[파일 " + $n + "/" + $files.Count + "] " + $item.Name) Cyan

  # 1) 1시간 단위 MP3 (모노 16kHz 64kbps: 음성 인식에 충분하고 용량이 작음)
  $parts = @(Get-ChildItem -LiteralPath $out -Filter "*.mp3" -ErrorAction SilentlyContinue | Where-Object { $_.Name -like ($item.BaseName + "_part*") } | Sort-Object Name)
  if ($parts.Count -eq 0) {
    Write-Host "  MP3로 자르는 중…"
    $pattern = Join-Path $out ($item.BaseName + "_part%02d.mp3")
    & $ffmpeg -hide_banner -loglevel error -y -i "$($item.FullName)" -vn -ac 1 -ar 16000 -b:a 64k -f segment -segment_time $ChunkSeconds -reset_timestamps 1 "$pattern"
    $parts = @(Get-ChildItem -LiteralPath $out -Filter "*.mp3" -ErrorAction SilentlyContinue | Where-Object { $_.Name -like ($item.BaseName + "_part*") } | Sort-Object Name)
  }
  if ($parts.Count -eq 0) { Say "  [건너뜀] 음성을 추출하지 못했어요." Yellow; $failCount++; continue }

  $prompt = Get-Prompt $item.FullName
  $i = 0
  foreach ($p in $parts) {
    $i++
    $srt = Join-Path $out ($p.BaseName + ".srt")
    $tag = "  [" + $n + "/" + $files.Count + " · 조각 " + $i + "/" + $parts.Count + "]"
    if (Test-Path -LiteralPath $srt) { Write-Host ($tag + " 이미 있음 — 건너뜀") -ForegroundColor DarkGray; $okCount++; continue }
    $t0 = Get-Date
    $mins = [math]::Round((Get-Duration $p.FullName) / 60)
    Write-Host ($tag + " 전사 중 (" + $mins + "분 분량, 모델 " + $Model + ")")
    & $whisper "$($p.FullName)" --language ko --model $Model --device $Device --compute_type $Compute --initial_prompt "$prompt" --output_format srt --output_dir "$out" --beep_off
    if (Test-Path -LiteralPath $srt) {
      $took = [math]::Round(((Get-Date) - $t0).TotalMinutes)
      Say ($tag + " 완료 (" + $took + "분) -> " + $p.BaseName + ".srt") Green
      $okCount++
    } else {
      Say ($tag + " 실패 — .srt가 만들어지지 않았어요." ) Yellow
      $failCount++
    }
  }
  [void]$outDirs.Add($out)
}

[void][KNUTS.Power]::SetThreadExecutionState([uint32]2147483648)
$span = (Get-Date) - $startAll
Write-Host ""
Say ("■ 모두 끝났어요 — 성공 " + $okCount + "개, 실패 " + $failCount + "개, 총 " + (Show-Span $span.TotalSeconds) + " 걸렸어요.") Green
Write-Host "각 폴더의 .srt 파일을 Claude 채팅에 올리고 '과목명으로 정리해 줘'라고 하면 됩니다."
foreach ($d in $outDirs) { Write-Host ("  " + $d) -ForegroundColor DarkGray }
if ($outDirs.Count -gt 0 -and $outDirs.Count -le 3) { foreach ($d in $outDirs) { Start-Process explorer.exe $d } }
elseif ($outDirs.Count -gt 3) { Start-Process explorer.exe (Split-Path -LiteralPath $outDirs[0] -Parent) }

if ($WhenDone -eq "sleep" -or $WhenDone -eq "shutdown") {
  Write-Host ""
  Write-Host ("60초 뒤 " + $(if ($WhenDone -eq "sleep") { "절전 모드로 전환" } else { "컴퓨터를 종료" }) + "합니다. 취소하려면 이 창에서 Ctrl+C를 누르세요.") -ForegroundColor Yellow
  Start-Sleep -Seconds 60
  if ($WhenDone -eq "sleep") { Start-Process -FilePath "rundll32.exe" -ArgumentList "powrprof.dll,SetSuspendState 0,1,0" }
  else { Start-Process -FilePath "shutdown.exe" -ArgumentList "/s","/t","5" }
  exit 0
}
Read-Host "엔터를 누르면 닫혀요"
