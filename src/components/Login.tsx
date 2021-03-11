import * as React from 'react';
import {useContext, useState} from 'react';
import AuthService, {ErrorMessageResponse, LoginResponse} from "../services/auth.service";
import {AuthContext, LocalStorageProps} from "./auth/AuthContext";
import {Redirect, useHistory} from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const {login} = useContext(AuthContext);

    const handleLogin = async () => {
        AuthService.login(username, password)
            .then(async (response) => {
                if (response.success) {
                    response = response as LoginResponse;
                    const localstorage: LocalStorageProps = {
                        token: response.token,
                        expiresIn: response.expires,
                        userType: response.user.user_type,
                        office_id: response.user.office_id
                    }
                    await login(localstorage, () => {
                        setError('');
                        return <Redirect to="/" />
                    });
                } else {
                    response = response as ErrorMessageResponse
                    setError(response.msg)
                }
            })
            .catch(error => {
                console.error(error);
                setError(`TECHNICAL ERROR ${error}`);
            });
    }

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