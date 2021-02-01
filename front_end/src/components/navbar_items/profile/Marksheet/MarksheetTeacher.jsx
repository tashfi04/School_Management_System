import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import UpdateMarksheet from './UpdateMarksheet';
import CreateMarksheet from './CreateMarksheet';

const axios = require("axios")

function MarksheetTeacher() {
    let subject_pk = useParams().subject_pk;
    let exam_pk = useParams().exam_pk;
    let class_pk = useParams().class_pk;

    const [available, setAvailable] = useState(false)
    const [subjectDetails, setSubjectDetails] = useState({});
    const [className, setClassName] = useState({});


    useEffect(() => {

        const loadMarksheet = async() => {
            axios
            //.get(`/api/v1/results/marksheet/${subject_pk}/${exam_pk}/`, {
            .get(`/api/v1/results/marksheet/${exam_pk}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                if(response.data.length > 0){
                    setAvailable(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

        const loadSubjectDetails = async () => {
            axios
                .get(`/api/v1/classes/subjects/${subject_pk}/details/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setSubjectDetails(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const loadClassName = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/details/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setClassName(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        loadMarksheet();
        loadSubjectDetails();
        loadClassName();

        // return () => isCancelled.current = true;
        
    },[]);

    return(
        <div>
            {available ? (
                <div>
                    <UpdateMarksheet
                        class_pk={class_pk} 
                        exam_pk={exam_pk} 
                        subject_pk={subject_pk} 
                        subjectDetails={subjectDetails} 
                        className={className}
                    />
                </div>
            ) : (
                <div>
                    <CreateMarksheet 
                        class_pk={class_pk} 
                        exam_pk={exam_pk} 
                        subject_pk={subject_pk} 
                        subjectDetails={subjectDetails} 
                        className={className}
                    />
                </div>
            )}
        </div>
    )
}
export default MarksheetTeacher;
