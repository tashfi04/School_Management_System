import React, { Component } from 'react'
import {Jumbotron,Container} from 'react-bootstrap'

export default class Notice extends Component {
    render() {
        return (
            <div>
                <Jumbotron >
                    <Container>
                        Notice
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
