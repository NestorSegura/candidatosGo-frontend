import * as React from "react";
import {useState} from "react";
import CandidatesService from "../../services/candidates.service";
import {UICandidate} from "../../services/models/UICandidate";

interface CandidateEditFormProps {
    candidate: UICandidate | undefined;
    editHandler: Function;
}

const CandidateEditForm: React.FC<CandidateEditFormProps> = (props: CandidateEditFormProps) => {

    const {email, phone1, phone2, id, dni, surename, lastname, office_id} = props.candidate || {};

    const [emailField, setEmailField] = useState<string>(email || "");
    const [phone1Field, setPhone1Field] = useState<string>(phone1 || "");
    const [phone2Field, setPhone2Field] = useState<string>(phone2 || "");
    const [surenameField, setSurenameField] = useState<string>(surename || "");
    const [lastnameField, setLastnameField] = useState<string>(lastname || "");
    const [dniField, setDniField] = useState<string>(dni || "");

    const onEditCandidateClickHandler = async () => {
        const newCandidate: UICandidate = {
            email: emailField,
            phone1: phone1Field,
            phone2: phone2Field,
            dni: dniField,
            surename: surenameField,
            lastname: lastnameField,
            id: id,
            office_id: office_id || ""
        }
        await CandidatesService.updateCandidate(newCandidate)
            .then(res => {
                console.log('candidate updated response',res);
                props.editHandler(false);
            })
            .catch(err => console.log(err))
    }

    return (
        <form className="row mb-3 align-items-end">
            <div className="col-12 col-sm-6 col-md-4">
                <label htmlFor="mail" className="form-label">Nombre(s)</label>
                <input type="text"
                       className="form-control"
                       id="surename"
                       value={surenameField}
                       placeholder="Carlos" onChange={e => setSurenameField(e.target.value)}/>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
                <label htmlFor="lastname" className="form-label">Apellido(s)</label>
                <input type="text"
                       className="form-control"
                       id="lastname"
                       value={lastnameField}
                       placeholder="López" onChange={e => setLastnameField(e.target.value)}/>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input type="text"
                       className="form-control"
                       id="dni"
                       value={dniField}
                       placeholder="9999999R" onChange={e => setDniField(e.target.value)}/>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
                <label htmlFor="telefono1" className="form-label">Telefono 1</label>
                <input type="number"
                       className="form-control"
                       id="telefono1"
                       value={phone1Field}
                       placeholder="34665112233" onChange={e => setPhone1Field(e.target.value)}/>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
                <label htmlFor="telefono2" className="form-label">Telefono 2</label>
                <input type="number"
                       className="form-control"
                       id="telefono2"
                       value={phone2Field}
                       placeholder="34665112233" onChange={e => setPhone2Field(e.target.value)}/>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
                <label htmlFor="mail" className="form-label">Correo Electrónico</label>
                <input type="email"
                       className="form-control"
                       id="mail"
                       value={emailField}
                       placeholder="candidato@example.com" onChange={e => setEmailField(e.target.value)}/>
            </div>
            <div className="col-12 mt-3">
                <button type="button" className="btn btn-primary me-3" onClick={onEditCandidateClickHandler}>
                    Guardar cambios
                </button>
            </div>
        </form>
    )
}

export default CandidateEditForm;