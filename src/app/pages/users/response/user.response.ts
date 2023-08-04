export interface UserResponse {
    metadata: Metadata;
    data:     Datum[];
}

export interface Datum {
    id_user:      string;
    dni:          string;
    name:         string;
    lastName:     string;
    username:     string;
    password:     string;
    dateBirthday: Date;
    state:        boolean;
    role:         Role;
}

export interface Role {
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
