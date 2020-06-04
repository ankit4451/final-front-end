/*  <--ROUTES-->
/checkuser --> for aadhar number checking
/register --> for register form
/login --> for login form
/setpassword --> setpassword page
/home --> user dashboard
*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import RegisterForm from './component/registerForm';
import CheckUserForm from './component/checkuser';
import SetPasswordForm from './component/setPassword';
import LoginForm from './component/login';
import Protected from './component/protectedh';
import Home from './component/home';
import ProtectedSP from './component/protectedsp';
import {Redirect} from 'react-router-dom';

class App extends Component {

  render() {
    return (
        <Router>
          <div>
            <Switch>
            <Route exact path="/">
                <RegisterForm />
              </Route>
              <Route path="/checkuser">
                <CheckUserForm />
              </Route>
              <ProtectedSP exact path="/setpassword" component={SetPasswordForm}>
              </ProtectedSP>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Protected exact path="/home" component={Home}>
              </Protected>
              <Redirect from="*" to='/' />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;