import { User } from "../interfaces/user";
import axios from "axios"
import * as token from './tokeninterceptor'

const URI: string = "https://calculator-react-server.herokuapp.com/api/v1/users";

export const signin = async (user: User) => {
    return await axios.post(`${URI}/signin`, user);
}

export const signup = async (user: User) => {
    return await axios.post(`${URI}/signup`, user);
}

export const getUser = async () => {
    const instance = axios.create({ headers: { authorization: token.getBearerToken() }});
    return await instance.get(URI);
}

export const postHistoryEntry = async (entry: string) => {
    const instance = axios.create({ headers: { authorization: token.getBearerToken() }});
    return await instance.post(`${URI}/history`, { entry: entry });
}

// export const deleteHistoryEntry = async () => {

// }

// export const putHistoryEntry = async (historyID: string) => {

// }

// export const deleteHistory = async (historyID: string) => {

// }