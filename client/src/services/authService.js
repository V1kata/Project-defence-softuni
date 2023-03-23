import { requestFactory } from "../utils/bidItemUtils";

export function authServiseFactory(token) {
    const request = requestFactory(token);

    return {
        register: (data) => request.post('/users/register', data),
        login: (data) => request.post('/users/login', data),
        logout: () => request.get('/users/logout')
    }
}