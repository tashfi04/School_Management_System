import React, { useState } from "react";
import { Toast } from "react-bootstrap";

function ShowToast(props) {
    const [toast, setToast] = useState(true);
    const msg = props.mssg;

    const showToast = () => {
        setToast(!toast);
        props.setErrors('');
    }

    return (
        <div className="m-auto">
            <Toast
                show={toast}
                onClose={showToast}
                style={{
                    position: "fixed",
                    top: "60px",
                    right: "20px",
                    minWidth: "150px",
                }}
                delay={3000}
                autohide
                className="m-auto"
            >
                <Toast.Header style={{backgroundColor:'#e7e7e7'}}>
                    <strong className="mr-auto">Message</strong>
                </Toast.Header>
                <Toast.Body style={{backgroundColor:props.color}}>
                    <b style={{ color: 'white' }}>
                        {String(msg)}
                    </b>
                </Toast.Body>
            </Toast>
        </div>
    );
}

export default ShowToast;
