import { test as base } from "@playwright/test";
import { UserApi } from "../pages/UserManagementPages/userApi";
import { UserHelpers } from "../helpers/userHelpers";
import { StoreApi } from "../pages/Store/storeApi";

type ApiServicesFixture = {
  userApi: UserApi;
  userHelpers: UserHelpers;
  storeApi: StoreApi;
};

export const test = base.extend<ApiServicesFixture>({
  userApi: async ({ request }, use) => {
    const baseUrl: string | undefined = process.env.BASE_API;
    const userApi = new UserApi(request, baseUrl!);
    await use(userApi);
  },

  userHelpers: async ({}, use) => {
    const userHelpers = new UserHelpers();
    use(userHelpers);
  },

  storeApi: async ({ request }, use) => {
    const baseUrl: string | undefined = process.env.BASE_API;
    const storeApi = new StoreApi(request, baseUrl!);
    await use(storeApi);
  },
});