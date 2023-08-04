
export interface TypeSeatDto {
    id_type_seat: string;
    name: string;
    serviceAdditional: string
    costAdditional: number
    state: boolean
}

export interface CreateTypeSeatDto {
    name: string;
    serviceAdditional: string
    costAdditional: number
}

export interface UpdateTypeSeatDto {
    name?: string;
    serviceAdditional?: string
    costAdditional?: number
    state?: boolean
}