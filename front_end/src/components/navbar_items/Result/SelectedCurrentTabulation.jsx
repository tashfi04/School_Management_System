import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const axios = require("axios");

function SelectedCurrentTabulation() {
    const [tabulation, setTabulation] = useState({});
    const [promise, setPromise] = useState(false);
    const [promiseSubject, setPromiseSubject] = useState(false);
    const [modTabulation, setModTabulation] = useState({});
    const [subjectListName, setSubjectListName] = useState({});
    const [classDetails, setClassDetails] = useState({});
    const [pkToSubject, setPkToSubject] = useState({});
    const class_pk = useParams().class_pk;
    const exam_type_pk = useParams().exam_type_pk;

    useEffect(() => {
        const loadTabulation = async () => {
            axios
                .get(
                    `/api/v1/results/tabulationsheet/${class_pk}/${exam_type_pk}/list/`
                )
                .then((response) => {
                    setTabulation(response.data);
                    setPromise(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        loadTabulation();

        const formalizeTabulation = async () => {
            let temptabulation = {};
            for (let i = 0; i < Object.keys(tabulation).length; i++) {
                let name = tabulation[i].marksheet_set[0].student;
                let sortMarksheer = tabulation[i].marksheet_set;

                sortMarksheer.sort((a, b) =>
                    a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0
                );
                temptabulation = {
                    ...temptabulation,
                    [name]: {
                        student: name,
                        total_marks: tabulation[i].total_marks,
                        total_GP: tabulation[i].total_GP,
                        CGPA: tabulation[i].CGPA,
                        letter_grade: tabulation[i].letter_grade,
                        position: tabulation[i].position,
                        marksheet_set: sortMarksheer,
                    },
                };
            }
            let tempTabulation = Object.values(temptabulation);
            tempTabulation.sort((a, b) =>
                a.position > b.position ? 1 : b.position > a.position ? -1 : 0
            );
            setModTabulation(tempTabulation);
        };

        if (promise) {
            formalizeTabulation();
        }

        const loadClassDetails = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/details/`)
                .then((response) => {
                    setClassDetails(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const loadSubjectListName = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/subjects/list/`)
                .then((response) => {
                    setSubjectListName(response.data);
                    setPromiseSubject(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        loadClassDetails();
        loadSubjectListName();

        const formalizeSubjectList = async () => {
            let tempSubjectList = {};
            for (let i = 0; i < Object.keys(subjectListName).length; i++) {
                tempSubjectList = {
                    ...tempSubjectList,
                    [subjectListName[i].pk]: subjectListName[i].name,
                };
            }
            setPkToSubject(tempSubjectList);
        };

        if (promiseSubject) {
            formalizeSubjectList();
        }
    }, [promise, promiseSubject]);

    console.log(modTabulation);

    let ShowTableCol;
    if (modTabulation[0]) {
        if (modTabulation[0].marksheet_set) {
            ShowTableCol = modTabulation[0].marksheet_set.map((item) => (
                <th colSpan="4" key={item.exam}>
                    {pkToSubject[item.subject]}
                </th>
            ));
        }
    }

    let ShowTableSubCol;
    let SubHead = ["MT", "Term", "Total", "GP"];
    let KEY = 0;
    if (modTabulation[0]) {
        if (modTabulation[0].marksheet_set) {
            ShowTableSubCol = modTabulation[0].marksheet_set.map((item) =>
                SubHead.map((iitem) => <th key={++KEY}>{iitem}</th>)
            );
        }
    }

    let showTabulationsheet;
    if (Object.keys(modTabulation).length) {
        showTabulationsheet = modTabulation.map((item) => (
            <tr key={item.position}>
                <td>{item.marksheet_set[0].student}</td>
                {item.marksheet_set.map((iitem) => (
                    <React.Fragment>
                        <td></td>
                        <td></td>
                        <td>{iitem.total_marks}</td>
                        <td></td>
                    </React.Fragment>
                ))}
                <td>{item.total_marks}</td>
                <td>{item.total_GP}</td>
                <td>{item.position}</td>
            </tr>
        ));
    }

    // For PDF Generate
    const printDocument = () => {
        const input = document.getElementById("divToPrint");
        html2canvas(input).then((canvas) => {
            var imgWidth = 200;  
            var pageHeight = 490;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight/1);  
            pdf.save("download.pdf")
        });
    };

    return (
        <div className="pb-5">
            <div id='divToPrint' className="mt-5 pt-5 ml-1 mr-1">
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ color: "CaptionText" }}>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chalkboard"]}
                        />{" "}
                        Tabulation Sheet for Class: {String(classDetails.name)}
                    </h3>
                    <div style={{ fontSize: "15px" }}>
                        {classDetails.group === "Sci" ? (
                            <div> Group: Science</div>
                        ) : classDetails.group === "Bus" ? (
                            <div>Group: Business</div>
                        ) : classDetails.group === "Hum" ? (
                            <div>Group: Humanities</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <h5 style={{ color: "CaptionText" }}>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "user"]}
                        />{" "}
                        Class Teacher: {String(classDetails.class_teacher)}
                    </h5>
                    <div
                        className="mt-5 mb-5 p-3"
                        style={{ overflowX: "auto" }}
                    >
                        <Table size="sm" striped bordered hover>
                            <thead>
                                <tr>
                                    <th rowSpan="2">Name</th>
                                    {ShowTableCol}
                                    <th>Total Marks</th>
                                    <th>GPA</th>
                                    <th>Position</th>
                                </tr>
                                <tr>
                                    {ShowTableSubCol}
                                    <th colSpan="3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {showTabulationsheet}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <Button
                variant="secondary"
                size="sm"
                className="float-right mr-3"
                onClick={printDocument}
            >
                Print result
            </Button>
        </div>
    );
}

export default SelectedCurrentTabulation;
