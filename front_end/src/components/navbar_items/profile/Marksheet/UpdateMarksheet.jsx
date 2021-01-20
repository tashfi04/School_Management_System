import React, {useEffect, useState} from 'react'
import { Table, Jumbotron, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const axios = require("axios")

function UpdateMarksheet(props) {
    const [studentList, setStudentList] = useState({});
    const [marksheet, setMarksheet] = useState({});
    const [result, setResult] = useState({});
    const [promise, setPromise] = useState(false);
    const { class_pk, exam_pk, subject_pk, subjectDetails, className } = props;

    useEffect(() => {

        const loadMarksheet = async() => {
            axios
                .get(`/api/v1/results/marksheet/${subject_pk}/${exam_pk}/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setMarksheet(response.data);
                    setPromise(true);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        loadMarksheet();

        const copyMarksheet = async() => {
            let tempResult = {};
            for(let i = 0; i < Object.keys(marksheet).length ; i++){
                tempResult = {
                    ...tempResult,
                    [marksheet[i].student]: {
                        ...tempResult[marksheet[i].student],
                        id: marksheet[i].id,
                        exam: marksheet[i].exam,
                        student: marksheet[i].student,
                        subject: marksheet[i].subject,
                        subjective_marks: marksheet[i].subjective_marks,
                        objective_marks: marksheet[i].objective_marks,
                        total_marks: marksheet[i].total_marks,
                        letter_grade: marksheet[i].letter_grade,
                    }
                }
            }
            setResult(tempResult);
        }
        if(promise){
            copyMarksheet();
        }

    },[promise]);

    let ShowTable;
    if (Object.keys(marksheet).length > 0) {
        ShowTable = marksheet.map((item) => (
            <tr key={item.id}>
                <td>
                    <h6>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "user"]}
                        />{" "}
                        {item.student}
                    </h6>
                </td>
                
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.subjective_marks}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
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
                        placeholder={item.objective_marks}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
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
                        placeholder={item.total_marks}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
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
                        placeholder={item.letter_grade}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
                                    letter_grade: e.target.value,
                                },
                            });
                        }}
                    >
                    </input>
                </td>
            </tr>
        )
        )
    }

    const updateMarksheet = async() => {
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
            .put(endpoint, body, config)
            .then((response) => {
                console.log(response.data);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                    <h5>Update the marks where needed</h5>
                    <hr />
                    <hr />
                    <Table striped hover className="p-5" size="sm">
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
                    <Button
                        type="submit"
                        className="m-auto"
                        variant="success"
                        style={{ margin: "auto" }}
                        onClick={updateMarksheet}
                    >
                        update
                    </Button>
                </div>
            </Jumbotron>
        </div>
    )
}

export default UpdateMarksheet;