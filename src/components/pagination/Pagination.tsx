import React from 'react';
import './Pagination.scss'
import {observer} from "mobx-react-lite";
import {useStore} from "../../index";

function Pagination(props: {changeNumber:any}) {
    const store = useStore();
    const numbers = [1,2,3,4,5].map(numb => <div key={numb} className={`${numb === store.currPage ? 'active' : ''}`}>{numb}</div>);

    return (
        <div className="pagination-page-numbers" onClick={props.changeNumber}>
            {numbers}
        </div>
    )
}

export default observer(Pagination);
