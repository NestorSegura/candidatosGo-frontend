import * as React from "react";
import {useContext, useEffect, useState} from "react";
import './SideNavStyles.css';
import {NavLink} from "react-router-dom";
import {MainContext} from "../../store/MainReducer";

const SideNav: React.FC = () => {

    const {loggedIn} = useContext(MainContext);

    const [showCandidates, setShowCandidates] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showConfiguration, setShowConfiguration] = useState<boolean>(false);
    const [showDailyInterview, setShowDailyInteview] = useState<boolean>(false);
    const [showPendingForCall, setShowPendingForCall] = useState<boolean>(false);
    const [userType, setUserType] = useState<string>();
    const [openNav, setOpenNav] = useState(false);

    const renderContentForUserType = () => {
        switch (userType) {
            case 'SYS_ADMIN': {
                setShowUsers(true);
                break;
            }
            case 'OFFICE': {
                setShowUsers(true);
                setShowCandidates(true);
                //setShowConfiguration(true);
                setShowDailyInteview(true);
                setShowPendingForCall(true);
                break;
            }
            case 'ASISTENCE': {
                setShowCandidates(true);
                setShowUsers(true);
                setShowConfiguration(false);
                setShowDailyInteview(true);
                setShowPendingForCall(true);
                break;
            }
            default: {
                setShowCandidates(false);
                setShowUsers(false);
                setShowConfiguration(false);
                setShowDailyInteview(false);
                setShowPendingForCall(false);
            }
        }
    }

    useEffect(() => {
        const userTypeFromLocalStore = localStorage.getItem("usertype");
        if (loggedIn && userType !== userTypeFromLocalStore) {
            setUserType(userTypeFromLocalStore as string);
        }
    }, [loggedIn, userType])

    useEffect(() => {
        renderContentForUserType();
    })

    return (
        <>
            <div className={`col-md-3 col-lg-2 d-md-block bg-primary sidebar ${openNav ? 'open' : ''}`}>
                <div className="d-flex justify-content-end">
                    <button className="navClose btn btn-light" onClick={() => setOpenNav(false)}>
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                <ul className="nav flex-columnd">
                    {showCandidates &&
                    <li className="nav-item">
                        <NavLink to="/candidatos" className="nav-link" activeClassName="active">
                            Búsqueda de Candidatos
                        </NavLink>
                    </li>
                    }
                    {
                        showPendingForCall && <li className="nav-item">
                            <NavLink to="/candidatos-por-llamar" className="nav-link" activeClassName="active">
                                Pendientes Por llamar
                            </NavLink>
                        </li>
                    }
                    {
                        showDailyInterview && <li className="nav-item">
                            <NavLink to="/agenda" className="nav-link" activeClassName="active">
                                Agenda diaria
                            </NavLink>
                        </li>
                    }
                    {
                        showUsers &&
                        <li className="nav-item">
                            <NavLink to="/usuarios" className="nav-link" activeClassName="active">
                                Usuarios del sistema
                            </NavLink>
                        </li>
                    }
                    {
                        showConfiguration &&
                        <li className="nav-item">
                            <NavLink to="/configuracion" className="nav-link" activeClassName="active">
                                Configuración
                            </NavLink>
                        </li>
                    }
                </ul>
            </div>
            <button className="navOpen btn btn-primary" onClick={() => setOpenNav(true)}><i className="bi bi-list"/>
            </button>
        </>
    )
}

export default SideNav;