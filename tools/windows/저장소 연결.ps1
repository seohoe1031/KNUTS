# KNUTS 저장소 연결 (한 번만 실행)
# 전사본을 GitHub에 자동으로 올릴 수 있게, 저장소의 "올리기/전사본" 부분만 아주 작게 내려받습니다.
# 전체 저장소는 13GB지만 이 방식은 1MB도 안 됩니다.

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$here = $PSScriptRoot
$dest = Join-Path $here "전사본저장소"
$url  = "https://github.com/seohoe1031/Classification-of-Past-Exam.git"

function HasGit { return [bool](Get-Command git -ErrorAction SilentlyContinue) }
function RefreshPath {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
              [System.Environment]::GetEnvironmentVariable("Path", "User")
}

Write-Host ""
Write-Host "■ 1단계 — git 확인" -ForegroundColor Cyan
if (-not (HasGit)) {
  Write-Host "  git이 없어서 설치합니다. 권한을 묻는 창이 뜨면 '예'를 눌러 주세요. (3~5분)"
  winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
  RefreshPath
  if (-not (HasGit)) {
    Write-Host "  설치는 됐지만 이 창에서는 아직 인식되지 않아요." -ForegroundColor Yellow
    Write-Host "  이 창을 닫고 '저장소 연결.bat'을 한 번만 더 실행해 주세요." -ForegroundColor Yellow
    Read-Host "엔터를 누르면 닫혀요"; exit 0
  }
}
Write-Host ("  git 준비됨 — " + (git --version)) -ForegroundColor Green

Write-Host ""
Write-Host "■ 2단계 — 저장소 연결" -ForegroundColor Cyan
if (Test-Path -LiteralPath (Join-Path $dest ".git")) {
  Write-Host "  이미 연결돼 있어요. 최신 상태로 맞춥니다…"
  & git -C "$dest" pull --rebase 2>&1 | Out-Null
} else {
  Write-Host "  필요한 부분만 내려받는 중… (처음 한 번, 1분 이내)"
  & git clone --filter=blob:none --no-checkout --depth 1 "$url" "$dest"
  if (-not (Test-Path -LiteralPath (Join-Path $dest ".git"))) {
    Write-Host "  내려받기에 실패했어요. 인터넷 연결을 확인하고 다시 실행해 주세요." -ForegroundColor Red
    Read-Host "엔터를 누르면 닫혀요"; exit 1
  }
  & git -C "$dest" sparse-checkout set "올리기/전사본"
  & git -C "$dest" checkout main
}
$out = Join-Path $dest "올리기\전사본"
if (-not (Test-Path -LiteralPath $out)) { New-Item -ItemType Directory -Force -Path $out | Out-Null }
Write-Host ("  결과 폴더: " + $out) -ForegroundColor Green

Write-Host ""
Write-Host "■ 3단계 — GitHub 로그인 확인" -ForegroundColor Cyan
Write-Host "  처음 올릴 때 브라우저가 열리면서 GitHub 로그인을 물어볼 수 있어요. 한 번만 하면 됩니다."
$name = (& git -C "$dest" config user.name)
if (-not $name) {
  & git -C "$dest" config user.name "seohoe1031"
  & git -C "$dest" config user.email "1031seohoe@users.noreply.github.com"
}

Write-Host ""
Write-Host "■ 끝났어요." -ForegroundColor Green
Write-Host "  이제 'KNUTS 전사.bat'으로 전사하면 .srt가 자동으로 GitHub에 올라갑니다."
Write-Host "  앱의 과목 화면에서 「내 Claude로 전사본 정리」를 누르면 정리가 시작돼요."
Read-Host "엔터를 누르면 닫혀요"
