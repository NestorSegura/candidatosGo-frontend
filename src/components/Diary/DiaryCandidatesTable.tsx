import * as React from "react";
import {UICandidateWithProcessInformation} from "../../services/models/UICandidate";
import DiaryCandidateRow from "./DiaryCandidateRow";

interface DiaryCandidatesTableI {
    candidates: UICandidateWithProcessInformation[];
    title: string
}

const DiaryCandidatesTable: React.FC<DiaryCandidatesTableI> = (props: DiaryCandidatesTableI) => {

    return (
        <div className="table-responsive">
            <h1>{props.title}</h1>
            <table className=" table align-middle">
                <thead className="table-light">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates && <DiaryCandidateRow candidates={props.candidates}/>}
                </tbody>
            </table>
        </div>
    )
}

export default DiaryCandidatesTable;