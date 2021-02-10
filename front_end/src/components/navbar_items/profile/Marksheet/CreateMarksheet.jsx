import React, { useEffect, useState } from "react";
import { Button, Jumbotron, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowToast from "./../../../ShowToast";
import { useJwt } from "react-jwt";
import PageNotFound from "./../../../PageNotFound/PageNotFound";

const axios = require("axios");

function CreateMarksheet(props) {
    const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
    const [studentList, setStudentList] = useState({});
    const { class_pk, exam_pk, subjectDetails, className } = props;
    const [result, setResult] = useState({});
    const [promise, setPromise] = useState(false);
    const [errors, setErrors] = useState();
    const [nameToRoll, setNameToRoll]  = useState({});

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
            let tempName = {};
            for (let i = 0; i < Object.keys(studentList).length; i++) {
                // let name = studentList[i].name;
                let username = studentList[i].username;
                tempResult = {
                    ...tempResult,
                    [username]: {
                        ...tempResult[username],
                        exam: parseInt(exam_pk),
                        student: username,
                        // subject: parseInt(subject_pk),
                        term_test_objective_marks: "0.00",
                        term_test_subjective_marks: "0.00",
                        class_test_marks: "0.00",
                        lab_marks: "0.00",
                        // total_marks: "0.00",
                        // letter_grade: "0.00",
                    },
                };
                tempName = {
                    ...tempName,
                    [username]: studentList[i].roll_no
                }
            }
            setResult(tempResult);
            setNameToRoll(tempName);
        };


        if (promise) {
            initialResult();
        }
    }, [promise]);


    let ShowTable;
    if (Object.keys(studentList).length > 0) {
        ShowTable = studentList.map((item) => (
            <tr key={item.username}>
                <td>
                    {nameToRoll[item.username]}
                </td>
                <td>
                    <h6>
                        {item.username}
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
                                [item.username]: {
                                    ...result[item.username],
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
                        placeholder="0"
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.username]: {
                                    ...result[item.username],
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
                        placeholder="0"
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.username]: {
                                    ...result[item.username],
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
                        placeholder="0"
                        onChange={(e) => {
                            setResult({
                                ...result,
                                [item.username]: {
                                    ...result[item.username],
                                    lab_marks: e.target.value,
                                },
                            });
                        }}
                    ></input>
                </td>
            </tr>
        ));
    }

    const createMarksheet = async () => {
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
        axios
            .post(endpoint, body, config)
            .then(() => {
                window.location.reload(false);
                // console.log(response.data)
            })
            .catch(() => {
                // console.log(error);
                setErrors("Invalid Marks");
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
                        <h5>Please fill the data to create marksheet</h5>
                        <hr />
                        <hr />
                        <Table responsive className="p-5">
                            <thead>
                                <tr>
                                    <th>Roll</th>
                                    <th>Name</th>
                                    <th>MT Marks</th>
                                    <th>Term Subjective Marks</th>
                                    <th>Term Objective Marks</th>
                                    <th>Lab Marks</th>
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

export default CreateMarksheet;
