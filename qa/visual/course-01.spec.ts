import { test, expect } from "@playwright/test";

const scenes = [
  { title: "La question", steps: 3 },
  { title: "Le voyage d’une question", steps: 3 },
  { title: "Les tokens", steps: 2 },
  { title: "Les embeddings", steps: 4 },
  { title: "L’attention", steps: 4 },
  { title: "Le Transformer", steps: 3 },
  { title: "La génération", steps: 3 },
  { title: "À vous de jouer", steps: 4 },
  { title: "Le piège du plausible", steps: 3 },
  { title: "Du texte à la réponse", steps: 2 },
];

async function waitForLayoutStability(page: Parameters<Parameters<typeof test>[1]>[0]["page"]) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

async function getOverflowDiagnostics(page: Parameters<Parameters<typeof test>[1]>[0]["page"]) {
  return page.evaluate(() => {
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const documentMetrics = {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    };

    const elements = [...document.querySelectorAll(".presentation, .presentation__scene, .presentation__scene-content")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector: element.className,
          rect: {
            left: Math.round(rect.left * 100) / 100,
            top: Math.round(rect.top * 100) / 100,
            right: Math.round(rect.right * 100) / 100,
            bottom: Math.round(rect.bottom * 100) / 100,
            width: Math.round(rect.width * 100) / 100,
            height: Math.round(rect.height * 100) / 100,
          },
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
          scrollHeight: element.scrollHeight,
          clientHeight: element.clientHeight,
        };
      });

    const overflowingChildren = [...document.querySelectorAll(".presentation__scene *")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          bottom: Math.round(rect.bottom * 100) / 100,
          right: Math.round(rect.right * 100) / 100,
        };
      })
      .filter(({ bottom, right }) => bottom > viewport.height + 1 || right > viewport.width + 1)
      .sort((a, b) => Math.max(b.bottom - viewport.height, b.right - viewport.width) - Math.max(a.bottom - viewport.height, a.right - viewport.width))
      .slice(0, 8);

    return {
      viewport,
      documentMetrics,
      overflow: {
        horizontal: documentMetrics.scrollWidth - viewport.width,
        vertical: documentMetrics.scrollHeight - viewport.height,
      },
      elements,
      overflowingChildren,
    };
  });
}

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

      await waitForLayoutStability(page);
      const diagnostics = await getOverflowDiagnostics(page);

      expect(
        diagnostics.overflow.horizontal,
        `${scene.title} / step ${step}: débordement horizontal — ${JSON.stringify(diagnostics) }`,
      ).toBeLessThanOrEqual(1);
      expect(
        diagnostics.overflow.vertical,
        `${scene.title} / step ${step}: débordement vertical — ${JSON.stringify(diagnostics) }`,
      ).toBeLessThanOrEqual(1);

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
  await expect(page.locator(".presentation__controls")).toContainText("Étape 2 / 3");

  await page.keyboard.press("r");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 1 / 3");

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

test("Course 01 — la navigation ne boucle pas aux bornes", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("article").filter({ hasText: "Comprendre l’IA" }).getByRole("button", { name: /Explorer le cours/i }).click();

  const totalStates = scenes.reduce((total, scene) => total + scene.steps, 0);
  for (let index = 1; index < totalStates; index += 1) {
    await page.keyboard.press("ArrowRight");
  }

  await expect(page.locator(".presentation__scene-label")).toHaveText("Du texte à la réponse");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 2 / 2");
  await expect(page.locator(".presentation__controls")).toContainText("Fin du parcours");

  for (const key of ["ArrowRight", " ", "Enter"]) {
    await page.keyboard.press(key);
    await expect(page.locator(".presentation__scene-label")).toHaveText("Du texte à la réponse");
    await expect(page.locator(".presentation__controls")).toContainText("Étape 2 / 2");
  }

  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".presentation__scene-label")).toHaveText("Du texte à la réponse");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 1 / 2");

  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".presentation__scene-label")).toHaveText("Le piège du plausible");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 3 / 3");

  await page.keyboard.press("m");
  await page.getByRole("complementary", { name: "Plan du cours" }).getByRole("button", { name: "La question", exact: true }).click();
  await expect(page.locator(".presentation__scene-label")).toHaveText("La question");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 1 / 3");

  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".presentation__scene-label")).toHaveText("La question");
  await expect(page.locator(".presentation__controls")).toContainText("Étape 1 / 3");
});
