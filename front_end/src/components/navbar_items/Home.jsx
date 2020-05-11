import React, { Component } from 'react'
import { Jumbotron,Container,Carousel } from 'react-bootstrap'
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron >
                    <Container>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        . Lorem Ipsum has been the industry's standard dummy text ever since the 
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting, remaining essentially unchanged
                        . It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing
                        software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Container>
                </Jumbotron>

                <Carousel>
                <Carousel.Item>
                    <img  style={{'height':"500px"}} className="d-block w-100" src="assets/home.jpg" fluid alt="School-Front"/>
                <Carousel.Caption>
                    <p>School From Front</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img  style={{'height':"500px"}} className="d-block w-100" src="assets/lab.jpg" alt="Lab-Room"/>
                <Carousel.Caption>
                    <h3>Lab Room for class 9-10</h3>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img  style={{'height':"500px"}} className="d-block w-100" src="assets/playground.jpg"alt="Field"/>
                <Carousel.Caption>
                    <h3>School Playground</h3>
                </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
                <Jumbotron >
                    <Container>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        . Lorem Ipsum has been the industry's standard dummy text ever since the 
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but
                        also the leap into electronic typesetting, remaining essentially unchanged
                        . It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing
                        software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
