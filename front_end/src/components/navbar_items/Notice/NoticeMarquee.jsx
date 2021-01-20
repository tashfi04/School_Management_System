import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const axios = require("axios");
function NoticeMarquee() {
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
                    <Link
                        style={{ color: "black" }}
                        to={`/noticedetails/${item.id}/`}
                    >
                        <h5>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "bell"]}
                            />{" "}
                            {item.title}
                        </h5>
                    </Link>
                    <i style={{ fontSize: "12px" }}>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "calendar-day"]}
                        />{" "}
                        Published at {item.date}
                    </i>
                </td>
            </tr>
        ));
    }

    return (
        <div className="pt-5 mt-5 pl-2 mr-3" style={{ height: "100%" }}>
            <h4 style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "clipboard"]}
                />{" "}
                Notice
            </h4>
            <hr />
            <marquee direction="up" scrollamount="3" height="60%">
                <Table striped hover>
                    <tbody>{showNotice}</tbody>
                </Table>
            </marquee>
        </div>
    );
}

export default NoticeMarquee;
