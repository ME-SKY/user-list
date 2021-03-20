import React, {useEffect, useState} from 'react';
import './Pagination.scss'

function Pagination(props: {changeNumber:any}) {
    const numbers = [1,2,3,4,5].map(numb => <div key={numb}>{numb}</div>);

    return (
        <div className="pagination-page-numbers" onClick={props.changeNumber}>
            {numbers}
        </div>
    )
}

export default Pagination;
