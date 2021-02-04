import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Table, Row, Col } from "react-bootstrap";

const axios = require("axios");

function ResultStudent() {
    const [result, setResult] = useState({});
    const [className, setClassName] = useState();
    const [group, setGroup] = useState();
    const [classTeacher, setClassTeacher] = useState();
    const [promise, setPromise] = useState(false);
    const [midSubList, setMidSubList] = useState([]);
    const regExp = /\(([^)]+)\)/;

    useEffect(() => {
        let tempresult, tempsubject;
        const loadResult = async () => {
            axios
                .get(
                    `/api/v1/results/result_card/${localStorage.getItem(
                        "current_class"
                    )}/${localStorage.getItem("username")}/details/`
                )
                .then((response) => {
                    setResult(response.data);
                    setPromise(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadResult();

        const loadClassDetails = async () => {
            axios
                .get(
                    `/api/v1/classes/${localStorage.getItem(
                        "current_class"
                    )}/details/`
                )
                .then((response) => {
                    console.log(response.data[0]);
                    setClassName(response.data[0].name);
                    setGroup(response.data[0].group);
                    setClassTeacher(response.data[0].class_teacher);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClassDetails();

        const checkExtraSubject = async () => {
            let tempSubList = [];
            for (
                let i = 0;
                i < Object.keys(result[0].marksheet_set).length;
                i++
            ) {
                tempSubList = [
                    ...tempSubList,
                    result[0].marksheet_set[i].exam.split(" ")[0],
                ];
            }
            setMidSubList(tempSubList);
        };

        if (promise) checkExtraSubject();
    }, [promise]);

    let showResult,
        extraResult,
        KEY = 0,
        check = 0;

    if (Object.keys(result).length > 0) {
        showResult = result[0].marksheet_set.map((item) => (
            <tr key={++KEY}>
                <td>{item.exam.split(" ")[0]}</td>
                <td>{item.class_test_marks}</td>
                <td>{item.term_test_subjective_marks}</td>
                <td>{item.term_test_objective_marks}</td>
                <td>{item.total_marks}</td>
                <td>{item.letter_grade}</td>
                {result[1].marksheet_set.map((iitem) => (
                    <React.Fragment key={++KEY}>
                        {item.exam.split(" ")[0] ===
                        iitem.exam.split(" ")[0] ? (
                            <React.Fragment key={++check}>
                                <td>{iitem.class_test_marks}</td>
                                <td>{iitem.term_test_subjective_marks}</td>
                                <td>{iitem.term_test_objective_marks}</td>
                                <td>{iitem.total_marks}</td>
                                <td>{iitem.letter_grade}</td>
                            </React.Fragment>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </React.Fragment>
                ))}
                {check === 0 ? (
                    <React.Fragment>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </React.Fragment>
                ) : (
                    <React.Fragment key={(check = 0)}></React.Fragment>
                )}
            </tr>
        ));
    }

    if (Object.keys(result).length > 0) {
        extraResult = result[1].marksheet_set.map((item) => (
            <tr key={++KEY}>
                {midSubList.includes(item.exam.split(" ")[0]) ? (
                    <React.Fragment></React.Fragment>
                ) : (
                    <React.Fragment>
                        <td>{item.exam.split(" ")[0]}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{item.class_test_marks}</td>
                        <td>{item.term_test_subjective_marks}</td>
                        <td>{item.term_test_objective_marks}</td>
                        <td>{item.total_marks}</td>
                        <td>{item.letter_grade}</td>
                    </React.Fragment>
                )}
            </tr>
        ));
    }

    return (
        <Container
            style={{ textAlign: "center", margin: "auto" }}
            className="pt-5"
        >
            <h3 className="pt-5">
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chalkboard"]}
                />{" "}
                {"    "}
                Class {className}
            </h3>
            {group ? (
                <div>
                    <h6>
                        {group === "Sci" ? (
                            <div>Group Science</div>
                        ) : group === "Bus" ? (
                            <div>Group Business Studies</div>
                        ) : group === "Hum" ? (
                            <div>Group Humanities</div>
                        ) : (
                            <div></div>
                        )}
                    </h6>
                </div>
            ) : (
                <div></div>
            )}
            <br />
            <h5>
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chalkboard-teacher"]}
                />{" "}
                {"  "}
                Class Teacher {classTeacher}
            </h5>
            <br />
            <p
                style={{
                    float: "left",
                    fontSize: "25px",
                    borderLeft: "solid",
                    borderLeftColor: "#555573",
                    borderLeftWidth: "7px",
                }}
                className="pl-2"
            >
                Result Card:
            </p>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th rowSpan="3">Subjects</th>
                        {Object.keys(result).length > 0 ? (
                            <>
                                {result.map((item) => (
                                    <th colSpan="5" key={item.position}>
                                        {
                                            regExp.exec(
                                                item.marksheet_set[0].exam
                                            )[1]
                                        }
                                    </th>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr>
                        {Object.keys(result).length > 0 ? (
                            <>
                                {result.map((item) => (
                                    <React.Fragment key={item.position}>
                                        <td rowSpan="2">Module Test</td>
                                        <td colSpan="2">Term Test</td>
                                        <td rowSpan="2">Total</td>
                                        <td rowSpan="2">Letter Grade</td>
                                    </React.Fragment>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr>
                        {Object.keys(result).length > 0 ? (
                            <>
                                {result.map((item) => (
                                    <React.Fragment key={item.position}>
                                        <td>Subjective</td>
                                        <td>Objective</td>
                                    </React.Fragment>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {showResult}
                    {extraResult}
                </tbody>
            </Table>
            <div className="pt-2 pl-5 pb-4">
                {Object.keys(result).length > 0 ? (
                    <React.Fragment>
                        <Row>
                            <Col sm={2} md={2} xl={2}></Col>
                            <Col sm={5} md={5} xl={5} style={{ textAlign:'left'}}>
                                Total  Marks: {result[0].total_marks}<br />
                                GPA: {result[0].GPA}<br />
                                Letter Grade: {result[0].letter_grade}<br />
                                Position: {result[0].position}
                            </Col>
                            <Col sm={5} md={5} xl={5} style={{textAlign:'left'}}>
                                Total  Marks: {result[1].total_marks}<br />
                                GPA: {result[1].GPA}<br />
                                Letter Grade: {result[1].letter_grade}<br />
                                Position: {result[1].position}
                            </Col>
                        </Row>
                    </React.Fragment>
                ) : (
                    <React.Fragment>

                    </React.Fragment>
                )}  
            
            </div>
        </Container>
    );
}

export default ResultStudent;
