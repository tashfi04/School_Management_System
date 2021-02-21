import React, { useEffect, useState } from "react";
import { Table, Jumbotron, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowToast from "./../../../ShowToast";
import { useJwt } from "react-jwt";
import PageNotFound from "./../../../PageNotFound/PageNotFound";

const axios = require("axios");

function UpdateMarksheet(props) {
    // const [studentList, setStudentList] = useState({});
    const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
    const [marksheet, setMarksheet] = useState({});
    const [result, setResult] = useState({});
    const [promise, setPromise] = useState(false);
    const [errors, setErrors] = useState();
    const { exam_pk, subjectDetails, className } = props;

    useEffect(() => {
        const loadMarksheet = async () => {
            axios
                .get(`/api/v1/results/marksheet/${exam_pk}/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setMarksheet(response.data);
                    setPromise(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadMarksheet();

        const copyMarksheet = async () => {
            let tempResult = {};
            for (let i = 0; i < Object.keys(marksheet).length; i++) {
                tempResult = {
                    ...tempResult,
                    [marksheet[i].student]: {
                        ...tempResult[marksheet[i].student],
                        id: marksheet[i].id,
                        exam: marksheet[i].exam,
                        student: marksheet[i].student,
                        term_test_subjective_marks:
                            marksheet[i].term_test_subjective_marks,
                        term_test_objective_marks:
                            marksheet[i].term_test_objective_marks,
                        class_test_marks: marksheet[i].class_test_marks,
                        lab_marks: marksheet[i].lab_marks,
                    },
                };
            }
            setResult(tempResult);
        };
        if (promise) {
            copyMarksheet();
        }
    }, [promise, errors]);

    let ShowTable;
    if (Object.keys(marksheet).length > 0) {
        ShowTable = marksheet.map((item) => (
            <tr key={item.id}>
                <td>
                    <h6>{item.roll_no}</h6>
                </td>
                <td>
                    <h6>{item.student}</h6>
                </td>

                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.class_test_marks}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
                                    class_test_marks: e.target.value,
                                },
                            });
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.term_test_subjective_marks}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
                                    term_test_subjective_marks: e.target.value,
                                },
                            });
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.term_test_objective_marks}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
                                    term_test_objective_marks: e.target.value,
                                },
                            });
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.term_test_total_marks}
                        disabled
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.lab_marks}
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.student]: {
                                    ...result[item.student],
                                    lab_marks: e.target.value,
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
                        disabled
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.GP}
                        disabled
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={item.letter_grade}
                        disabled
                    ></input>
                </td>
            </tr>
        ));
    }

    const updateMarksheet = async () => {
        //let endpoint = `/api/v1/results/marksheet/${subject_pk}/${exam_pk}/`;
        let endpoint = `/api/v1/results/marksheet/${exam_pk}/`;
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
            .then(() => {
                window.location.reload(false);
            })
            .catch((error) => {
                setErrors("A valid number is required");
            });
    };

    return (
        <div>
            {decodedToken && !isExpired ? (
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
                        <Table responsive className="p-5" size="sm">
                            <thead>
                                <tr>
                                    <th>Roll</th>
                                    <th>Name</th>
                                    <th>MT Marks</th>
                                    <th>Term Subjective Marks</th>
                                    <th>Term Objective Marks</th>
                                    <th>Term Test Total</th>
                                    <th>Lab Marks</th>
                                    <th>Total Marks</th>
                                    <th>GP</th>
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

                        {errors ? (
                            <ShowToast mssg={errors} color="red" setErrors={setErrors}/>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                    </div>
                </Jumbotron>
            ) : (
                <PageNotFound />
            )}
        </div>
    );
}

export default UpdateMarksheet;
