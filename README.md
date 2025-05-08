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

A React application for searching and browsing anime using the Jikan API.

## Project Overview

This is a React-based application that allows users to search for anime titles and view detailed information about each anime. The app uses the Jikan API (https://docs.api.jikan.moe/) to fetch anime data.

## Features

- Search for anime with instant search (debounced to limit API calls)
- Paginated search results
- Detailed anime information including synopsis, score, rank, etc.
- Responsive design for both desktop and mobile devices

## Project Structure

```
src/
│
├── assets/             # Static assets like images, fonts, etc.
│   └── styles/         # Global styles
│
├── components/         # Reusable components
│   ├── AnimeCard.tsx   # Card component for displaying anime in the search results
│   ├── AnimeList.tsx   # Component to display a grid of anime cards
│   └── Header.tsx      # App header component
│
├── hooks/              # Custom React hooks
│   └── useDebounce.ts  # Hook for debouncing search input
│
├── layouts/            # Layout components
│   └── MainLayout.tsx  # Main application layout with header and content area
│
├── pages/              # Page components
│   ├── SearchPage.tsx      # Home page with search functionality
│   └── AnimeDetailPage.tsx # Detailed info about a specific anime
│
├── services/           # API services
│   └── animeService.ts # Service for fetching anime data from the API
│
├── store/              # State management (Zustand)
│   └── animeStore.ts   # Global state for anime data
│
├── types/              # TypeScript type definitions
│   └── anime.ts        # Types for anime data
│
├── utils/              # Utility functions
│   └── helpers.ts      # Helper functions used across the app
│
├── App.tsx             # Main App component with routing
└── main.tsx            # Entry point of the application
```

## Technologies Used

- React 19
- TypeScript
- React Router for navigation
- Zustand for state management
- Material UI for UI components
- Axios for API calls

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Requirements

- Search page with instant search functionality (debounced by 250ms)
- Detail page for individual anime
- Pagination for search results
- Responsive design
