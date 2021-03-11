import * as React from "react";
import './styles.css';

interface CustomAlertI {
    shouldAppear: boolean,
    message?: string;
    onCancelHandler: Function;
    onConfirmHandler?: Function;
    cancelText: string;
    confirmText?: string;
}

const Alert: React.FC<CustomAlertI> = (props) => {

    const {children} = props;

    return props.shouldAppear ? (
        <div className="alert-wrapper d-flex justify-content-center align-items-center p-5">
            <div className="custom-alert">
                <div className="alert-content p-3">
                    {props.message
                    && <p>{props.message}</p>}
                    {children}
                </div>
                <div className="alert-footer p-3">
                    <button className="btn btn-outline-danger me-3" onClick={() => props.onCancelHandler()}>
                        {props.cancelText}
                    </button>
                    {props.onConfirmHandler && props.confirmText ?
                        (
                            <button className="btn btn-primary" onClick={() => props.onConfirmHandler ?  props.onConfirmHandler() : null}>
                                {props.confirmText}
                            </button>
                        ) : null
                    }
                </div>
            </div>
        </div>
    ) : null;
}

export default Alert;