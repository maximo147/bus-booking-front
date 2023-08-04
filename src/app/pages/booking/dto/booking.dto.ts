import { UserDto } from "../../users/dto/user.dto";
import { BookingDetailDto } from "./booking-detail.dto";

export interface BookingDto {
    id_booking: string;
    dateBooking: Date;
    costTotal: number;
    user: UserDto;
    bookingDetail: BookingDetailDto[]
    state: boolean;
}


export interface CreateBookingDto {
    id_booking: string;
    dateBooking: Date;
    costTotal: number;
    user: UserDto;
    bookingDetail: BookingDetailDto[]
    state: boolean;
}

export interface UpdateBookingDto {
    dateBooking?: Date;
    costTotal?: number;
    user?: UserDto;
    bookingDetail: BookingDetailDto[]
    state?: boolean;
}