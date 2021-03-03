import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./auth/AuthContext";
import {Link, useHistory, Redirect} from "react-router-dom";
import OfficeService from "../services/office.service";

const MainNav: React.FC = () => {
    const {isLoggedIn, logout, usertype, officeId} = useContext(AuthContext);
    const history = useHistory();
    const [officeName, setOfficeName] = useState<string>();

    const logOutHandler = () => {
        logout();
        setOfficeName(undefined);
        return <Redirect to='/' />;
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
                if(!match) {
                    const redirectPath = alloedPaths ? alloedPaths[0] : '/';
                    history.push(redirectPath);
                }

                if (history.location.pathname === '/') {
                    if(usertype === 'SYS_ADMIN') {
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
    })

    useEffect(() => {
        if(officeId)
        OfficeService.getOfficeByUuid(officeId)
            .then(res => {
                setOfficeName(res.parsedBody?.data.name)
            })
    }, [officeId])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <h3>CANDIDATOSGO {officeName ? <small> ( {officeName} )</small> : null}</h3>
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