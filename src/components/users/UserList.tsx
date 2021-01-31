import * as React from "react";
import {UIUser} from "../../services/models/UIUser";

interface UserListProps {
    userList: UIUser[]
}

const UserList: React.FC<UserListProps> = (props: UserListProps) => {

    function onRowClickHandler(id: number) {

    }

    const renderRows = () => {
        return props.userList.map(user => (
            <tr key={user.id} onChange={() => onRowClickHandler(user.id as number)}>
                <td>{user.name}</td>
                <td>{user.user_type}</td>
                <td>{user.office_id}</td>
            </tr>
        ))
    }

    return (
        <div>
            <table className="table table-striped table-hover table-bordered candidatos">
                <thead>
                <tr>
                    <td>id</td>
                    <td>Nombre de usuario</td>
                    <td>tipo de usuario</td>
                    <td>officina</td>
                </tr>
                </thead>
                <tbody>
                {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;