import { PetDTO } from '../dto/petDTOs/pets.dto';
export class PetHelpers {
    public static createUniquePet(): PetDTO {
        const uniqueId = Date.now();
        return {
            id: uniqueId,
            name: `Pet-${uniqueId}`,
            category: { id: 1, name: 'test' },
            photoUrls: ['string'],
            tags: [{ id: 1, name: 'friendly' }],
            status: 'available',
        };
    }
}
