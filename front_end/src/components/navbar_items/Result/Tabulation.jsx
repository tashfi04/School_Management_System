import React, { useEffect, useState } from "react";
import { Dropdown, Button, Row, Col } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { Link } from "react-router-dom";

const axios = require("axios");

function Tabulation() {
    const [classList, setClassList] = useState({});
    const [examTypeList, setExamTypeList] = useState({});
    const [promiseClass, setPromiseClass] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState();
    const [selectedClassName, setSelectedClassName] = useState();
    const [selectedExamId, setSelectedExamId] = useState();
    const [promiseExam, setPromiseExam] = useState(false);
    const [selectedExamName, setSelectedExamName] = useState();

    useEffect(() => {
        const loadClassList = async () => {
            axios
                .get("/api/v1/classes/list/")
                .then((response) => {
                    setClassList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClassList();

        const loadExamTypeList = async () => {
            axios
                .get(`/api/v1/classes/${selectedClassId}/exam_types/list/`)
                .then((response) => {
                    setExamTypeList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        if (promiseClass) {
            loadExamTypeList();
        }
    }, [promiseClass]);

    let ShowDropdownClassMenu;
    if (Object.keys(classList).length > 0) {
        ShowDropdownClassMenu = classList.map((item) => (
            <Dropdown.Item
                key={item.id}
                eventKey={JSON.stringify({ id: item.id, name: item.name })}
            >
                {item.name}
            </Dropdown.Item>
        ));
    }

    let ShowDropDownExamMenu;
    if (Object.keys(examTypeList).length > 0) {
        ShowDropDownExamMenu = examTypeList.map((item) => (
            <Dropdown.Item
                key={item.id}
                eventKey={JSON.stringify({
                    id: item.id,
                    exam_type: item.exam_type,
                })}
            >
                {item.exam_type}
            </Dropdown.Item>
        ));
    }

    const handleClassSelect = (e) => {
        let value = JSON.parse(e);
        setSelectedClassId(value.id);
        setSelectedClassName(value.name);
        setPromiseClass(true);
    };

    const handleExamSelect = (e) => {
        let value = JSON.parse(e);
        setSelectedExamId(value.id);
        setSelectedExamName(value.exam_type);
        setPromiseExam(true);
    };

    return (
        <div className="p-5 m-5" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "20px" }}>
                {" "}
                Select Class and Exam to see the tabulation sheet{" "}
            </p>
            <hr />
            <Row>
                <Col md={4}></Col>
                <Col md={4} className="pt-3 mt-3">
                    <Dropdown onSelect={handleClassSelect} className="mb-3">
                        <Dropdown.Toggle className="border-info" variant="">
                            Select Class
                        </Dropdown.Toggle>
                        <DropdownMenu>{ShowDropdownClassMenu}</DropdownMenu>
                    </Dropdown>
                    {!promiseClass ? (
                        <div className="mb-3">
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="border-info"
                                    variant=""
                                    disabled
                                >
                                    Select Exam
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="mb-3">
                            <Dropdown onSelect={handleExamSelect}>
                                <Dropdown.Toggle
                                    className="border-info"
                                    variant=""
                                >
                                    Select Exam
                                </Dropdown.Toggle>
                                <DropdownMenu>
                                    {ShowDropDownExamMenu}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    )}
                    {selectedClassName ? (
                        <h5>class: {selectedClassName}</h5>
                    ) : (
                        <div></div>
                    )}
                    {selectedExamName ? (
                        <h5>Exam: {selectedExamName}</h5>
                    ) : (
                        <div></div>
                    )}
                    {promiseExam ? (
                        <Button
                            className="mt-3"
                            type="submit"
                        >
                            <Link
                                style={{ color: "white" }}
                                to={`/result/class/${selectedClassId}/exam_type/${selectedExamId}/`}
                            >
                                Search
                            </Link>
                        </Button>
                    ) : (
                        <Button className="mt-3" disabled>
                            Search
                        </Button>
                    )}
                </Col>
                <Col md={4}></Col>
            </Row>
        </div>
    );
}

export default Tabulation;
