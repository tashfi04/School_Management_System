import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IndividualTest from './IndividualTest';
import { Table, Container } from 'react-bootstrap';
import ShowToast from "./../../ShowToast";

const axios = require('axios')

function TermTest() {

    const session_pk = useParams().session_pk;
    const subject_pk = useParams().subject_pk;
    const exam_type_pk = useParams().exam_type_pk;
    const [result, setResult] = useState({});
    const [errors, setErrors] = useState();

    useEffect(() => {
        const loadResult = async() => {
            axios
            .get(`/api/v1/results/marksheet/term_test/${session_pk}/${subject_pk}/${exam_type_pk}/details/`)
            .then((response) => {
                setResult(response.data)
            })
            .catch((errors) => {
                setErrors('Result does not exist!');
            })
        }
        loadResult();
    },[session_pk, subject_pk, exam_type_pk])

    console.log(result)

    let showResult;
    if(Object.keys(result).length > 0){
        showResult = result.map((item) => (
            <tr key={item.student}>
                <td>{item.student}</td>
                <td>{item.term_test_subjective_marks}</td>
                <td>{item.term_test_objective_marks}</td>
                <td>{item.term_test_total_marks}</td>
            </tr>
        ))
    }

    return(
        <div style={{ textAlign: "center" }}>
            <IndividualTest />
            {!errors ? (
                <React.Fragment>
                <h3>Term Test Marks</h3>
                <h4>Session: </h4>
                <h4>Class:</h4>
                <h4>Subject: </h4>
                <Container style={{margin:'auto'}}>
                    <Table striped bordered hover size = 'sm' className="pl-5 pr-5">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subjective Marks</th>
                                <th>Objective Marks</th>
                                <th>Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(result).length > 0 ? (
                                <React.Fragment>
                                    {showResult}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
    
                                </React.Fragment>
                            )}
                        </tbody>
                    </Table>
                </Container>
                </React.Fragment>
            ) : (
                <ShowToast mssg={errors} color="red" />
            )}
        </div>
    )
}

export default TermTest;