import { ItineraryDto } from "../../booking/dto/itinerary.dto";
import { BusDto } from "./bus.dto";
import { TypeSeatDto } from "./type-seat.dto";


export interface TypeSeatDetailDto {
    id_type_seat_detail: string;
    idTypeSeat: TypeSeatDto;
    busy: string;
    state: boolean;
    idItinerary: ItineraryDto;
}

export interface CreateTypeSeatDetailDto {
    idTypeSeat: TypeSeatDto;
    busy: string;
    idItinerary: ItineraryDto;
}

export interface UpdateTypeSeatDetailDto {
    idTypeSeat?: TypeSeatDto;
    busy?: string;
    state?: boolean;
    idItinerary?: ItineraryDto;
}