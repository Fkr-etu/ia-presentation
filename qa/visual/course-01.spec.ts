import { test, expect } from "@playwright/test";

const scenes = [
  { title: "La question", steps: 4 },
  { title: "Le voyage d’une question", steps: 3 },
  { title: "Les tokens", steps: 3 },
  { title: "Les embeddings", steps: 5 },
  { title: "L’attention", steps: 4 },
  { title: "Le Transformer", steps: 4 },
  { title: "La génération", steps: 5 },
  { title: "À vous de jouer", steps: 4 },
  { title: "Le piège du plausible", steps: 3 },
  { title: "Tout remettre ensemble", steps: 3 },
];

test("Course 01 — parcours visuel complet en 16:9", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("article").filter({ hasText: "Comprendre l’IA" }).getByRole("button", { name: /Explorer le cours/i }).click();

  for (let sceneIndex = 0; sceneIndex < scenes.length; sceneIndex += 1) {
    const scene = scenes[sceneIndex];

    if (sceneIndex > 0) {
      await page.keyboard.press("m");
      await expect(page.getByRole("complementary", { name: "Plan du cours" })).toBeVisible();
      await page.getByRole("complementary", { name: "Plan du cours" }).getByRole("button", { name: scene.title, exact: true }).click();
    }

    await expect(page.locator(".presentation__scene-label")).toHaveText(scene.title);
    await expect(page.locator(".presentation__scene")).toBeVisible();

    for (let step = 0; step < scene.steps; step += 1) {
      await expect.poll(() => page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        height: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
      }))).toMatchObject({
        width: expect.any(Number),
        viewport: 1920,
      });

      const overflow = await page.evaluate(() => ({
        horizontal: document.documentElement.scrollWidth - window.innerWidth,
        vertical: document.documentElement.scrollHeight - window.innerHeight,
      }));

      expect(overflow.horizontal, `${scene.title} / step ${step}: débordement horizontal`).toBeLessThanOrEqual(1);
      expect(overflow.vertical, `${scene.title} / step ${step}: débordement vertical`).toBeLessThanOrEqual(1);

      await page.screenshot({
        path: `qa/visual-artifacts/scene-${String(sceneIndex + 1).padStart(2, "0")}-step-${step}.png`,
        fullPage: false,
      });

      if (step < scene.steps - 1) {
        await page.keyboard.press("ArrowRight");
      }
    }
  }
});

test("Course 01 — navigation clavier et plan", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("article").filter({ hasText: "Comprendre l’IA" }).getByRole("button", { name: /Explorer le cours/i }).click();

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 2 / 4");

  await page.keyboard.press("r");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 1 / 4");

  await page.keyboard.press("m");
  await expect(page.getByRole("complementary", { name: "Plan du cours" })).toBeVisible();

  const sceneButtons = page.getByRole("complementary").getByRole("button");
  await expect(sceneButtons).toHaveCount(11);

  await page.getByRole("button", { name: "Les embeddings", exact: true }).click();
  await expect(page.locator(".presentation__scene-label")).toHaveText("Les embeddings");
  await expect(page.getByRole("complementary", { name: "Plan du cours" })).toHaveCount(0);

  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".presentation__scene-label")).toHaveText("Les tokens");
});
