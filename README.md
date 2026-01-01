# PDS Mobile App

A React Native mobile application for India's Public Distribution System (PDS) built with Expo.

## Features

- **Home Dashboard**: Live stock availability with commodity cards
- **Ration Tracker**: Monthly quota tracking and transaction history
- **Home Delivery**: Eligibility verification and delivery request (for eligible users)
- **Profile & Settings**: User information, language switcher, and preferences
- **Multi-language Support**: Tamil, English, and Hindi
- **Material Design**: Beautiful UI with smooth animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli@latest`)
- Expo Go app on your mobile device (for testing)

### Installation

**Important:** This app has been updated to use Expo SDK 54 and React Native 0.81.5. Follow these steps for a clean installation:

1. **Clean install dependencies:**
```bash
# Remove old dependencies
rm -rf node_modules package-lock.json  # Linux/Mac
# OR
rmdir /s /q node_modules & del package-lock.json  # Windows

# Clear npm cache
npm cache clean --force

# Install fresh dependencies
npm install
```

2. **Start the development server:**
```bash
npm start
# Or with cache clear:
npx expo start --clear
```

3. **Scan the QR code** with Expo Go app (Android) or Camera app (iOS)

**Note:** If you encounter "Could not connect to server" error, see [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed troubleshooting steps.

## Project Structure

```
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── i18n/            # Internationalization files
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Screen components
│   └── theme/           # Theme and styling
├── App.js               # Main app component
└── package.json         # Dependencies
```

## Technologies Used

- React Native (Expo)
- React Navigation
- React Native Paper
- React i18next
- React Native Reanimated
- Expo Haptics
- Date-fns

## License

MIT

