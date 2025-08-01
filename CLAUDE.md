
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
## 重要规则 / Important Rules

**语言要求**: 在此仓库中工作时，请使用中文回答所有问题和交流。

**Language Requirement**: When working in this repository, please use Chinese for all answers and communication.

## Repository Overview

ReadBridge is an AI-powered reading assistant for language learning, built with Next.js (frontend) and Tauri (desktop app). It implements the "n+1" comprehensible input approach, helping learners engage with content in their target language through AI-assisted reading.

## Development Commands

### Web Development
```bash
# Development
npm run dev          # Start Next.js dev server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Desktop Development (Tauri)
```bash
# Prerequisites: Install Tauri v2 dependencies
npm run tauri dev    # Start Tauri development mode
npm run tauri build  # Build desktop application
```

### Testing
```bash
npm run lint         # Code linting with ESLint
# Note: No explicit test commands found in package.json
```

## Architecture Overview

### Core Technology Stack
- **Frontend**: Next.js 14.2.24 with React 18, TypeScript
- **Desktop**: Tauri 2.5.0 with Rust backend
- **UI Framework**: Ant Design 5.24.0 with Tailwind CSS
- **State Management**: Zustand 5.0.3 with persistence
- **Database**: Dexie (IndexedDB wrapper) for web storage
- **AI Integration**: OpenAI-compatible API with support for multiple providers
- **Styling**: Tailwind CSS with custom theme system

### Key Architectural Patterns

#### 1. Multi-Format Book Processing
The application supports multiple book formats through a unified processing pipeline:
- **EPUB**: Digital books with metadata extraction
- **TXT**: Plain text files with language detection
- **Markdown**: MD files with formatting preservation
- **Processing Flow**: Buffer → Format Detection → Content Extraction → Standardized Book Model

#### 2. AI Provider System
Flexible LLM provider architecture supporting multiple AI services:
- **Default Providers**: OpenAI, DeepSeek, Volcengine
- **Configuration**: Runtime provider/model selection via Zustand store
- **API Proxy**: Edge function for secure API key handling
- **Model Types**: Separate models for chat and text parsing

#### 3. Reading Interface Architecture
Sentence-by-sentence reading interface with AI assistance:
- **Sentence Segmentation**: Automatic sentence detection for Chinese/English
- **Reading Progress**: Chapter/line tracking with persistence
- **AI Integration**: Contextual explanations in target language
- **Interactive Chat**: Real-time AI assistance during reading

#### 4. State Management Pattern
Zustand stores with persistence for key application state:
- `useLLMStore`: AI provider and model configuration
- `useReadingProgress`: Current reading position and history
- `useBookmarkStore`: User bookmarks and annotations
- `useCacheStore`: AI response caching for performance
- `useTTSStore`: Text-to-speech configuration

### File Structure Organization

#### `/app` - Next.js App Router
- **Layout**: Theme provider, Antd registry, structure layout
- **Home**: Book grid and management interface
- **Read**: Main reading interface with sentence navigation
- **Setting**: Configuration pages for AI, TTS, prompts
- **API Routes**: Edge functions for LLM proxy and TTS

#### `/services` - Business Logic
- **BookService**: Multi-format book processing pipeline
- **DB**: IndexedDB operations for books and progress
- **LLM**: AI client creation and management
- **TTS**: Text-to-speech service integration

#### `/store` - State Management
- Zustand stores with persistence middleware
- Separated by domain (books, LLM, UI state, etc.)

#### `/types` - TypeScript Definitions
- Comprehensive type definitions for books, LLM, prompts, etc.
- Interface definitions for all major data structures

### Data Models

#### Book Model
```typescript
interface Book {
  id: string;
  title: string;
  author?: string;
  fileHash: string;
  createTime: number;
  chapterList: PlainTextChapter[];
  toc: TocItem[];
  metadata: Metadata;
}
```

#### LLM Configuration
```typescript
interface Provider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  isDefault: boolean;
  models: Model[];
}
```

### Security and Privacy

#### API Key Management
- **Client-Side Storage**: API keys stored in browser localStorage
- **Server-Side Proxy**: Edge function prevents key exposure to third parties
- **No Server Storage**: Keys never transmitted to application servers

#### CSP Configuration
- Tauri app configured with `csp: null` for development flexibility
- Production deployments should implement appropriate CSP headers

### Internationalization

#### i18n Support
- **Languages**: English and Chinese (zh)
- **Translation Files**: JSON files in `/i18n/locales`
- **Hook System**: Custom `useTranslation` hook for component access

### Build and Deployment

#### Web Deployment
- **Static Export**: Configurable for static hosting platforms
- **Platform Support**: Vercel, Cloudflare Pages, etc.
- **Environment Variables**: Runtime configuration for AI providers

#### Desktop Build
- **Cross-Platform**: Windows, macOS, Linux support
- **Release Automation**: GitHub Actions for multi-platform builds
- **Bundle Configuration**: Custom installers for each platform

### Development Notes

#### Code Patterns
- **Functional Components**: React hooks and functional programming
- **TypeScript**: Strict typing throughout the application
- **Error Handling**: Consistent error boundary implementation
- **Performance**: Optimistic updates and caching strategies

#### Database Schema
- **IndexedDB**: Primary storage for books and reading progress
- **Caching Layer**: AI response caching to reduce API calls
- **Search Optimization**: Indexed fields for book metadata

#### AI Integration
- **OpenAI Compatible**: Works with any OpenAI-compatible API
- **Streaming Support**: Real-time AI responses during reading
- **Custom Prompts**: User-configurable prompt templates for different proficiency levels

### Key Dependencies

#### Core Libraries
- `next`: 14.2.24 - React framework
- `antd`: 5.24.0 - UI component library
- `zustand`: 5.0.3 - State management
- `dexie`: 4.0.11 - IndexedDB wrapper
- `openai`: 4.86.1 - AI client

#### Development Tools
- `typescript`: 5 - Type checking
- `tailwindcss`: 3.4.1 - Utility-first CSS
- `eslint`: 8 - Code linting
- `@tauri-apps/cli`: 2.5.0 - Desktop app building