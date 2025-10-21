export const TestUserLogin = {
  username: "TestZi",
  password: "11111",
};

export const InvalidUserLogin = {
  username: "!!!@@@",
  password: "123",
};

export const UpdatedUserData = {
  username: TestUserLogin.username,
  password: TestUserLogin.password,
  firstName: "Updated",
  lastName: "User",
  email: "updated@email.com",
  phone: "11111",
  userStatus: 1,
};

export const InvalidUserData = {
  username: TestUserLogin.username,
  password: TestUserLogin.password,
  firstName: "Invalid",
  lastName: "User",
  email: "notemail", // invalid email
  userStatus: 1,
};

export const NonExistingUserData = {
  username: "NotExist",
  firstName: "Ghost",
  lastName: "User",
  email: "ghost@example.com",
  password: "11111",
  userStatus: 1,
};