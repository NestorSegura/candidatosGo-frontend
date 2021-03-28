import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {UIUser} from "../../services/models/UIUser";
import UserRow from "./UserRow";
import {deepEqual} from "../../utils/comparisonMethods";
import {MainContext} from "../../store/MainReducer";

interface UserListProps {
    userList: UIUser[];
    onUserSelectHandler: (id: number) => void;
    onUserListChange: () => void;
}


const UsersTable: React.FC<UserListProps> = (props: UserListProps) => {

    const {officeUuid, userType} = useContext(MainContext);
    const [usersList, setUsersList] = useState<UIUser[]>();

    useEffect(() => {
        let list = props.userList;
        if (userType !== 'SYS_ADMIN') {
            list = list.filter(user => user.sponsor_uuid === officeUuid || user.office_id === officeUuid);
        }
        if (!deepEqual(usersList, list)) {
            setUsersList(list);
        }
    }, [officeUuid, userType, usersList, props.userList])

    return (userType && officeUuid) ? (
        <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Nombre de usuario</th>
                    <th>Tipo de usuario</th>
                    <th>Promotor</th>
                    <th>Editar usuario</th>
                </tr>
                </thead>
                <tbody>
                {
                    usersList && usersList
                        .map(user => <UserRow key={user.id}
                                              onUserDeletedHandler={props.onUserListChange}
                                              onUserSelectHandler={() => props.onUserSelectHandler(user.id as number)}
                                              userName={user.name}
                                              userType={user.user_type}
                                              userId={user.id as number}
                                              userSponsor={user.sponsor_uuid}/>)
                }
                </tbody>
            </table>
        </div>
    ) : null
}

export default UsersTable;