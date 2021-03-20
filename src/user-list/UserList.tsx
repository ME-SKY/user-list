import React, {useEffect, useState} from 'react';
import './UserList.scss';


interface User {
    name: string;
}


function UserList(props: {pageNumber: number}) {

    const [userList, setUserList] = useState([]);
    // const [page, setPage] = useState(props.pageNumber);
    const userListBlock = userList.map(user =>
        <div key={user['id']} className="user">{user['first_name']}</div>
    );

    function getUsers(pageNumber: number) {
        fetch(`https://reqres.in/api/users?page=${pageNumber}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setUserList(result.data);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getUsers(props.pageNumber)
    }, [props.pageNumber]);

    return (
        <div className="user-list">
            {/*<div className="list">*/}
                {userList.length > 0 && userListBlock}
            {/*</div>*/}

            <div className="add-user">
                add-user
            </div>
        </div>

    )
}


export default UserList;
