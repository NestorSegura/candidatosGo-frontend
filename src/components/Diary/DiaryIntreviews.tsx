import * as React from "react";
import {useContext, useState} from "react";
import {UICandidateWithProcessInformation} from "../../services/models/UICandidate";
import moment from "moment";
import CandidatesService from "../../services/candidates.service";
import {deepEqual} from "../../utils/comparisonMethods";
import DatePicker from "react-datepicker";
import DiaryCandidatesTable from "./DiaryCandidatesTable";
import {MainContext} from "../../store/MainReducer";

const DiaryInterviews: React.FC = (props) => {

    const [date, setDate] = useState<Date>();
    const [candidates, setCandidates] = useState<UICandidateWithProcessInformation[]>([]);
    const [error, setError] = useState<string>();

    const {officeUuid} = useContext(MainContext);

    const onSearchHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setError(undefined)
        if (date && officeUuid) {
            const reqDate = moment(date.toString()).format('yyyy-MM-DD')
            CandidatesService.getCandidatesForInterviews(officeUuid, reqDate)
                .then((response) => {
                    if (response.parsedBody?.data && !deepEqual(candidates, response.parsedBody?.data)) {
                        setCandidates(response.parsedBody.data);
                        setDate(undefined);
                    }
                })
                .catch(error => console.error(error));
        } else {
            setError('por favor selecciona una fecha para iniciar la búsqueda')
        }
    }

    return (
        <div className="diary-interviews">
            <form className="mb-4">
                <h6>Buscar por día de entrevistas</h6>
                <div className="col-12 mb-3">
                    <label htmlFor="mail" className="form-label me-3">Día de entrevista </label>
                    <DatePicker selected={date}
                                popperPlacement="top-end"
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="seleccionar fecha"
                                onChange={date => {
                                    setDate(date as Date)
                                }}
                    />
                    {
                        error && <div className="alert alert-warning" role="alert">
                            <p>{error}</p>
                        </div>
                    }
                </div>
                <div>
                    <button className="btn btn-primary" onClick={onSearchHandler}>
                        Buscar
                    </button>
                </div>
            </form>

            {candidates.length > 0 ? <DiaryCandidatesTable candidates={candidates} title="Agenda de Obervaciones del día" /> : null}
        </div>
    )
}

export default DiaryInterviews;