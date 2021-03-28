import * as React from "react";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import {UIOffice} from "../../services/models/UIOffice";
import OfficeService from "../../services/office.service";
import {deepEqual} from "../../utils/comparisonMethods";
import {UIUser} from "../../services/models/UIUser";
import UserService from "../../services/user.service";
import {AuthContext} from "../../store/auth/AuthReducer";

interface Fields {
    value: string;
    label: string;
    allow: string[];
}

interface CreateUsersFormInit {
    userToEdit?: UIUser,
    editionMode: boolean;
}

const sysadmin = 'SYS_ADMIN';

const CreateUsersForm: React.FC<CreateUsersFormInit> = (props) => {
    const [userName, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [_userType, setUserType] = useState<string>();
    const [success, setSuccess] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>();
    const [allowdFileds, setAllowedFields] = useState<Fields[]>();
    const [sponsors, setSponsors] = useState<UIOffice[]>([]);
    const [sponsor, setSponsor] = useState<string>();

    const {userType, officeUuid} = useContext(AuthContext);

    function clearForm() {
        setUsername('');
        setPassword('');
        setUserType('NO_VALID');
    }

    function createUpdateUser() {
        if (!props.editionMode) {
            if ((userName && password && _userType)) {
                AuthService.register(userName, password, _userType, officeUuid as string, sponsor)
                    .then(res => {
                        setSuccess(res.success);
                        setMsg(res.msg);
                        clearForm();
                        setTimeout(() => {
                            setSuccess(false)
                            setMsg(undefined);
                        }, 5000);
                    })
                    .catch(error => console.error(error))
            }
        } else {
            const updatedUser: UIUser = {
                id: props.userToEdit?.id as number,
                name: userName as string,
                user_type: _userType as string,
                sponsor_uuid: sponsor,
                office_id: officeUuid as string,
            }
            UserService.updateUser(updatedUser, password)
                .then(response => {
                    setMsg(response.parsedBody?.msg);
                    setSuccess(!!response.parsedBody?.success)
                    clearForm();
                    setTimeout(() => {
                        setSuccess(false)
                        setMsg(undefined);
                    }, 5000);
                })
                .catch(error => {
                    setMsg(`Could not update user, error: ${error}`)
                    setTimeout(() => {
                        setMsg(undefined);
                    }, 5000);
                })
        }

    }

    function onUserTypeHandler(e: ChangeEvent<HTMLSelectElement>) {
        setUserType(e.target.value);
    }

    function onSponsorChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
        setSponsor(e.target.value);
    }

    useEffect(() => {
        const userTypesFields: Fields[] = [
            {
                value: sysadmin,
                label: "Administrador de sistema",
                allow: [sysadmin]
            },
            {
                value: "ASISTENCE",
                label: "Secretario(a)",
                allow: [sysadmin, 'OFFICE']
            },
            {
                value: "OFFICE",
                label: "Gerente / Oficina",
                allow: [sysadmin, 'OFFICE']
            }
        ]
        const allowedFields: Fields[] = userTypesFields.filter(field => {
            return field.allow.find(userTypeField => userTypeField === userType)
        })
        setAllowedFields(allowedFields)

    }, [userType])

    useEffect(() => {
        const fetchData = async () => {
            let allOffices = await OfficeService.getAllOffices();
            if (userType === sysadmin && allOffices.parsedBody?.data && !deepEqual(sponsors, allOffices.parsedBody?.data)) {
                setSponsors(allOffices.parsedBody.data)
            }
        };

        fetchData();
    }, [userType, sponsors])

    function userIsAdmin() {
        return userType === sysadmin;
    }

    useEffect(() => {
        if (props.userToEdit && userName !== props.userToEdit.name) {
            setUsername(props.userToEdit.name)
            setUserType(props.userToEdit.user_type)
            setSponsor(props.userToEdit.sponsor_uuid)
        }
    }, [props.userToEdit, userName])

    return (
        <div>

            {
                props.editionMode ? <h1 className="mb-4">Modificar Usuario</h1> :
                    <h1 className="mb-4">Crear Usuarios</h1>
            }

            <form className="row g-3 mb-3">
                <div className="col-12 col-sm-6  mb-3">
                    <label htmlFor="username" className="form-label me-3">Nombre de usuario: </label>
                    <input type="text"
                           className="form-control" id="username"
                           value={userName ? userName : ""}
                           onChange={e => setUsername(e.target.value)}
                           placeholder="nombre de usuario"/>
                </div>
                <div className="col-12 col-sm-6  mb-3">
                    <label htmlFor="password" className="form-label me-3">Clave: </label>
                    <input type="password"
                           className="form-control" id="password"
                           value={password ? password : ""}
                           onChange={e => setPassword(e.target.value)}
                           placeholder="clave de usuario"/>
                </div>
                {allowdFileds ? <div className="col-12 col-sm-6">
                    <label htmlFor="usertype" className="form-label me-3">Tipo de usuario </label>
                    <select className="form-select" aria-label="Default select example" id="usertype"
                            onChange={onUserTypeHandler} defaultValue='NO_VALID' value={_userType}>
                        <option value="NO_VALID" disabled>Elegir tipo de usuario</option>
                        {
                            allowdFileds.map((field, index) =>
                                <option key={index} value={field.value}>{field.label}</option>)
                        }
                    </select>
                </div> : null}

                {
                    sponsors.length > 0 && userIsAdmin() ? <div className="col-12 col-sm-6">
                        <label htmlFor="usertype" className="form-label me-3">Promotor </label>
                        <select className="form-select" aria-label="Default select example" id="usertype"
                                onChange={onSponsorChangeHandler} defaultValue='NO_VALID' value={sponsor}>
                            <option value="NO_VALID" disabled>Elegir promotor</option>
                            {
                                sponsors.map((sponsorOffice, index) =>
                                    <option key={index} value={sponsorOffice.uuid}>{sponsorOffice.name}</option>)
                            }
                        </select>
                    </div> : null
                }
                <div className="col-12">
                    {
                        props.editionMode ?
                            (<button type="button" className="btn btn-outline-primary"
                                     onClick={createUpdateUser}>
                                Guardar cambios
                            </button>) :
                            (<button type="button" className="btn btn-outline-primary"
                                     onClick={createUpdateUser}>
                                Crear usuario
                            </button>)
                    }

                </div>
            </form>
            {
                success && msg ? <div className="alert alert-success" role="alert">
                    {msg}
                </div> : msg ? <div className="alert alert-danger" role="alert">
                    {msg}
                </div> : null
            }

        </div>
    )
}

export default CreateUsersForm;