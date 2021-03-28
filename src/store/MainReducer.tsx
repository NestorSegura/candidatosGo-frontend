import * as React from "react";
import {AuthReducer, AuthStateI, initialState} from "./auth/AuthReducer";

export const MainContext = React.createContext<Partial<AuthStateI>>({});

export const MainProvider: React.FC = (props) => {
    const [state, dispatch] = React.useReducer(AuthReducer, initialState);

    return (
        <MainContext.Provider
            value={{
                loading: state.loading,
                loggedIn: state.loggedIn,
                error: state.error,
                officeUuid: state.officeUuid,
                userType: state.userType,
                userUuid: state.userUuid,
                dispatch,
            }}
        >
            {props.children}
        </MainContext.Provider>
    );
}