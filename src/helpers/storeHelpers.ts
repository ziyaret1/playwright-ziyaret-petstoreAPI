import { StoreOrderDTO } from '../dto/storeDTO/storeOrder.dto';
export class StoreHelpers {
    public static placeUniqueOrder(): StoreOrderDTO {
        const uniqueId = Date.now();
        const uniquePetId = Math.floor(Math.random() * 5) + 1;
        return {
            id: uniqueId,
            petId: uniquePetId,
            quantity: 5,
            shipDate: new Date().toISOString(),
            status: 'placed',
            complete: true,
        };
    }
}
