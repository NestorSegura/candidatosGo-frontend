import {httpFetch} from "./fetch";

export interface LoginResponse {
    success: boolean;
    token: string;
    expires: string;
    user: {
        user_type: string;
        office_id: string;
    };
    msg?:string;
}

export interface ErrorMessageResponse {
    success: boolean;
    msg: string;
}

export interface LogoutResponse {
    success: boolean;
    msg: string;
}

const AuthService = {
    basePath: process.env.NODE_ENV === 'production' ? 'http://candidatosgo.es:7000' : 'http://localhost:7000',
    login: async (username: string, password: string) : Promise<LoginResponse | ErrorMessageResponse> => {
        const response = await fetch(`${AuthService.basePath}/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        return response.json();
    },
    register: async (username: string,
                     password: string,
                     userType: string,
                     office_id: string,
                     sponsor_uuid?: string) : Promise<LoginResponse | ErrorMessageResponse> => {
        const response = await fetch(`${AuthService.basePath}/register`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                userType,
                office_id,
                sponsor_uuid
            })
        })
        return response.json();
    },
    logout: (): Promise<LogoutResponse> => {
        return httpFetch.post<LoginResponse>(`${AuthService.basePath}/logout`, {})
            .then(res => {
                localStorage.removeItem('token');
                localStorage.removeItem('expires');
                localStorage.removeItem('userType');
                localStorage.removeItem('office_id')
                return res;
            })
            .catch(error => error)
    }
}

export default AuthService;