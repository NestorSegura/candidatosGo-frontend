import * as React from "react";
import {UICandidate} from "../../services/models/UICandidate";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import OfficeService from "../../services/office.service";
import {UIOffice} from "../../services/models/UIOffice";
import {deepEqual} from "../../utils/comparisonMethods";

interface CandidateRowI {
    candidate: UICandidate;
}

const CandidateRow: React.FC<CandidateRowI> = (props: CandidateRowI) => {
    const history = useHistory();
    const onRowClickHandler = (id: string) => {
        return history.push(`/candidatos/${id}`)
    }

    const [office, setOffice] = useState<UIOffice>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await OfficeService.getOfficeByUuid<UIOffice>(props.candidate.office_id)
            if(response.parsedBody) {
                const {uuid, name} = response.parsedBody?.data;
                if(!deepEqual(office, {uuid: uuid, name})) {
                    setOffice({uuid: uuid, name})
                }
            }
        }
        fetchData();
    })

    return <tr key={props.candidate.id} onClick={() => onRowClickHandler(props.candidate.id as string)}>
        <td>{props.candidate.surename}</td>
        <td>{props.candidate.lastname}</td>
        <td>{props.candidate.dni}</td>
        <td>{props.candidate.email}</td>
        <td>{props.candidate.phone1}</td>
        <td>{props.candidate.phone2}</td>
        <td>{office?.name}</td>
    </tr>
}

export default CandidateRow;