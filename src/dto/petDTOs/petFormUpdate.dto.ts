export interface PetFormUpdateDTO {
    name?: string;
    status: 'available' | 'pending' | 'sold';
}
export interface PetFormUpdateResponseDTO {
    code: number;
    type: string;
    message: string;
}
