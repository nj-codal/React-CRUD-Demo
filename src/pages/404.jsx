import React from "react";
import { Card, Col, Container, Row } from "reactstrap";

const Page404 = () => (
  <Container fluid="sm" className="mt-4">
    <Row>
      <Col
        md={{
          offset: 3,
          size: 6,
        }}
        sm="12"
      >
        <h1 className="text-center">Error 404</h1>
        <Card body className="mt-4 mb-4">
          <div>No match</div>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Page404;
