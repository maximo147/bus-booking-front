export interface BookingResponse {
    metadata: Metadata;
    data:     Datum[];
}

export interface Datum {
    id_booking:  string;
    dateBooking: Date;
    costTotal:   number;
    user:        User;
    state:       boolean;
}

export interface User {
    id_user: string;
}

export interface Metadata {
    id_response: string;
    datetime:    Date;
    status:      string;
    message:     string;
}
