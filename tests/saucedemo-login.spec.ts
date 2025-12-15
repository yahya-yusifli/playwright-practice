import { test, expect } from "@playwright/test";

test("login to Sauce Demo", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill(process.env.TEST_USERNAME!);
  await page.getByPlaceholder("Password").fill(process.env.TEST_PASSWORD!);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("**/inventory.html");

  await expect(page.getByText("Products")).toBeVisible();
});
