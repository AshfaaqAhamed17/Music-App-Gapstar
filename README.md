# Music App - Gapstar

A modern music streaming application built with React 19, TypeScript, and Chakra UI. Browse artists, albums, manage favorites, and enjoy a seamless music experience with a beautiful dark-themed interface.

## 🎵 Overview

This music application provides an intuitive interface for discovering and organizing music. Built with modern web technologies, it features lazy-loaded routes for optimal performance, real-time search capabilities, and a responsive design that works across all devices.

## ✨ Features

- 🎨 **Dark Mode UI** - Beautiful dark theme with **Chakra UI** components
- 🎤 **Artist Management** - Browse all artists and view detailed artist pages
- 💿 **Album Catalog** - Explore albums with detailed track listings
- ⭐ **Favorites System** - Save and manage your favorite tracks and albums
- 🔍 **Advanced Search** - Quick search functionality across artists and albums
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- ⚡ **Performance Optimized** - Lazy loading routes and React Query caching
- 🎯 **Type-Safe** - Built entirely with TypeScript for reliability
- ✅ **Tested** - Comprehensive test coverage with Vitest

## 🛠️ Technologies Used

### Core Stack

- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite 7.2** - Lightning-fast build tool and dev server
- **React Router v7.9** - Client-side routing with lazy loading
- **Chakra UI v3.29** - Component library with accessible UI primitives

### State & Data Management

- **TanStack Query v5.90** - Server state management with caching
- **Zustand 5.0** - Lightweight state management
- **Axios 1.13** - HTTP client for API requests

### Testing

- **Vitest 4.2** - Fast unit test framework powered by Vite
- **Testing Library (React)** - React component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for Node.js

### Development Tools

- **ESLint 9** - Code linting with TypeScript support
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite TSConfig Paths** - Path mapping support

### UI & Styling

