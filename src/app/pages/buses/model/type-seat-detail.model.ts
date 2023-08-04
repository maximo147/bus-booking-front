import { Itinerary } from "../../booking/model/itinerary.model";
import { Bus } from "./bus.model";
import { TypeSeat } from "./type-seat.model";

export class TypeSeatDetail {
    id_type_seat_detail: string;
    busy: string;
    state: boolean;
    idTypeSeat: TypeSeat;
    idItinerary: Itinerary;
}


