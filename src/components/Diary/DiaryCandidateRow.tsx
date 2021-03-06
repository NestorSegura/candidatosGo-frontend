import * as React from "react";
import moment from "moment";
import {UICandidateWithProcessInformation} from "../../services/models/UICandidate";
import {Link} from "react-router-dom";

interface DiaryCandidateRowI {
    candidates: UICandidateWithProcessInformation[];
}

const DiaryCandidateRow: React.FC<DiaryCandidateRowI> = (props: DiaryCandidateRowI) => {

    return <>{
        props.candidates
            .sort((a, b) => a.interviewDate && b.interviewDate ? a.interviewDate.localeCompare(b.interviewDate) : -1)
            .map(candidate => {
                    const interviewDate = moment(candidate.interviewDate).toDate();
                    const inrerviewDateDay = moment(candidate.interviewDate).format('DD MMM yyyy');
                    const interviewDateTime = `${interviewDate.getHours()}:${interviewDate.getMinutes()}`
                    return <tr>
                        <td>{candidate.surename}</td>
                        <td>{candidate.lastname}</td>
                        <td>{inrerviewDateDay}</td>
                        <td>{interviewDateTime}</td>
                        <td>
                            <Link className="btn btn-outline-primary"
                                  to={`/candidatos/${candidate.id}`} target="_blank">Detalles</Link>
                        </td>
                    </tr>
                }
            )
    }
    </>
}

export default DiaryCandidateRow;