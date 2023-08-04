import { RoleDto } from "./role.dto";


export interface UserDto {
    id_user: string;
    dni: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    dateBirthday: Date;
    role: RoleDto;
    state: boolean;
}

export interface CreateUserDto {
    dni: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    dateBirthday: Date;
    role: RoleDto;
}

export interface UpdateUserDto {
    dni?: string;
    name?: string;
    lastName?: string;
    username?: string;
    password?: string;
    dateBirthday?: Date;
    role?: RoleDto;
    state?: boolean;
}