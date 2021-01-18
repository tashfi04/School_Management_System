import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import UpdateMarksheet from './UpdateMarksheet';
import CreateMarksheet from './CreateMarksheet';

const axios = require("axios")

function MarksheetTeacher() {
    let subject_pk = useParams().subject_pk;
    let exam_pk = useParams().exam_pk;
    let class_pk = useParams().class_pk;

    const [tabulation, setTabulation] = useState({});
    const [available, setAvailable] = useState(false)

    useEffect(() => {
        const loadMarksheet = async() => {
            axios
            .get(`/api/v1/results/marksheet/${subject_pk}/${exam_pk}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setTabulation(response.data);
                console.log(response.data)
                if(response.data.length > 0){
                    setAvailable(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        loadMarksheet();
    },[]);

    return(
        <div>
            {available ? (
                <div>
                    <UpdateMarksheet />
                </div>
            ) : (
                <div>
                    <CreateMarksheet class_pk={class_pk} exam_pk={exam_pk} subject_pk={subject_pk}/>
                </div>
            )}
        </div>
    )
}
export default MarksheetTeacher;
