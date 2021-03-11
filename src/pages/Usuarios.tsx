import * as React from "react";
import {useState} from "react";
import PageWrapper from "../components/pagewrapper/PageWrapper";
import CreateUsersForm from "../components/users/CreateUsersForm";
import ModifyUsers from "../components/users/ModifyUsers";
import {UIUser} from "../services/models/UIUser";
import Alert from "../components/modals/Alert";

const UsuariosPage: React.FC = () => {
    const [createUserPage, setCreateUserPage] = useState<boolean>(true);
    const [userToEdit, setUserToEdit] = useState<UIUser>();
    const [showEditAlert, setShowEditAlert] = useState<boolean>(false);

    return (
        <PageWrapper>
            <div className="btn-group mb-4" role="group" aria-label="Basic outlined example">
                <button type="button"
                        className={`btn btn-outline-primary ${createUserPage ? 'active' : ''}`}
                        onClick={() => setCreateUserPage(true)}>
                    crear usuarios
                </button>
                <button type="button"
                        className={`btn btn-outline-primary ${createUserPage ? '' : 'active'}`}
                        onClick={() => setCreateUserPage(false)}>
                    modificar usuarios
                </button>
            </div>
            {
                !createUserPage ? (<>
                    {
                        showEditAlert ? <Alert shouldAppear={showEditAlert}
                                               onCancelHandler={() => setShowEditAlert(false)}
                                               cancelText="Cancelar">
                            <CreateUsersForm userToEdit={userToEdit} editionMode={!createUserPage}/>
                        </Alert> : null
                    }
                    <ModifyUsers
                        userToEditHandler={(user: UIUser) => {
                            setShowEditAlert(true);
                            setUserToEdit(user)
                        }}/>
                </>) : <CreateUsersForm userToEdit={userToEdit} editionMode={!createUserPage}/>

            }
        </PageWrapper>
    )
}

export default UsuariosPage;