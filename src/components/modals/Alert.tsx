import * as React from "react";
import './styles.css';

interface CustomAlertI {
    shouldAppear: boolean,
    message: string;
    onCancelHandler: Function;
    onConfirmHandler: Function;
    cancelText: string;
    confirmText: string;
}

const Alert: React.FC<CustomAlertI> = (props) => {

    return props.shouldAppear ? (
        <div className="alert-wrapper d-flex justify-content-center align-items-center p-5">
            <div className="alert">
                <div className="alert-content p-3">
                    <p>{props.message}</p>
                </div>
                <div className="alert-footer p-3">
                    <button className="btn btn-outline-danger me-3" onClick={() => props.onCancelHandler()} >
                        {props.cancelText}
                    </button>

                    <button className="btn btn-primary" onClick={() => props.onConfirmHandler()} >
                        {props.confirmText}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

export default Alert;