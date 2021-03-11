import * as React from "react";
import {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import moment from 'moment';
import AuthService from "../../services/auth.service";
import OfficeService from "../../services/office.service";

interface AuthContextProps {
    isLoggedIn: boolean;
    usertype?: string;
    logout: () => void;
    login: (localstorage: LocalStorageProps, callback: Function) => void;
    officeId: string;
    office_name?: string;
}

export interface LocalStorageProps {
    expiresIn: string;
    token: string;
    userType: string;
    office_id: string;
}


export const AuthContext = React.createContext<AuthContextProps>({
    isLoggedIn: false,
    usertype: '',
    officeId: '',
    logout: () => {
    },
    login: () => {
    },
});

const AutProvicer: React.FC = ({children}: PropsWithChildren<ReactNode>) => {

    const getExpiration = (expires: (string)): (moment.Moment) => {
        return moment(JSON.parse(expires));
    }

    const isLoggedInCheck = (expires: moment.Moment): boolean => moment().isBefore(expires);

    const expiresString = localStorage.getItem('expires') ?? null;
    const expires: (moment.Moment | null) = expiresString ? getExpiration(expiresString) : null;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>((!!expires && isLoggedInCheck(expires)));
    const [token, setToken] = useState<string | null>(null);
    const [userType, setUserType] = useState<string>(localStorage.getItem('usertype') ?? '');
    const [officeId, setOfficeId] = useState<string>(localStorage.getItem('office_id') ?? '');
    const [officeName, setOfficeName] = useState<string>();

    const logout = async (): Promise<boolean> => {
        const res = await AuthService.logout();
        setIsLoggedIn(false);
        setOfficeName(undefined);
        setOfficeId('');
        setToken(null);
        return res.success
    }

    const setLoginHandler = async (localstorage: LocalStorageProps, callback: Function) => {
        const expiresArray = Array.from(localstorage.expiresIn);
        const expires = moment().add(JSON.parse(expiresArray[0]), expiresArray[1]);

        localStorage.setItem('token', localstorage.token);
        localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
        localStorage.setItem('usertype', localstorage.userType);
        localStorage.setItem('office_id', localstorage.office_id);

        if (expires) {
            setIsLoggedIn(isLoggedInCheck(expires))
            setUserType(userType)
            setOfficeId(localstorage.office_id);
        }

        OfficeService.getOfficeByUuid(officeId)
            .then((res) => {
                setOfficeName(res.parsedBody?.data.name);
                callback();
            }).catch(error => {
            console.error(error);
            callback();
        });

    }

    useEffect(() => {
        const expiresString = localStorage.getItem('expires') ?? null;
        const expires: (moment.Moment | null) = expiresString ? getExpiration(expiresString) : null;

        let shouldUpdate = expires && isLoggedInCheck(expires) && !isLoggedIn;
        if (shouldUpdate) {
            setIsLoggedIn(true);
            setToken(token);
            setOfficeId(localStorage.getItem('office_id') ?? '')
        }
    }, [token, isLoggedIn])

    useEffect(() => {
        if (officeId) {
            OfficeService.getOfficeByUuid(officeId)
                .then(res => {
                    if (officeName !== res.parsedBody?.data.name) {
                        setOfficeName(res.parsedBody?.data.name)
                    }
                })
        }
    }, [officeId, isLoggedIn])

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            logout,
            usertype: userType,
            officeId,
            login: setLoginHandler,
            office_name: officeName
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AutProvicer;