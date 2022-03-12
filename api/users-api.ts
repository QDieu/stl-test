import { instance } from "./api";

export const UserAPI = {
    getUsers: (url : string) => {
        return instance.get(`/users${url}`).then(response => response.data).catch(err => console.error(err))
    },
    getUserInfo : (id : string) => {
        return instance.get(`users/${id}`).then(response => response.data).catch(err => console.error(err))
    },
    patchUserInfo : (id : string, data : {[key : string] : string | undefined}) => {
        return instance.patch(`users/${id}`, data).then(response => console.log(response.data)).catch(err => console.error(err))
    },
    postNewUser : (data : {[key : string] : string | undefined}) => {
        return instance.post(`users`, data).then(response => response.status).catch(err => console.error(err));
    }
}