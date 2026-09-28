import { test, expect } from "@playwright/test";

const scenes = [
  { title: "Le LLM ne suffit plus", steps: 3 },
  { title: "Le RAG", steps: 5 },
  { title: "Le contexte n'est pas un droit", steps: 3 },
  { title: "MCP", steps: 4 },
  { title: "Le harnais", steps: 4 },
  { title: "La boucle", steps: 4 },
  { title: "Observer ce qui se passe", steps: 3 },
  { title: "Sécuriser l'action", steps: 4 },
  { title: "Le système complet", steps: 3 },
];

async function openCourse02(page: Parameters<typeof test>[0]["page"]) {
  await page.goto("/");
  await page.getByRole("button", { name: /Explorer le cours/ }).nth(1).click();
  await expect(page.getByText("cours.ia / 02")).toBeVisible();
}

test.describe("Course 02 — RAG, MCP, harnais et loop", () => {
  test("ouvre le cours et respecte les contrats de scènes", async ({ page }) => {
    await openCourse02(page);
    expect(await page.locator(".presentation__scene-label").textContent()).toBe(scenes[0].title);
    expect(await page.getByText("Étape 1 / 3").count()).toBe(1);
    await page.keyboard.press("ArrowRight");
    expect(await page.getByText("Étape 2 / 3").count()).toBe(1);
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".presentation__scene-label")).toHaveText(scenes[1].title);
    expect(await page.getByText("Étape 1 / 5").count()).toBe(1);
  });

  test("le plan et les raccourcis permettent de rejoindre les scènes", async ({ page }) => {
    await openCourse02(page);
    await page.keyboard.press("m");
    await expect(page.getByRole("button", { name: "MCP" })).toBeVisible();
    await page.getByRole("button", { name: "MCP" }).click();
    await expect(page.locator(".presentation__scene-label")).toHaveText("MCP");
    await page.keyboard.press("9");
    await expect(page.locator(".presentation__scene-label")).toHaveText("Le système complet");
  });

  test("la navigation ne boucle pas aux bornes", async ({ page }) => {
    await openCourse02(page);
    const totalStates = scenes.reduce((sum, scene) => sum + scene.steps, 0);
    for (let i = 1; i < totalStates; i += 1) await page.keyboard.press("ArrowRight");
    await expect(page.locator(".presentation__scene-label")).toHaveText("Le système complet");
    await expect(page.getByText("Étape 3 / 3")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByText("Étape 3 / 3")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByText("Étape 2 / 3")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByText("Étape 1 / 3")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(".presentation__scene-label")).toHaveText("Sécuriser l'action");
    await page.keyboard.press("m");
    await page.getByRole("button", { name: "Le LLM ne suffit plus" }).click();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByText("Étape 1 / 3")).toBeVisible();
  });
});
