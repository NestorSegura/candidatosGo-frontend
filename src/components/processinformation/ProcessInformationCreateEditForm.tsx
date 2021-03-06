import * as React from "react";
import {useEffect, useState} from "react";
import ProcessInformationService from "../../services/processInformation.service";
import {UIProcessInformation} from "../../services/models/UIProcessInformation";
import {deepEqual} from "../../utils/comparisonMethods";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {checkNullString} from "../../utils/checkMethods";
import ProcessInformation from "./ProcessInformation";

interface ProcessInformationCreateEditFormProps {
    candidateId: number;
    buttonDisabled: boolean;
}

const ProcessInformationCreateEditForm: React.FC<ProcessInformationCreateEditFormProps> = (props: ProcessInformationCreateEditFormProps) => {

    const [processInformation, setProcessInformation] = useState<UIProcessInformation>();
    const [interviewDate, setInterviewDate] = useState<Date>();
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
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await ProcessInformationService.findProcessInformationByCandidateId<UIProcessInformation>(props.candidateId);

            if (response.parsedBody && !deepEqual(response.parsedBody.data, processInformation)) {
                setProcessInformation(response.parsedBody.data)
            }
            if (checkNullString(processInformation?.preSelected)) setPreselected(processInformation?.preSelected);
            if (checkNullString(processInformation?.interviewDate)) setInterviewDate(new Date(processInformation?.interviewDate as string));
            if (checkNullString(processInformation?.assistedToObservation)) setAsistedToObservation(processInformation?.assistedToObservation);
            if (checkNullString(processInformation?.preselectedComments)) setPreselectedComments(processInformation?.preselectedComments as string)
            if (checkNullString(processInformation?.observationDate)) setObservationDay(new Date(processInformation?.observationDate as string));
            if (checkNullString(processInformation?.observationComments)) setObservationDayComments(processInformation?.observationComments);
            if (checkNullString(processInformation?.trainer)) setTrainer(processInformation?.trainer);
            if (checkNullString(processInformation?.admited)) setAdmited(processInformation?.admited);
            if (checkNullString(processInformation?.admitionComments)) setAdmissionComments(processInformation?.admitionComments);
            setDown(!!processInformation?.down);
            if (checkNullString(processInformation?.downComments)) setDownComments(processInformation?.downComments);
            if (checkNullString(processInformation?.downDate)) setDownDate(new Date(processInformation?.downDate as string));
            if (checkNullString(processInformation?.called)) setCalled(processInformation?.called);

        }
        fetchData();
    }, [processInformation, props.candidateId])

    async function saveChangesHandler() {
        const newProcessInformation: UIProcessInformation = {
            registryTime: processInformation?.registryTime || moment().toDate().toLocaleDateString(),
            interviewDate: interviewDate?.toISOString(),
            preSelected: preselected,
            preselectedComments: preselectedComments,
            assistedToObservation: asistedToObservation,
            observationDate: observationDay?.toISOString(),
            observationComments: observationDayComments,
            trainer: trainer,
            admited: admited,
            admitionComments: admissionComments,
            down: down,
            downDate: downDate?.toISOString(),
            downComments: downComments,
            candidateId: props.candidateId,
            called: called
        }
        if (processInformation?.id) {
            newProcessInformation.id = processInformation.id;
            ProcessInformationService.updateProcessInformation(newProcessInformation)
                .then(response => {
                    if (response.parsedBody?.success) {
                        setSuccess(response.parsedBody.success);
                        setTimeout(() => {
                            setSuccess(false)
                        }, 5000);
                    }
                }).catch(error => {
                setError(error)
            });
        } else {
            const response = await ProcessInformationService.saveProcessInformation<UIProcessInformation>(newProcessInformation);
            if (response.parsedBody?.data) {
                setProcessInformation(response.parsedBody?.data);
            }
        }
    }

    const toDateString = (date?: Date) => {
        return date ? moment(date).format('DD MMM yyyy HH:mm').toString() : 'sin fecha aún';
    }

    return (
        <div className="pe-md-5">
            <h3 className="mb-3">Información del proceso</h3>
            <form className="mb-4">
                <ProcessInformation
                    changesAllow={!props.buttonDisabled}
                    onSaveHandler={saveChangesHandler}
                    label={'Contactado:'}
                    value={called ?? 'sin registro'}>
                    <p className="me-3 mb-0">Contactado: </p>
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
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Fecha de entrevista:'
                                    value={toDateString(interviewDate)}
                                    changesAllow={!props.buttonDisabled}>
                    <label htmlFor="mail" className="form-label me-3 mb-0">Fecha de entrevista: </label>
                    <DatePicker selected={interviewDate}
                                className="form-control"
                                showTimeInput
                                timeInputLabel="Hora:"
                                dateFormat="dd/MM/yyyy HH:mm"
                                placeholderText="sin fecha aún"
                                onChange={date => setInterviewDate(date as Date)}/>

                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Preselecionado:'
                                    value={preselected ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>
                    <p className="me-3 mb-0">Preselecionado: </p>
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
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Comentarios de preselección:'
                                    value={preselectedComments ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>
                    <label htmlFor="preselectedComment" className="form-label">Comentario de
                        preselección</label>
                    <textarea className="form-control"
                              id="preselectedComment"
                              rows={3}
                              value={preselectedComments}
                              onChange={e => setPreselectedComments(e.target.value)}/>
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Fecha de día de observación:'
                                    value={toDateString(observationDay)}
                                    changesAllow={!props.buttonDisabled}>
                    <label htmlFor="mail" className="form-label me-3">Fecha de día de observación: </label>
                    <DatePicker selected={observationDay}
                                className="form-control"
                                showTimeInput
                                timeInputLabel="Hora:"
                                dateFormat="dd/MM/yyyy HH:mm"
                                placeholderText="sin fecha aún"
                                onChange={date => {
                                    setObservationDay(date as Date);
                                }}/>
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Asistió a al día de observación:'
                                    value={asistedToObservation ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>
                    <p className="me-3 mb-0">Asistió a al día de observación: </p>
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
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Comentario día de observación:'
                                    value={observationDayComments ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>
                    <label htmlFor="assistedToObservationComment" className="form-label">Comentario día de
                        observación</label>
                    <textarea className="form-control"
                              id="assistedToObservationComment"
                              rows={3}
                              value={observationDayComments}
                              onChange={e => setObservationDayComments(e.target.value)}/>
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Entrenador:'
                                    value={trainer ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>

                    <label htmlFor="trainerText" className="form-label me-3 mb-0">Entrenador: </label>
                    <input type="text"
                           className="form-control" id="trainerText"
                           value={trainer ? trainer : ""}
                           onChange={e => setTrainer(e.target.value)}
                           placeholder="nombre del entrenador"/>

                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Admitido:'
                                    value={admited ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>
                    <p className="me-3 mb-0">Admitido: </p>
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
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Comentarios de admisión:'
                                    value={admissionComments ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>
                    <label htmlFor="admisioncomments" className="form-label">Comentarios de admisión</label>
                    <textarea className="form-control"
                              id="admisioncomments"
                              rows={3}
                              value={admissionComments}
                              onChange={e => setAdmissionComments(e.target.value)}/>
                </ProcessInformation>

                <ProcessInformation onSaveHandler={saveChangesHandler}
                                    label='Preselecionado:'
                                    value={preselected ?? 'sin registro'}
                                    changesAllow={!props.buttonDisabled}>
                    <div className="d-flex flex-column">
                        <div className="form-check mb-3">
                            <input className="form-check-input"
                                   type="checkbox"
                                   checked={down}
                                   onChange={e => setDown(e.target.checked)}
                                   id="downCheckbox"/>
                            <label htmlFor="downCheckbox" className="form-check-label">Dado de baja</label>
                        </div>
                        {
                            down ? (<div className="d-flex flex-column">
                                    <div className="mb-3">
                                        <label htmlFor="mail" className="form-label me-3">Fecha de baja: </label>
                                        <DatePicker selected={downDate}
                                                    showTimeInput
                                                    timeInputLabel="Hora:"
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    placeholderText="no tiene fecha de baja"
                                                    onChange={date => setDownDate(date as Date)}/>
                                    </div>
                                    <div>
                                        <label htmlFor="downcomments" className="form-label">Comentarios de baja</label>
                                        <textarea className="form-control"
                                                  id="downcomments"
                                                  rows={3}
                                                  value={downComments}
                                                  onChange={e => setDownComments(e.target.value)}/>
                                    </div>

                                </div>
                            ) : null
                        }
                    </div>
                </ProcessInformation>


            </form>
            <div className="d-flex align-items-start justify-content-start">
                {
                    success ? <div className="alert alert-success position-fixed fixed-top" role="alert">
                        Cambios guardados exitosamente
                    </div> : null
                }
                {
                    error ? <div className="alert alert-danger" role="alert">
                        {error}
                    </div> : null
                }
            </div>
        </div>
    )
}

export default ProcessInformationCreateEditForm;