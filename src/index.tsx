import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CandidatePage from "./pages/CandidatePage";
import CandidatosDashboard from "./pages/Dashboard";
import Login from "./components/Login";
import MainNav from "./components/MainNav";
import UsuariosPage from "./pages/Usuarios";
import ConfigurationPage from "./pages/ConfigurationPage";
import CandidatesToCallPage from "./pages/CandidatesToCall";
import Diary from "./pages/Diary";
import {MainProvider} from "./store/MainReducer";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <MainProvider>
                <MainNav/>
                <Switch>
                    <Route path="/agenda" component={Diary} />
                    <Route path="/candidatos-por-llamar" component={CandidatesToCallPage}/>
                    <Route path="/configuracion" component={ConfigurationPage}/>
                    <Route path="/usuarios" component={UsuariosPage} />
                    <Route path="/candidatos/:id" component={CandidatePage}/>
                    <Route path="/candidatos" component={CandidatosDashboard}/>
                    <Route exact path="/" component={Login}/>
                </Switch>
            </MainProvider>
        </BrowserRouter>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
