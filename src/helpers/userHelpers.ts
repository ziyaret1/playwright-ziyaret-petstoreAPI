import { faker } from "@faker-js/faker";
import { CreateUserDTO } from "../dto/userManagementDTO/createUser.dto";
import { LoginUserDTO } from "../dto/userManagementDTO/loginUser.dto";
import { TestUserLogin } from "../testData/testUserDatas";

export class UserHelpers {
  public createUniqueUser(): CreateUserDTO {
    return {
      id: Date.now(),
      username: `user${faker.internet.username()}${Date.now()}`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: "11111",
      phone: faker.string.numeric(10),
      userStatus: 1,
    };
  }

  public loginValidUser(): LoginUserDTO {
    return {
      username: TestUserLogin.username,
      password: TestUserLogin.password,
    };
  }

  public loginInvalidUser(): LoginUserDTO {
    return {
      username: `wrong_${Date.now()}`,
      password: faker.internet.password(),
    };
  }

  public generateUsers(userCount: number): CreateUserDTO[] {
    const usersList: CreateUserDTO[] = [];
    for (let i = 0; i < userCount; i++) {
      const newUser = this.createUniqueUser();
      usersList.push(newUser);
    }
    return usersList;
  }
}
