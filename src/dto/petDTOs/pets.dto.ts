import { PetCategoryDTO } from './petCategory.dto';
import { PetTagDTO } from './petTag.dto';
export interface PetDTO {
    id?: number;
    category?: PetCategoryDTO;
    name: string;
    photoUrls: string[];
    tags?: PetTagDTO[];
    status?: 'available' | 'pending' | 'sold';
}
