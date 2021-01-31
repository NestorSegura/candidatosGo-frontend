import * as React from "react";
import {useContext, useEffect, useState} from "react";
import './SideNavStyles.css';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";

const SideNav: React.FC = () => {

    const {isLoggedIn} = useContext(AuthContext);

    const [showCandidates, setShowCandidates] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showConfiguration, setShowConfiguration] = useState<boolean>(false);
    const [showDailyInterview, setShowDailyInteview] = useState<boolean>(false);
    const [showPendingForCall, setShowPendingForCall] = useState<boolean>(false);
    const [userType, setUserType] = useState<string>();

    const renderContentForUserType = () => {
        switch (userType) {
            case 'SYS_ADMIN': {
                setShowUsers(true);
                setShowCandidates(false);
                setShowConfiguration(false);
                break;
            }
            case 'OFFICE': {
                setShowUsers(true);
                setShowCandidates(true);
                setShowConfiguration(true);
                break;
            }
            case 'ASISTENCE': {
                setShowCandidates(true);
                setShowUsers(true);
                setShowConfiguration(false);
                break;
            }
            default: {
                setShowCandidates(false);
                setShowUsers(false);
                setShowConfiguration(false);
            }
        }
    }

    useEffect(() => {
        const userTypeFromLocalStore = localStorage.getItem("usertype");
        if (isLoggedIn && userType !== userTypeFromLocalStore) {
            setUserType(userTypeFromLocalStore as string);
        }
        renderContentForUserType();
    }, [userType, showConfiguration, showUsers, showCandidates])

    return (
        <div className="col-md-3 col-lg-2 d-md-block bg-primary sidebar">
            <ul className="nav flex-columnd">
                {showCandidates &&
                <li className="nav-item">
                    <NavLink to="/candidatos" className="nav-link" activeClassName="active">
                        Búsqueda de Candidatos
                    </NavLink>
                </li>
                }
                {showUsers &&
                <li className="nav-item">
                    <NavLink to="/usuarios" className="nav-link" activeClassName="active">
                        Usuarios
                    </NavLink>
                </li>
                }
                {showConfiguration &&
                <li className="nav-item">
                    <NavLink to="/configuracion" className="nav-link" activeClassName="active">
                        Configuración
                    </NavLink>
                </li>
                }
                {
                    showDailyInterview && <li className="nav-item">
                        <NavLink to="/configuracion" className="nav-link" activeClassName="active">
                            Entrevistas del día
                        </NavLink>
                    </li>
                }
                {
                    showPendingForCall && <li className="nav-item">
                        <NavLink to="/configuracion" className="nav-link" activeClassName="active">
                            Pendientes Por llamar
                        </NavLink>
                    </li>
                }
            </ul>
        </div>
    )
}

export default SideNav;