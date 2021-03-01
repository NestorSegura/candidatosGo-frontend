import * as React from "react";
import {useEffect, useState} from "react";
import OfficeService from "../../services/office.service";
import UserService from "../../services/user.service";
import Alert from "../modals/Alert";

interface UserRowI {
    userId: number;
    userName: string;
    userSponsor?: string;
    userType: string;
    onUserSelectHandler: (id: number) => void;
    onUserDeletedHandler: () => void;
}

const UserRow: React.FC<UserRowI> = (props: UserRowI) => {

    const [sponsor, setSponsor] = useState<string>();
    const [showWarning, setShowWarning] = useState<boolean>(false);

    useEffect(() => {
        if (props.userSponsor) {
            OfficeService.getOfficeByUuid(props.userSponsor)
                .then(response => {
                    if (sponsor !== response.parsedBody?.data.name) {
                        setSponsor(response.parsedBody?.data.name)
                    }
                })
                .catch(error => console.error(error))
        }
    })

    const deleteUser = () => {
        setShowWarning(false);
        UserService.deleteUserById(props.userId, props.userType)
            .then((result) => {
                props.onUserDeletedHandler();
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (<>
            <tr>
                <td>{props.userName}</td>
                <td>{props.userType}</td>
                <td>{sponsor}</td>
                <td>
                    <button className="btn btn-primary-bordered"
                            onClick={() => props.onUserSelectHandler(props.userId)}>
                        <i className="bi bi-pencil"/>
                    </button>
                    <button className="btn btn-primary-bordered"
                            onClick={() => setShowWarning(true)}>
                        <i className="bi bi-trash"/>
                    </button>
                </td>
            </tr>
            <Alert shouldAppear={showWarning}
                   onCancelHandler={() => setShowWarning(false)}
                   onConfirmHandler={() => deleteUser()}
                   cancelText="Cacelar"
                   confirmText="Borrar usuario"
                   message={`Estás a punto de eliminar el usuario: ${props.userName}`} />
        </>
    )
}

export default UserRow;