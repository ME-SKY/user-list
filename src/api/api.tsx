import {IUser} from "../components/user-list/UserList";

const UsersApi = {
    baseUrl: 'https://reqres.in/api/users',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    getByPage: function (page: number) {
        return fetch(`${this.baseUrl}?page=${page}`)
            .then(res => res.json())
    },
    removeUser: function (userId: number) {
        return fetch(`${this.baseUrl}/${userId}`, {
            method: 'DELETE',
            headers: this.headers
        })
    },
    updateUser: function (userData: IUser, userId: number) {
        return fetch(`${this.baseUrl}/${userId}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(userData)
        });
    },
    addUser: function (userData: IUser) {
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(userData)
        })
    }
};


export default UsersApi;
