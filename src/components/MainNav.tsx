import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import AuthService from "../services/auth.service";
import {MainContext} from "../store/MainReducer";
import OfficeService from "../services/office.service";

const MainNav: React.FC = () => {
    const {loggedIn, userType, officeUuid, authDispatch, officeDispatch, office} = useContext(MainContext);

    const history = useHistory();

    const logOutHandler = () => {
        authDispatch && authDispatch({
            type: 'LOGIN_REQUEST',
            payload: null
        })
        officeDispatch && officeDispatch({
            type: 'OFFICE_REMOVE',
            payload: null
        })
        AuthService.logout()
            .then(() => authDispatch && authDispatch({
                type: 'LOGOUT_SUCCESS',
                payload: {
                    login: false,
                }
            }))
            .catch(error => authDispatch && authDispatch({
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


    useEffect(() => {
        if (loggedIn && officeUuid && officeDispatch) {
            officeDispatch({
                type: 'OFFICE_REQUEST',
                payload: null
            })
            OfficeService.getOfficeByUuid(officeUuid)
                .then(res => {

                    officeDispatch({
                        type: 'OFFICE_SUCCESS',
                        payload: {
                            name: res.parsedBody?.data.name,
                        }
                    })

                })
                .catch(error => officeDispatch({
                    type: 'OFFICE_FAIL',
                    payload: {
                        error
                    }

                }))
        }
    }, [loggedIn, officeUuid])


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <h3>CANDIDATOSGO {office ? <small> ( {office} )</small> : null}</h3>
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