# PDS Mobile App - Automatic Fix Script
# This script will clean and reinstall everything to fix connection issues

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PDS Mobile App - Fix Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop all Node processes
Write-Host "Step 1: Stopping all Node processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "✓ Node processes stopped" -ForegroundColor Green
Write-Host ""

# Step 2: Clean directories
Write-Host "Step 2: Cleaning cache and old files..." -ForegroundColor Yellow
if (Test-Path node_modules) {
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Write-Host "✓ Removed node_modules" -ForegroundColor Green
}
if (Test-Path package-lock.json) {
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
    Write-Host "✓ Removed package-lock.json" -ForegroundColor Green
}
if (Test-Path .expo) {
    Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
    Write-Host "✓ Removed .expo cache" -ForegroundColor Green
}
Write-Host ""

# Step 3: Clear npm cache
Write-Host "Step 3: Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force | Out-Null
Write-Host "✓ npm cache cleared" -ForegroundColor Green
Write-Host ""

# Step 4: Install dependencies
Write-Host "Step 4: Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 5: Verify installation
Write-Host "Step 5: Verifying installation..." -ForegroundColor Yellow
$expoVersion = npm list expo --depth=0 2>&1 | Select-String -Pattern "expo@" | ForEach-Object { $_.Line }
if ($expoVersion) {
    Write-Host "✓ $expoVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Expo not found" -ForegroundColor Red
}
Write-Host ""

# Step 6: Instructions
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start the app with: npx expo start --tunnel --clear" -ForegroundColor White
Write-Host "2. Open Expo Go app on your phone" -ForegroundColor White
Write-Host "3. Scan the QR code" -ForegroundColor White
Write-Host ""
Write-Host "If you still see connection errors:" -ForegroundColor Yellow
Write-Host "- Make sure your phone and computer are on the same Wi-Fi" -ForegroundColor White
Write-Host "- Or use tunnel mode (already included in command above)" -ForegroundColor White
Write-Host "- Update Expo Go app to latest version" -ForegroundColor White
Write-Host ""
Write-Host "For more help, see QUICK_FIX.md" -ForegroundColor Cyan
Write-Host ""

