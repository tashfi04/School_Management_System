import React, { useEffect, useState } from "react";
import { Button, Jumbotron, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const axios = require("axios");

function CreateMarksheet(props) {
    const [studentList, setStudentList] = useState({});
    const { class_pk, exam_pk, subject_pk, subjectDetails, className } = props;
    const [result, setResult] = useState({});
    const [promise, setPromise] = useState(false);

    useEffect(() => {
        const loadStudentList = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/students/list/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setStudentList(response.data);
                    setPromise(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadStudentList();

        const initialResult = async () => {
            let tempResult = {};
            for (let i = 0; i < Object.keys(studentList).length; i++) {
                let name = studentList[i].name;
                tempResult = {
                    ...tempResult,
                    [name]: {
                        ...tempResult[name],
                        exam: parseInt(exam_pk),
                        student: name,
                        subject: parseInt(subject_pk),
                        subjective_marks: "0.00",
                        objective_marks: "0.00",
                        total_marks: "0.00",
                        letter_grade: "0.00",
                    },
                };
            }
            setResult(tempResult);
        };

        if (promise) {
            initialResult();
        }
    }, [promise]);

    let ShowTable;
    if (Object.keys(studentList).length > 0) {
        ShowTable = studentList.map((item) => (
            <tr key={item.name}>
                <td>
                    <h6>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "user"]}
                        />{" "}
                        {item.name}
                    </h6>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.name]: {
                                    ...result[item.name],
                                    subjective_marks: e.target.value,
                                },
                            });
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.name]: {
                                    ...result[item.name],
                                    objective_marks: e.target.value,
                                },
                            });
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.name]: {
                                    ...result[item.name],
                                    total_marks: e.target.value,
                                },
                            });
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.name]: {
                                    ...result[item.name],
                                    letter_grade: e.target.value,
                                },
                            });
                        }}
                    >

                    </input>
                </td>
            </tr>
        ));
    }

    const createMarksheet = async () => {
        let endpoint = `/api/v1/results/marksheet/${subject_pk}/${exam_pk}/`;
        let data = Object.values(result);
        let body = JSON.stringify(data);
        let config = {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        console.log("json", body);
        axios
            .post(endpoint, body, config)
            .then((response) => {
            // browserHistory.push(`/profile/class/${class_pk}/exam/${item.id}/subject/${subject_pk}/`);
            window.location.reload(false);
            console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Jumbotron className="p-5" style={{ textAlign: "center" }}>
                <div className="p-5" style={{ margin: "auto" }}>
                    <div>
                        <br />
                        <br />
                        <h3 style={{ color: "CaptionText" }}>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "chalkboard"]}
                            />{" "}
                            Class {String(className.name)}
                        </h3>
                        <h5>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "book"]}
                            />{" "}
                            {subjectDetails.name}
                        </h5>
                    </div>
                    <br />
                    <h5>Please fill the data to create marksheet</h5>
                    <hr />
                    <hr />
                    <Table striped hover className="p-5">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subjective Mark</th>
                                <th>Objective Mark</th>
                                <th>Total Mark</th>
                                <th>Letter Grade</th>
                            </tr>
                        </thead>
                        <tbody>{ShowTable}</tbody>
                    </Table>
                    <br />
                    <Button
                        type="submit"
                        className="m-auto"
                        variant="success"
                        style={{ margin: "auto" }}
                        onClick={createMarksheet}
                    >
                        Create
                    </Button>
                </div>
            </Jumbotron>
        </div>
    );
}

export default CreateMarksheet;
