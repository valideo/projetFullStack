import React from 'react';
import Header from './Header'
import ListRoutesMain from './ListRoutesMain'
import { BrowserRouter as Router} from 'react-router-dom';

function Main() {

  return (
    <div>
        <Router>
            <Header/>
            <ListRoutesMain/>
        </Router>
    </div>
  );
}

export default Main;