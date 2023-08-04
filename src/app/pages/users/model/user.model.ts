import { Role } from "./role.model";

export class User {
    id_user: string;
    dni: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    dateBirthday: Date;
    role: Role;
    state: boolean;
}