import React,{ useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
const axios = require('axios');

function Routines(props) {
    const [routine, setRoutine] = useState({});

    useEffect(() => {
        const loadRoutine = async() => {
            axios
            .get(`/api/v1/classes/routines/${props.class_pk}/details/`)
            .then((response) => {
                setRoutine(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
        }

        loadRoutine();
    },[])

    const showRow = (day) => {
        let roww;
        if(Object.keys(routine).length > 0){
            roww = routine.map((item) => (
                <React.Fragment key = {item.id}>
                    {day === 'saturday' ? (
                         <td>{item.saturday}</td>
                    ) : day === 'sunday' ? (
                        <td>{item.sunday}</td>
                    ) : day === 'monday' ? (
                        <td>{item.monday}</td>
                    ) : day === 'tuesday' ? (
                        <td>{item.tuesday}</td>
                    ) : day === 'wednesday' ? (
                        <td>{item.saturday}</td>
                    ) : day === 'thursday' ? (
                        <td>{item.thursday}</td>
                    ) : (
                        <></>
                    )}
                </React.Fragment>
            ))
        }
        return roww;
    }

    return(
        <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>Day</td>
                        <td>1st Period</td>
                        <td>2nd Period</td>
                        <td>3rd Period</td>
                        <td rowSpan="6" style={{writingMode:'vertical-rl'}}>Break</td>
                        <td>4th Period</td>
                        <td>5th Period</td>
                        <td>6th Period</td>
                    </tr>
                <tr>
                    <td>Saturday</td>
                        {showRow('saturday')}
                </tr>
                <tr>
                    <td>Sunday</td>
                        {showRow('sunday')}
                </tr>
                <tr>
                    <td>Monday</td>
                        {showRow('monday')}
                </tr>
                <tr>
                    <td>Tuesday</td>
                        {showRow('tuesday')}
                </tr>
                <tr>
                    <td>Wednesday</td>
                        {showRow('wednesday')}
                </tr>
                <tr>
                    <td>Thursday</td>
                        {showRow('thursday')}
                </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Routines;
