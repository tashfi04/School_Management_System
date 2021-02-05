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
    const [promiseSession, setPromiseSession] = useState(false);
    const [selectedExamName, setSelectedExamName] = useState();
    const [selectSessionId, setSelectSessionId] = useState();
    const [selectSessionName, setSelectSessionName] = useState();
    const [sessionList, setSessionList] = useState({});

    useEffect(() => {
        const loadSessionList = async () => {
            axios
                .get("/api/v1/results/search_options/sessions/list/")
                .then((response) => {
                    setSessionList(response.data);
                })
                .catch((error) => {
                    console.log(error.detail)
                });
        };

        const loadClassList = async () => {
            axios
                .get(`/api/v1/results/search_options/classes/${selectSessionId}/list/`)
                .then((response) => {
                    setClassList(response.data);
                })
                .catch((error) => {
                    console.log(error.detail);
                });
        };

        const loadExamTypeList = async () => {
            axios
                .get(`/api/v1/results/search_options/exam_types/${selectSessionId}/${selectedClassId}/list/`)
                .then((response) => {
                    setExamTypeList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        loadSessionList();
        if (promiseSession) {
            loadClassList();
        }
        if (promiseClass) {
            loadExamTypeList();
        }
    }, [promiseClass, promiseSession]);

    let ShowDropdownSessionMenu;
    if (Object.keys(sessionList).length > 0) {
        ShowDropdownSessionMenu = sessionList.map((item) => (
            <Dropdown.Item
                key={item.id}
                eventKey={JSON.stringify({ id: item.id, session: item.session })}
            >
                {item.session}
            </Dropdown.Item>
        ))
    }

    let ShowDropdownClassMenu;
    if (Object.keys(classList).length > 0) {
        ShowDropdownClassMenu = classList.map((item) => (
            <Dropdown.Item
                key={item.id}
                eventKey={JSON.stringify({ id: item.id, name: item.name, group: item.group })}
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

    const handleSessionSelect = (e) => {
        let value = JSON.parse(e);
        setSelectSessionId(value.id);
        setSelectSessionName(value.session);
        setPromiseSession(true);
        setPromiseClass(false);
        setSelectedClassId();
        setSelectedClassName();
        setPromiseExam(false);
        setSelectedExamId();
        setSelectedExamName();
    }

    const handleClassSelect = (e) => {
        let value = JSON.parse(e);
        setSelectedClassId(value.id);
        setSelectedClassName(value.name);
        setPromiseClass(true);
        setPromiseExam(false);
        setSelectedExamId();
        setSelectedExamName();
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
                Select Session, Class and Exam to see the tabulation sheet{" "}
            </p>
            <hr style={{border: 'solid', borderWidth:'1px'}}/>
            <Row>
                <Col md={3} sm={3} xl={3} className="pt-3 mt-3 pb-3">
                    <Dropdown onSelect={handleSessionSelect} className="mb-3">
                        <Dropdown.Toggle className="border-info" variant="">
                            Select Session
                        </Dropdown.Toggle>
                        <DropdownMenu>{ShowDropdownSessionMenu}</DropdownMenu>
                    </Dropdown>
                </Col>
                <Col md={3} sm={3} xl={3} className="pt-3 mt-3 pb-3">
                    {!promiseSession ? (
                        <Dropdown>
                            <Dropdown.Toggle
                                className="border-info"
                                variant=""
                                disabled
                            >
                                Select Class
                            </Dropdown.Toggle>
                        </Dropdown>
                    ) : (
                        <Dropdown onSelect={handleClassSelect} className="mb-3">
                            <Dropdown.Toggle className="border-info" variant="">
                                Select Class
                            </Dropdown.Toggle>
                            <DropdownMenu>{ShowDropdownClassMenu}</DropdownMenu>
                        </Dropdown>
                    )}
                </Col>
                <Col md={3} sm={3} xl={3} className="pt-3 mt-3 pb-3">
                    {!promiseClass ? (
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="border-info"
                                    variant=""
                                    disabled
                                >
                                    Select Exam
                                </Dropdown.Toggle>
                            </Dropdown>
                    ) : (
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
                    )}
                </Col>
                <Col md={3} sm={3} xl={3} className="pt-3 mt-3 pb-3">
                    {promiseExam ? (
                        <Button type="submit">
                            <Link
                                style={{ color: "white" }}
                                to={`/result/session/${selectSessionId}/class/${selectedClassId}/exam_type/${selectedExamId}/`}
                            >
                                Search
                            </Link>
                        </Button>
                    ) : (
                        <Button disabled>Search</Button>
                    )}
                </Col>
                    {selectSessionName ? (
                        <h5 className='pl-5'>Session: {selectSessionName} </h5>
                    ) : (
                        <div></div>
                    )}
                    {selectedClassName ? (
                        <h5>, Class: {selectedClassName}</h5>
                    ) : (
                        <div></div>
                    )}
                    {selectedExamName ? (
                        <h5>, Exam: {selectedExamName}</h5>
                    ) : (
                        <div></div>
                    )}
            </Row>
        </div>
    );
}

export default Tabulation;
