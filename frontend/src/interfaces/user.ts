export interface User {
    _id?: string,
    username: string,
    password: string,
    history?: {
        _id?: string,
        entry: string
    }
}