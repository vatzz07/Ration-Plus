# Quick Fix for "Could Not Connect to Server" Error

## Immediate Steps to Fix

### Step 1: Stop All Running Processes
Close any running Expo/Metro bundler instances:
- Press `Ctrl+C` in any terminal running `expo start` or `npm start`
- Close Expo Go app on your phone

### Step 2: Clean Everything
Run these commands in PowerShell:

```powershell
# Stop all Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Remove caches
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:TEMP\metro-* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:TEMP\haste-* -ErrorAction SilentlyContinue

# Clear npm cache
npm cache clean --force
```

### Step 3: Reinstall Dependencies
```powershell
npm install
```

### Step 4: Start with Tunnel Mode (Most Reliable)
```powershell
npx expo start --tunnel --clear
```

**Why Tunnel Mode?**
- Works even if your device and computer are on different networks
- Bypasses most firewall issues
- More reliable for connection problems

### Step 5: Alternative - LAN Mode (If Same Network)
```powershell
npx expo start --lan --clear
```

### Step 6: If Still Not Working - Try Different Port
```powershell
npx expo start --port 8082 --clear
```

## Common Causes & Solutions

### 1. Firewall Blocking Port 8081
**Solution:** 
- Windows Firewall: Allow Node.js through firewall
- Or use tunnel mode (bypasses firewall)

### 2. Device and Computer on Different Networks
**Solution:** 
- Use tunnel mode: `npx expo start --tunnel`
- Or connect both to same Wi-Fi

### 3. Expo Go App Outdated
**Solution:**
- Update Expo Go from App Store/Play Store
- Or uninstall and reinstall Expo Go

### 4. Antivirus Blocking Connection
**Solution:**
- Temporarily disable antivirus
- Add exception for Node.js and Expo

### 5. VPN Interfering
**Solution:**
- Disable VPN temporarily
- Or use tunnel mode

## Verify Installation

Check if everything is installed correctly:
```powershell
npm list expo --depth=0
# Should show: expo@51.0.x

node --version
# Should show: v18.x.x or higher
```

## Test Connection

1. Start Expo: `npx expo start --tunnel --clear`
2. Wait for QR code to appear
3. Open Expo Go app
4. Scan QR code
5. Wait for app to load

## Still Not Working?

Try these in order:

1. **Restart your computer** (clears all processes)
2. **Restart your phone** (clears app cache)
3. **Use web version**: `npx expo start --web` (test if app works at all)
4. **Check Expo Go version**: Must be compatible with Expo SDK 51
5. **Try on different device**: Rule out device-specific issues

## Emergency: Use Development Build

If Expo Go continues to fail, consider creating a development build:
```powershell
npx expo install expo-dev-client
npx expo run:android
# or
npx expo run:ios
```

This creates a standalone app that doesn't need Expo Go.

