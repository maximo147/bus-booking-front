export interface TypeSeatResponse {
    metadata: Metadata;
    data:     Datum[];
}

export interface Datum {
    id_type_seat:      string;
    name:              string;
    serviceAdditional: string;
    costAdditional:    number;
    state:             boolean;
}

export interface Metadata {
    id_response: string;
    datetime:    Date;
    status:      string;
    message:     string;
}