import React, { Component } from 'react'
import { Jumbotron, Container, Row, Col, Image} from 'react-bootstrap'
import SidebarAcademic from './SidebarAcademic'

export default class Overview extends Component {
    render() {
        return (
            <div style={{backgroundColor:"#B8B8B8"}}>
                <Row>
                    <Col sm={4}>
                        <Jumbotron >
                            <Container>
                                <SidebarAcademic />
                            </Container>
                        </Jumbotron>
                    </Col>
                    <Col sm={8}>
                        <Jumbotron>
                            <Container>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry .
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged . It was popularised
                                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages
                                , and more recently with desktop publishing software like Aldus PageMaker including 
                                versions of Lorem Ipsum.
                                <Image style={{height:'50vh'}} className="d-block w-100" src="../../assets/overview_demo.jpg" fluid alt="School-Front"/>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry .
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged . It was popularised
                                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages
                                , and more recently with desktop publishing software like Aldus PageMaker including 
                                versions of Lorem Ipsum.
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </div>
        )
    }
}
