import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsInJsxPlugin from './js-in-jsx.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsInJsxPlugin()],
})
