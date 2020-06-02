/*  <--ROUTES-->
/checkuser --> for aadhar number checking
/register --> for register form
/login --> for login form
/setpassword --> setpassword page
/home --> user dashboard
*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import RegisterForm from './component/register';
import CheckUserForm from './component/checkuser';
import SetPasswordForm from './component/setpassword';
import LoginForm from './component/login';
import Protected from './component/protectedh';
import Home from './component/home';
import ProtectedSP from './component/protectedsp';

class App extends Component {

  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/checkuser">
                <CheckUserForm />
              </Route>
              <Route exact path="/register">
                <RegisterForm />
              </Route>
              <ProtectedSP exact path="/setpassword" component={SetPasswordForm}>
              </ProtectedSP>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Protected exact path="/home" component={Home}>
              </Protected>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;