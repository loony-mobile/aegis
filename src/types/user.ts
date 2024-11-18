// Auth
export interface User {
    fname: string,
    lname: string,
    email: string,
    uid: number,
}

export enum AuthStatus {
    UNAUTHORIZED = 1,
    AUTHORIZED = 2,
    IDLE = 3,
}

export interface Auth {
    status: AuthStatus,
    user: User | undefined | null
}

export interface AuthContextProps extends Auth {
    setAuthContext: React.Dispatch<React.SetStateAction<Auth>>
}
