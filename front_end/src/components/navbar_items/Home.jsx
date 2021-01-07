import React, { Component } from "react";
import {
    Jumbotron,
    Container,
    Carousel,
    Row,
    Col,
    Image,
    Card,
    Button,
} from "react-bootstrap";
import "./Home.css";
// import "./Home.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Home extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        infinite: true,
                        dots: true,
                    },
                },
            ],
        };
        return (
            <div style={{ fontFamily: "verdana" }}>
                <Carousel
                    className="pb-0 mb-0"
                    style={{ backgroundColor: "#e9ecef" }}
                >
                    <Carousel.Item>
                        <img
                            style={{ height: "70vh" }}
                            className="d-block w-100"
                            src="assets/home.jpg"
                            alt="School-Front"
                        />
                        <Carousel.Caption>
                            <h3>Welcome to Shahjalal University School</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ height: "70vh" }}
                            className="d-block w-100"
                            src="assets/lab.jpg"
                            alt="Lab-Room"
                        />
                        <Carousel.Caption>
                            <h3>Welcome to Shahjalal University School</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ height: "70vh" }}
                            className="d-block w-100"
                            src="assets/playground.jpg"
                            alt="Field"
                        />
                        <Carousel.Caption>
                            <h3>Welcome to Shahjalal University School</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ height: "70vh" }}
                            className="d-block w-100"
                            src="assets/lab.jpg"
                            alt="Lab-Room"
                        />
                        <Carousel.Caption>
                            <h3>Welcome to Shahjalal University School</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Row className="m-5 p-5">
                    <Col sm={8}>
                        <h3>About Us:</h3>
                        <hr className="new" />
                        <br />
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry . Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged
                        .It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </Col>
                    <Col sm={4}>
                        <div
                            className="img-hover-zoom"
                            style={{ width: "400px" }}
                        >
                            <img
                                src="assets/playground.jpg"
                                style={{ height: "300px" }}
                            />
                        </div>
                    </Col>
                </Row>
                <div style={{ backgroundColor: "#e9ecef" }}>
                    <div>
                        <div>
                            <br />
                            <h3 style={{ textAlign: "center" }}>
                                News and Events
                            </h3>
                            <hr className="new1" />
                            <br />
                            <br />
                            <br />
                            <Container className="homecard" fluid>
                                <Slider {...settings}>
                                    <Card style={{margin: '5px'}}>
                                        <Card.Img
                                            variant="top"
                                            src="assets/playground.jpg"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                Card Title 1
                                            </Card.Title>
                                            <Card.Text>
                                                Some quick example text to build
                                                on the card title and make up
                                                the bulk of the card's content.
                                            </Card.Text>
                                            <Button variant="primary">
                                                Go somewhere
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                    <Card style={{margin: '5px'}}>
                                        <Card.Img
                                            variant="top"
                                            src="assets/playground.jpg"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                Card Title 2
                                            </Card.Title>
                                            <Card.Text>
                                                Some quick example text to build
                                                on the card title and make up
                                                the bulk of the card's content.
                                            </Card.Text>
                                            <Button variant="primary">
                                                Go somewhere
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                    <Card style={{margin: '5px'}}>
                                        <Card.Img
                                            variant="top"
                                            src="assets/playground.jpg"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                Card Title 3
                                            </Card.Title>
                                            <Card.Text>
                                                Some quick example text to build
                                                on the card title and make up
                                                the bulk of the card's content.
                                            </Card.Text>
                                            <Button variant="primary">
                                                Go somewhere
                                            </Button>
                                        </Card.Body>
                                    </Card>

                                    <Card style={{margin: '5px'}}>
                                        <Card.Img
                                            variant="top"
                                            src="assets/lab.jpg"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                Card Title 4
                                            </Card.Title>
                                            <Card.Text>
                                                Some quick example text to build
                                                on the card title and make up
                                                the bulk of the card's content.
                                            </Card.Text>
                                            <Button variant="primary">
                                                Go somewhere
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Slider>
                            </Container>
                            <div className="d-flex justify-content-end pb-3">
                                <Button
                                    variant="dark"
                                    style={{ marginTop: "40px" }}
                                >
                                    See all...
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Row className="m-5 p-5">
                        <Col sm={8}>
                            <h3>Headmaster Speech:</h3>
                            <hr className="new" />
                            <br />
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry . Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged .It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </Col>
                        <Col sm={4}>
                            <div
                                className="img-hover-zoom"
                                style={{ width: "400px" }}
                            >
                                <img
                                    src="assets/playground.jpg"
                                    style={{ height: "300px" }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{backgroundColor: "#2A2A28" }}>
                    <div className="m-5 p-5" style={{color:'white'}} >
                        <Row style={{fontFamily:'cursive'}}>
                            <Col sm = {4}>
                                <h3>Contact Us:</h3>
                                <hr className="new2" />
                                <br />
                                Shahjalal University School < br />
                                Akhalia, Surma < br />
                                Phone No. : 01XXXXXXXX< br />
                                Email: asdadga@gmail.com< br />
                            </Col>
                            <Col sm={4}>
                            </Col>
                            <Col sm = {4}>
                                <h3>Feature Link:</h3>
                                <hr className="new2" />
                                Bangladesh Portal <br />
                                Ministry of Education<br />
                                National University of Bangladesh<br />
                                Dhaka Education Board<br />
                                NCTB<br />
                                National Education Policy 2010<br />
                                <br />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
