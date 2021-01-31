import * as React from "react";
import {useContext, useEffect} from "react";
import {AuthContext} from "./auth/AuthContext";
import {Link, useHistory} from "react-router-dom";

const MainNav: React.FC = () => {
    const {isLoggedIn, logout, usertype} = useContext(AuthContext);
    const history = useHistory();

    const logOutHandler = () => {
        logout();
        return history.push('/');
    }

    let userRootRights = new Map<string, string[]>();
    userRootRights.set('SYS_ADMIN', ['/usuarios']);
    userRootRights.set('OFFICE', ['usuarios', 'candidatos', 'configuracion']);
    userRootRights.set('ASISTENCE', ['/candidatos']);

    const redirectHandler = () => {
        if (isLoggedIn) {

            const {pathname} = history.location;
            if (usertype) {
                let alloedPaths = userRootRights.get(usertype);
                const match = alloedPaths?.find(path => pathname.includes(path));
                if(!match) {
                    const redirectPath = alloedPaths ? alloedPaths[0] : '/';
                    history.push(redirectPath);
                }
            }

            if (history.location.pathname === '/') {
                history.push('/candidatos')
            }
        } else {
            history.push('/')
        }
    }

    useEffect(() => {
        redirectHandler();
    })

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CANDIDATOSGO</Link>
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