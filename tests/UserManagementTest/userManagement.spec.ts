import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/API_fixtures';
import {
    InvalidUserData,
    NonExistingUserData,
    TestUserLogin,
    UpdatedUserData,
} from '../../src/testData/testUserDatas';
//! Create User
test.describe('Create User & Login User Suite', () => {
    test('[TRA-002] Verify that a new user can be created successfully', async ({
        userApi,
        userHelpers,
    }) => {
        const newUserData = userHelpers.createUniqueUser();
        const response = await userApi.createUser(newUserData);
        expect(response.status).toBe(200);
        await userApi.getUserWithUsername(newUserData.username);
        expect(newUserData.username).toBe(newUserData.username);
    });
});
//! CreateWithList & CreateWithArray Users
test.describe('Create User List & Array Suite', () => {
    test('[TRA] Verify that multiple users can be created using createWithList', async ({
        userApi,
        userHelpers,
    }) => {
        const userLists = userHelpers.generateUsers(5);
        const response = await userApi.createWithListAndArray(userLists);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'ok');
    });
    test('[TRA] Verify that multiple users can be created using createWithArray', async ({
        userApi,
        userHelpers,
    }) => {
        const userList = userHelpers.generateUsers(3);
        const response = await userApi.createWithListAndArray(userList);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'ok');
    });
});
//! Login User
test.describe('Login User Suite', () => {
    test('[TRA-003] Log in with valid credentials', async ({ userApi, userHelpers }) => {
        const loginData = userHelpers.loginValidUser();
        const response = await userApi.loginUser(loginData);
        expect(response.status).toBe(200);
    });
    test('[TRA-004] Log in with invalid credentials', async ({ userApi, userHelpers }) => {
        const invalidLoginData = userHelpers.loginInvalidUser();
        const response = await userApi.loginUser(invalidLoginData);
        expect(response.status).toBe(405);
    });
});
//! Get User
test.describe('Get User Suite', () => {
    test('[TRA-005] Get user by valid username', async ({ userApi }) => {
        const response = await userApi.getUserWithUsername(TestUserLogin.username);
        expect(response.status).toBe(200);
        expect(response.body?.username).toBe(TestUserLogin.username);
    });
    test('[TRA-006] Get non-existing user by username', async ({ userApi }) => {
        const response = await userApi.getUserWithUsername('nonExistingUser');
        expect(response.status).toBe(404);
    });
    test('[TRA-007] Get user with invalid username format', async ({ userApi }) => {
        const response = await userApi.getUserWithUsername('!!@@@');
        expect(response.status).toBe(400);
    });
});
//! Update User
test.describe('Update User Suite', () => {
    test('[TRA-008] Update existing user successfully', async ({ userApi }) => {
        const response = await userApi.updateUser(UpdatedUserData.username, UpdatedUserData);
        expect(response.status).toBe(200);
        // get updpated user for check response
        const getUpdatedResponse = await userApi.getUserWithUsername(UpdatedUserData.username);
        expect(getUpdatedResponse.body?.firstName).toBe('Updated');
        expect(getUpdatedResponse.body?.email).toBe('updated@email.com');
    });
    test('[TRA-009] Update user with invalid data', async ({ userApi }) => {
        const response = await userApi.updateUser(InvalidUserData.username, InvalidUserData);
        expect(response.status).toBe(400);
    });
    test('[TRA-010] Update non-existing user', async ({ userApi }) => {
        const response = await userApi.updateUser(
            NonExistingUserData.username,
            NonExistingUserData
        );
        expect(response.status).toBe(404);
    });
});
//! Delete User
test.describe('Delete User Suite', () => {
    let username: string;
    test.beforeEach(async ({ userApi, userHelpers }) => {
        // Create Unique User
        const newUser = userHelpers.createUniqueUser();
        await userApi.createUser(newUser);
        // Use new created user
        username = newUser.username;
    });
    test('[TRA-011] Delete existing user successfully', async ({ userApi }) => {
        const response = await userApi.deleteUser(username);
        expect(response.status).toBe(200);
    });
    test('[TRA-012] Delete non-existing user', async ({ userApi }) => {
        const response = await userApi.deleteUser('nonExistingUser');
        expect(response?.status).toBe(404);
    });
    test('[TRA-013] Delete user with invalid username format', async ({ userApi }) => {
        const response = await userApi.deleteUser('@@@!!!');
        expect(response?.status).toBe(400);
    });
});
