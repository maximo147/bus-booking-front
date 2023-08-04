import { Bus } from "../model/bus.model";

export interface TypeSeatDetailResponse {
    metadata: Metadata;
    data: Datum[];
}

export interface Datum {
    id_type_seat_detail: string;
    busy: string;
    state: boolean;
    idTypeSeat: IDTypeSeat;
    idItinerary: IDItinerary;
}

export interface IDItinerary {
    id_itinerary: string;
    cityOrigin: string;
    cityDestination: string;
    hourExit: string;
    hourArrival: string;
    dateExit: Date;
    dateArrival: Date;
    cost: number;
    idBus: Bus;
    status: string;
    state: boolean;
}

export interface IDTypeSeat {
    id_type_seat: string;
    name: string;
    serviceAdditional: string;
    costAdditional: number;
    state: boolean;
}

export interface Metadata {
    id_response: string;
    datetime: Date;
    status: string;
    message: string;
}
