import React,{ useEffect, useState } from 'react'
import Sidebar from "./Sidebar";
import { useJwt } from "react-jwt";
import PageNotFound from "./../../PageNotFound/PageNotFound";
import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap';
import ShowToast from '../../ShowToast';

const axios = require('axios');

function Approval () {
    const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
    const [classList, setClassList] = useState({});
    const [errors, setErrors] = useState('');
    const [green, setGreen] = useState(false);

    useEffect(() => {
        const loadClass = async() => {
            axios
            .get('/api/v1/classes/list/')
            .then((response) => {
                setClassList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        loadClass();

    },[errors])

    const handleClassUpdate = (class_pk) => {
        // console.log(class_pk);
        axios
        .get(`/api/v1/classes/next_class_list/${class_pk}/`)
        .then((response) => {
            console.log(Object.keys(response.data).length)
            if(Object.keys(response.data).length < 2){
                axios
                .get(`/api/v1/classes/transfer_class/${class_pk}/`)
                .then(()=>{
                    setErrors('Successful!');
                    setGreen(true);
                })
                .catch((errors) => {
                    setErrors('Result is not yet published for next class.')
                    setGreen(false);
                })
            }
        })
        .catch((error) => {
            setErrors('All marks are not given yet for this class.');
            setGreen(false);
        })
    }

    let showClassList;
    if(Object.keys(classList).length > 0) {
        showClassList = classList.map((item) => (
            <ListGroup.Item variant='info' key={item.id}>
                Class: {item.name} {item.group ? (<>({item.group})</>):(<></>)}
                <Button
                 style={{float:'right'}}
                 onClick={() => handleClassUpdate(item.id)}
                 size='sm'
                >
                    Publish
                </Button>
            </ListGroup.Item>
        ))
    }


    return(
        <div>
            {decodedToken && !isExpired && localStorage.getItem("role") === "3" ? (
                <Container style={{margin:'auto'}}>
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
                            <h5 className='pb-3'>For publishing the results: </h5>
                            
                                <ListGroup>
                                    {showClassList}
                                </ListGroup>
                            </Container>
                        </Col>
                    </Row>
                    {errors ? (
                        <>
                            {green ? (
                                 <ShowToast mssg={errors} color="green" setErrors={setErrors}/>
                            ) : (
                                <ShowToast mssg={errors} color="red" setErrors={setErrors}/>
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
    )
}

export default Approval;