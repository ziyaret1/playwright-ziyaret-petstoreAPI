import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/API_fixtures";
import { StoreHelpers } from "../../src/helpers/storeHelpers";
import { InvalidOrderData } from "../../src/testData/testStoreData";

//! Get
test.describe("Returns pet inventories", () => {
  let createdOrderID: number;
  test.beforeEach(async ({ storeApi }) => {
    const response = await storeApi.placeAnOrder(
      StoreHelpers.placeUniqueOrder()
    );
    createdOrderID = response.body?.id!;
  });
  test("[TRA-014] Verify that inventory can be fetched successfully", async ({
    storeApi,
  }) => {
    const response = await storeApi.getInventory();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("available");
  });
  test("[TRA-016] Verify that order details can be retrieved by ID", async ({
    storeApi,
  }) => {
    const response = await storeApi.getOrderByID(createdOrderID);
    expect(response.status).toBe(200);
  });
  test("[TRA-017] Verify error response for invalid order ID retrieval", async ({
    storeApi,
  }) => {
    const response = await storeApi.getOrderByID(-999);
    expect(response.status).toBe(404);
  });
});
//! Post
test.describe("Place an order for a pet", () => {
  test("[TRA-15] Verify that an order can be placed successfully", async ({
    storeApi,
  }) => {
    const uniqueOrderData = StoreHelpers.placeUniqueOrder();
    const response = await storeApi.placeAnOrder(uniqueOrderData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", uniqueOrderData.id);
    expect(response.body).toHaveProperty("petId", uniqueOrderData.petId);
    expect(response.body).toHaveProperty("quantity", uniqueOrderData.quantity);
  });
  test("[TRA-20] Verify placing an order with missing required fields returns an error", async ({
    storeApi,
  }) => {
    const response = await storeApi.placeAnOrder(InvalidOrderData.missingField);
    expect(response.status).toBe(400);
  });
  test("[TRA-21] Verify placing an order with invalid data types returns an error", async ({
    storeApi,
  }) => {
    const response = await storeApi.placeAnOrder(
      InvalidOrderData.invalidDataType as any
    );
    expect(response.status).toBe(400);
  });
});
//! Delete
test.describe("Delete purchase order", () => {
  let createdOrderID: number;
  test.beforeEach(async ({ storeApi }) => {
    const response = await storeApi.placeAnOrder(
      StoreHelpers.placeUniqueOrder()
    );
    createdOrderID = response.body?.id!;
  });
  test("[TRA-018] Verify that an order can be deleted successfully", async ({
    storeApi,
  }) => {
    const response = await storeApi.deleteOrderByID(createdOrderID);
    expect(response.status).toBe(200);
  });
  test("[TRA-019] Verify that error is returned for invalid order ID deletion", async ({
    storeApi,
  }) => {
    const response = await storeApi.deleteOrderByID(-9999);
    expect(response.status).toBe(400);
  });
  test("[TRA-022] Verify deleting an already deleted order returns appropriate error", async ({
    storeApi,
  }) => {
    const response = await storeApi.deleteOrderByID(2);
    expect(response.status).toBe(404);
  });
});
