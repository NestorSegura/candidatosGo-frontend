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
}

const ProcessInformationCreateEditForm: React.FC<ProcessInformationCreateEditFormProps> = (props: ProcessInformationCreateEditFormProps) => {

    const [processInformation, setProcessInformation] = useState<UIProcessInformation>();
    const [interviewDate, setInteviewDate] = useState<Date>();
    const [preselected, setPreselected] = useState<boolean>(false);
    const [preselectedComments, setPreselectedComments] = useState<string>();
    const [assitedToObservation, setAssistedToObservation] = useState<boolean>(false);
    const [observationDay, setObservationDay] = useState<Date>();
    const [observationDayComments, setObservationDayComments] = useState<string>();
    const [trainer, setTrainer] = useState<string>();
    const [admited, setAdmited] = useState<boolean>(false);
    const [admissionComments, setAdmissionComments] = useState<string>();
    const [down, setDown] = useState<boolean>(false);
    const [downDate, setDownDate] = useState<Date>();
    const [downComments, setDownComments] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await ProcessInformationService.findProcessInformationByCandidateId<UIProcessInformation>(props.candidateId);

            if (response.parsedBody && !deepEqual(response.parsedBody.data, processInformation)) {
                setProcessInformation(response.parsedBody.data)
            }

            if(!interviewDate && checkNullString(processInformation?.interviewDate) && processInformation?.interviewDate) {
                setInteviewDate(moment.utc(processInformation?.interviewDate,  ["DDD-MM-YYYY"]).toDate())
            }

            if(processInformation?.preSelected !== preselected) {
                setPreselected(!!processInformation?.preSelected);
            }

            if(checkNullString(processInformation?.preselectedComments) && processInformation?.preselectedComments !== preselectedComments) {
                setPreselectedComments(processInformation?.preselectedComments)
            }

            if(processInformation?.assistedToObservation !== assitedToObservation) {
                setAssistedToObservation(!!processInformation?.assistedToObservation)
            }

            if(!observationDay && checkNullString(processInformation?.observationDate) && processInformation?.observationDate) {
                setObservationDay(moment.utc(processInformation?.observationDate, ["DDD-MM-YYYY"]).toDate())
            }

            if(checkNullString(processInformation?.observationComments) && processInformation?.observationComments !== observationDayComments) {
                setObservationDayComments(processInformation?.observationComments)
            }

            if(checkNullString(processInformation?.trainer) && processInformation?.trainer !== trainer) {
                setTrainer(processInformation?.trainer);
            }

            if(processInformation?.admited !== admited) {
                setAdmited(!!processInformation?.admited);
            }

            if(checkNullString(processInformation?.admitionComments) && processInformation?.admitionComments !== admissionComments) {
                setAdmissionComments(processInformation?.admitionComments);
            }

            if(processInformation?.down !== down) {
                setDown(!!processInformation?.down);
            }

            if(checkNullString(processInformation?.downComments) && processInformation?.downComments !== downComments) {
                setDownComments(processInformation?.downComments)
            }

            if(!downDate && checkNullString(processInformation?.downDate) && processInformation?.downDate) {
                //!observationDay && checkNullString(processInformation?.observationDate) && processInformation?.observationDate
                console.log('set down date');
                setDownDate(moment.utc(processInformation?.downDate, ["DDD-MM-YYYY"]).toDate())
            }

        }
        fetchData();
    }, [processInformation])

    async function saveChangesHandler() {
        const newProcessInformation: UIProcessInformation = {
            registryTime: processInformation?.registryTime || moment().toDate().toLocaleDateString(),
            interviewDate: interviewDate?.toDateString(),
            preSelected: preselected,
            preselectedComments: preselectedComments,
            assistedToObservation: assitedToObservation,
            observationDate: observationDay?.toDateString(),
            observationComments: observationDayComments,
            trainer: trainer,
            admited: admited,
            admitionComments: admissionComments,
            down: down,
            downDate: downDate?.toDateString(),
            downComments: downComments,
            candidateId: props.candidateId
        }
        if (processInformation?.id) {
            newProcessInformation.id = processInformation.id
            await ProcessInformationService.updateProcessInformation(newProcessInformation)
        } else {
            const response = await ProcessInformationService.saveProcessInformation<UIProcessInformation>(newProcessInformation)
            if(response.parsedBody?.data) {
                setProcessInformation(response.parsedBody?.data)
            }
        }
    }

    return (
        <div className="row">
            <h3 className="mb-3">Información del proceso</h3>
            <form className="mb-4">
                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <label htmlFor="mail" className="form-label me-3">Fecha de entrevista: </label>
                    <DatePicker selected={interviewDate}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="sin fecha aún"
                                onChange={date => setInteviewDate(date as Date)}/>
                </div>

                <hr className="mt-4 mb-4 col-12 col-sm-6 "/>

                <div className="col-12 col-sm-6  d-flex mb-3">
                    <div className="form-check">
                        <input className="form-check-input"
                               type="checkbox"
                               id="preselectedCheckbox"
                               checked={preselected}
                               onChange={(e) => setPreselected(e.target.checked)}/>
                        <label htmlFor="preselectedCheckbox" className="form-check-label">pre-seleccionado: </label>
                    </div>
                </div>
                <div className="col-12 col-sm-6  mb-3">
                    <label htmlFor="preselectedComment" className="form-label">Comentario de
                        preselección</label>
                    <textarea className="form-control"
                              id="preselectedComment"
                              rows={3}
                              value={preselectedComments}
                              onChange={e => setPreselectedComments(e.target.value)}/>
                </div>

                <hr className="mt-4 mb-4 col-12 col-sm-6 "/>

                <div className="col-12 col-sm-6  mb-3">
                    <label htmlFor="mail" className="form-label me-3">Fecha de observación: </label>
                    <DatePicker selected={observationDay}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="sin fecha aún"
                                onChange={date => setObservationDay(date as Date)}/>
                </div>
                <div className="col-12 col-sm-6  d-flex mb-3">
                    <div className="form-check">
                        <input className="form-check-input"
                               type="checkbox"
                               checked={assitedToObservation}
                               onChange={e => setAssistedToObservation(e.target.checked)}
                               id="observationDayCheckbox"/>
                        <label htmlFor="observationDayCheckbox" className="form-check-label">Asistió al día de
                            observación </label>
                    </div>
                </div>
                <div className="col-12 col-sm-6  mb-3">
                    <label htmlFor="assistedToObservationComment" className="form-label">Comentario día de
                        observación</label>
                    <textarea className="form-control"
                              id="assistedToObservationComment"
                              rows={3}
                              value={observationDayComments}
                              onChange={e => setObservationDayComments(e.target.value)}/>
                </div>
                <hr className="mt-4 mb-4 col-12 col-sm-6 "/>
                <div className="col-12 col-sm-6  mb-3 d-flex align-items-center">
                    <label htmlFor="trainerText" className="form-label me-3">Entrenador: </label>
                    <input type="text"
                           className="form-control" id="trainerText"
                           value={trainer ? trainer : ""}
                           onChange={e => setTrainer(e.target.value)}
                           placeholder="nombre del entrenador"/>
                </div>
                <div className="col-12 col-sm-6  d-flex mb-3">
                    <div className="form-check">
                        <input className="form-check-input"
                               type="checkbox"
                               checked={admited}
                               onChange={e => setAdmited(e.target.checked)}
                               id="observationDayCheckbox"/>
                        <label htmlFor="admisionCheckbox" className="form-check-label">Admitido</label>
                    </div>
                </div>
                <div className="col-12 col-sm-6  mb-3">
                    <label htmlFor="admisioncomments" className="form-label">Comentarios de admisión</label>
                    <textarea className="form-control"
                              id="admisioncomments"
                              rows={3}
                              value={admissionComments}
                              onChange={e => setAdmissionComments(e.target.value)}/>
                </div>

                <hr className="mt-4 mb-4 col-12 col-sm-6 col-md-4"/>

                <div className="col-12 col-sm-6  d-flex mb-3">
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
                            <div className="col-12 col-sm-6 col-md-4 mb-3">
                                <label htmlFor="mail" className="form-label me-3">Fecha de baja: </label>
                                <DatePicker selected={downDate}
                                            className="form-control"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="no tiene fecha de baja"
                                            onChange={date => setDownDate(date as Date)}/>
                            </div>
                            <div className="col-12 col-sm-6  mb-3">
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
                        onClick={saveChangesHandler}>
                    Guardar cambios
                </button>
            </div>
        </div>
    )
}

export default ProcessInformationCreateEditForm;