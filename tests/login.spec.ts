import { test, expect } from "../src/fixtures/base-ui.fixture";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login page tests", () => {

    const validCredentials = {
        link: process.env.ADMIN_LINK!,
        phone: process.env.ADMIN_PHONE_NUMBER!,
        password: process.env.ADMIN_PASSWORD!
    };

    test.beforeEach(async ({ context, loginPage }) => {
        await context.clearCookies();
        await loginPage.navigateToLoginPage();
    });

    test("Should login with valid credentials", async ({ loginPage, page }) => {
        await loginPage.linkAccess(validCredentials.link);
        await loginPage.selectCountryCode();
        await loginPage.login(validCredentials.phone, validCredentials.password);
        await expect(page.getByTestId("navbarList")).toBeVisible();
    });

    test("Should login with invalid company link", async ({ loginPage }) => {
        await loginPage.linkAccess(`${validCredentials.link}_invalid`);
        await expect(loginPage.linkErrorMessage).toBeVisible();
    });

    test("Should login with invalid phone number", async ({ loginPage }) => {
        await loginPage.linkAccess(validCredentials.link);
        await loginPage.selectCountryCode();
        await loginPage.login("000000000", validCredentials.phone);
        await expect(loginPage.loginErrorMessage).toBeVisible();
    });

    test("Should login with invalid password", async ({ loginPage }) => {
        await loginPage.linkAccess(validCredentials.link);
        await loginPage.selectCountryCode();
        await loginPage.login(validCredentials.phone, `${validCredentials.password}_invalid`);
        await expect(loginPage.loginErrorMessage).toBeVisible();
    });
})