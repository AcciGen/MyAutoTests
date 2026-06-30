import { test, expect } from "../src/fixtures/base-ui.fixture";
import { generateProductData } from "../src/data/product.data";

test.describe("Products Lifecycle Tests", () => {

    test.beforeEach(async ({ productsPage }) => {
        await productsPage.navigateToProductsPage();
    });

    test("Should successfully create product", async ({ productsPage, page }) => {
        const product = generateProductData();
        await productsPage.createProduct(product.name, product.supplyPrice, product.retailPrice, product.quantity);

        await expect(page.getByRole("alert")).toBeVisible();
        await expect(page.getByRole("alert")).toContainText("The product has been added successfully!");
    });

    test("Should successfully update product details", async ({ productsPage, page }) => {
        const productContainerSpan = page.locator("#product-name-0");
        await productContainerSpan.waitFor({ state: "visible" });
        const existingProductName = await productContainerSpan.locator("span").innerText();

        const newProduct = generateProductData();
        await productsPage.updateProduct(existingProductName, newProduct.name, newProduct.supplyPrice, newProduct.retailPrice, newProduct.quantity);

        await expect(page.getByRole("alert")).toBeVisible();
        await expect(page.getByRole("alert")).toContainText("The product has been edited successfully!");
    });

    test("Should show existing product", async ({ productsPage, page }) => {
        const productContainerSpan = page.locator("#product-name-8");
        await productContainerSpan.waitFor({ state: "visible" });
        const existingProductName = await productContainerSpan.locator("span").innerText();

        await productsPage.searchProduct(existingProductName);
        await expect(page.getByText(existingProductName)).toBeVisible();
    });

    test("Should show empty list message when product is not found", async ({ productsPage }) => {

        await productsPage.searchProduct("_NotExistingProduct_");
        await expect(productsPage.emptyListMessage).toBeVisible();
    });
})
