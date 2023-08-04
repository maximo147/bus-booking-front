import { TypeSeatDetailDto } from "../../buses/dto/type-seat-detail.dto";
import { BookingDto } from "./booking.dto";
import { ItineraryDto } from "./itinerary.dto";

export interface BookingDetailDto {
    id_booking_details: string;
    idBooking: BookingDto;
    idItinerary: ItineraryDto;
    idTypeSeatDetail: TypeSeatDetailDto
    status: boolean;
    state: boolean;
}

export interface CreateBookingDetailDto {
    idBooking: BookingDto;
    idItinerary: ItineraryDto;
    idTypeSeatDetail: TypeSeatDetailDto
}

export interface UpdateBookingDetailDto {
    idBooking?: BookingDto;
    idItinerary?: ItineraryDto;
    idTypeSeatDetail: TypeSeatDetailDto
    status?: boolean;
    state?: boolean;
}