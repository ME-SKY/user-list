import React from "react";
import {IUser} from "../user-list/UserList";
import "./User.scss"

function User(props: {user: IUser}){

    return (
        <div className="user-info">
            <div className="avatar-photo">
                <img src={props.user.avatar} alt=""/>
            </div>
            <div className="info">
                <h4 className="name">name: {props.user.first_name} {props.user.last_name}</h4>
                <h4 className="email">email: {props.user.email}</h4>
            </div>
        </div>
    )
}

export default User;
