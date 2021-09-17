import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

const salt = 10;

export const encript = (data: string) => {
    return hashSync(data, genSaltSync(salt));
}

export const compareEncript = (data: string, dataEncripted: string) => {
    return compareSync(data, dataEncripted);
}