import * as React from "react";
import {useEffect, useState} from "react";
import ProcessInformationService from "../../services/processInformation.service";
import {UIProcessInformation} from "../../services/models/UIProcessInformation";
import {deepEqual} from "../../utils/comparisonMethods";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {checkNullString} from "../../utils/checkMethods";

interface ProcessInformationCreateEditFormProps {
    candidateId: number;
    buttonDisabled: boolean;
}

const ProcessInformationCreateEditForm: React.FC<ProcessInformationCreateEditFormProps> = (props: ProcessInformationCreateEditFormProps) => {

    const [processInformation, setProcessInformation] = useState<UIProcessInformation>();
    const [interviewDate, setInteviewDate] = useState<Date>();
    const [preselected, setPreselected] = useState<string>();
    const [preselectedComments, setPreselectedComments] = useState<string>();
    const [asistedToObservation, setAsistedToObservation] = useState<string>();
    const [observationDay, setObservationDay] = useState<Date>();
    const [observationDayComments, setObservationDayComments] = useState<string>();
    const [trainer, setTrainer] = useState<string>();
    const [admited, setAdmited] = useState<string>();
    const [admissionComments, setAdmissionComments] = useState<string>();
    const [down, setDown] = useState<boolean>(false);
    const [downDate, setDownDate] = useState<Date>();
    const [downComments, setDownComments] = useState<string>();
    const [called, setCalled] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await ProcessInformationService.findProcessInformationByCandidateId<UIProcessInformation>(props.candidateId);

            if (response.parsedBody && !deepEqual(response.parsedBody.data, processInformation)) {
                setProcessInformation(response.parsedBody.data)
            }
            if (checkNullString(processInformation?.preSelected)) setPreselected(processInformation?.preSelected);
            if (checkNullString(processInformation?.interviewDate)) setInteviewDate(moment.utc(processInformation?.interviewDate, ["DDD-MM-YYYY"]).toDate());
            if (checkNullString(processInformation?.assistedToObservation)) setAsistedToObservation(processInformation?.assistedToObservation);
            if (checkNullString(processInformation?.preselectedComments)) setPreselectedComments(processInformation?.preselectedComments as string)
            if (checkNullString(processInformation?.observationDate)) setObservationDay(moment.utc(processInformation?.observationDate, ["DDD-MM-YYYY"]).toDate());
            if (checkNullString(processInformation?.observationComments)) setObservationDayComments(processInformation?.observationComments);
            if (checkNullString(processInformation?.trainer)) setTrainer(processInformation?.trainer);
            if (checkNullString(processInformation?.admited)) setAdmited(processInformation?.admited);
            if (checkNullString(processInformation?.admitionComments)) setAdmissionComments(processInformation?.admitionComments);
            setDown(!!processInformation?.down);
            if (checkNullString(processInformation?.downComments)) setDownComments(processInformation?.downComments);
            if (checkNullString(processInformation?.downDate)) setDownDate(moment.utc(processInformation?.downDate, ["DDD-MM-YYYY"]).toDate());
            if (checkNullString(processInformation?.called)) setCalled(processInformation?.called);

        }
        fetchData();
    }, [processInformation, props.candidateId])

    async function saveChangesHandler() {
        const newProcessInformation: UIProcessInformation = {
            registryTime: processInformation?.registryTime || moment().toDate().toLocaleDateString(),
            interviewDate: interviewDate?.toDateString(),
            preSelected: preselected,
            preselectedComments: preselectedComments,
            assistedToObservation: asistedToObservation,
            observationDate: observationDay?.toDateString(),
            observationComments: observationDayComments,
            trainer: trainer,
            admited: admited,
            admitionComments: admissionComments,
            down: down,
            downDate: downDate?.toDateString(),
            downComments: downComments,
            candidateId: props.candidateId,
            called: called
        }
        if (processInformation?.id) {
            newProcessInformation.id = processInformation.id;
            await ProcessInformationService.updateProcessInformation(newProcessInformation);
        } else {
            const response = await ProcessInformationService.saveProcessInformation<UIProcessInformation>(newProcessInformation);
            if (response.parsedBody?.data) {
                setProcessInformation(response.parsedBody?.data);
            }
        }
    }

    return (
        <div className="pe-5">
            <h3 className="mb-3">Información del proceso</h3>
            <form className="mb-4">
                <div className="col-12  d-flex mb-3">
                    <p className="me-3">Contactado: </p>
                    <div className="form-check me-3">
                        <input className="form-check-input"
                               type="radio"
                               name="called"
                               id="called-yes"
                               checked={called === 'si'}
                               onChange={(e) => setCalled(e.target.value)}
                               value="si"/>
                        <label className="form-check-label" htmlFor="called-yes">
                            Sí
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="called"
                               id="called-no"
                               checked={called === 'no'}
                               onChange={(e) => setCalled(e.target.value)}
                               value="no"/>
                        <label className="form-check-label" htmlFor="called-no">
                            No
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="mail" className="form-label me-3">Fecha de entrevista: </label>
                    <DatePicker selected={interviewDate}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="sin fecha aún"
                                onChange={date => setInteviewDate(date as Date)}/>
                </div>

                <hr className="mt-4 col-12"/>

                <div className="col-12  d-flex mb-3">
                    <p className="me-3">Preselecionado: </p>
                    <div className="form-check me-3">
                        <input className="form-check-input"
                               type="radio"
                               name="preselected"
                               id="preselected-yes"
                               checked={preselected === 'si'}
                               onChange={(e) => setPreselected(e.target.value)}
                               value="si"/>
                        <label className="form-check-label" htmlFor="preselected-yes">
                            Sí
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="preselected"
                               id="preselected-no"
                               checked={preselected === 'no'}
                               onChange={(e) => setPreselected(e.target.value)}
                               value="no"/>
                        <label className="form-check-label" htmlFor="preselected-no">
                            No
                        </label>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="preselectedComment" className="form-label">Comentario de
                        preselección</label>
                    <textarea className="form-control"
                              id="preselectedComment"
                              rows={3}
                              value={preselectedComments}
                              onChange={e => setPreselectedComments(e.target.value)}/>
                </div>

                <hr className="mt-4 mb-4 col-12 "/>

                <div className="col-12 mb-3">
                    <label htmlFor="mail" className="form-label me-3">Fecha de día de observación: </label>
                    <DatePicker selected={observationDay}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="sin fecha aún"
                                onChange={date => setObservationDay(date as Date)}/>
                </div>

                <div className="col-12 d-flex mb-3">
                    <p className="me-3">Asistió a al día de observación : </p>
                    <div className="form-check me-3">
                        <input className="form-check-input"
                               type="radio"
                               name="asistedToObservation"
                               id="asistedToObservation-yes"
                               checked={asistedToObservation === 'si'}
                               onChange={(e) => setAsistedToObservation(e.target.value)}
                               value="si"/>
                        <label className="form-check-label" htmlFor="asistedToObservation-yes">
                            Sí
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="asistedToObservation"
                               id="asistedToObservation-no"
                               checked={asistedToObservation === 'no'}
                               onChange={(e) => setAsistedToObservation(e.target.value)}
                               value="no"/>
                        <label className="form-check-label" htmlFor="asistedToObservation-no">
                            No
                        </label>
                    </div>
                </div>


                <div className="col-12 mb-3">
                    <label htmlFor="assistedToObservationComment" className="form-label">Comentario día de
                        observación</label>
                    <textarea className="form-control"
                              id="assistedToObservationComment"
                              rows={3}
                              value={observationDayComments}
                              onChange={e => setObservationDayComments(e.target.value)}/>
                </div>

                <hr className="mt-4 mb-4 col-12 "/>

                <div className="col-12   mb-3 d-flex align-items-center">
                    <label htmlFor="trainerText" className="form-label me-3">Entrenador: </label>
                    <input type="text"
                           className="form-control" id="trainerText"
                           value={trainer ? trainer : ""}
                           onChange={e => setTrainer(e.target.value)}
                           placeholder="nombre del entrenador"/>
                </div>

                <div className="col-12   d-flex mb-3">
                    <p className="me-3">Admitido: </p>
                    <div className="form-check me-3">
                        <input className="form-check-input"
                               type="radio"
                               name="admited"
                               id="admited-yes"
                               checked={admited === 'si'}
                               onChange={(e) => setAdmited(e.target.value)}
                               value="si"/>
                        <label className="form-check-label" htmlFor="admited-yes">
                            Sí
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                               type="radio"
                               name="admited"
                               id="admited-no"
                               checked={admited === 'no'}
                               onChange={(e) => setAdmited(e.target.value)}
                               value="no"/>
                        <label className="form-check-label" htmlFor="admited-no">
                            No
                        </label>
                    </div>
                </div>

                <div className="col-12   mb-3">
                    <label htmlFor="admisioncomments" className="form-label">Comentarios de admisión</label>
                    <textarea className="form-control"
                              id="admisioncomments"
                              rows={3}
                              value={admissionComments}
                              onChange={e => setAdmissionComments(e.target.value)}/>
                </div>

                <hr className="mt-4 mb-4 col-12  col-md-4"/>

                <div className="col-12   d-flex mb-3">
                    <div className="form-check">
                        <input className="form-check-input"
                               type="checkbox"
                               checked={down}
                               onChange={e => setDown(e.target.checked)}
                               id="downCheckbox"/>
                        <label htmlFor="downCheckbox" className="form-check-label">Dado de baja</label>
                    </div>
                </div>
                {
                    down ? (<>
                            <div className="col-12  col-md-4 mb-3">
                                <label htmlFor="mail" className="form-label me-3">Fecha de baja: </label>
                                <DatePicker selected={downDate}
                                            className="form-control"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="no tiene fecha de baja"
                                            onChange={date => setDownDate(date as Date)}/>
                            </div>
                            <div className="col-12   mb-3">
                                <label htmlFor="downcomments" className="form-label">Comentarios de baja</label>
                                <textarea className="form-control"
                                          id="downcomments"
                                          rows={3}
                                          value={downComments}
                                          onChange={e => setDownComments(e.target.value)}/>
                            </div>
                        </>
                    ) : null
                }

            </form>
            <div className="col">
                <button type="button" className="btn btn-outline-primary"
                        onClick={saveChangesHandler} disabled={props.buttonDisabled}>
                    Guardar cambios
                </button>
            </div>
        </div>
    )
}

export default ProcessInformationCreateEditForm;