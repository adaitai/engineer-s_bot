# EngBot — Engineering Chatbot

An intelligent technical assistant for engineers, providing expert answers and organized conversation history.

## Features
- AI-powered engineering Q&A with markdown + code block support
- Persistent conversation history with sidebar management
- Clean, modern UI with Space Grotesk + JetBrains Mono typography
- Teal (#0D9488) primary color theme

## Tech Stack
- React + Vite
- Tailwind CSS + shadcn/ui
- Base44 BaaS (backend, auth, LLM integration)

## Getting Started
1. Clone this repo
2. `npm install`
3. `npm run dev`

## Project Structure
```
base44/entities/Conversation.jsonc   — Conversation data model
src/App.jsx                          — App router & auth wrapper
src/index.css                        — Design tokens & theme
src/pages/Chat.jsx                   — Main chat interface
src/components/chat/                 — Chat UI components
tailwind.config.js                   — Tailwind theme config
```

## License
MIT