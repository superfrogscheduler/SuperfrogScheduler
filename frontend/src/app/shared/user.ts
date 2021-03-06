export interface User {
    id?: number,
    email?: string,
    first_name?: string,
    last_name?: string,
    created_at?: string,
    updated_at?: string,
    is_active?: boolean,
    is_staff?: boolean,
    is_admin?: boolean,
    password?: string,
}