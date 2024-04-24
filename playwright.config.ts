import type { PlaywrightTestConfig } from '@playwright/test';

const port = process.env.CI ? 4173 : 5173;

const config: PlaywrightTestConfig = {
	webServer: {
		command: process.env.CI ? 'npm run preview' : 'npm run dev',
		port: port,
		reuseExistingServer: !process.env.CI
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