- **Chakra UI** - Component library
- **Lucide React** - Modern icon library
- **React Icons** - Additional icon sets
- **Recharts 3.4** - Data visualization charts
- **Next Themes** - Theme management
- **Emotion** - CSS-in-JS styling

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** v18.x or higher - [Download](https://nodejs.org/)
- **pnpm** v8.x or higher - [Install](https://pnpm.io/installation)
- **Git** - [Download](https://git-scm.com/)
- A modern browser (Chrome, Firefox, Safari, or Edge - latest version)

### Recommended

- **VS Code** with extensions:
  - ESLint
  - TypeScript and JavaScript Language Features
  - Prettier (optional)

### Installing pnpm

If you don't have pnpm installed:

```bash
# Using npm
npm install -g pnpm

# Or using npm (npx)
npx pnpm install -g pnpm

# Verify installation
pnpm --version
```

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AshfaaqAhamed17/Music-App-Gapstar

   cd music-app-gapstar
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup** (if needed)

   Create a `.env` file in the root directory if you need to configure API endpoints:

   ```env
   VITE_API_BASE_URL=your_api_url_here
   ```

## 💻 Running Locally

### Development Mode

Start the development server with hot module replacement:

```bash
pnpm dev
```

The application will be available at **`http://localhost:5173`**

### Production Build

Create an optimized production build:

```bash
pnpm build
```

This will:

1. Run TypeScript compiler checks
2. Build optimized bundles in the `dist/` directory

### Preview Production Build

Test the production build locally:

```bash
pnpm preview
```

### Code Quality

Run linting to check code quality:

```bash
pnpm lint
```

Auto-fix linting issues:

```bash
pnpm lint:fix
```

## 🧪 Testing

This project uses **Vitest** for fast, modern unit testing with native TypeScript support.

### Running Tests

**Run all tests once:**

```bash
pnpm test
```

**Watch mode (recommended for development):**

```bash
pnpm test:watch
```

Tests will automatically re-run when files change.

**Run tests with UI:**

```bash
pnpm test:ui
```

Opens Vitest UI in your browser for interactive test exploration.

**Run specific test file:**

```bash
pnpm test src/components/common/album-tile.test.tsx
```

Or use the watch mode filter:

```bash
pnpm test:watch
# Then press 'p' and type the filename
```

### Test Coverage

**Generate coverage report:**

```bash
pnpm test:coverage
```

This creates a detailed coverage report in the `coverage/` directory.

**View coverage in browser:**

```bash
pnpm test:coverage
# Then open coverage/index.html in your browser
```

**CI/CD testing:**

```bash
pnpm test:ci
```

Runs tests once with coverage, suitable for continuous integration.

### Test Structure

Tests are located alongside their source files with `.test.tsx` or `.test.ts` extensions:

```
src/
├── components/
│   └── common/
│       ├── album-tile.tsx
│       ├── album-tile.test.tsx       # Component tests
│       ├── album-listing.tsx
│       └── album-listing.test.tsx
├── App.tsx
└── App.test.tsx                      # App tests
```

### Writing Tests

Example test structure:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import YourComponent from "./your-component";

// Mock dependencies
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("YourComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <YourComponent />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("handles user interaction", () => {
    const mockFn = vi.fn();
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <YourComponent onClick={mockFn} />
        </MemoryRouter>
      </ChakraProvider>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### Test Coverage Goals

Current test coverage:

- **Components**: All common components tested
- **User Interactions**: Click, navigation, form submissions
- **State Management**: Favorites store operations
- **Edge Cases**: Empty states, error handling

### Continuous Integration

Tests run automatically on:

- Pull requests
- Commits to main branch
- Pre-commit hooks (if configured)

## 📁 Project Structure

```
music-app-gapstar/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable components
│   │   │   ├── album-tile.tsx
│   │   │   ├── album-tile.test.tsx
│   │   │   ├── album-listing.tsx
│   │   │   ├── album-listing.test.tsx
│   │   │   ├── artist-tile.tsx
│   │   │   ├── artist-tile.test.tsx
│   │   │   ├── artist-listing.tsx
│   │   │   ├── artist-listing.test.tsx
│   │   │   ├── details-header.tsx
│   │   │   ├── details-header.test.tsx
│   │   │   ├── loader.tsx
│   │   │   ├── loader.test.tsx
│   │   │   ├── songs-listing.tsx
│   │   │   ├── songs-listing.test.tsx
│   │   │   ├── songs-listing-for-search.tsx
│   │   │   └── songs-listing-for-search.test.tsx
│   │   ├── ui/                  # Chakra UI wrapper components
│   │   │   ├── color-mode.tsx
│   │   │   ├── provider.tsx
│   │   │   └── toaster.tsx
│   │   └── root-layout.tsx      # Main layout wrapper
│   ├── pages/
│   │   ├── home.tsx             # Home page
│   │   ├── artist/
│   │   │   ├── page.tsx         # All artists listing
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Artist detail page
│   │   ├── album/
│   │   │   ├── page.tsx         # All albums listing
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Album detail page
│   │   ├── favourites/
│   │   │   └── page.tsx         # Favorites page
│   │   └── search.tsx           # Search page
│   ├── router/
│   │   └── index.tsx            # Route configuration
│   ├── store/
│   │   └── favorites-store.ts   # Zustand state management
│   ├── types/
│   │   ├── album.ts             # Album type definitions
│   │   ├── artist.ts            # Artist type definitions
│   │   └── artist-details.ts   # Artist details types
│   ├── utils/
│   │   └── text-formatter.ts   # Utility functions
│   ├── styles/
│   │   └── index.ts             # Chakra UI theme system
│   ├── App.tsx                  # Root App component
│   ├── App.test.tsx             # App tests
│   └── main.tsx                 # Application entry point
├── coverage/                    # Test coverage reports (generated)
├── public/                      # Static assets
├── dist/                        # Production build output
├── .env                         # Environment variables
├── eslint.config.js             # ESLint configuration
├── vitest.config.ts             # Vitest configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App TypeScript config
├── tsconfig.node.json           # Node TypeScript config
├── vite.config.ts               # Vite configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🗺️ Application Routes

| Route                 | Component    | Description                          |
| --------------------- | ------------ | ------------------------------------ |
| `/`                   | Home         | Landing page with featured content   |
| `/artist`             | AllArtists   | Browse all artists                   |
| `/artist/:name`       | ArtistDetail | Individual artist details            |
| `/album`              | AllAlbums    | Browse all albums                    |
| `/album/:name/:album` | AlbumDetail  | Individual album details with tracks |
| `/favourites`         | Favourites   | User's saved favorites               |
| `/search`             | SearchPage   | Search across artists and albums     |

## 🎨 Features in Detail

### Lazy Loading

All pages are lazy-loaded using React's `lazy()` and `Suspense` for optimal performance. A loading spinner is displayed during page transitions.

### React Query Caching

- **Stale Time**: 5 minutes - Data is considered fresh for 5 minutes
- **Cache Time**: 10 minutes - Cached data is kept for 10 minutes
- **Retry**: 1 attempt on failure
- **Refetch on Focus**: Disabled for better UX

### Dark Mode

The application runs in dark mode by default, configured through Chakra UI's ColorModeProvider and set on app mount.

### TypeScript Configuration

Strict type checking enabled with project references for app and node configurations.

### ESLint Rules

- Kebab-case file naming convention enforced
- Unused variables allowed with `_` prefix
- React Hooks rules enforced
- TypeScript best practices

## 🔧 Configuration Files

### Vite Configuration

- React plugin enabled
- TypeScript path mapping support
- Ngrok tunnel allowed for remote testing

### TypeScript

- Strict mode enabled
- Project references for better build performance
- Separate configs for app code and build tools

### ESLint

- TypeScript support
- React Hooks linting
- File naming conventions
- Automatic code quality checks

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or change port in vite.config.ts
server: {
  port: 3000
}
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

```bash
# Check for TypeScript errors
pnpm build

# This runs: tsc -b
```

### Build Fails

```bash
# Clear Vite cache
rm -rf node_modules/.vite
pnpm dev
```

### pnpm Store Issues

```bash
# Clear pnpm cache
pnpm store prune

# Or remove and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Test Failures

```bash
# Clear test cache
pnpm test --clearCache

# Run tests with more verbose output
pnpm test --reporter=verbose

# Run specific failing test
pnpm test path/to/failing-test.test.tsx
```

### Coverage Issues

```bash
# Clear coverage directory
rm -rf coverage

# Regenerate coverage
pnpm test:coverage
```

## 📦 Available Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `pnpm dev`           | Start development server on port 5173              |
| `pnpm build`         | Build for production (runs TypeScript check first) |
| `pnpm preview`       | Preview production build locally                   |
| `pnpm lint`          | Check code with ESLint                             |
| `pnpm lint:fix`      | Auto-fix ESLint issues                             |
| `pnpm test`          | Run all tests once                                 |
| `pnpm test:watch`    | Run tests in watch mode (recommended)              |
| `pnpm test:ui`       | Run tests with interactive UI                      |
| `pnpm test:coverage` | Generate test coverage report                      |
| `pnpm test:ci`       | Run tests in CI mode with coverage                 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the kebab-case naming convention for files
4. Write tests for new features
5. Run linting and tests before committing
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new files
- Follow ESLint rules (run `pnpm lint:fix`)
- Use kebab-case for file names (e.g., `user-profile.tsx`)
- Write tests for all new components and functions
- Maintain test coverage above 80%
- Write meaningful commit messages
- Add tests for new features

### Testing Guidelines

- Write unit tests for all new components
- Test user interactions and edge cases
- Mock external dependencies
- Use Testing Library best practices
- Aim for at least 80% code coverage
- Run tests before submitting PR

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:

- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section above

---

Built using React 19, TypeScript, Chakra UI, Vitest, and pnpm
