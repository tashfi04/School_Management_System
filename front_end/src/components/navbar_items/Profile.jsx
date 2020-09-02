import React, { Component } from 'react'
import { Jumbotron, Container,Col,Row,Image } from 'react-bootstrap'
import './Profile.css'
import StudentShow from './StudentShow'
import TeacherShow from './TeacherShow'

const axios = require('axios')


export default class Profile extends Component {

   constructor(props) {
       super(props)

       this.state = {
           username : localStorage.getItem('username'),
           dataStudent: [],
           dataTeacher: []
       }
   }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/profileStudent/', {
            params: {
                username : localStorage.getItem('username')
            }
        })
        .then(response => {
                this.setState({dataStudent: response.data[0]})
                console.log(this.state.dataStudent)
            })
        .catch(error => {
            console.log(error)
        })

        axios.get('http://127.0.0.1:8000/profileTeacher/', {
            params: {
                username : localStorage.getItem('username')
            }
        })
        .then(response => {
                this.setState({dataTeacher: response.data[0]})
                console.log(this.state.dataTeacher)
            })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        if(this.state.dataStudent){
            return (
                <div>
                    <Jumbotron>
                        <Container>
                        <h1 className="pt-4">Account Information</h1> <br></br>
                            <StudentShow data={this.state.dataStudent}/>
                        </Container>
                    </Jumbotron>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Jumbotron>
                        <Container>
                        <h1 className="pt-4">Account Information</h1> <br></br>
                            <TeacherShow data={this.state.dataTeacher} />
                        </Container>
                    </Jumbotron>
                </div>
            )
        }
    }
}
