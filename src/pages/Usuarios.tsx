import * as React from "react";
import PageWrapper from "../components/pagewrapper/PageWrapper";
import CreateUsersForm from "../components/users/CreateUsersForm";

const UsuariosPage: React.FC = () => {
    return (
        <PageWrapper>
            <CreateUsersForm />
        </PageWrapper>
    )
}

export default UsuariosPage;