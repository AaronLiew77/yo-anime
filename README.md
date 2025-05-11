# React + TypeScript + Vite

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
