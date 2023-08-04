export interface RoleResponse {
    metadata: Metadata;
    data:     Datum[];
}

export interface Datum {
    id_role:     string;
    name:        string;
    description: string;
    state:       boolean;
}

export interface Metadata {
    id_response: string;
    datetime:    Date;
    status:      string;
    message:     string;
}
