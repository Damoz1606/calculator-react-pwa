const cookieName : string = "token";

export const saveToken = (token: string) => {
    localStorage.setItem(cookieName, token);
};

export const loggedIn = () => {
    return !!localStorage.getItem(cookieName);
}

export const getBearerToken = () => {
    return `Bearer ${localStorage.getItem(cookieName)}`
}

export const deleteToken = () => {
    localStorage.removeItem(cookieName);
}