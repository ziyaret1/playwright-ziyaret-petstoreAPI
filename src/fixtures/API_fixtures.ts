import { test as base } from "@playwright/test";
import { UserApi } from "../pages/User Management pages/userApi";
import { UserHelpers } from "../helpers/userHelpers";

type ApiServicesFixture = {
  userApi: UserApi;
  userHelpers: UserHelpers;
};

export const test = base.extend<ApiServicesFixture>({
  userApi: async ({ request }, use) => {
    const baseUrl: string | undefined = process.env.BASE_API;
    const userApi = new UserApi(request, baseUrl!);
    await use(userApi);
  },

  userHelpers: async({}, use) =>{
    const userHelpers = new UserHelpers();
    use(userHelpers)
  }
});
