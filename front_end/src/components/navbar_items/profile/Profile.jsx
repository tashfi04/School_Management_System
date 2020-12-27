import React, { Component } from 'react'
import { Jumbotron, Container, Row, Col} from 'react-bootstrap'
import Sidebar from './Sidebar'
import StudentShow from './StudentShow'
import TeacherShow from './TeacherShow'

import "./Profile.scss"

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
        if(localStorage.getItem('role') == '4'){
            axios.get('/api/v1/students/details/', {
                headers: {
                    "Authorization": `JWT ${localStorage.getItem("token")}`,
                }
            })
            .then(response => {
                    this.setState({dataStudent: response.data[0]})
                })
            .catch(error => {
                console.log(error)
            })
        }
        
        else if(localStorage.getItem('role') == '0'
                || localStorage.getItem('role') == '1'
                || localStorage.getItem('role') == '2'
                || localStorage.getItem('role') == '3'
        ){
            axios.get('/api/v1/teachers/details/', {
                headers: {
                    "Authorization": `JWT ${localStorage.getItem("token")}`,
                }
            })
            .then(response => {
                    this.setState({dataTeacher: response.data[0]})
                })
            .catch(error => {
                console.log(error)
            })
        }
    }

    render() {
        if(localStorage.getItem('role') == '4'){
            return (
                <div style={{backgroundColor:"#B8B8B8"}}>
                    <Row>
                        <Col sm={4}>
                            <Jumbotron>
                                <Container>
                                    <Sidebar />
                                </Container>
                            </Jumbotron>
                        </Col>
                        <Col sm={8}>
                            <Jumbotron>
                                <Container>
                                <h1 className="pt-4">Account Information</h1> <br></br>
                                    <StudentShow data={this.state.dataStudent}/>
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </div>
            )
        }
        else if(localStorage.getItem('role') == '0'
                || localStorage.getItem('role') == '1'
                || localStorage.getItem('role') == '2'
                || localStorage.getItem('role') == '3'){
            return (
                <div style={{backgroundColor:"#B8B8B8"}}>
                    <Row>
                        <Col sm={3}>
                            <Jumbotron>
                                <Container>
                                    <Sidebar />
                                </Container>
                            </Jumbotron>
                        </Col>
                        <Col sm={9}>
                    <Jumbotron>
                        <Container>
                        <h1 className="pt-4">Account Information</h1> <br></br>
                            <TeacherShow data={this.state.dataTeacher} />
                        </Container>
                    </Jumbotron>
                    </Col>
                    </Row>
                </div>
            )
        }
        else{
            return(
                <div>
                </div>
            )
        }
    }
}
