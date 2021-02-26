import * as React from "react";
import {useState} from "react";
import CandidatosSearchForm from "../components/candidatos/CandidatosSearchForm";
import CandidateList from "../components/candidatos/CandidateList";
import {UICandidate} from "../services/models/UICandidate";
import PageWrapper from "../components/pagewrapper/PageWrapper";

const Dashboard = () => {
    const [candidates, setCandidates] = useState<UICandidate[]>([]);

    return (
        <PageWrapper>
            <CandidatosSearchForm setCandidates={setCandidates}/>
            {
                candidates ? <CandidateList
                    candidateList={candidates}
                    title="Resultados Encontrados"/> : null
            }
        </PageWrapper>
    )
}

export default Dashboard;