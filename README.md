# Arko Frontend

A sleek, Mr. Robot-inspired chat interface for the Arko AI Agency.

## Features

- 🎨 Black/Neon Green aesthetic with glowing effects
- ⚡ Real-time streaming responses via SSE
- 🤖 Agent delegation indicators
- 📱 Responsive design
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## Getting Started

### Prerequisites

- Node.js v20+
- Arko backend running on `http://localhost:8080`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_ARKO_API_URL=http://localhost:8080
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State:** Zustand
- **Streaming:** Server-Sent Events (SSE)

## Project Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Main chat page
└── globals.css         # Global styles

components/chat/
├── ChatContainer.tsx   # Main chat wrapper
├── MessageList.tsx     # Message history
├── Message.tsx         # Message bubbles
├── StreamingText.tsx   # Typewriter effect
├── AgentPill.tsx       # Agent delegation indicator
└── InputBox.tsx        # Message input

lib/
├── api.ts              # Arko API client
├── store.ts            # Zustand state management
└── types.ts            # TypeScript interfaces
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_ARKO_API_URL`
4. Deploy

### Build Locally

```bash
npm run build
npm start
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the neon green theme:

```typescript
colors: {
  neon: {
    green: "#00ff41",    // Change primary accent
    dim: "#00cc33",      // Change hover/active states
  }
}
```

### Fonts

Fonts are loaded via Google Fonts in `globals.css`. Change to different fonts by updating the `@import` URL.

## License

MIT
