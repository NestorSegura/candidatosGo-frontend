import * as React from "react";
import {UIOffice} from "../../services/models/UIOffice";
import {Dispatch} from "react";
import {Action} from "../MainReducer";

export interface OfficeReducerI {
    loading: boolean;
    office?: string;
    officeUuid?: string;
    officeDispatch: Dispatch<Action>
}

export const officeInitialState: OfficeReducerI = {
    loading: false,
    officeDispatch: () => null
}

export type OfficeAction =
    | { type: 'OFFICE_INIT'}
    | { type: 'OFFICE_REQUEST' }
    | { type: 'OFFICE_SUCCESS', payload: UIOffice }
    | { type: 'OFFICE_FAIL', payload: { error: string }}
    | { type: 'OFFICE_REMOVE'};

export const OfficeReducer: React.Reducer<OfficeReducerI, OfficeAction> = (state, action) => {
    switch (action.type) {
        case "OFFICE_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "OFFICE_SUCCESS":
            return {
                ...state,
                loading: false,
                office: action.payload.name,
                officeUuid: action.payload.uuid
            }
        case "OFFICE_FAIL":
            return {
                ...state,
                loading: false,
            }
        case "OFFICE_REMOVE":
            return {
                ...state,
                office: undefined,
                officeUuid: undefined
            }
        case "OFFICE_INIT": {
            const office_uuid = localStorage.getItem('office_id');

            return {
                ...state,
                loading: false,
                officeUuid: office_uuid as string,
            }
        }
        default:
            return state;
    }
}