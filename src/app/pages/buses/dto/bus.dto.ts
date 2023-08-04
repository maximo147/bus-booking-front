import { TypeSeatDetail } from "../model/type-seat-detail.model";
import { TypeSeatDetailDto } from "./type-seat-detail.dto";

export interface BusDto {
    id_bus: string;
    plate: string
    operatorName: string 
    operatorDni: string 
    brand: string
    minSeat: number
    amountTourist: number
    amountExecutive: number
    amountPremium: number
    typeSeatDetail: TypeSeatDetailDto[]
    state: boolean;
}



export interface CreateBusDto {
    id_bus?: string;
    plate: string
    operatorName: string 
    operatorDni: string 
    brand: string
    minSeat: number
    amountTourist: number
    amountExecutive: number
    amountPremium: number
    typeSeatDetail: TypeSeatDetail[]
    state?: boolean
}

export interface UpdateBusDto {
    plate?: string
    operatorName?: string 
    operatorDni?: string 
    brand?: string
    minSeat?: number
    amountTourist?: number
    amountExecutive?: number
    amountPremium?: number
    state?: boolean;
    typeSeatDetail?: TypeSeatDetailDto[]
}