import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 1200000, // Timeout global do teste (20 minutos)
  use: {
    actionTimeout: 30000, // Timeout para ações individuais (30 segundos)
    navigationTimeout: 60000, // Timeout para navegação (1 minuto)
    // Configurações específicas para CI/CD
    headless: true,
    screenshot: 'off',
    video: 'off',
    trace: 'off',
    // Configurações de rede para CI/CD
    ignoreHTTPSErrors: true,
    // Configurações de viewport
    viewport: { width: 1280, height: 720 },
  },
  // Configurações de cache otimizadas
  globalSetup: undefined,
  globalTeardown: undefined,
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        // Configurações específicas do Chromium para container
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
          ]
        }
      },
    }
  ],
  reporter: [
    ['allure-playwright', {
      detail: true,
      outputFolder:'allure-results',
      suiteTitle: false,
      environmentInfo: {
        framework: 'Playwright',
        language: 'TypeScript',
        runtime: 'Node.js',
        project: 'Consignado',
        system: 'Blog Agibank'
      }
    }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ]
});