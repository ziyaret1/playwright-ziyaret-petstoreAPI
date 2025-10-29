import { APIRequestContext } from "@playwright/test";
import { UserEndpoints } from "../../enums/userEndpoints.enum";
import { CreateUserDTO } from "../../dto/userManagementDTO/createUser.dto";
import { ApiResponseDTO } from "../../dto/apiResponse.dto";
import { UserResponseDTO } from "../../dto/userManagementDTO/userResponse.dto";
import { LoginUserDTO } from "../../dto/userManagementDTO/loginUser.dto";
import { BaseAPI } from "../baseApii";

export class UserApi extends BaseAPI {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async createUser(
    data: CreateUserDTO
  ): Promise<ApiResponseDTO<UserResponseDTO>> {
    return this.post<CreateUserDTO, UserResponseDTO>(
      UserEndpoints.CREATE_USER_ENDP,
      data
    );
  }

  async createWithListAndArray(
    data: CreateUserDTO[]
  ): Promise<ApiResponseDTO<UserResponseDTO>> {
    return await this.post<CreateUserDTO[], UserResponseDTO>(
      UserEndpoints.CREATE_WITH_LIST,
      data
    );
  }

  async loginUser(
    data: LoginUserDTO
  ): Promise<ApiResponseDTO<UserResponseDTO>> {
    const endpoint = `${UserEndpoints.LOGIN_USER_ENDP}?username=${data.username}&password=${data.password}`;
    return this.get<UserResponseDTO>(endpoint);
  }

  async getUserWithUsername(
    username: string
  ): Promise<ApiResponseDTO<UserResponseDTO>> {
    const endpoint = UserEndpoints.USERNAME_ENDP.replace(
      "{username}",
      username
    );
    return this.get<UserResponseDTO>(endpoint);
  }

  async updateUser(
    username: string,
    data: CreateUserDTO
  ): Promise<ApiResponseDTO<UserResponseDTO>> {
    const endpoint = UserEndpoints.USERNAME_ENDP.replace(
      "{username}",
      username
    );
    return this.put<CreateUserDTO, UserResponseDTO>(endpoint, data);
  }

  async deleteUser(username: string): Promise<ApiResponseDTO<UserResponseDTO>> {
    const endpoint = UserEndpoints.USERNAME_ENDP.replace(
      "{username}",
      username
    );
    return await this.delete<UserResponseDTO>(endpoint);
  }
}
