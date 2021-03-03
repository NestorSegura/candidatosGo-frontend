
export interface UICandidate {
    id?: string;
    surename: string;
    lastname: string;
    office_id: string;
    phone1: string;
    phone2?: string;
    email: string;
    dni?: string;
    creationDate?: string;
}

export interface UICandidateWithProcessInformation {
    id?: string;
    surename: string;
    lastname: string;
    office_id: string;
    phone1: string;
    phone2?: string;
    email: string;
    dni?: string;
    creationDate?: string;
    registryTime: string;
    interviewDate?: string;
    preSelected?: string;
    preselectedComments?: string;
    observationDate?: string;
    assistedToObservation?: string;
    observationComments?: string;
    trainer?: string;
    admited?: string;
    admitionComments?: string;
    down?: boolean;
    downDate?: string;
    downComments?: string
    candidateId: number;
    called?: string;
}