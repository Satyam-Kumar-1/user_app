import React from "react";
import { Container } from "react-bootstrap";

const Home = ({ userName }) => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <h1 className="display-1 font-weight-bold">Welcome {userName}</h1>
            </div>
        </Container>
    );
};

export default Home;
