export interface ApiResponseDTO<Type> {
    // Type need for reuse with another response like pet, store
    status: number;
    headers: Record<string, string>;
    body?: Type; // undefined if no json
}
