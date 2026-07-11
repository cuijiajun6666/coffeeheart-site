import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sites } from './build/sites-vite-plugin'

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt'

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false'
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs'
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry'

  const { cloudflare } = await import('@cloudflare/vite-plugin')

  return {
    base: '/',
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      react(),
      sites(),
      cloudflare({
        viteEnvironment: { name: 'server' },
        config: {
          main: './worker/index.js',
          compatibility_flags: ['nodejs_compat'],
          assets: {
            binding: 'ASSETS',
            not_found_handling: 'single-page-application',
          },
        },
      }),
    ],
  }
})
