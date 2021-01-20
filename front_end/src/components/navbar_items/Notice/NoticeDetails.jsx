import React, { useState, useEffect } from "react";
import { Jumbotron, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NoticeMarquee from "./NoticeMarquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const axios = require("axios");

function NoticeDetails() {
    const [noticeDetails, setNoticeDetails] = useState({});
    const notice_pk = useParams().notice_pk;

    useEffect(() => {
        const loadNoticeDetails = async () => {
            axios
                .get(`/api/v1/notices/${notice_pk}/details/`)
                .then((response) => {
                    console.log(response.data[0]);
                    setNoticeDetails(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadNoticeDetails();
    }, [notice_pk]);

    return (
        <div>
            <Jumbotron>
                <div>
                    <Row>
                        <Col md={9}>
                            <div
                                className="p-5"
                                style={{ backgroundColor: "#e9ecef" }}
                            >
                                <h3 style={{textAlign:'center'}} className="mb-4">
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "bell"]}
                                    />{" "}
                                        Notice Board
                                    <hr/>
                                </h3>
                                <div className="pt-3"></div>
                                {/* <div className="pl-5 pr-5"></div> */}
                                <img
                                    src={String(noticeDetails.attachment)}
                                    style={{ height: "70vh", width: "68vw" }}
                                    alt="event photo"
                                />
                                <h3
                                    className="pt-3"
                                    style={{ textAlign: "center" }}
                                >
                                    {String(noticeDetails.title)}
                                    <br />
                                </h3>
                                <h5 style={{ textAlign: "center" }}>
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "calendar-day"]}
                                    />{" "}
                                    {String(noticeDetails.date)}
                                </h5>
                                <hr className="new" />
                                <div className="p-5">
                                    {String(noticeDetails.description)}
                                </div>
                            </div>
                        </Col>
                        <Col
                            md={3}
                            style={{
                                backgroundColor: "rgb(194 225 255)",
                                height: "70vh",
                            }}
                        >
                            <NoticeMarquee />
                        </Col>
                    </Row>
                </div>
            </Jumbotron>
        </div>
    );
}
export default NoticeDetails;
