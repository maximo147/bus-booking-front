import { BusDto } from "../../buses/dto/bus.dto";
import { TypeSeatDetailDto } from "../../buses/dto/type-seat-detail.dto";
import { TypeSeatDetail } from "../../buses/model/type-seat-detail.model";

export class ItineraryDto {
    id_itinerary: string;
    cityOrigin: string;
    cityDestination: string;
    hourExit: string;
    hourArrival: string;
    dateExit: Date;
    dateArrival: Date;
    cost: number;
    status: string;
    idBus: BusDto;
    state: boolean;
    typeSeatDetail: TypeSeatDetailDto[]
}

export class CreateItineraryDto {
    cityOrigin: string;
    cityDestination: string;
    hourExit: string;
    hourArrival: string;
    dateExit: Date;
    dateArrival: Date;
    cost: number;
    status: string;
    idBus: BusDto;
    typeSeatDetail?: TypeSeatDetailDto[]
}

export class UpdateItineraryDto {
    cityOrigin?: string;

    cityDestination?: string;
    hourExit?: string;
    hourArrival?: string;
    dateExit: Date;
    dateArrival: Date;
    cost?: number;
    status?: string;
    idBus?: BusDto;
    state?: boolean;
    typeSeatDetail?: TypeSeatDetailDto[]
}