import * as React from "react";
import {useEffect, useState} from "react";
import {UIUser} from "../../services/models/UIUser";
import {deepEqual} from "../../utils/comparisonMethods";
import UserService from "../../services/user.service";
import UsersTable from "./UsersTable";

interface ModifyUsersI {
    userToEditHandler: (user: UIUser) => void;
}

const ModifyUsers: React.FC<ModifyUsersI> = (props) => {

    const [users, setUsers] = useState<UIUser[]>();

    const loadUsersData = () => {
        UserService.getAllUsers()
            .then((response) => {
                if (!deepEqual(users, response.parsedBody?.data)) {
                    setUsers(response.parsedBody?.data)
                }
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        UserService.getAllUsers()
            .then((response) => {
                if (!deepEqual(users, response.parsedBody?.data)) {
                    setUsers(response.parsedBody?.data)
                }
            })
            .catch((error) => console.error(error))
    }, [users])

    const onEditUserHandler = (id: number) => {
        if (users) {
            props.userToEditHandler(users.find(user => user.id === id) as UIUser)
        }
    }

    return (
        <div>
            <h2 className="mb-4">Lista de usuarios</h2>
            {
                users && <div className="table-responsive">
                    <UsersTable onUserSelectHandler={onEditUserHandler}
                                onUserListChange={loadUsersData}
                                userList={users}/>
                </div>
            }
        </div>
    )
}

export default ModifyUsers;