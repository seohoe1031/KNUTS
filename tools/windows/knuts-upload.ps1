# KNUTS 전사본 GitHub 올리기
# 이 폴더에 만들어진 전사본(.srt)을 Classification-of-Past-Exam 저장소의
# "올리기/전사본" 으로 올립니다. 처음 실행하면 git 설치와 저장소 연결까지 알아서 합니다.
# 다른 폴더의 전사본도 올리려면 그 폴더를 이 파일 위에 끌어다 놓으세요.

param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Items)

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$here    = $PSScriptRoot
$repoDir = Join-Path $here "전사본저장소"
$url     = "https://github.com/seohoe1031/Classification-of-Past-Exam.git"
$skip    = @("전사본저장소", "입력", "Faster-Whisper-XXL", "ffmpeg")

function HasGit { return [bool](Get-Command git -ErrorAction SilentlyContinue) }
function RefreshPath {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
              [System.Environment]::GetEnvironmentVariable("Path", "User")
}

# ── 1. git ──
Write-Host ""
Write-Host "■ 1/4  git 확인" -ForegroundColor Cyan
if (-not (HasGit)) { RefreshPath }
if (-not (HasGit)) {
  Write-Host "  git이 없어서 설치합니다. 권한을 묻는 창이 뜨면 '예'를 눌러 주세요. (3~5분)"
  winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
  RefreshPath
  if (-not (HasGit)) {
    Write-Host "  설치는 됐지만 이 창에서는 아직 인식되지 않아요." -ForegroundColor Yellow
    Write-Host "  이 창을 닫고 'GitHub 올리기.bat'을 한 번만 더 실행해 주세요." -ForegroundColor Yellow
    Read-Host "엔터를 누르면 닫혀요"; exit 0
  }
}
Write-Host ("  " + (git --version)) -ForegroundColor Green

# ── 2. 저장소 연결 ──
Write-Host ""
Write-Host "■ 2/4  저장소 연결" -ForegroundColor Cyan
if (Test-Path -LiteralPath (Join-Path $repoDir ".git")) {
  Write-Host "  이미 연결돼 있어요. 최신 상태로 맞춥니다…"
  & git -C "$repoDir" pull --rebase 2>&1 | Out-Null
} else {
  Write-Host "  필요한 부분만 내려받는 중… (처음 한 번, 1분 이내)"
  & git clone --filter=blob:none --no-checkout --depth 1 "$url" "$repoDir" 2>&1 | Out-Null
  if (-not (Test-Path -LiteralPath (Join-Path $repoDir ".git"))) {
    Write-Host "  내려받기에 실패했어요. 인터넷 연결을 확인하고 다시 실행해 주세요." -ForegroundColor Red
    Read-Host "엔터를 누르면 닫혀요"; exit 1
  }
  & git -C "$repoDir" sparse-checkout set "올리기/전사본" 2>&1 | Out-Null
  & git -C "$repoDir" checkout main 2>&1 | Out-Null
  & git -C "$repoDir" config user.name "seohoe1031" 2>&1 | Out-Null
  & git -C "$repoDir" config user.email "1031seohoe@users.noreply.github.com" 2>&1 | Out-Null
}
$target = Join-Path $repoDir "올리기\전사본"
if (-not (Test-Path -LiteralPath $target)) { New-Item -ItemType Directory -Force -Path $target | Out-Null }
Write-Host "  연결됨" -ForegroundColor Green

# ── 3. 전사본 모으기 ──
Write-Host ""
Write-Host "■ 3/4  전사본 모으기" -ForegroundColor Cyan
$roots = New-Object System.Collections.ArrayList
[void]$roots.Add($here)
if ($Items) { foreach ($i in $Items) { if (Test-Path -LiteralPath $i -PathType Container) { [void]$roots.Add((Get-Item -LiteralPath $i).FullName) } } }

$copied = 0; $already = 0; $folders = New-Object System.Collections.ArrayList
foreach ($root in ($roots | Sort-Object -Unique)) {
  $dirs = @(Get-ChildItem -LiteralPath $root -Directory -ErrorAction SilentlyContinue |
            Where-Object { $skip -notcontains $_.Name })
  foreach ($d in $dirs) {
    $srts = @(Get-ChildItem -LiteralPath $d.FullName -Filter "*.srt" -ErrorAction SilentlyContinue)
    if ($srts.Count -eq 0) { continue }
    $dest = Join-Path $target $d.Name
    if (-not (Test-Path -LiteralPath $dest)) { New-Item -ItemType Directory -Force -Path $dest | Out-Null }
    $new = 0
    foreach ($f in $srts) {
      $to = Join-Path $dest $f.Name
      if ((Test-Path -LiteralPath $to) -and ((Get-Item -LiteralPath $to).Length -eq $f.Length)) { $already++; continue }
      Copy-Item -LiteralPath $f.FullName -Destination $to -Force
      $copied++; $new++
    }
    if ($new -gt 0) { Write-Host ("  + " + $d.Name + " (" + $new + "개)") -ForegroundColor Green; [void]$folders.Add($d.Name) }
  }
}
if ($copied -eq 0) {
  if ($already -gt 0) { Write-Host ("  새로 올릴 게 없어요. 이미 올라간 전사본 " + $already + "개를 확인했어요.") -ForegroundColor DarkGray }
  else {
    Write-Host "  올릴 전사본(.srt)을 찾지 못했어요." -ForegroundColor Yellow
    Write-Host "  'KNUTS 전사.bat'으로 먼저 전사하거나, 전사본이 든 폴더를 이 파일 위에 끌어다 놓아 주세요."
  }
}

# ── 4. 올리기 ──
Write-Host ""
Write-Host "■ 4/4  GitHub에 올리기" -ForegroundColor Cyan
if ($copied -eq 0) {
  Write-Host "  올릴 게 없어서 건너뜁니다." -ForegroundColor DarkGray
} else {
  Write-Host "  처음이면 브라우저가 열리며 GitHub 로그인을 물어볼 수 있어요. 한 번만 하면 됩니다."
  & git -C "$repoDir" add -A 2>&1 | Out-Null
  & git -C "$repoDir" commit -m ("전사본 추가 " + (Get-Date -Format "yyyy-MM-dd") + " — " + (($folders | Sort-Object -Unique) -join ", ")) 2>&1 | Out-Null
  & git -C "$repoDir" pull --rebase 2>&1 | Out-Null
  $out = (& git -C "$repoDir" push 2>&1) -join " "
  if ($LASTEXITCODE -eq 0) {
    Write-Host ("  올리기 완료 — 전사본 " + $copied + "개") -ForegroundColor Green
    Write-Host ""
    Write-Host "  다음: 앱의 '인체감염학' 화면에서 「내 Claude로 전사본 정리」를 누르세요."
    Write-Host "  https://github.com/seohoe1031/Classification-of-Past-Exam/tree/main/%EC%98%AC%EB%A6%AC%EA%B8%B0/%EC%A0%84%EC%82%AC%EB%B3%B8"
  } else {
    Write-Host ("  올리기 실패 — " + $out) -ForegroundColor Yellow
    Write-Host "  인터넷이나 GitHub 로그인을 확인하고 다시 실행해 주세요. 복사해 둔 파일은 그대로 있어요."
  }
}
Write-Host ""
Read-Host "엔터를 누르면 닫혀요"
