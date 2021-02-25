import * as React from "react";
import {useContext, useEffect, useState} from "react";
import CandidatesService from "../../services/candidates.service";
import {deepEqual} from "../../utils/comparisonMethods";
import {UICandidate} from "../../services/models/UICandidate";
import ProcessInformationCreateEditForm from "../processinformation/ProcessInformationCreateEditForm";
import PageWrapper from "../pagewrapper/PageWrapper";
import CandidateEditForm from "./CandidateEditForm";
import CandidateOfficeDetails from "./CandidateOfficeDetails";
import {UIOffice} from "../../services/models/UIOffice";
import OfficeService from "../../services/office.service";
import {AuthContext} from "../auth/AuthContext";

interface CandidateFileProps {
    id: string;
}

const CandidateFile: React.FC<CandidateFileProps> = (props: CandidateFileProps) => {

    const [candidate, setCandidate] = useState<UICandidate | undefined>(undefined);
    const [edit, setEdit] = useState<boolean>(false);
    const [office, setOffice] = useState<UIOffice>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await CandidatesService.getCandidate<UICandidate>(props.id);
            if (!deepEqual<UICandidate>(candidate, result.parsedBody?.data)) {
                setCandidate(result.parsedBody?.data);
            }
        }
        fetchData();
    }, [candidate, edit, props.id])

    useEffect(() => {
        const fetchData = async () => {
            if(candidate) {
                const response = await OfficeService.getOfficeByUuid<UIOffice>(candidate.office_id)
                if(response.parsedBody) {
                    const {uuid, name} = response.parsedBody?.data;
                    if(!deepEqual(office, {uuid: uuid, name})) {
                        setOffice({uuid: uuid, name})
                    }
                }
            }
        }
        fetchData();
    })

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

    const {officeId} = useContext(AuthContext);

    return (
        <PageWrapper>
            <div className="p-4 row">
                <h3 className="mb-3">Información de Personal</h3>
                {
                    edit ?
                        <CandidateEditForm candidate={candidate} editHandler={setEdit}/> :
                        <>
                            {renderPersonalContent()}
                            { office?.uuid === officeId &&
                                <div className="col">
                                    <button type="button" className="btn btn-outline-primary"
                                            onClick={editCandidateHandler}>
                                        Editar información personal
                                    </button>
                                </div>
                            }
                        </>
                }
            </div>
            <div className="p-4 d-flex flex-row-reverse align-items-start justify-content-start flex-wrap">
                <div className="col-12 col-sm-4 mb-4"><CandidateOfficeDetails office={office as UIOffice} registrationDate={candidate?.creationDate as string} /></div>
                {candidate?.id && <div className="col-12 col-sm-8"><ProcessInformationCreateEditForm buttonDisabled={office?.uuid !== officeId} candidateId={parseInt(candidate.id)}/></div>}
            </div>
        </PageWrapper>

    )
}

export default CandidateFile;