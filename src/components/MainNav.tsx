import * as React from "react";
import {useContext, useEffect} from "react";
import {AuthContext} from "./auth/AuthContext";
import {Redirect, useHistory} from "react-router-dom";

const MainNav: React.FC = () => {
    const {isLoggedIn, logout, usertype, officeId, office_name} = useContext(AuthContext);
    const history = useHistory();

    const logOutHandler = () => {
        logout();
        return <Redirect to='/'/>;
    }


    let userRootRights = new Map<string, string[]>();
    userRootRights.set('SYS_ADMIN', ['usuarios']);
    userRootRights.set('OFFICE', ['candidatos', 'usuarios', 'configuracion']);
    userRootRights.set('ASISTENCE', ['candidatos']);

    const redirectHandler = () => {
        if (isLoggedIn) {

            const {pathname} = history.location;
            if (usertype) {
                let alloedPaths = userRootRights.get(usertype);
                const match = alloedPaths?.find(path => pathname.includes(path));
                if (!match) {
                    const redirectPath = alloedPaths ? alloedPaths[0] : '/';
                    history.push(redirectPath);
                }

                if (history.location.pathname === '/') {
                    if (usertype === 'SYS_ADMIN') {
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
    }, [isLoggedIn, logout, usertype, officeId, office_name])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <h3>CANDIDATOSGO {office_name ? <small> ( {office_name} )</small> : null}</h3>
                {
                    isLoggedIn ? (
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