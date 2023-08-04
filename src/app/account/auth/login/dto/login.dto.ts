

export class LoginDto{
    username: string;
    password: string;
}

export class ACCESS_TOKEN{
    metadata: METADATA;
}

export interface METADATA{
    access_token: string;
    username: string;
    role: string;
    id: string;
}