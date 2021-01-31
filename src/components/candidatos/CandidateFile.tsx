import * as React from "react";
import {useEffect, useState} from "react";
import CandidatesService from "../../services/candidates.service";
import {deepEqual} from "../../utils/comparisonMethods";
import {UICandidate} from "../../services/models/UICandidate";
import ProcessInformationCreateEditForm from "../processinformation/ProcessInformationCreateEditForm";
import PageWrapper from "../pagewrapper/PageWrapper";
import CandidateEditForm from "./CandidateEditForm";

interface CandidateFileProps {
    id: string;
}

const CandidateFile: React.FC<CandidateFileProps> = (props: CandidateFileProps) => {

    const [candidate, setCandidate] = useState<UICandidate | undefined>(undefined);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await CandidatesService.getCandidate<UICandidate>(props.id);
            if (!deepEqual<UICandidate>(candidate, result.parsedBody?.data)) {
                setCandidate(result.parsedBody?.data);
            }
        }
        fetchData();
    }, [candidate, edit, props.id])

    function editCandidateHandler(e: React.MouseEvent) {
        e.preventDefault();
        setEdit(true);
    }

    const renderPersonalContent = () => {
        const content = [
            {
                label: "Nombre(s)",
                value: candidate?.surename
            },
            {
                label: "Apellidos(s)",
                value: candidate?.lastname
            },
            {
                label: "DNI",
                value: candidate?.dni
            },
            {
                label: "Correo electrónico",
                value: candidate?.email
            },
            {
                label: "Teléfono 1",
                value: candidate?.phone1
            },
            {
                label: "Teléfono 2",
                value: candidate?.phone2
            }
        ]
        return content.map((item, index) => (
            <div className="col-6 col-sm-4" key={index}>
                <div className="d-flex flex-column">
                    <h5>{item.label}</h5>
                    <p>{item.value}</p>
                </div>
            </div>
        ))
    }

    return (
        <PageWrapper>
            <div className="p-4 row">
                <h3 className="mb-3">Información de Personal</h3>
                {
                    edit ?
                        <CandidateEditForm candidate={candidate} editHandler={setEdit}/> :
                        <>
                            {renderPersonalContent()}
                            <div className="col">
                                <button type="button" className="btn btn-outline-primary"
                                        onClick={editCandidateHandler}>
                                    Editar información personal
                                </button>
                            </div>
                        </>
                }

            </div>
            <div className="p-4 row">
                {candidate?.id && <ProcessInformationCreateEditForm candidateId={parseInt(candidate.id)}/>}
            </div>
        </PageWrapper>

    )
}

export default CandidateFile;