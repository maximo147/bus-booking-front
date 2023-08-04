import { Bus } from "../../buses/model/bus.model";



export interface ItineraryResponse {
    metadata: Metadata;
    data: Datum[];
}

export interface Datum {
    id_itinerary: string;
    cityOrigin: string;
    cityDestination: string;
    hourExit: string;
    hourArrival: string;
    dateExit: Date;
    dateArrival: Date;
    cost: number;
    idBus: IDBus;
    status: string;
    state: boolean;
}

export interface IDBus {
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
}

export interface Metadata {
    id_response: string;
    datetime: Date;
    status: string;
    message: string;
}
