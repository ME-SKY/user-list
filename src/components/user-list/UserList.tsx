import React, {useEffect} from 'react';
import './UserList.scss';
import {ModalInfo} from "./../../App"
import UserForm, {FormActions} from "../user-form/UserForm";
import {observer} from "mobx-react-lite";
import {useStore} from "../../index";
import UsersApi from "../../api/api";


export interface IUser {
    avatar: string,
    email: string,
    first_name: string,
    id: number,
    last_name: string
}

export const UserList = observer((props: { pageNumber: number, toggleModal: Function }) => {
    const store = useStore();

    const userListBlock = store.usersByPage(props.pageNumber).map(user =>
        <div onClick={() => {props.toggleModal({info: {user: user, action: FormActions.Update}, componentToWrap: UserForm, show: true, title: 'User information'} as ModalInfo)}}
             key={user.id}
             className="user">{user.first_name}
        </div>
    );

    function getUsers(pageNumber: number) {
        UsersApi.getByPage(pageNumber)
            .then(
                result => store.addUsers({page: pageNumber, userList: result.data as IUser[]}),
                error => {throw new Error(error)}
            )
    }

    useEffect(() => {
        getUsers(props.pageNumber)
    }, [props.pageNumber]);

    return (
        <div className="user-list">
            {store.users.length > 0 && userListBlock}
            <div className="add-user" onClick={ () => {props.toggleModal({componentToWrap: UserForm, show: true, title: 'Adding new user', info: {action: FormActions.Create}} as ModalInfo)}}>
                +
            </div>
        </div>
    );
});
