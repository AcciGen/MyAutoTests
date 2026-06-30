import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly linkInput: Locator;
    readonly linkButton: Locator;
    readonly countryDropdown: Locator;
    readonly phoneNumber: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly linkErrorMessage: Locator;
    readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkInput = page.getByPlaceholder("Enter link");
        this.linkButton = page.getByRole("button", { name: "Next" });
        this.countryDropdown = page.locator('div.jss105.jss110').first();
        this.phoneNumber = page.getByPlaceholder("XX XXX XX XX");
        this.password = page.getByPlaceholder("Enter your password");
        this.loginButton = page.getByRole("button", { name: "Sign in" });
        this.linkErrorMessage = page.getByText("Company not found");
        this.loginErrorMessage = page.getByText("Invalid user data");
    }

    async navigateToLoginPage() {
        await this.page.goto("/login");
    }

    async linkAccess(link: string) {
        await this.linkInput.fill(link);
        await this.linkButton.click();
    }

    async login(phoneNumber: string, password: string) {
        await this.phoneNumber.fill(phoneNumber);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async selectCountryCode(countryCode = "+998") {
        await this.countryDropdown.click();

        const option = this.page.locator('div').filter({ hasText: `(${countryCode})` }).first();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
        await this.countryDropdown.click();
    }
}