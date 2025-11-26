# LOFIO - AI Logo Creation Mobile App

A minimalistic black and white mobile application for creating stunning logos with AI assistance.

## Features

- 🎨 **Logo Creation**: Create custom logos with templates and customization tools
- 🤖 **AI Generation**: Generate logos using AI (placeholder for future integration)
- 📱 **Export Options**: Export logos in SVG, PNG, and PDF formats
- 🔍 **Explore**: Browse and discover logos created by the community
- 👤 **User Profiles**: Save and manage your logo creations
- 🔐 **Optional Authentication**: Use as guest or sign in to publish creations

## Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Storage**: AsyncStorage
- **UI/UX**: Custom minimalistic black & white design system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rinorhatashi/lofio-app.git
cd lofio-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
npm run ios     # Run on iOS simulator
npm run android # Run on Android emulator
npm run web     # Run in web browser
```

## Project Structure

```
/app
  /(tabs)          # Bottom tab navigation screens
  /auth            # Login/Signup screens
  /logo            # Logo creation/editing screens
/components
  /ui              # Reusable UI components
  /logo            # Logo-specific components
/constants         # Colors, themes, dummy data
/hooks             # Custom React hooks
/types             # TypeScript types
/utils             # Helper functions (export, auth)
```

## Design System

### Colors
- Primary: Black (#000000)
- Secondary: White (#FFFFFF)
- Grays: Various shades for UI elements
- Minimalistic approach with subtle shadows

### Typography
- Font sizes: 12px to 48px
- Weights: Regular, Medium, Semibold, Bold
- Clean, readable fonts

## Current Status

✅ Project setup and configuration
✅ Navigation structure (tabs + stack)
✅ Design system and UI components
✅ Authentication screens (Login/Signup)
✅ Explore/Home page with logo grid
✅ Logo creation interface
✅ Export functionality (SVG, PNG, PDF)
✅ Profile page with creation history

## Future Enhancements

- 🔄 Backend API integration
- 🤖 Real AI logo generation
- 🎨 Advanced customization tools
- 💾 Cloud storage for logos
- 🌐 Social features (likes, comments, sharing)
- 🎯 Premium templates and features
- 🔔 Push notifications
- 🌙 Dark mode support

## Contributing

This is a personal project. If you'd like to contribute, please fork the repository and submit a pull request.

## License

MIT License - feel free to use this project for learning purposes.

## Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using Expo and React Native

