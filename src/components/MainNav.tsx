import * as React from "react";
import {useContext, useEffect} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {AuthContext} from "../store/auth/AuthReducer";
import AuthService from "../services/auth.service";

const MainNav: React.FC = () => {
    const {loggedIn, userType, officeUuid, dispatch} = useContext(AuthContext);

    const history = useHistory();

    const logOutHandler = () => {
        dispatch && dispatch({
            type: 'LOGIN_REQUEST'
        })
        AuthService.logout()
            .then(() => dispatch && dispatch({
                type: 'LOGOUT_SUCCESS',
                payload: {
                    login: false,
                }
            }))
            .catch(error => dispatch && dispatch({
                type: 'LOGOUT_FAIL',
                payload: {
                    login: false,
                    error: error
                }
            }));
        return <Redirect to='/'/>;
    }


    let userRootRights = new Map<string, string[]>();
    userRootRights.set('SYS_ADMIN', ['usuarios']);
    userRootRights.set('OFFICE', ['candidatos', 'usuarios', 'configuracion']);
    userRootRights.set('ASISTENCE', ['candidatos']);

    const redirectHandler = () => {
        if (loggedIn) {

            const {pathname} = history.location;
            if (userType) {
                let alloedPaths = userRootRights.get(userType);
                const match = alloedPaths?.find(path => pathname.includes(path));
                if (!match) {
                    const redirectPath = alloedPaths ? alloedPaths[0] : '/';
                    history.push(redirectPath);
                }

                if (history.location.pathname === '/') {
                    if (userType === 'SYS_ADMIN') {
                        history.push('/usuarios')
                    } else {
                        history.push('/candidatos')
                    }
                }
            }


        } else {
            history.push('/')
        }
    }

    useEffect(() => {
        redirectHandler();
    }, [loggedIn, userType, officeUuid])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <h3>CANDIDATOSGO {false ? <small> ( {null} )</small> : null}</h3>
                {
                    loggedIn ? (
                        <div className="d-flex">
                            <button className="btn btn-outline-danger" type="button" onClick={logOutHandler}>logout
                            </button>
                        </div>
                    ) : null
                }
            </div>
        </nav>
    )
}

export default MainNav;