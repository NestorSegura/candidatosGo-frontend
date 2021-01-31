import * as React from "react";
import {UIOffice} from "../../services/models/UIOffice";

interface CandidateOfficeDetailsProps {
    office: UIOffice;
    registrationDate: string;
}

const CandidateOfficeDetails: React.FC<CandidateOfficeDetailsProps> = (props: CandidateOfficeDetailsProps) => {

    return <div className="row">
        <h3>Datos de registro</h3>
        <div className="d-flex flex-column">
            <div>
                <h4>Oficina</h4>
                <p>{props.office.name}</p>
            </div>
            <div>
                <h4>Fecha</h4>
                <p>{props.registrationDate}</p>
            </div>
        </div>
    </div>
}

export default CandidateOfficeDetails;