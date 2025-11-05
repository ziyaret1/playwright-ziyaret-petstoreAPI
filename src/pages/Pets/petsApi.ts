import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "../baseApii";
import { ApiResponseDTO } from "../../dto/apiResponse.dto";
import { PetDTO } from "../../dto/petDTOs/pets.dto";
import { petsEndpoints } from "../../enums/petsEndpoints.enum";
import { PetFormUpdateDTO, PetFormUpdateResponseDTO } from "../../dto/petDTOs/petFormUpdate.dto";

export class PetsApi extends BaseAPI {
    constructor(request: APIRequestContext, baseUrl: string){
        super(request, baseUrl)
    }
    async getPetByID(petId: number):Promise<ApiResponseDTO<PetDTO>>{
        return this.get<PetDTO>(`${petsEndpoints.GET_PET_BY_ID}${petId}`)
    } 
    async getPetByStatus(status: string): Promise<ApiResponseDTO<PetDTO>>{
        return this.get<PetDTO>(`${petsEndpoints.GET_PET_BY_STATUS}${status}`)
    }
    async updatePet(body: PetDTO): Promise<ApiResponseDTO<PetDTO>>{
        return this.put<PetDTO, PetDTO>(`${petsEndpoints.PUT_UPDATE_PET}${body}`)
    }
    async addNewPet(body: PetDTO): Promise<ApiResponseDTO<PetDTO>>{
        return this.post<PetDTO, PetDTO>(`${petsEndpoints.POST_ADD_PET}${body}`)
    }
    async updatePetByForm(petId: number, body: PetFormUpdateDTO): Promise<ApiResponseDTO<PetFormUpdateResponseDTO>>{
        return this.post<PetDTO, PetFormUpdateResponseDTO>(`${petsEndpoints.POST_UPDATE_PET}${petId}${body}`)
    }
}