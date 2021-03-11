import * as React from "react";
import './tableStyles.css';
import {UICandidate} from "../../services/models/UICandidate";
import CandidateRow from "./CandidateListRow";

interface CandidateListProps {
    candidateList: UICandidate[] | UICandidate;
    title: string;
}

const CandidateList: React.FC<CandidateListProps> = (props: CandidateListProps) => {

    const renderRows = () => {
        const items: UICandidate[] = Array.isArray(props.candidateList) ? props.candidateList : Array.of(props.candidateList);
        return items.map(candidate => <CandidateRow candidate={candidate}/>)
    }

    const renderConditional = () => {
        if (Array.isArray(props.candidateList)) {
            return props.candidateList.length > 0;
        }
        return !!props.candidateList;
    }

    return renderConditional() ? (
        <div className="row">
            <h1 className="mb-4">{props.title}</h1>
            <div className="table-responsive">
                <table className="table candidatos align-middle">
                    <thead className="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Correo Electrónico</th>
                        <th>Teléfono 1</th>
                        <th>Teléfono 2</th>
                        <th>Oficina</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderRows()}
                    </tbody>
                </table>

            </div>
        </div>
    ) : null;
}

export default CandidateList;