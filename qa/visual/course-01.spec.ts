import { test, expect, type Page } from "@playwright/test";

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

async function waitForLayoutStability(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

async function getOverflowDiagnostics(page: Page) {
  return page.evaluate(() => {
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const presentation = document.querySelector<HTMLElement>(".presentation");
    const scene = document.querySelector<HTMLElement>(".presentation__scene");
    const content = document.querySelector<HTMLElement>(".presentation__scene-content");

    if (!presentation || !scene || !content) {
      throw new Error("Structure de présentation introuvable");
    }

    const presentationRect = presentation.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const contentRects = [content, ...content.querySelectorAll("*")].map((element) => element.getBoundingClientRect());
    const contentBounds = contentRects.reduce(
      (bounds, rect) => ({
        left: Math.min(bounds.left, rect.left),
        right: Math.max(bounds.right, rect.right),
        top: Math.min(bounds.top, rect.top),
        bottom: Math.max(bounds.bottom, rect.bottom),
      }),
      { left: Number.POSITIVE_INFINITY, right: Number.NEGATIVE_INFINITY, top: Number.POSITIVE_INFINITY, bottom: Number.NEGATIVE_INFINITY },
    );
    const visualOverflow = {
      horizontal: Math.max(0, presentationRect.left - contentBounds.left, contentBounds.right - presentationRect.right),
      vertical: Math.max(0, presentationRect.top - contentBounds.top, contentBounds.bottom - presentationRect.bottom),
    };

    const documentMetrics = {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    };

    const overflowingChildren = [...scene.querySelectorAll("*")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          bottom: Math.round(rect.bottom * 100) / 100,
          right: Math.round(rect.right * 100) / 100,
        };
      })
      .filter(({ bottom, right }) => bottom > presentationRect.bottom + 1 || right > presentationRect.right + 1)
      .sort((a, b) => Math.max(b.bottom - presentationRect.bottom, b.right - presentationRect.right) - Math.max(a.bottom - presentationRect.bottom, a.right - presentationRect.right))
      .slice(0, 8);

    return {
      viewport,
      documentMetrics,
      visualOverflow,
      presentation: {
        rect: {
          top: Math.round(presentationRect.top * 100) / 100,
          bottom: Math.round(presentationRect.bottom * 100) / 100,
          height: Math.round(presentationRect.height * 100) / 100,
        },
      },
      content: {
        rect: {
          top: Math.round(contentRect.top * 100) / 100,
          bottom: Math.round(contentRect.bottom * 100) / 100,
          height: Math.round(contentRect.height * 100) / 100,
        },
      },
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
        diagnostics.visualOverflow.horizontal,
        `${scene.title} / step ${step}: débordement horizontal — ${JSON.stringify(diagnostics) }`,
      ).toBeLessThanOrEqual(1);
      expect(
        diagnostics.visualOverflow.vertical,
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
