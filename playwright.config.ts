import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./qa/visual",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4173/ia-presentation/",
    viewport: { width: 1920, height: 1080 },
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1",
    url: "http://127.0.0.1:4173/ia-presentation/",
    reuseExistingServer: true,
    timeout: 30_000,
  },
  reporter: [["list"], ["html", { outputFolder: "qa/visual-report", open: "never" }]],
});
