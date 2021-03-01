import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {UIUser} from "../../services/models/UIUser";
import UserRow from "./UserRow";
import {AuthContext} from "../auth/AuthContext";
import {deepEqual} from "../../utils/comparisonMethods";

interface UserListProps {
    userList: UIUser[];
    onUserSelectHandler: (id: number) => void;
    onUserListChange: () => void;
}


const UsersTable: React.FC<UserListProps> = (props: UserListProps) => {

    const {officeId, usertype} = useContext(AuthContext);
    const [usersList, setUsersList] = useState<UIUser[]>();

    useEffect(() => {
        let list = props.userList;
        if (usertype !== 'SYS_ADMIN') {
            list = list.filter(user => user.sponsor_uuid === officeId || user.office_id === officeId);
        }
        if (!deepEqual(usersList, list)) {
            setUsersList(list);
        }
    }, [officeId, usertype, usersList, props.userList])

    return (usertype && officeId) ? (
        <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Nombre de usuario</th>
                    <th>Tipo de usuario</th>
                    <th>Patrocinador</th>
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