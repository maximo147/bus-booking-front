export interface BusResponse {
    metadata: Metadata;
    data:     Datum[];
}

export interface Datum {
    id_bus:          string;
    plate:           string;
    operatorName:    string;
    operatorDni:     string;
    brand:           string;
    minSeat:         number;
    maxSeat:         number;
    amountTourist:   number;
    amountExecutive: number;
    amountPremium:   number;
    state:           boolean;
}

export interface Metadata {
    id_response: string;
    datetime:    Date;
    status:      string;
    message:     string;
}
