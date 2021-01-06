import React, { Component } from "react";
import { Jumbotron, Container, Carousel } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div style={{backgroundColor: "#D8D7D7"}}>
                <Jumbotron>
                    <Container>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry . Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged
                        . It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </Container>
                </Jumbotron>

                <Carousel className="pl-5 pr-5 ml-5 mr-5 pt-0 mt-0">
                    <Carousel.Item>
                        <img
                            style={{ height: "70vh" }}
                            className="d-block w-100"
                            src="assets/home.jpg"
                            fluid
                            alt="School-Front"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ height: "70vh" }}
                            className="d-block w-100"
                            src="assets/lab.jpg"
                            alt="Lab-Room"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ height: "70vh" }}
                            className="d-block w-100"
                            src="assets/playground.jpg"
                            alt="Field"
                        />
                    </Carousel.Item>
                </Carousel>
                <Jumbotron>
                    <Container>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry . Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged
                        . It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}
