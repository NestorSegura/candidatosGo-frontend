import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import AuthService, {ErrorMessageResponse, LoginResponse} from "../services/auth.service";
import moment from "moment";
import {MainContext} from "../store/MainReducer";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const {authDispatch, error, officeDispatch} = useContext(MainContext);

    const handleLogin = async () => {
        authDispatch && authDispatch({
            type: 'LOGIN_REQUEST',
            payload: null
        })
        AuthService.login(username, password)
            .then(async (response) => {
                if (response.success) {
                    response = response as LoginResponse;
                    const expiresArray = Array.from(response.expires);
                    const expires = moment().add(JSON.parse(expiresArray[0]), expiresArray[1]);

                    localStorage.setItem('token', response.token);
                    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
                    localStorage.setItem('usertype', response.user.user_type);
                    localStorage.setItem('office_id', response.user.office_id);

                    authDispatch && authDispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            success: true,
                            login: true,
                            officeUuid: response.user.office_id,
                            userUuid: '',
                            userType: response.user.user_type
                        }
                    })
                    officeDispatch && officeDispatch({
                        type: 'OFFICE_INIT',
                        payload: null
                    })

                } else {
                    response = response as ErrorMessageResponse
                    authDispatch && authDispatch({
                        type: 'LOGIN_ERROR',
                        payload: {
                            error: response.msg
                        }
                    })
                }
            })
            .catch(error => {
                console.error(error);
                authDispatch && authDispatch({
                    type: 'LOGIN_ERROR',
                    payload: {error: `TECHNICAL ERROR ${error}`}
                })
            });
    }

    useEffect(() => {
        if (firstLoad) {
            authDispatch && authDispatch({type: 'INIT_STATE', payload: null})
            setFirstLoad(false);
        }
    }, [firstLoad])

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                <form className="col-10 col-sm-4">
                    <h1>Entrar al sistema</h1>
                    <div className="mb-3">
                        <input className="form-control" placeholder="nombre de usuario" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="contraseña" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>entrar</button>
                    </div>
                    {
                        !!error ? (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ) : null
                    }
                </form>
            </div>
        </div>
    )
}

export default Login;