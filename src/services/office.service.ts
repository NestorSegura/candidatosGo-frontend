import {httpFetch} from "./fetch";

const OfficeService = {
    basePath: process.env.NODE_ENV === 'production' ? 'http://candidatosgo.es:7000' : 'http://localhost:7000',
    getOfficeByUuid: async <T>(officeUuid: string) => {
        return await httpFetch.get<T>(
            `${OfficeService.basePath}/offices/${officeUuid}`,
        )
    }
}

export default OfficeService;