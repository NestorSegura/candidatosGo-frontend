import {httpFetch} from "./fetch";
import {UIOffice} from "./models/UIOffice";

const OfficeService = {
    basePath: process.env.NODE_ENV === 'production' ? 'http://candidatosgo.es:7000' : 'http://localhost:7000',
    getOfficeByUuid: async (officeUuid: string) => {
        return await httpFetch.get<UIOffice>(
            `${OfficeService.basePath}/offices/${officeUuid}`,
        )
    },
    getAllOffices: async () => {
        return httpFetch.get<UIOffice[]>(
            `${OfficeService.basePath}/offices`,
        )
    }
}

export default OfficeService;