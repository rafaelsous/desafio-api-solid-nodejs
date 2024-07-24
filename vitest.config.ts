import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/http/**/*.ts', 'src/use-cases/**/*.ts'],
    },
    environmentMatchGlobs: [
      [
        'src/http/controllers/**',
        './prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
  },
})
