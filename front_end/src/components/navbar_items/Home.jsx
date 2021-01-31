import React, { useEffect, useState } from "react";
import { Carousel, Row, Col, Card, Button } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
// import "./Home.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoticeMarquee from './Notice/NoticeMarquee';

const axios = require("axios");

function Home() {
    const [aboutUs, setAboutUs] = useState({});
    const [headMaster, setHeadMaster] = useState({});
    const [homePage, setHomePage] = useState({});
    const [event, setEvent] = useState({});

    useEffect(() => {
        const loadAboutUs = async () => {
            axios
                .get("api/v1/institution/about_us/details")
                .then((response) => {
                    setAboutUs(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadAboutUs();

        const loadHeadmaster = async () => {
            axios
                .get("api/v1/institution/about_us/headmaster_speech/")
                .then((response) => {
                    setHeadMaster(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadHeadmaster();

        const loadCarousol = async () => {
            axios
                .get("api/v1/institution/homepage_details/")
                .then((response) => {
                    setHomePage(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadCarousol();

        const loadEvent = async () => {
            axios
                .get("api/v1/institution/events/list/")
                .then((response) => {
                    setEvent(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadEvent();
    }, []);

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

    let showCards;
    let KEY = 0;

    if (Object.keys(event).length > 0) {
        showCards = event.map((item) => (
            <div className="merge" key={++KEY} style={{ maxHeight: "10vh" }}>
                <Card>
                    <Card.Img variant="top" src={item.photo} />
                    <Card.Body>
                        <Card.Title style={{ height: "10vh" }}>
                            {item.title}
                        </Card.Title>
                        <b>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "calendar-day"]}
                            />{" "}
                            {item.date}
                        </b>
                        <br />
                        <br />
                        <Card.Text style={{ height: "15vh" }}>
                            {item.description.substring(0, 100)}
                        </Card.Text>
                        <Button
                            variant="secondary"
                            style={{ backgroundColor: "#2A2A28" }}
                        >
                            <Link
                                to={`/event/${item.id}`}
                                style={{ color: "white" }}
                            >
                                See more...
                            </Link>
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        ));
    }

    return (
        <div style={{ fontFamily: "verdana" }}>
            <Row>
                <Col md={9}>
                    <Carousel
                        className="pb-0 mb-0"
                        style={{ backgroundColor: "#e9ecef" }}
                    >
                        <Carousel.Item>
                            <img
                                style={{ height: "70vh" }}
                                className="d-block w-100"
                                src={String(homePage.home_photo_1)}
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
                                src={String(homePage.home_photo_2)}
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
                                src={String(homePage.home_photo_3)}
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
                                src={String(homePage.home_photo_4)}
                                alt="Lab-Room"
                            />
                            <Carousel.Caption>
                                <h3>Welcome to Shahjalal University School</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col md={3} style={{ backgroundColor: "rgb(194 225 255)", height: "70vh" }}>
                    <NoticeMarquee />
                </Col>
            </Row>
            {/* about us */}
            <Row className="m-5 p-5">
                <Col md={8}>
                    <h3>About Us:</h3>
                    <hr className="new" />
                    <br />
                    <div className='pl-4' style={{borderLeft: 'solid', borderLeftColor:'#555573', borderLeftWidth:'7px'}}>
                        {String(aboutUs.overview)}
                    </div>
                </Col>
                <Col md={4} className="mt-2">
                    <div className="img-hover-zoom">
                        <img
                            src={String(aboutUs.about_us_photo)}
                            style={{ height: "40vh" }}
                            alt="About us photo"
                        />
                    </div>
                </Col>
            </Row>
            <div style={{ backgroundColor: "#e9ecef" }}>
                <div>
                    <div>
                        <br />
                        <h3 style={{ textAlign: "center" }}>News and Events</h3>
                        <hr className="new1" />
                        <br />
                        <br />
                        <br />
                        <div className="container">
                            <style>{cssstyle}</style>
                            <Slider {...settings}>{showCards}</Slider>
                        </div>
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
                {/* heamasster section */}
                <Row className="m-5 p-5">
                    <Col md={8}>
                        <h3>Headmaster Speech:</h3>
                        <hr className="new" />
                        <br />
                        <div className='pl-4' style={{borderLeft: 'solid', borderLeftColor:'#555573', borderLeftWidth:'7px'}}>
                            {String(headMaster.headmaster_speech)}
                        </div>
                    </Col>
                    <Col md={4}>
                        <div>
                            <img
                                src={String(headMaster.headmaster_photo)}
                                style={{ height: "40vh" }}
                                alt="Headmaster photo"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;

const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
.container {
    margin: auto;
    padding: 0px 40px 40px 40px;
    width: 90vw;
  }
.merge{
    margin: 10px;
    padding: 10px;
} `;
