import {action, computed, makeObservable, observable, set} from "mobx";
import {IUser} from "../components/user-list/UserList";
import {ModalInfo} from "../App";
import UserForm from "../components/user-form/UserForm";

interface IUserListStore {
    page: number,
    userList: IUser[]
}

export class Store {
    users: IUserListStore[] = [];
    list: IUser[] = [];
    currentPage: number = 1;
    modal: ModalInfo = {show: false, componentToWrap: UserForm};

    constructor(users: IUser[]) {
        makeObservable(this, {
            list: observable,
            users: observable,
            modal: observable,
            currentPage: observable,
            allUsers: computed,
            addUsers: action,
            addUser: action,
            removeUser: action,
            updateUser: action,
            toggleModal: action,
            currPage: computed
        });
        this.list = users;
    }

    addUser (user: IUser)  {
        this.list.push(user);
    };

    changePage(newPage: number){
        this.currentPage = newPage;
    };

    toggleModal(modalInfo: ModalInfo){
        this.modal = {...this.modal, ...modalInfo};
    };

    addUsers (users: IUserListStore) {
        this.users.push(users);
    };

    removeUser (user: IUser)  {
        const usersPageIndex = this.users.findIndex(x => x.page === this.currentPage);

        const usersOnPage = this.users[usersPageIndex];

        if(usersOnPage){
            const userIndex = usersOnPage.userList.findIndex(x => x.id === user.id);
            userIndex >= 0 && usersOnPage.userList.splice(userIndex, 1);
            set(this.users[usersPageIndex], usersOnPage);
        }
    };

    updateUser(user: IUser){
        const usersPageIndex = this.users.findIndex(x => x.page === this.currentPage);
        const usersOnPage = this.users[usersPageIndex];

        if(usersOnPage){
            const userIndex = usersOnPage.userList.findIndex(x => x.id === user.id);
            set(usersOnPage.userList[userIndex], user);
            set(this.users[usersPageIndex], usersOnPage);
        }
    }

    get allUsers(): IUser [] {
        return this.list;
    }

    get modalInstance(): ModalInfo{
        return this.modal;
    }

    usersByPage(page: number): IUser [] {
        const byPageUsers = this.users.find(x => x.page === page);
        return byPageUsers ? byPageUsers.userList : [];
    }

    get currPage(): number{
        return this.currentPage;
    }
}
