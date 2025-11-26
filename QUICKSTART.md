# LOFIO - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Run on Your Device
Choose your platform:

**iOS (Mac only)**
```bash
npm run ios
```

**Android**
```bash
npm run android
```

**Web Browser**
```bash
npm run web
```

## 📱 Using the App

### Explore Tab
- Browse logo templates and community creations
- Filter by category (Tech, Food, Fashion, Abstract, Minimal)
- Pull down to refresh
- Tap any logo to view details

### Create Tab
1. Enter your logo text
2. Pick a color (black, gray, or white)
3. Select a template
4. Tap "✨ Generate with AI" for a random design
5. Tap "Export Logo" when ready
6. Choose format: SVG, PNG, or PDF
7. Share or save your creation

### Profile Tab
- View your creations
- Access settings
- Sign in to save and publish logos
- Continue as guest for full creation access

## 🔐 Authentication

**Guest Mode** (Default)
- Create and export logos
- Browse all content
- No sign-in required

**Signed In**
- All guest features
- Save creation history
- Publish to community
- Manage your logos

**Test Login**
- Email: any@email.com
- Password: any password (dummy validation)

## 🎨 Features

✅ Logo creation with templates
✅ Color customization
✅ AI generation (simulated)
✅ Export as SVG/PNG/PDF
✅ Browse community logos
✅ Category filtering
✅ Guest mode
✅ User authentication
✅ Creation history

## 🛠️ Development

**Project Structure**
```
app/          → Screens (tabs, auth, logo)
components/   → Reusable UI components
constants/    → Colors, typography, data
hooks/        → Custom React hooks
utils/        → Helper functions
types/        → TypeScript definitions
```

**Key Files**
- `app/(tabs)/_layout.tsx` - Tab navigation
- `app/(tabs)/index.tsx` - Explore screen
- `app/(tabs)/create.tsx` - Creation screen
- `app/(tabs)/profile.tsx` - Profile screen
- `components/ui/` - Reusable components
- `constants/dummyData.ts` - Sample data

## 📦 Dependencies

- **expo** - React Native framework
- **expo-router** - File-based routing
- **react-native-svg** - SVG support
- **expo-print** - PDF generation
- **react-native-view-shot** - PNG export
- **@react-native-async-storage/async-storage** - Local storage

## 🎯 Next Steps

1. **Test the app** - Try all features
2. **Customize** - Modify colors, add features
3. **Backend** - Connect to your API
4. **AI Integration** - Add real AI generation
5. **Deploy** - Build for production

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)

## 🐛 Troubleshooting

**App won't start?**
```bash
npm install
npx expo start --clear
```

**Build errors?**
```bash
rm -rf node_modules
npm install
```

**Can't export logos?**
- Make sure you're on a physical device or simulator
- Check file permissions

## 💡 Tips

- Use the Expo Go app for quick testing on your phone
- Scan the QR code from `npm start` to test on device
- Press `i` for iOS simulator, `a` for Android emulator
- Press `w` to open in web browser
- Press `r` to reload the app

## 🎉 You're Ready!

Start creating amazing logos with LOFIO!

For detailed documentation, see [README.md](README.md)
For setup details, see [SETUP_COMPLETE.md](SETUP_COMPLETE.md)

