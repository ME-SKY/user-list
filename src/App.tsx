import React, {useState} from 'react';
import './App.scss';
import UserList from "./user-list/UserList";
import Pagination from "./pagination/Pagination";

function App() {
  const [page, setPage] = useState(1);

  const changeNumber = (event: any) => {
    console.log(event)
    setPage(parseInt(event.target.innerText, 10));
    console.log(page)
  }

  return (
      <div className="main">
        <div className="user-list-container">
          <UserList pageNumber={page} />
          <Pagination changeNumber={changeNumber} />
        </div>
      </div>
  );
}

export default App;
