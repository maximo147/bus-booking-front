import { User } from "src/app/core/models/auth.models";
import { BookingDetail } from "./booking-detail.model";

export class Booking {
    id_booking: string;
    dateBooking: Date;
    costTotal: number;
    user: User;
    state: boolean;
    bookingDetail: BookingDetail[]
}