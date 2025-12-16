import { test, expect } from "@playwright/test";

test("login to Sauce Demo", async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  await page.getByPlaceholder("Username").fill(process.env.SAUCE_USERNAME!);
  await page.getByPlaceholder("Password").fill(process.env.SAUCE_PASSWORD!);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("**/inventory.html");

  await expect(page.getByText("Products")).toBeVisible();
});
