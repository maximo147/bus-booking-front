import { TypeSeatDetail } from "../../buses/model/type-seat-detail.model";
import { Booking } from "./booking.model";
import { Itinerary } from "./itinerary.model";


export class BookingDetail {
    id_booking_details: string;
    idBooking: Booking;
    idItinerary: Itinerary;
    idTypeSeatDetail: TypeSeatDetail
    status: boolean;
    state: boolean;
}