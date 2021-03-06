import {httpFetch} from "./fetch";
import {UICandidate, UICandidateWithProcessInformation} from "./models/UICandidate";

const CandidatesService = {
    basePath: process.env.NODE_ENV === 'production' ? 'http://candidatosgo.es:7000' : 'http://localhost:7000',
    searchCandidate: async <T>(phone1: string, email: string) => {
        return await httpFetch.post<T>(
            `${CandidatesService.basePath}/candidates/find`,
            {phone1, email}
        )
    },
    saveCandidate: async <T>(candidate: UICandidate) => {
        const {surename, lastname, phone1, phone2, email, dni, office_id} = candidate;
        return await httpFetch.post<T>(
            `${CandidatesService.basePath}/candidate`,
            {surename, lastname, phone1, phone2, email, dni, office_id: office_id}
        )
    },
    updateCandidate: async (candidate: UICandidate) => {
        return await httpFetch.put(
            `${CandidatesService.basePath}/candidates/${candidate.id}`, {
                candidate
            })
    },
    getCandidate: async <T>(id: string) => {
        return await httpFetch.get<T>(
            `${CandidatesService.basePath}/candidates/${id}`
        )
    },
    getCandidatesToCallByOffice: async (officeId: string) => {
        return await httpFetch.get<UICandidate[]>(
            `${CandidatesService.basePath}/candidates/calllist/${officeId}`)
    },
    getCandidatesForInterviews: async (officeId: string, date: string) => {
        return await httpFetch.get<UICandidateWithProcessInformation[]>(
            `${CandidatesService.basePath}/candidates/interview-list/${officeId}/${date}`
        )
    },
    getCandidatesForObservations: async (officeId: string, date: string) => {
        return await httpFetch.get<UICandidateWithProcessInformation[]>(
            `${CandidatesService.basePath}/candidates/observation-list/${officeId}/${date}`
        )
    },
}

export default CandidatesService;