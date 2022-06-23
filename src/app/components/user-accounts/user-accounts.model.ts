export interface IUserAccountForm {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role_id: number;
    access_permission: number[]
}

export interface ICreateUserAccountResponse {
    data?: {
        user: {
            firstname: string;
            lastname: string;
            username: string;
            is_active: string;
            updated_at: string;
            created_at: string;
            id: number;
        },
        message: string;
    };
    message?: any
}

export interface IGetUserAccountByIdResponse {
    id: number;
    firstname: string;
    lastname: string;
    is_active: string;
    username: string;
    role: {
        role_id: number;
        role_desc: string;
    }
    created_at: string;
    deleted_at: string;
    access_permission: any[]
}

export interface IUserAccountsTable {
    data: any,
    total: number;
}

export interface IRole {
    id: number;
    role_desc: string;
}
