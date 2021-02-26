import * as React from "react";
import {useContext, useEffect, useState} from "react";
import PageWrapper from "../components/pagewrapper/PageWrapper";
import CandidateList from "../components/candidatos/CandidateList";
import {UICandidate} from "../services/models/UICandidate";
import CandidatesService from "../services/candidates.service";
import {AuthContext} from "../components/auth/AuthContext";
import {deepEqual} from "../utils/comparisonMethods";

const CandidatesToCallPage: React.FC = () => {

    const [candidates, setCandidates] = useState<UICandidate[]>([]);

    const {officeId} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            return CandidatesService.getCandidatesToCallByOffice(officeId)
        }
        if (officeId) {
            fetchData()
                .then(result => {
                    if (!deepEqual(result.parsedBody?.data, candidates)) {
                        setCandidates(result.parsedBody?.data as UICandidate[]);
                    }
                }).catch(error => console.error(error));
        }
    }, [officeId])

    return (
        <PageWrapper>
            <div id="candidates-to-call-page" className="flex-row">
                <CandidateList candidateList={candidates} title="Candidatos Pendientes por llamar"/>
            </div>
        </PageWrapper>
    )
}

export default CandidatesToCallPage;