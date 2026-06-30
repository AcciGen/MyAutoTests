import { Page, Locator } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;

    readonly nameInput: Locator;
    readonly generateSkuButton: Locator;
    readonly generateBarcodeButton: Locator;
    readonly supplyPriceInputs: Locator;
    readonly retailPriceInputs: Locator;
    readonly quantityInputs: Locator;
    readonly createButton: Locator;
    readonly editButton: Locator;
    readonly applyButton: Locator;

    readonly firstRow: Locator;
    readonly searchInput: Locator;
    readonly emptyListMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder("Enter name");
        this.generateSkuButton = page.locator("#generateSku");
        this.generateBarcodeButton = page.locator("#generateBarcode");
        this.supplyPriceInputs = page.locator("input[name='supply_price']");
        this.retailPriceInputs = page.locator("input[name='retail_price']");
        this.quantityInputs = page.locator("input[name='quantity']");
        this.createButton = page.getByRole("button", { name: "Create", exact: true });
        this.editButton = page.getByRole("button", { name: "Edit", exact: true });
        this.applyButton = page.getByRole("button", { name: "Apply", exact: true });
        this.firstRow = page.getByRole("rowgroup").getByRole("row").first();
        this.searchInput = page.getByPlaceholder("SKU, barcode, title");
        this.emptyListMessage = page.getByText("Products are not found");
    }

    async navigateToProductsPage() {
        await this.page.goto("/products/catalog");
        await this.firstRow.waitFor({ state: "visible" });
    }

    async createProduct(name: string, supplyPrice: string, retailPrice: string, quantity: string) {
        await this.createButton.click();

        await this.nameInput.fill(name);
        await this.generateSkuButton.click();
        await this.generateBarcodeButton.click();
        await this.fillAllSupplyPrices(supplyPrice);
        await this.fillAllRetailPrices(retailPrice);
        await this.fillAllQuantities(quantity);

        await this.createButton.click();
        await this.createButton.waitFor({ state: "hidden" });
    }

    async updateProduct(searchItem: string, newName?: string, supplyPrice?: string, retailPrice?: string, quantity?: string) {
        await this.searchProduct(searchItem);
        await this.openProductCard(searchItem);
        await this.editButton.click();

        if (newName !== undefined) await this.nameInput.fill(newName);
        if (supplyPrice !== undefined) await this.fillAllSupplyPrices(supplyPrice);
        if (retailPrice !== undefined) await this.fillAllRetailPrices(retailPrice);
        if (quantity !== undefined) await this.fillAllQuantities(quantity);

        await this.applyButton.click();
        await this.applyButton.waitFor({ state: "hidden" });
    }

    async searchProduct(searchItem: string, shouldReload = false) {

        if (shouldReload) {
            await this.page.reload();
            await this.firstRow.waitFor({ state: "visible" });
        }

        await this.searchInput.waitFor({ state: "visible" });
        await this.searchInput.fill(searchItem);
    }

    async openProductCard(searchItem: string) {
        await this.page.getByRole("button", { name: searchItem, exact: true }).click();
    }

    async fillAllSupplyPrices(value: string) {
        await this.fillAllFields(this.supplyPriceInputs, value);
    }

    async fillAllRetailPrices(value: string) {
        await this.fillAllFields(this.retailPriceInputs, value);
    }

    async fillAllQuantities(value: string) {
        await this.fillAllFields(this.quantityInputs, value);
    }

    async fillAllFields(inputsLocator: Locator, value: string) {
        const inputsArray = await inputsLocator.all();

        for (const input of inputsArray) {
            await input.clear();
            await input.fill(value);
        }
    }
}