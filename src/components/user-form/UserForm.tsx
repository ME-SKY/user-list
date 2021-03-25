import React, {useEffect, useState} from "react";
import "./UserForm.scss"
import {IUser} from "../user-list/UserList";
import {useStore} from "../../index";
import UsersApi from "../../api/api";

export enum FormActions {
    Update = 'PUT',
    Create = 'POST'
}

enum FormMethods {
    DELETE = 'DELETE',
    PUT = 'PUT',
    POST = 'POST'
}

function UserForm(props: { action?: FormActions, user?: IUser }) {
    const store = useStore();
    const [userForm, setForm] = useState<IUser>({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
    });


    useEffect(() => {
        props.user && setForm(props.user);
    }, [props]);

    const closeModal = () => store.toggleModal({componentToWrap: store.modalInstance.componentToWrap, show: false});

    const manageUser = (method: FormMethods) => {
        if (props.user) {
            switch (method) {
                case FormMethods.DELETE:
                    UsersApi.removeUser(props.user.id)
                        .then(() => store.removeUser(props.user as IUser))
                        .then(() => closeModal());
                    break;
                case FormMethods.PUT:
                    UsersApi.updateUser({...props.user, ...userForm}, props.user.id)
                        .then(() => store.updateUser({...props.user, ...userForm} as IUser))
                        .then(() => closeModal());
                    break;
            }
        } else {
            UsersApi.addUser(userForm)
                .then(() => store.addUser(userForm))
                .then(() => closeModal());
        }
    };

    return (

        <div className="user-form">

            <div className="first-name">
                <label htmlFor="first-name">First name:</label>
                <input value={userForm.first_name} onChange={event => {
                    setForm((prevValue) => ({...prevValue, first_name: event.target.value}))
                }} minLength={4} name="first-name" type="text"/>
            </div>
            <div className="last-name">
                <label htmlFor="last-name">Last name:</label>
                <input value={userForm.last_name} onChange={event => {
                    setForm((prevValue) => ({...prevValue, last_name: event.target.value}))
                }} minLength={4} name="last-name" type="text"/>
            </div>
            <div className="email">
                <label htmlFor="email">Email:</label>
                <input value={userForm.email} name="email" onChange={event => {
                    setForm((prevValue) => ({...prevValue, email: event.target.value}))
                }} type="email"/>
            </div>

            <div className="actions">
                {
                    props.action === FormActions.Update &&
                    <>
                        <button onClick={() => manageUser(FormMethods.DELETE)}>
                            Удалить
                        </button>
                        <button onClick={() => manageUser(FormMethods.PUT)}>
                            Сохранить
                        </button>
                    </>
                }
                {
                    props.action === FormActions.Create &&
                    <button onClick={() => manageUser(FormMethods.POST)}>
                        Добавить
                    </button>
                }
            </div>


        </div>
    )
}

export default UserForm;
