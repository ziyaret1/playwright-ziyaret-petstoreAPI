import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/API_fixtures";

test.describe('Get inventory', () =>{
    test('[TRA-014]', async({storeApi}) =>{
        const response = await storeApi.getInventory()
        console.log(response);
        expect(response.status).toBe(200)
    })
    test('[TRA-015]', async({storeApi}) =>{
       
    })
})