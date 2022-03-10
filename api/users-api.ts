import { instance } from "./api";

export const UserAPI = {
    getUsers: (url : string) => {
        return instance.get(`/users${url}`).then(response => response.data).catch(err => console.error(err))
    },
    getUserInfo : (id : string) => {
        return instance.get(`users/${id}`).then(response => response.data).catch(err => console.error(err))
    } 
}