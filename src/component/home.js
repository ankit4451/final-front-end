import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import axios from 'axios';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        };
    }

    logout = () => {
        let currentUser = JSON.parse(localStorage.getItem("user"));
         const headers = {
             'Authorization': currentUser.token? `Bearer${currentUser.token}`:''
         }
        axios({
            method: 'post',
            url:'http://localhost:3000/users/logout',
            data:{},
            headers:headers
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
         
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
                <Button color="primary" onClick={this.logout}>LOGOUT</Button>
            </div>
        )
    }
}

export default withRouter(Home)


