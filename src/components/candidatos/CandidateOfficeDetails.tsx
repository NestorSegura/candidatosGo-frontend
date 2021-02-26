import * as React from "react";
import {UIOffice} from "../../services/models/UIOffice";
import moment from "moment";

interface CandidateOfficeDetailsProps {
    office: UIOffice;
    registrationDate: string;
}

const CandidateOfficeDetails: React.FC<CandidateOfficeDetailsProps> = (props: CandidateOfficeDetailsProps) => {

    return (props.office || props.registrationDate ) ? <div className="row">
        <h3 className="mb-3">Datos de registro</h3>
        <div className="d-flex flex-row">
            {
                props.office && <div className="me-3">
                    <h5>Oficina</h5>
                    <p>{props.office.name}</p>
                </div>
            }
            {
                props.registrationDate && <div>
                    <h5>Fecha</h5>
                    <p>{moment(props.registrationDate).format('DD MMM YYYY')}</p>
                </div>
            }
        </div>
    </div> : null
}

export default CandidateOfficeDetails;