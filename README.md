# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# Yo Anime

A modern React application for searching and browsing anime using the Jikan API.

## Project Overview

Yo Anime is a feature-rich React application that allows users to discover, search, and explore anime content. The app utilizes the Jikan API (https://api.jikan.moe/v4) to fetch anime data, providing users with a seamless experience for finding their favorite shows and discovering new ones.

## Features

- Instant search functionality with debouncing (250ms) to limit API calls
- Paginated search results with an elegant UI
- Detailed anime information pages including synopsis, score, rank, genres, etc.
- Anime recommendations based on selected title
- Top anime browsing capability
- "Welcome Clickbait" feature that allows users to like/dislike anime to personalize their experience
- User preferences saved to localStorage
- Responsive design optimized for both desktop and mobile devices
- Internationalization support with English and Japanese languages
- Rate-limiting handling with exponential backoff for API requests

## Tech Stack

- React 19
- TypeScript
- Zustand for state management
- Material UI 7 for UI components
- React Router v7 for navigation
- Axios for API requests
- Framer Motion for animations
- i18next for internationalization
- TailwindCSS for utility-first styling
- Jest for testing

## Project Structure

```
src/
│
├── assets/             # Static assets like images, fonts, etc.
│
├── components/         # Reusable UI components
│   ├── AnimeCard       # Card component for displaying anime
│   ├── LoadingOverlay  # Loading indicator overlay
│   └── ...
│
├── contexts/           # React contexts
│   └── LoadingContext  # Context for managing loading states
│
├── hooks/              # Custom React hooks
│
├── i18n/               # Internationalization configuration
│
├── interfaces/         # TypeScript type definitions
│
├── layouts/            # Layout components
│
├── lib/                # Library code and utilities
│
├── pages/              # Page components
│   ├── SearchPage      # Home page with search functionality
│   └── AnimeDetailPage # Detailed info about a specific anime
│
├── services/           # API services
│   └── animeService    # Service for fetching anime data from the API
│
├── store/              # State management
│   └── animeStore      # Zustand store for anime data
│
└── utils/              # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Visit `http://localhost:5173` in your browser

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally
- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reports
- npm test -- src/**tests**/components/SearchHeader.test.tsx (UNIT TEST FOR SEARCHBAR)
