export interface RoleDto {
    id_role: string;
    name: string;
    description: string;
    state: boolean;
}

export interface CreateRoleDto {
    name: string;
    description: string;
}

export interface UpdateRoleDto {
    name?: string;
    description?: string;
    state?: boolean;
}