import * as React from "react";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import {AuthContext} from "../auth/AuthContext";

interface Fields {
    value: string;
    label: string;
    allow: string[];
}

const CreateUsersForm: React.FC = () => {
    const [userName, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [userType, setUserType] = useState<string>();
    const [success, setSuccess] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>();
    const [allowdFileds, setAllowedFields] = useState<Fields[]>();

    const {usertype, officeId} = useContext(AuthContext);

    function clearForm() {
        setUsername('');
        setPassword('');
        setUserType('NO_VALID');
    }

    function createUpdateUser() {
        if (userName && password && userType) {
            AuthService.register(userName, password, userType, officeId)
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
    }

    function onUserTypeHandler(e: ChangeEvent<HTMLSelectElement>) {
        setUserType(e.target.value);
    }

    useEffect(() => {
        const userTypesFields: Fields[] = [
            {
                value: "SYS_ADMIN",
                label: "Administrador de sistema",
                allow: ['SYS_ADMIN']
            },
            {
                value: "ASISTENCE",
                label: "Secretario(a)",
                allow: ['SYS_ADMIN', 'OFFICE']
            },
            {
                value: "OFFICE",
                label: "Gerente / Oficina",
                allow: ['SYS_ADMIN', 'OFFICE']
            }
        ]
        const allowedFields: Fields[] = userTypesFields.filter(field => {
            return field.allow.find(userTypeField => userTypeField === usertype)
        })
        setAllowedFields(allowedFields)

    }, [usertype])

    return (
        <div>
            <h1 className="mb-4">Crear Usuarios</h1>
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
                            onChange={onUserTypeHandler} defaultValue='NO_VALID'>
                        <option value="NO_VALID" disabled>Elegir tipo de usuario</option>
                        {
                            allowdFileds.map((field, index) =>
                                <option key={index} value={field.value}>{field.label}</option>)
                        }
                    </select>
                </div> : null}
                <div className="col-12">
                    <button type="button" className="btn btn-outline-primary"
                            onClick={createUpdateUser}>
                        Crear usuario
                    </button>
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