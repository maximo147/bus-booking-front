
export interface BookingDetailResponse {
    metadata: Metadata;
    data: Datum[];
}

export interface Datum {
    id_booking_details: string;
    status: boolean;
    state: boolean;
    idBooking: null;
    idTypeSeatDetail: IDTypeSeatDetail;
    idItinerary: IDItinerary;
    user: User;
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
    status: string;
    state: boolean;
}

export interface IDTypeSeatDetail {
    id_type_seat_detail: string;
    busy: string;
    state: boolean;
}

export interface User {
    id_user: string;
    dni: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    dateBirthday: Date;
    state: boolean;
}

export interface Metadata {
    id_response: string;
    datetime: Date;
    status: string;
    message: string;
}