export interface StoreOrderDTO {
  id?: number;
  petId: number;
  quantity: number;
  shipDate?: string;
  status: string;
  complete: boolean;
}