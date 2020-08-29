import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import './Profile.css'

const axios = require('axios')


export default class Profile extends Component {

   constructor(props) {
       super(props)

       this.state = {
           username : localStorage.getItem('username'),
           data: []
       }
   }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/profile/', {
            params: {
                username : localStorage.getItem('username')
            }
        })
        .then(response => {
            console.log(response.data[0])
            this.setState({data: response.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h1 className="pt-4">Account Information</h1> <br></br>
                        <h3> {this.state.data.username} </h3>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
