import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "../BaseAPI";
import { ApiResponseDTO } from "../../dto/apiResponse.dto";
import { StoreInventoryDTO } from "../../dto/storeDTO/storeInventory.dto";
import { storeEndpoints } from "../../enums/storeEndpoints.enum";

export class StoreApi extends BaseAPI {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async getInventory(): Promise<ApiResponseDTO<StoreInventoryDTO>> {
    return this.get<StoreInventoryDTO>(storeEndpoints.GET_INVENTORY_ENDP);
  }

//   async getInventoryByID(): Promise<ApiResponseDTO<>>{

//   }
}

