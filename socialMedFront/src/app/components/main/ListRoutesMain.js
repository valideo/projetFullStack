import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Feed from './Feed';
import Profile from './Profile';

class ListRoutesMain extends Component {
 
 
  render() {
    return (
          <div>
            <Switch>
              <Route path='/home' component={Feed} />
              <Route path='/profile' component={Profile} />
            </Switch>
          </div>
    );
  }
}

export default ListRoutesMain;