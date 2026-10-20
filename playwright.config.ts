import { defineConfig, devices } from "@playwright/test";

const PORT = 3300;

/**
 * Tests fonctionnels sur le build de production (lancer `npm run build` avant).
 * CONTACT_DRY_RUN=true : le formulaire est testé de bout en bout sans envoyer d'e-mail.
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
    env: { CONTACT_DRY_RUN: "true" },
  },
});
