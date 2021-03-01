import {httpFetch} from "./fetch";
import {UIUser} from "./models/UIUser";

const UserService = {
    basePath: process.env.NODE_ENV === 'production' ? 'http://candidatosgo.es:7000' : 'http://localhost:7000',
    getAllUsers: async () => {
        return httpFetch.get<UIUser[]>(
            `${UserService.basePath}/users`,
        )
    },
    updateUser: async (user: UIUser, password?: string) => {

        const updatePassword = password ? password : null

        return httpFetch.put<UIUser>(
            `${UserService.basePath}/users/${user.id}`,
            {user, password: updatePassword}
        )
    },
    deleteUserById(id: number, userType: string) {
        return httpFetch.delete(
            `${UserService.basePath}/users/${id}`,
            {userType}
        )
    }
}

export default UserService;