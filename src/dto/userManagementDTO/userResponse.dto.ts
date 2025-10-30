import { CreateUserDTO } from './createUser.dto';
export interface UserResponseDTO extends CreateUserDTO {
    code?: number;
    type?: string;
    message?: string;
}
