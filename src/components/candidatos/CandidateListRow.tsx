import * as React from "react";
import {useEffect, useState} from "react";
import {UICandidate} from "../../services/models/UICandidate";
import {Link, useHistory} from "react-router-dom";
import OfficeService from "../../services/office.service";
import {UIOffice} from "../../services/models/UIOffice";
import {deepEqual} from "../../utils/comparisonMethods";

interface CandidateRowI {
    candidate: UICandidate;
}

const CandidateRow: React.FC<CandidateRowI> = (props: CandidateRowI) => {

    const [office, setOffice] = useState<UIOffice>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await OfficeService.getOfficeByUuid(props.candidate.office_id)
            if (response.parsedBody) {
                const data = response.parsedBody?.data;
                const uuid = data ? data.uuid : '';
                const name = data ? data.name : '';

                if (!deepEqual(office, {uuid, name})) {
                    setOffice({uuid: uuid, name})
                }
            }
        }
        fetchData();
    })

    return <tr key={props.candidate.id}>
        <td>{props.candidate.surename}</td>
        <td>{props.candidate.lastname}</td>
        <td>{props.candidate.dni}</td>
        <td>{props.candidate.email}</td>
        <td>{props.candidate.phone1}</td>
        <td>{props.candidate.phone2}</td>
        <td>{office?.name}</td>
        <td>
            <Link className="btn btn-outline-primary" to={`/candidatos/${props.candidate.id}`}>Detalles</Link>
        </td>
    </tr>
}

export default CandidateRow;