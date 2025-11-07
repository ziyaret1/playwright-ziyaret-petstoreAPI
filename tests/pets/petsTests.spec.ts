import { PetDTO } from '../../src/dto/petDTOs/pets.dto';
import { test } from '../../src/fixtures/API_fixtures';
import { expect } from '@playwright/test';
import { PetHelpers } from '../../src/helpers/petsHelpers';
import { InvalidPetData, ValidPetData } from '../../src/testData/testPetsData';
//! Retrieve Pet
test.describe('Return Pet from Store', () => {
    let stablePetId: number;
    test.beforeAll(async ({ petsApi }) => {
        // create unique and stabil pet
        const pet = PetHelpers.createUniquePet();
        const response = await petsApi.addNewPet(pet);
        expect(response.status).toBe(200);
        stablePetId = response.body?.id!;
    });
    test('TRA-025: Verify that pet can be fetched successfully by ID', async ({ petsApi }) => {
        const response = await petsApi.getPetByID(stablePetId);
        expect(response.status).toBe(200);
        expect(response.body?.id).toBe(stablePetId);
        expect(response.body?.name).toContain('Pet-');
    });
    test('TRA-026: Verify response for invalid pet ID', async ({ petsApi }) => {
        const response = await petsApi.getPetByID('abc' as any);
        expect(response.status).toBe(400);
    });
    test('TRA-027: Verify response when pet is not found', async ({ petsApi }) => {
        const response = await petsApi.getPetByID(99999999);
        expect(response.status).toBe(404);
    });
    test('TRA-035: Verify pets with status “available” are returned successfully', async ({
        petsApi,
    }) => {
        const response = await petsApi.getPetByStatus('available');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body && response.body.length).toBeGreaterThan(0);
        expect(response.body![0].status).toBe('available');
    });
    test('TRA-036: Verify pets with multiple statuses are returned successfully', async ({
        petsApi,
    }) => {
        const response = await petsApi.getPetByStatus('available,pending,sold');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    test('TRA-037: Verify that API returns error when invalid status value is provided', async ({
        petsApi,
    }) => {
        const response = await petsApi.getPetByStatus('invalidStatus');
        expect(response.status).toBe(400);
    });
    test('TRA-038: Verify that API returns error when status parameter is empty', async ({
        petsApi,
    }) => {
        const response = await petsApi.getPetByStatus('');
        expect(response.status).toBe(400);
    });
    test('TRA-045: Verify that large numeric petId causes error', async ({ petsApi }) => {
        const response = await petsApi.getPetByID(999999999999999999999 as any);
        expect([400, 404]).toContain(response.status);
    });
});
//! Update Pet
test.describe('Update and Add Pet', () => {
    const stablePet = ValidPetData.stablePet; // use stabil pet for update
    test('TRA-028: Verify that a new pet can be added successfully', async ({ petsApi }) => {
        const response = await petsApi.addNewPet(stablePet);
        expect(response.status).toBe(200);
        expect(response.body?.id).toBe(stablePet.id);
        expect(response.body?.name).toBe(stablePet.name);
    });
    test('TRA-029: Verify that an existing pet can be updated successfully', async ({
        petsApi,
    }) => {
        const updatedPet: PetDTO = { ...stablePet, status: 'sold' };
        const response = await petsApi.updatePet(updatedPet);
        expect(response.status).toBe(200);
        expect(response.body?.status).toBe('sold');
    });
    test('TRA-030: Verify add pet with invalid body returns validation error', async ({
        petsApi,
    }) => {
        const response = await petsApi.addNewPet(InvalidPetData.invalidPetByBody as any);
        expect(response.status).toBe(400);
    });
    test('TRA-031: Verify add pet with empty body returns validation error', async ({
        petsApi,
    }) => {
        const response = await petsApi.addNewPet({} as any);
        expect(response.status).toBe(405);
    });
    test('TRA-042: Verify that adding pet with duplicate ID is handled correctly', async ({
        petsApi,
    }) => {
        // Same stabil pet for dublicate check
        const response = await petsApi.addNewPet(stablePet);
        expect(response.status).toBe(409);
    });
    test('TRA-043: Verify that invalid data types cause validation error', async ({ petsApi }) => {
        const response = await petsApi.addNewPet(InvalidPetData.invalidPetById as any);
        expect(response.status).toBe(400);
    });
    test('TRA-044: Verify update with empty body returns validation error', async ({ petsApi }) => {
        const response = await petsApi.updatePet({} as any);
        expect(response.status).toBe(405);
    });
});
//! Delete pets
test.describe('Delete Pet from Store', () => {
    let petId: number;
    test.beforeEach(async ({ petsApi }) => {
        const newPet = PetHelpers.createUniquePet();
        const response = await petsApi.addNewPet(newPet);
        expect(response.status).toBe(200);
        petId = newPet.id;
    });
    test('TRA-032: Verify that an existing pet can be deleted successfully', async ({
        petsApi,
    }) => {
        const delResponse = await petsApi.deletePetByID(petId);
        expect(delResponse.status).toBe(200);
        const getResponse = await petsApi.getPetByID(petId);
        expect(getResponse.status).toBe(404);
    });
    test('TRA-033: Verify delete with invalid pet ID', async ({ petsApi }) => {
        const response = await petsApi.deletePetByID('abc');
        expect(response.status).toBe(400);
    });
    test('TRA-034: Verify delete for non-existing pet', async ({ petsApi }) => {
        const response = await petsApi.deletePetByID(999999);
        expect(response.status).toBe(404);
    });
    test('TRA-039: Verify that delete request without petId returns error', async ({ petsApi }) => {
        const response = await petsApi.deletePetWithoutId();
        expect(response.status).toBe(404);
    });
    test('TRA-040: Verify delete request without authorization header', async ({
        request,
        baseURL,
    }) => {
        const response = await request.delete(`${baseURL}/pet/${petId}`);
        expect(response.status).toBe(401);
    });
    test('TRA-041: Verify delete for already deleted pet', async ({ petsApi }) => {
        await petsApi.deletePetByID(petId);
        const response = await petsApi.deletePetByID(petId);
        expect(response.status).toBe(404);
    });
});
