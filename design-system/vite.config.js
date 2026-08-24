import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// No hardcoded port — Vite honours $PORT so the harness can assign one.
export default defineConfig({ plugins: [react()] })
