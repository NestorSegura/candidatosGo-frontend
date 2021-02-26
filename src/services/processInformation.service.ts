import {httpFetch} from "./fetch";
import {UIProcessInformation} from "./models/UIProcessInformation";

const ProcessInformationService = {
    basePath: process.env.NODE_ENV === 'production' ? 'http://candidatosgo.es:7000' : 'http://localhost:7000',
    findProcessInformationByCandidateId: async <T>(candidateId: number) => {
        return await httpFetch.get<T>(
            `${ProcessInformationService.basePath}/processinformation/${candidateId}`,
        )
    },
    saveProcessInformation: async <T>(processInformation: UIProcessInformation) => {
        return await httpFetch.post<T>(
            `${ProcessInformationService.basePath}/processinformation`,
            {...processInformation}
        )
    },
    updateProcessInformation: async (processInformation: UIProcessInformation) => {
        return await httpFetch.put(
            `${ProcessInformationService.basePath}/processinformation/${processInformation.id}`, {
                processInformation
            })
    }
}

export default ProcessInformationService;