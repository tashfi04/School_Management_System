import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Jumbotron, Table, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"

const axios = require("axios");
function Notice() {
    const [notice, setNotice] = useState({});

    useEffect(() => {
        const loadNotice = async () => {
            axios
                .get("/api/v1/notices/0/list/")
                .then((response) => {
                    setNotice(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadNotice();
    }, []);

    let showNotice;

    if (Object.keys(notice).length > 0) {
        showNotice = notice.map((item) => (
            <tr key={item.id}>
                <td>
                    <Link style={{color:'black'}} to={`/noticedetails/${item.id}/`}>
                        <h5>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "bell"]}
                            />{" "}
                            {item.title}
                        </h5>
                        <i style={{ fontSize: "12px" }}>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "calendar-day"]}
                            />{" "}
                            Published at {item.date}
                        </i>
                    </Link>
                </td>
            </tr>
        ));
    }

    return (
            <div className="m-5">
                <Row>
                    <Col md={2} >
                    </Col>
                    <Col md={8}>
                        <div
                            className="mt-5 pl-2 mr-3"
                            style={{ height: "100%" }}
                        >
                            <h4 style={{ textAlign: "center" }}>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "clipboard"]}
                                />{" "}
                                Notice Board
                            </h4>
                            <hr />
                            <Table striped hover>
                                <tbody>{showNotice}</tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </div>
    );
}

export default Notice;
