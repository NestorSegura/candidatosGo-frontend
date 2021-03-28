import * as React from "react";
import {useContext, useEffect, useState} from "react";
import PageWrapper from "../components/pagewrapper/PageWrapper";
import CandidateList from "../components/candidatos/CandidateList";
import {UICandidate} from "../services/models/UICandidate";
import CandidatesService from "../services/candidates.service";
import {deepEqual} from "../utils/comparisonMethods";
import {MainContext} from "../store/MainReducer";

const CandidatesToCallPage: React.FC = () => {

    const [candidates, setCandidates] = useState<UICandidate[]>([]);

    const {officeUuid} = useContext(MainContext);

    useEffect(() => {
        const fetchData = async () => {
            return CandidatesService.getCandidatesToCallByOffice(officeUuid as string)
        }
        if (officeUuid) {
            fetchData()
                .then(result => {
                    if (!deepEqual(result.parsedBody?.data, candidates)) {
                        setCandidates(result.parsedBody?.data as UICandidate[]);
                    }
                }).catch(error => console.error(error));
        }
    }, [officeUuid, candidates])

    return (
        <PageWrapper>
            <div id="candidates-to-call-page" className="flex-row">
                {
                    candidates.length > 0 ?
                        <CandidateList candidateList={candidates} title="Candidatos Pendientes por llamar"/> :
                        <>
                            <h1 className="mb-4">Candidatos Pendientes por llamar</h1>
                            <p>No hay candidatos pendiente por llamar</p>
                        </>
                }
            </div>
        </PageWrapper>
    )
}

export default CandidatesToCallPage;