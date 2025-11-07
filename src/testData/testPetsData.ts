import { PetDTO } from '../dto/petDTOs/pets.dto';
export const InvalidPetData = {
    invalidPetById: {
        id: 'abc', // invalid ID
        name: 'InvalidPet',
        photoUrls: ['src/testData/files/testImage.png'],
    },
    invalidPetByBody: {
        id: 'string',
        name: 12345,
        photoUrls: 'notArray',
    },
};
export const ValidPetData: { [key: string]: PetDTO } = {
    stablePet: {
        id: 11,
        name: 'testPet',
        status: 'available',
        photoUrls: ['string'],
        category: { id: 0, name: 'test' },
        tags: [{ id: 0, name: 'string' }],
    },
};
