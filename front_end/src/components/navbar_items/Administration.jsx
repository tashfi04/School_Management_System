import React, { Component } from 'react'
import {Jumbotron,Container} from 'react-bootstrap'
import "./Home.css"

export default class Administration extends Component {
    render() {
        return (
            <div className='Border'>
                <Jumbotron >
                    <Container>
                        Administration
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
