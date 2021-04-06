import * as React from "react";
import {useState} from "react";

interface ProcessInformationCardProps {
    onSaveHandler: Function
    label: string,
    value: string,
    changesAllow: boolean;
}

const ProcessInformation: React.FC<ProcessInformationCardProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    return (
        <div className="col-12 mb-3">
            <div className="card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                    {
                        editMode ? <div className="d-flex align-items-center">{props.children}</div> : (
                            <div className="d-flex align-items-center flex-sm-column">
                                <p className="me-3 mb-0">{props.label}</p>
                                <p className="mb-0">{props.value}</p>
                            </div>
                        )
                    }
                    {
                        props.changesAllow ? editMode ? (
                            <div>
                                <button className="btn btn-outline-danger me-3" onClick={(event) => {
                                    event.preventDefault();
                                    setEditMode(false);
                                }}>
                                    <i className="bi bi-x"/>
                                </button>
                                <button className="btn btn-outline-primary" onClick={(event) => {
                                    event.preventDefault();
                                    props.onSaveHandler()
                                }}>
                                    <i className="bi bi-check"/>
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-outline-primary" onClick={(event) => {
                                event.preventDefault();
                                setEditMode(true);
                            }}>
                                <i className="bi bi-pencil"/>
                            </button>
                        ) : null
                    }
                </div>
            </div>

        </div>
    )
}

export default ProcessInformation;