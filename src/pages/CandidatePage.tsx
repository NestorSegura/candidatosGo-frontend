import * as React from "react";
import CandidateFile from "../components/candidatos/CandidateFile";
import {useParams} from 'react-router-dom';

interface params {
    id: string
}

const CandidatePage: React.FC = () => {

    let {id} = useParams<params>();

    return <CandidateFile id={id}/>;
}

export default CandidatePage;