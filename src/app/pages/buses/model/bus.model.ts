import { TypeSeatDetail } from "./type-seat-detail.model";

export class Bus {
    id_bus: string;
    plate: string
    operatorName: string
    operatorDni: string 
    brand: string
    minSeat: number
    maxSeat: number
    amountTourist: number
    amountExecutive: number
    amountPremium: number
    state: boolean;
    typeSeatDetail?: TypeSeatDetail[]
}
