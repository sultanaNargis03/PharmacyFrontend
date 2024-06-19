// SessionExpired.js
import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { FaExclamationTriangle } from "react-icons/fa"; // Importing an icon

const SessionExpired = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card
            style={{
              backgroundColor: "#f8d7da",
              borderColor: "#f5c6cb",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            className="text-dark"
          >
            <CardBody className="text-center p-5">
              <FaExclamationTriangle
                size={50}
                color="#721c24"
                className="mb-3"
              />
              <h4 className="mb-3">Your session has expired!!</h4>
              <p className="mb-4">Please log in again to continue.</p>
              <Button color="danger" tag={Link} to="/login">
                Log In
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SessionExpired;
