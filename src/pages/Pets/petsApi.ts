import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from '../baseApii';
import { ApiResponseDTO } from '../../dto/apiResponse.dto';
import { PetDTO } from '../../dto/petDTOs/pets.dto';
import { petsEndpoints } from '../../enums/petsEndpoints.enum';
export class PetsApi extends BaseAPI {
    constructor(request: APIRequestContext, baseUrl: string) {
        super(request, baseUrl);
    }
    async getPetByID(petId: number): Promise<ApiResponseDTO<PetDTO>> {
        return this.get<PetDTO>(`${petsEndpoints.GET_PET_BY_ID}${petId}`);
    }
    async getPetByStatus(status: string): Promise<ApiResponseDTO<PetDTO[]>> {
        return this.get<PetDTO[]>(`${petsEndpoints.GET_PET_BY_STATUS}?status=${status}`);
    }
    async updatePet(data: PetDTO): Promise<ApiResponseDTO<PetDTO>> {
        return this.put<PetDTO, PetDTO>(petsEndpoints.PUT_UPDATE_PET, data);
    }
    async addNewPet(data: PetDTO): Promise<ApiResponseDTO<PetDTO>> {
        return this.post<PetDTO, PetDTO>(petsEndpoints.POST_ADD_PET, data);
    }
    async deletePetByID(petId?: number | string): Promise<ApiResponseDTO<null>> {
        return this.delete(`${petsEndpoints.DELETE_PET_BY_ID}${petId}`);
    }
    async deletePetWithoutId(): Promise<ApiResponseDTO<null>> {
        return this.delete('/pet/');
    }
}
