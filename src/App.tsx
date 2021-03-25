import React, {useEffect, useState} from 'react';
import './App.scss';
import Pagination from "./components/pagination/Pagination";
import Modal from "./components/modal/Modal";
import UserForm from "./components/user-form/UserForm";
import User from "./components/user/User"
import {UserList} from "./components/user-list/UserList";
import {useStore} from "./index";
import {observer} from "mobx-react-lite";

export interface ModalInfo {
    show: boolean,
    componentToWrap: typeof User | typeof UserForm, //possible types of Modal
    info?: any,
    title?: string
}


function App() {
    const store = useStore();
    const [page, setPage] = useState(1);

    const changePageNumber = (event: any) => {
        setPage(parseInt(event.target.innerText, 10));
        store.changePage(parseInt(event.target.innerText, 10))
    };

    const toggleModal = (modalInfo: ModalInfo) => {
        store.toggleModal(modalInfo);
    };

    return (
        <div className="main">
            <div className="user-list-container">
                <UserList pageNumber={page} toggleModal={toggleModal}/>
                <Pagination changeNumber={changePageNumber}/>
            </div>
            {store.modalInstance.show &&
            <Modal
                WrappedComponent={store.modalInstance.componentToWrap}
                properties={store.modalInstance.info}
                onClose={() => toggleModal({...store.modalInstance, show: false})}
                title={store.modalInstance.title}/>
            }
        </div>
    );
}

export default observer(App);
