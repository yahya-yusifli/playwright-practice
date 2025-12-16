import { Page } from '@playwright/test';
export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goto(url: string) {
        await this.page.goto(process.env.BASE_URL!);
    }
    async getTitle(): Promise<string> {
        return await this.page.title();
    }
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
}