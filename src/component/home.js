import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        };
    }

    logout = () => {
        localStorage.removeItem('user');
        this.setState({
            navigate : true
        });
        this.props.history.push('/login');
    };

    render() {
        const { navigate } = this.state;

        if(navigate){
            return <Redirect to="/login" push={true} />
        }

        return (
            <div>
                <p>Home Works!!</p>
                <p>Basic Logout Button is implemented..as dashboard will contain logout too!!</p> 
                <Button color="primary" onClick={this.logout}>LOGOUT</Button>
            </div>
        )
    }
}

export default withRouter(Home)


