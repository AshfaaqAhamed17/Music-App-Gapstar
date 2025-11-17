# Music App - Gapstar

A modern music streaming application built with React 19, TypeScript, and Chakra UI. Browse artists, albums, manage favorites, and enjoy a seamless music experience.

## ✨ Features

- 🎨 **Dark Mode UI** - Beautiful dark theme with Chakra UI
- 🎤 **Artist Management** - Browse artists and view detailed pages
- 💿 **Album Catalog** - Explore albums with track listings
- ⭐ **Favorites System** - Save and manage your favorite tracks
- 🔍 **Advanced Search** - Quick search across artists and albums
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Performance Optimized** - Lazy loading and React Query caching

## 🛠️ Technologies

- **React 19.2** & **TypeScript 5.9**
- **Vite 7.2** - Build tool and dev server
- **React Router v7.9** - Client-side routing
- **Chakra UI v3.29** - Component library
- **TanStack Query v5.90** - Server state management
- **Zustand 5.0** - State management
- **Axios 1.13** - HTTP client
- **Vitest 4.2** - Unit testing framework

## 📋 Prerequisites

- **Node.js** v18.x or higher
- **pnpm** v8.x or higher

```bash
# Install pnpm
npm install -g pnpm
```

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/AshfaaqAhamed17/Music-App-Gapstar
cd music-app-gapstar

# Install dependencies
pnpm install
```

## 💻 Running Locally

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Preview production
pnpm preview

# Run linting
pnpm lint
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Test coverage
pnpm test:coverage

# UI mode
pnpm test:ui
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   └── ui/               # Chakra UI wrappers
├── pages/                # Route pages
├── router/               # Route configuration
├── store/                # Zustand state
├── types/                # TypeScript types
├── utils/                # Utility functions
└── styles/               # Theme configuration
```

## 🗺️ Routes

| Route                 | Description               |
| --------------------- | ------------------------- |
| `/`                   | Home page                 |
| `/artist`             | All artists               |
| `/artist/:name`       | Artist details            |
| `/album`              | All albums                |
| `/album/:name/:album` | Album details with tracks |
| `/favourites`         | Saved favorites           |
| `/search`             | Search artists and albums |

## 📦 Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev`           | Start dev server         |
| `pnpm build`         | Build for production     |
| `pnpm preview`       | Preview production build |
| `pnpm lint`          | Check code with ESLint   |
| `pnpm test`          | Run tests                |
| `pnpm test:watch`    | Run tests in watch mode  |
| `pnpm test:coverage` | Generate coverage report |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Run linting and tests
5. Submit a Pull Request

## 📄 License

MIT License

---

Built with React 19, TypeScript, Chakra UI, and Vitest
