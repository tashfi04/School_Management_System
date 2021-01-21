import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const axios = require("axios");

function SelectedCurrentTabulation() {
    const [tabulation, setTabulation] = useState({});
    const [promise, setPromise] = useState(false);
    const [modTabulation, setModTabulation] = useState({});
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
        
        const formalizeTabulation = async() => {
            let temptabulation = {};
            for(let i=0;i < Object.keys(tabulation).length;i++){
                let name = tabulation[i].marksheet_set[0].student
                // console.log(name);
                let sortMarksheer = tabulation[i].marksheet_set;

                sortMarksheer.sort((a,b) =>
                    (a.subject > b.subject) ?
                        1 :
                    ((b.subject > a.subject) ?
                        -1 :
                        0
                    )
                )
                temptabulation = {
                    ...temptabulation,
                    [name] : {
                        'student': name,
                        'total_marks': tabulation[i].total_marks,
                        'total_GP': tabulation[i].total_GP,
                        'CGPA': tabulation[i].CGPA,
                        'letter_grade': tabulation[i].letter_grade,
                        'position': tabulation[i].position,
                        'marksheet_set': sortMarksheer
                    }
                }
            }
            // Sorting accordin to postion, this will be sorted accordin to roll number
            let tempTabulation = Object.values(temptabulation);
            tempTabulation.sort((a,b) =>
                    (a.position > b.position) ?
                        1 :
                    ((b.position > a.position) ?
                        -1 :
                        0
                    )
                )
            console.log('tempTabulation', tempTabulation);
            setModTabulation(tempTabulation);
        }

        if(promise){
            formalizeTabulation();
        }
    }, [promise]);

    return (
        <div className="m-5 p-5">
            {useParams().class_pk}
            <br />
            {useParams().exam_type_pk}
        </div>
    );
}

export default SelectedCurrentTabulation;
