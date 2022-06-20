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


export interface IUserAccountsTable {
    data: any,
    total: number;
}

export interface IRole {
    id: number;
    role_desc: string;
}
