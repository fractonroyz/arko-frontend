#!/bin/bash

# Start Arko Frontend Development Server

echo "🚀 Starting Arko Frontend..."
echo ""
echo "📍 Local:    http://localhost:3000"
echo "🔌 API:      http://localhost:8080 (make sure Arko backend is running)"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd "$(dirname "$0")"
npm run dev
