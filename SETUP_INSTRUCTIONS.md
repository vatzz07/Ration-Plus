# Setup Instructions - Fixed App

## Issues Fixed

1. ✅ Updated Expo SDK from 49 to 54 (latest version)
2. ✅ Updated React Native from 0.72.6 to 0.81.5
3. ✅ Updated React from 18.2.0 to 19.1.0
4. ✅ Updated all Expo packages to match SDK 54
5. ✅ Updated React Navigation and other dependencies to latest compatible versions
6. ✅ Fixed i18next compatibility issues
7. ✅ Updated all dependencies to SDK 54 compatible versions

## Installation Steps

### Step 1: Clean Install Dependencies

**Windows PowerShell:**
```powershell
# Navigate to project directory
cd C:\Users\Srivatsan\Documents\GRAVITOHACKS

# Remove old dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Clear npm cache
npm cache clean --force

# Install fresh dependencies
npm install
```

**Alternative (Command Prompt):**
```cmd
cd C:\Users\Srivatsan\Documents\GRAVITOHACKS
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
```

### Step 2: Clear Expo Cache

```powershell
# Clear Expo cache
npx expo start --clear
```

Or if you have Expo CLI installed globally:
```powershell
expo start --clear
```

### Step 3: Update Expo CLI (if needed)

```powershell
npm install -g @expo/cli@latest
```

### Step 4: Start the App

```powershell
npm start
```

Then:
- Scan QR code with Expo Go app (Android) or Camera app (iOS)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

## Troubleshooting

### If you still see "Could not connect to server" error:

1. **Check Network Connection:**
   - Ensure your device and computer are on the same Wi-Fi network
   - Try disabling VPN if active
   - Check firewall settings

2. **Restart Metro Bundler:**
   - Press `r` in the terminal to reload
   - Or stop (Ctrl+C) and restart with `npm start -- --reset-cache`

3. **Check Expo Go App:**
   - Update Expo Go app to latest version from App Store/Play Store
   - Uninstall and reinstall Expo Go if needed

4. **Try Tunnel Mode:**
   ```powershell
   npx expo start --tunnel
   ```

5. **Check Port 8081:**
   - Ensure port 8081 is not blocked by firewall
   - Try: `npx expo start --port 8082`

6. **Full Reset:**
   ```powershell
   # Delete all caches
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   npm cache clean --force
   npx expo start --clear
   ```

## What Changed

### Package Updates:
- `expo`: ~49.0.0 → ~54.0.0
- `react`: 18.2.0 → 19.1.0
- `react-native`: 0.72.6 → 0.81.5
- All Expo packages updated to SDK 54 compatible versions
- React Navigation updated to latest stable
- All dependencies updated to SDK 54 compatible versions

### Code Changes:
- Updated i18n.js to use modern i18next API (removed callback pattern)
- Updated compatibilityJSON from v3 to v4

## Verification

After installation, verify:
1. No errors in terminal when running `npm start`
2. App loads in Expo Go without connection errors
3. All screens navigate properly
4. No console errors in Metro bundler

## Need Help?

If issues persist:
1. Check Expo documentation: https://docs.expo.dev/
2. Check React Native troubleshooting: https://reactnative.dev/docs/troubleshooting
3. Ensure Node.js version is 18+ (check with `node --version`)

