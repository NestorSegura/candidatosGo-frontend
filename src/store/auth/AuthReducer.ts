import * as React from "react";
import moment from "moment";
import {Dispatch} from "react";

export const initialState = {
    loading: false,
    loggedIn: false,
    dispatch: () => null
}

export interface AuthStateI {
    loading: boolean;
    loggedIn: boolean,
    error?: string,
    officeUuid?: string;
    userUuid?: string;
    userType?: string;
    dispatch: Dispatch<AuthAction>
}

interface successResponse {
    success: boolean;
    officeUuid: string;
    userUuid: string;
    userType: string;
    login: boolean
}

export type AuthAction =
    | { type: 'INIT_STATE'}
    | { type: 'LOGIN_REQUEST' }
    | { type: 'LOGIN_SUCCESS', payload: successResponse }
    | { type: 'LOGIN_ERROR', payload: { error: string } }
    | { type: 'LOGOUT_REQUEST'}
    | { type: 'LOGOUT_SUCCESS', payload: { login: boolean}}
    | { type: 'LOGOUT_FAIL', payload: { login: boolean, error: string}};

export const AuthReducer: React.Reducer<AuthStateI, AuthAction> = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {...state, loading: true};
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                loggedIn: true,
                officeUuid: action.payload.officeUuid,
                userUuid: action.payload.userUuid,
                userType: action.payload.userType
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case "LOGOUT_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "LOGOUT_SUCCESS":

            return {
                ...state,
                loading: false,
                loggedIn: action.payload.login
            }
        case "LOGOUT_FAIL":
            return {
                ...state,
                loading: false,
                loggedIn: action.payload.login,
                error: action.payload.error
            }
        case "INIT_STATE": {
            const expires = localStorage.getItem('expires');
            const userType = localStorage.getItem('usertype');
            const office_uuid = localStorage.getItem('office_id');

            return {
                ...state,
                loading: false,
                loggedIn: moment().isBefore(expires ? JSON.parse(expires): ''),
                officeUuid: office_uuid as string,
                userType: userType as string,
            }
        }
        default:
            return state;
    }
}
