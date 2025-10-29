import { test as base } from "@playwright/test";
import { UserApi } from "../pages/UserManagementPages/userApi";
import { StoreApi } from "../pages/Store/storeApi";
import { UserHelpers } from "../helpers/userHelpers";

type ApiServicesFixture = {
  userApi: UserApi;
  userHelpers: UserHelpers;
  storeApi: StoreApi;
};

export const test = base.extend<ApiServicesFixture>({
  userApi: async ({ request }, use) => {
    const baseUrl: string =
      process.env.BASE_API || "https://petstore.swagger.io/v2";
    const userApi = new UserApi(request, baseUrl!);
    await use(userApi);
  },

  userHelpers: async ({}, use) => {
    const userHelpers = new UserHelpers();
    use(userHelpers);
  },

  storeApi: async ({ request }, use) => {
    const baseUrl: string =
      process.env.BASE_API || "https://petstore.swagger.io/v2";
    const storeApi = new StoreApi(request, baseUrl!);
    await use(storeApi);
  },
});
