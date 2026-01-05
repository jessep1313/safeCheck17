export interface Role {
    id: number
    name: string
    users: number,
    permissions: number,
    created_at: string,
    updated_at: string
}

export interface RoleEdit extends Omit<Role, 'permissions'> {
    permissions: string[]
}