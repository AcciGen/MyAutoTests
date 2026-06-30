import { fakerRU as faker } from "@faker-js/faker";

export const generateProductData = () => {
    return {
        name: `${faker.commerce.productName()} ${faker.string.alphanumeric(4).toUpperCase()}`,
        supplyPrice: faker.number.int({ min: 5000, max: 10000 }).toString(),
        retailPrice: faker.number.int({ min: 15000, max: 20000 }).toString(),
        quantity: faker.number.int({ min: 1, max: 100 }).toString()
    };
};