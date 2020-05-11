import React, { Component } from 'react'
import {Jumbotron,Container} from 'react-bootstrap'

export default class About extends Component {
    render() {
        return (
            <div>
                <Jumbotron >
                    <Container>
                        About
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
