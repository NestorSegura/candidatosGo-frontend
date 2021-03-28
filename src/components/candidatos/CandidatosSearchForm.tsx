import * as React from "react";
import {useContext, useState} from "react";
import CandidatesService from "../../services/candidates.service";
import {useHistory} from "react-router-dom";
import {UICandidate} from "../../services/models/UICandidate";
import {MainContext} from "../../store/MainReducer";

interface CandidatosSearchFormProps {
    setCandidates: (candidates: UICandidate[]) => void
}

const CandidatosSearchForm: React.FC<CandidatosSearchFormProps> = (props: CandidatosSearchFormProps) => {

    const [email, setEmail] = useState<string>('');
    const [phone1, setPhone1] = useState<string>('');
    const [phone2, setPhone2] = useState<string>('');
    const [surename, setSurename] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [dni, setDni] = useState<string>('');
    const [showAllFields, setShowAllFields] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>("");

    const history = useHistory();

    const {officeUuid} = useContext(MainContext);

    const onSearchClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        props.setCandidates([]);
        setResultMessage("");
        setShowAllFields(false);
        CandidatesService.searchCandidate<UICandidate[]>(phone1, email)
            .then(result => {
                if (!!result.parsedBody?.data && result.parsedBody?.data.length > 0) {
                    props.setCandidates(result.parsedBody.data);
                } else {
                    setResultMessage("No se encontraron candidatos con los datos proporcionados");
                }
            })
            .catch(err => console.error('error search candidates', err));
    }

    const onCreateClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        const newCandidate: UICandidate = {
            surename,
            lastname,
            email,
            phone1,
            phone2,
            dni,
            office_id: officeUuid as string
        }
        CandidatesService.saveCandidate<UICandidate>(newCandidate)
            .then(response => {
                const id = response.parsedBody?.data.id;
                return history.push(`/candidatos/${id}`)
            });
    }

    const onBackToSearchClick = (e: React.MouseEvent) => {
        e.preventDefault();
        resetAllFields();
        setResultMessage("")
    }

    const resetAllFields = () => {
        setEmail("");
        setPhone1("");
        setPhone2("")
        setSurename("")
        setLastname("")
        setDni("")
        setShowAllFields(false)
    }

    const renderCreateForm = () => {
        return (
            <form className="row g-3 mb-3 align-items-end">
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="mail" className="form-label">Nombre(s)</label>
                    <input type="text"
                           className="form-control"
                           id="surename"
                           value={surename}
                           placeholder="Carlos" onChange={e => setSurename(e.target.value)}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="lastname" className="form-label">Apellido(s)</label>
                    <input type="text"
                           className="form-control"
                           id="lastname"
                           value={lastname}
                           placeholder="López" onChange={e => setLastname(e.target.value)}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="mail" className="form-label">Correo Electrónico</label>
                    <input type="email"
                           className="form-control"
                           id="mail"
                           value={email}
                           placeholder="candidato@example.com" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="telefono1" className="form-label">Telefono 1</label>
                    <input type="number"
                           className="form-control"
                           id="telefono1"
                           value={phone1}
                           placeholder="34665112233" onChange={e => setPhone1(e.target.value)}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="telefono2" className="form-label">Telefono 2</label>
                    <input type="number"
                           className="form-control"
                           id="telefono2"
                           value={phone2}
                           placeholder="34665112233" onChange={e => setPhone2(e.target.value)}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="text"
                           className="form-control"
                           id="dni"
                           value={dni}
                           placeholder="9999999R" onChange={e => setDni(e.target.value)}/>
                </div>
                <div className="col-12">
                    <button type="button" className="btn btn-primary me-3" onClick={onCreateClickHandler}>
                        Crear
                    </button>
                    <button type="button" className="btn btn-outline-danger" onClick={onBackToSearchClick}>
                        Reiniciar Búsqueda
                    </button>
                </div>
            </form>
        )
    }

    const createCandidateButtonHandler = () => {
        setShowAllFields(true);
        setResultMessage("");
    }

    const renderSearchForm = () => {
        return (
            <form className="row g-3 mb-3 align-items-end">
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="telefono1" className="form-label">Telefono 1</label>
                    <input type="number"
                           className="form-control"
                           id="telefono1"
                           value={phone1}
                           placeholder="34665112233" onChange={e => setPhone1(e.target.value)}/>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <label htmlFor="mail" className="form-label">Correo Electrónico</label>
                    <input type="email"
                           className="form-control"
                           id="mail"
                           value={email}
                           placeholder="candidato@example.com" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="col-12">
                    <button type="button" className="btn btn-primary"
                            onClick={onSearchClickHandler}>
                        Buscar
                    </button>
                    <button type="button" className="btn btn-outline-primary mx-3"
                            onClick={createCandidateButtonHandler}>
                        Crear Candidato
                    </button>
                    {resultMessage ?
                        <button type="button" className="btn btn-outline-danger mx-3" onClick={onBackToSearchClick}>
                            Reiniciar Búsqueda
                        </button> : null
                    }
                </div>
            </form>
        )
    }

    return (
        <div className="row">
            <h1>Búsqueda y registro de candidatos</h1>
            {
                showAllFields ? renderCreateForm() : renderSearchForm()
            }
            {
                resultMessage ? (
                    <div className="alert alert-warning" role="alert">
                        {resultMessage}
                    </div>
                ) : null
            }
        </div>
    )
}

export default CandidatosSearchForm;