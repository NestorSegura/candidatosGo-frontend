import * as React from "react";
import { useHistory } from "react-router-dom";
import './tableStyles.css';
import {UICandidate} from "../../services/models/UICandidate";

interface CandidateListProps {
    candidateList: UICandidate[] | UICandidate;
}

const CandidateList: React.FC<CandidateListProps> = (props: CandidateListProps) => {

    const history = useHistory();
    function onRowClickHandler(id: string) {
        return history.push(`/candidatos/${id}`)
    }

    const renderRows = () => {
        if (Array.isArray(props.candidateList)) {
            return props.candidateList.map(candidate => (
                <tr key={candidate.id} onChange={() => onRowClickHandler(candidate.id as string)}>
                    <td>{candidate.surename}</td>
                    <td>{candidate.surename}</td>
                    <td>{candidate.dni}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.phone1}</td>
                    <td>{candidate.phone2}</td>
                </tr>
            ))
        }
        const id = props.candidateList.id;
        return (
            <tr onClick={() => onRowClickHandler(id as string)}>
                <td>{props.candidateList.surename}</td>
                <td>{props.candidateList.surename}</td>
                <td>{props.candidateList.dni}</td>
                <td>{props.candidateList.email}</td>
                <td>{props.candidateList.phone1}</td>
                <td>{props.candidateList.phone2}</td>
            </tr>
        )
    }

    const renderConditional = () => {
        if (Array.isArray(props.candidateList)) {
            return props.candidateList.length > 0;
        }
        return !!props.candidateList;
    }

    return renderConditional() ? (
        <div className="row">
            <h2>Resultados Encontrados</h2>
            <table className="table table-striped table-hover table-bordered candidatos">
                <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>DNI</td>
                    <td>Correo Electrónico</td>
                    <td>Teléfono 1</td>
                    <td>Teléfono 2</td>
                </tr>
                </thead>
                <tbody>
                {renderRows()}
                </tbody>
            </table>
        </div>
    ) : null;
}

export default CandidateList;