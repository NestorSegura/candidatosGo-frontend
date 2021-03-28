import * as React from "react";
import {AuthReducer, AuthStateI, authInitialState, AuthAction} from "./auth/AuthReducer";
import combineReducers from 'react-combine-reducers';
import {officeInitialState, OfficeReducer, OfficeReducerI} from "./office/OfficeReducer";

type MainState = {
    authReducer: AuthStateI,
    officeReducer: OfficeReducerI
}

export type Action = {
    type: string,
    payload: any;
}
type MainReducer = (state: MainState, action: Action) => MainState;

export const MainContext = React.createContext<Partial<AuthStateI & OfficeReducerI>>({});

export const MainProvider: React.FC = (props) => {

    const [reducerCombined, initialStateCombined] = combineReducers<MainReducer>({
        authReducer: [AuthReducer, authInitialState],
        officeReducer: [OfficeReducer, officeInitialState],
    })

    const [state, dispatch] = React.useReducer(reducerCombined, initialStateCombined);

    return (
        <MainContext.Provider
            value={{
                loading: state.authReducer.loading,
                loggedIn: state.authReducer.loggedIn,
                error: state.authReducer.error,
                officeUuid: state.authReducer.officeUuid,
                userType: state.authReducer.userType,
                userUuid: state.authReducer.userUuid,
                office: state.officeReducer.office,
                authDispatch: dispatch,
                officeDispatch: dispatch
            }}
        >
            {props.children}
        </MainContext.Provider>
    );
}