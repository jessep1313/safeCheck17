export type User = {
    id : string
    email : string
    name : string
    email_verified_at? : string
    created_at : string
    updated_at : string
}

export type UserBody = {
    name: string
    email: string
}

export type UserBodyKeys = typeof UserBody;