import { Bus } from "../../buses/model/bus.model";
import { TypeSeatDetail } from "../../buses/model/type-seat-detail.model";



export class Itinerary {

    id_itinerary: string;
    cityOrigin: string;
    cityDestination: string;
    hourExit: string;
    hourArrival: string;
    dateExit: Date;
    dateArrival: Date;
    cost: number;
    status: string;
    idBus: Bus;
    state: boolean;
    typeSeatDetail?: TypeSeatDetail[]
}