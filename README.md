# รายการที่ต้องทำ | To-Do List

A modern, feature-rich Progressive Web App (PWA) for managing your daily tasks with Thai language support.

## ✨ Features

- 📝 **Task Management** - Create, edit, and delete tasks with ease
- 🔊 **Text-to-Speech** - Listen to your tasks read aloud in Thai
- 🌓 **Dark Mode** - Comfortable viewing in any lighting condition
- 📱 **PWA Support** - Install on your device and use offline
- 💾 **Local Storage** - Your tasks are saved automatically
- 🎨 **Beautiful UI** - Modern design with smooth animations
- 🌏 **Thai Language** - Full support for Thai language and fonts

## 🚀 Quick Start

### Online Access

Simply open `index.html` in your web browser to start using the app.

### Install as PWA

1. Open the app in your browser
2. Look for the "Install" prompt or use browser menu
3. Click "Install" to add to your home screen
4. Launch the app like a native application

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS v3
- **Fonts**: IBM Plex Sans Thai
- **PWA**: Service Worker with cache-first strategy
- **Storage**: LocalStorage API
- **Icons**: SVG-based inline icons

## 📦 Project Structure

```
todo/
├── index.html          # Main application file
├── manifest.json       # PWA manifest configuration
├── service-worker.js   # Service worker for offline functionality
├── browserconfig.xml   # Browser configuration for Windows tiles
└── README.md          # This file
```

## 🔧 Configuration

### Manifest Settings

- **Name**: รายการที่ต้องทำ - To-Do List
- **Short Name**: To-Do List
- **Theme Color**: #4f46e5 (Indigo)
- **Background Color**: #0f172a (Slate)
- **Display Mode**: Standalone

### Cache Strategy

The service worker uses a cache-first strategy for optimal offline performance:
- All static assets are cached on installation
- Old caches are automatically cleaned up
- Fallback to network when cache fails

## 🌐 Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Safari (iOS/macOS)
- ✅ Firefox
- ✅ Opera

## 📱 Mobile Support

Fully responsive design optimized for:
- 📱 Mobile phones (iOS & Android)
- 📱 Tablets
- 💻 Desktop computers

## 🎨 Features in Detail

### Task Management
- Add new tasks with a single click
- Mark tasks as complete/incomplete
- Edit task text inline
- Delete tasks with confirmation
- Persistent storage across sessions

### Dark Mode
- Toggle between light and dark themes
- Preferences saved automatically
- System theme detection

### Text-to-Speech
- Read all tasks aloud
- Thai language synthesis
- Adjustable speech settings

## 🔒 Privacy

- All data stored locally on your device
- No server communication
- No tracking or analytics
- Fully offline capable

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Development

To modify the application:

1. Edit `index.html` for UI and functionality changes
2. Update `manifest.json` for PWA settings
3. Modify `service-worker.js` for caching strategy
4. Update cache version when making changes

## 🐛 Known Issues

None currently reported. Please open an issue if you find any bugs.

## 📝 Version History

- **v2**: Current version with improved caching and UI
- **v1**: Initial release

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Contact

For questions or suggestions, please open an issue on the repository.

---

Made with ❤️ for productivity
