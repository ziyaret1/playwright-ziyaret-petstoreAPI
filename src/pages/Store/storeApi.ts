import { APIRequestContext } from "@playwright/test";
import { ApiResponseDTO } from "../../dto/apiResponse.dto";
import { StoreInventoryDTO } from "../../dto/storeDTO/storeInventory.dto";
import { storeEndpoints } from "../../enums/storeEndpoints.enum";
import { StoreOrderDTO } from "../../dto/storeDTO/storeOrder.dto";
import { BaseAPI } from "../baseApii";

export class StoreApi extends BaseAPI {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async getInventory(): Promise<ApiResponseDTO<StoreInventoryDTO>> {
    return this.get<StoreInventoryDTO>(storeEndpoints.GET_INVENTORY_ENDP);
  }

  async getOrderByID(orderId: number): Promise<ApiResponseDTO<StoreOrderDTO>> {
    return this.get<StoreOrderDTO>(`${storeEndpoints.GET_ORDER_BYID_ENDP}${orderId}`);;
  }

  async placeAnOrder(
    data: StoreOrderDTO
  ): Promise<ApiResponseDTO<StoreOrderDTO>> {
    return this.post<StoreOrderDTO, StoreOrderDTO>(
      storeEndpoints.POST_ORDER_ENDP,
      data
    );
  }

  async deleteOrderByID(orderId: number): Promise<ApiResponseDTO<null>> {
    return this.delete(`${storeEndpoints.DELETE_PURCHASE_ENDP}${orderId}`); // true
  }
}
