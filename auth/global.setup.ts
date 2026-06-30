import { test as setup, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { LoginPage } from "../src/pages/login.page";

const authFile = ".auth/user.json";

setup("Глобальная настройка авторизации", async ({ page }) => {
    if (fs.existsSync(authFile)) {
        const stats = fs.statSync(authFile);

        if (stats.size > 5) {
            const fileAgeInHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

            if (fileAgeInHours < 1) return;
        }
    }
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.linkAccess(process.env.ADMIN_LINK!);
    await loginPage.selectCountryCode(); 
    await loginPage.login(process.env.ADMIN_PHONE_NUMBER!, process.env.ADMIN_PASSWORD!);
    
    await expect(page).toHaveURL(/.*dashboard/);

    const dir = path.dirname(authFile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    await page.context().storageState({ path: authFile });
});