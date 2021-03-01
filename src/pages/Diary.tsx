import * as React from "react";
import {useState} from "react";
import PageWrapper from "../components/pagewrapper/PageWrapper";
import DiaryInterviews from "../components/Diary/DiaryIntreviews";
import DiaryObervations from "../components/Diary/DiaryObservations";

const Diary: React.FC = (props) => {

    const _INTERVIEWS = 'daily-calls';
    const _OBSERVATIONS = 'observations';
    const [activePage, setActivePage] = useState<string>(_INTERVIEWS);

    return (
        <PageWrapper>
            <div className="btn-group mb-4" role="group" aria-label="Basic outlined example">
                <button type="button"
                        className={`btn btn-outline-primary ${activePage === _INTERVIEWS ? 'active' : ''}`}
                        onClick={() => setActivePage(_INTERVIEWS)}>
                    Entrevistas diarias
                </button>
                <button type="button"
                        className={`btn btn-outline-primary ${activePage === _OBSERVATIONS ? 'active' : ''}`}
                        onClick={() => setActivePage(_OBSERVATIONS)}>
                    Observaciones del día
                </button>
            </div>
            <div>
                {
                    activePage === _INTERVIEWS ? <DiaryInterviews /> : <DiaryObervations />
                }
            </div>

        </PageWrapper>
    )
}

export default Diary;