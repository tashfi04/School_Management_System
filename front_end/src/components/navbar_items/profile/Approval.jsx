import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useJwt } from "react-jwt";
import PageNotFound from "./../../PageNotFound/PageNotFound";
import {
    Row,
    Col,
    Container,
    ListGroup,
    Button,
    Modal,
    Table,
    Form,
} from "react-bootstrap";
import ShowToast from "../../ShowToast";

const axios = require("axios");

function Approval() {
    const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
    const [classList, setClassList] = useState({});
    const [errors, setErrors] = useState("");
    const [green, setGreen] = useState(false);
    const [show, setShow] = useState(false);
    const [studentList, setStudentList] = useState({});
    const [studentpublish, setStudentPublish] = useState({});
    const [nextClassList, setNextClassList] = useState({});
    const [modalCurrentClass, setModalCurrentClass] = useState();
    const [isBoardClass, setIsBoardClass] = useState({});

    useEffect(() => {
        const loadClass = async () => {
            axios
                .get("/api/v1/classes/list/")
                .then((response) => {
                    setClassList(response.data);
                    classToBoard(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClass();
    }, [errors, studentList]);

    const classToBoard = (response) => {
        let tempdict;
        for(let i=0;i<Object.keys(response).length;i++){
            tempdict = {
                ...tempdict,
                [response[i].id]:response[i].board_exam_evaluation
            }
        }
        setIsBoardClass(tempdict);
    } 

    const loadStudent = (class_pk) => {
        axios
            .get(`/api/v1/classes/${class_pk}/students/list/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setStudentList(response.data);
                let tempstudent = {};
                for(let i=0;i<Object.keys(response.data).length;i++)
                {
                    tempstudent = {
                        ...tempstudent,
                        [response.data[i].username] : {
                            ...tempstudent[response.data[i].username],
                            student_id: response.data[i].username
                        }
                    }
                }
                setStudentPublish(tempstudent);
            })
            .catch((error) => {
                setErrors("Something went wrong!");
                setGreen(false);
            });
    };


    const handleClassUpdate = (class_pk) => {
        // loadStudent(class_pk);

        // for load next classes
        axios
            .get(`/api/v1/classes/next_class_list/${class_pk}/`)
            .then((response) => {
                if (Object.keys(response.data).length < 2 && !isBoardClass[class_pk]) {
                    // publish for single next class
                    axios
                        .get(`/api/v1/classes/transfer_class/${class_pk}/`)
                        .then((res) => {
                            setErrors(res.data);
                            showModel();
                        })
                        .catch((errors) => {
                            setErrors(
                                "Result is not yet published for next class."
                            );
                            showModel();
                        });
                } else {
                    // publish for multiple next class
                    setNextClassList(response.data);
                    loadStudent(class_pk);
                    setModalCurrentClass(class_pk);
                    showModel();
                }
            })
            .catch((error) => {
                setErrors("All marks are not given yet for this class.");
                setGreen(false);
                showModel();
            });
    };

    const showModel = () => {
        setShow(!show);
    };

    const handlePublish = () => {

        let data = Object.values(studentpublish);
        for(let i=0;i<Object.keys(data).length;i++){
            if(!data[i].next_class)
                data[i].next_class = -1;
            if(!data[i].position)
                data[i].position = -1;
        }
        let body = JSON.stringify(data);

        console.log(body);
        
        let endpoint = `/api/v1/classes/transfer_class_with_selection/${modalCurrentClass}/`
        let config = {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios
            .post(endpoint, body, config)
            .then(() => {
                setErrors("Successful!");
                setGreen(true);
                showModel();
            })
            .catch(() => {
                setErrors("Datas are not selected perfectly!");
                setGreen(false);
                showModel();
            })
                
    }

    let showClassList;
    if (Object.keys(classList).length > 0) {
        showClassList = classList.map((item) => (
            <ListGroup.Item variant="info" key={item.id}>
                Class: {item.name} {item.group ? <>({item.group})</> : <></>}
                <Button
                    variant="success"
                    style={{ float: "right" }}
                    onClick={() => handleClassUpdate(item.id)}
                    // onClick={showModel}
                    size="sm"
                >
                    Publish
                </Button>
            </ListGroup.Item>
        ));
    }

    let showNextClassList;
    if (Object.keys(nextClassList).length > 0) {
        showNextClassList = nextClassList.map((iitem) => (
            <option value={iitem.id} key={iitem.id}>
                {iitem.name}-{iitem.group}
            </option>
        ));
    }

    let modalStudentShow;
    if (Object.keys(studentList).length > 0) {
        modalStudentShow = studentList.map((item) => (
            <tr key={item.roll_no}>
                <td>{item.username}</td>
                <td>{item.roll_no}</td>
                <td>
                    <Form>
                        <Form.Control
                        as="select"
                        onClick={(e) => {
                            setStudentPublish({
                                ...studentpublish,
                                [item.username]: {
                                    ...studentpublish[item.username],
                                    next_class: parseInt(e.target.value)
                                }
                            })
                        }}
                        >
                            <option> ----- </option>
                            {showNextClassList}
                        </Form.Control>
                    </Form>
                </td>
                <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Position"
                        style={{ maxWidth: "70px", margin:'auto' }}

                        onChange={(e) => {
                            setStudentPublish({
                                ...studentpublish,
                                [item.username]: {
                                    ...studentpublish[item.username],
                                    position: parseInt(e.target.value),
                                    student_id: item.username
                                },
                            });
                        }}
                    ></input>
                </td>
            </tr>
        ));
    }

    return (
        <div>
            {decodedToken &&
            !isExpired &&
            localStorage.getItem("role") === "3" ? (
                <Container style={{ margin: "auto" }}>
                    <div style={{overflowX:'auto'}}>
                        <Modal show={show} onHide={showModel}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    For publishing the results:
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table
                                    striped
                                    hover
                                    bordered
                                    size="sm"
                                    className="pt-3 m-auto"
                                >
                                    <tbody
                                        className="pt-3"
                                        style={{
                                            margin: "auto",
                                            fontSize: "15px",
                                            textAlign: "center",
                                        }}
                                        className="m-auto mt-3"
                                    >
                                        <tr>
                                            <td>Student</td>
                                            <td>Roll</td>
                                            <td>Next Class</td>
                                            <td>Position</td>
                                        </tr>
                                        {modalStudentShow}
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={showModel}
                                >
                                    Cancel
                                </Button>
                                <Button variant="success" size="sm" onClick={handlePublish}>
                                    Publish
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <Row>
                        <Col sm={3} md={3} xl={3} className="pt-5">
                            <Container
                                style={{
                                    border: "solid",
                                    borderColor: "#ebebeb",
                                }}
                            >
                                <Sidebar />
                            </Container>
                        </Col>
                        <Col sm={9} md={9}>
                            <Container style={{ backgroundColor: "#ebebeb" }}>
                                <h5 className="pb-3">
                                    For publishing the results:{" "}
                                </h5>
                                <ListGroup>{showClassList}</ListGroup>
                            </Container>
                        </Col>
                    </Row>
                    {errors ? (
                        <>
                            {green ? (
                                <ShowToast
                                    mssg={errors}
                                    color="blue"
                                    setErrors={setErrors}
                                />
                            ) : (
                                <ShowToast
                                    mssg={errors}
                                    color="blue"
                                    setErrors={setErrors}
                                />
                            )}
                        </>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}
                </Container>
            ) : (
                <PageNotFound />
            )}
        </div>
    );
}

export default Approval;
