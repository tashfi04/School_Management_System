import React, { useState } from "react";
import { Toast } from "react-bootstrap";

function ShowToast(props) {
    const [toast, setToast] = useState(true);

    const showToast = () => setToast(!toast);
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
                <Toast.Header>
                    <strong className="mr-auto">Message</strong>
                </Toast.Header>
                <Toast.Body>
                    <p style={{ color: String(props.color) }}>
                        {String(props.mssg)}
                    </p>
                </Toast.Body>
            </Toast>
        </div>
    );
}

export default ShowToast;
