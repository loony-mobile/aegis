export type User = {
    user_id: string,
    fname: string,
    lname: string,
    email: string
}

export enum Auth {
    TRUE = 1,
    FALSE = 2,
    LOADING = 3
}

export enum Indicator {
    LOADING,
    IDLE
}
